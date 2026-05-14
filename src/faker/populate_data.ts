import { sequelize } from "../database/db";
import { Dog } from "../models/Dog";
import { Adoption } from "../models/Adoption";
import { User } from "../models/authorization/User";
import { Role } from "../models/authorization/Role";
import { Resource } from "../models/authorization/Resource";
import { RoleUser } from "../models/authorization/RoleUser";
import { ResourceRole } from "../models/authorization/ResourceRole";
import { RefreshToken } from "../models/authorization/RefreshToken";

type FakerInstance = typeof import("@faker-js/faker")["faker"];

const loadFaker = async (): Promise<FakerInstance> => {
  const importer = new Function("moduleName", "return import(moduleName)");
  const fakerModule = await importer("@faker-js/faker") as typeof import("@faker-js/faker");
  return fakerModule.faker;
};

const randomItem = <T>(items: T[], faker: FakerInstance): T => {
  return items[faker.number.int({ min: 0, max: items.length - 1 })];
};

async function createFakeData() {
  const faker = await loadFaker();

  await sequelize.authenticate();
  await sequelize.sync({ force: false });

  const roles = await Promise.all(
    ["ADMIN", "USER", "ADOPTER"].map(([first, ...rest]) => {
      const name = `${first}${rest.join("").toLowerCase()}`;
      return Role.findOrCreate({
        where: { name },
        defaults: {
          name,
          is_active: "ACTIVE",
        },
      }).then(([role]) => role);
    })
  );

  const resourceDefinitions = [
    { path: "/dogs", method: "GET" },
    { path: "/dogs", method: "POST" },
    { path: "/dogs/:id", method: "GET" },
    { path: "/dogs/:id", method: "PUT" },
    { path: "/dogs/:id", method: "DELETE" },
    { path: "/adoptions", method: "GET" },
    { path: "/adoptions", method: "POST" },
    { path: "/adoptions/:id", method: "GET" },
    { path: "/adoptions/:id", method: "PUT" },
    { path: "/adoptions/:id", method: "DELETE" },
    { path: "/api/register", method: "POST" },
    { path: "/api/login", method: "POST" },
  ];

  const resources = await Promise.all(
    resourceDefinitions.map((resource) => {
      return Resource.findOrCreate({
        where: resource,
        defaults: {
          ...resource,
          is_active: "ACTIVE",
        },
      }).then(([createdResource]) => createdResource);
    })
  );

  for (const role of roles) {
    for (const resource of resources) {
      await ResourceRole.findOrCreate({
        where: {
          role_id: role.id,
          resource_id: resource.id,
        },
        defaults: {
          role_id: role.id,
          resource_id: resource.id,
          is_active: "ACTIVE",
        },
      });
    }
  }

  const users: User[] = [];
  for (let i = 0; i < 20; i++) {
    const user = await User.create({
      username: faker.internet.username(),
      email: `${faker.internet.username().toLowerCase()}-${Date.now()}-${i}@example.com`,
      password: "Password123",
      is_active: "ACTIVE",
      avatar: faker.image.avatar(),
    });

    users.push(user);

    const role = randomItem(roles, faker);
    await RoleUser.create({
      user_id: user.id,
      role_id: role.id,
      is_active: "ACTIVE",
    });

    await RefreshToken.create({
      user_id: user.id,
      token: faker.string.uuid(),
      device_info: faker.internet.userAgent(),
      is_valid: "ACTIVE",
      expires_at: faker.date.future(),
    });
  }

  const dogs: Dog[] = [];
  for (let i = 0; i < 30; i++) {
    const dog = await Dog.create({
      breed: faker.animal.dog(),
      birth_date: faker.date.birthdate({ min: 1, max: 14, mode: "age" }),
      color: faker.color.human(),
      vaccinated: faker.datatype.boolean(),
      status: "ACTIVE",
    });

    dogs.push(dog);
  }

  for (let i = 0; i < 15; i++) {
    const dog = randomItem(dogs, faker);

    await Adoption.create({
      adoption_date: faker.date.past({ years: 2 }),
      document_number: faker.string.numeric({ length: { min: 8, max: 12 } }),
      adopter_name: faker.person.fullName(),
      value: faker.number.int({ min: 50000, max: 500000 }),
      dog_id: dog.id,
      status: "ACTIVE",
    });
  }
}

createFakeData()
  .then(async () => {
    console.log("Datos falsos creados exitosamente");
    await sequelize.close();
  })
  .catch(async (error) => {
    console.error("Error al crear datos falsos:", error);
    await sequelize.close();
    process.exit(1);
  });
