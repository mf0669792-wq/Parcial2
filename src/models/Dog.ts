// models/Dog.ts

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Adoption } from "./Adoption";

export interface DogI {
  id?: number;
  breed: string;
  birth_date: Date;
  color: string;
  vaccinated: boolean;
  status: "ACTIVE" | "INACTIVE";
}

export class Dog extends Model {
  public id!: number;
  public breed!: string;
  public birth_date!: Date;
  public color!: string;
  public vaccinated!: boolean;
  public status!: "ACTIVE" | "INACTIVE";
}

Dog.init(
  {
    breed: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Breed cannot be empty",
        },
        len: {
          args: [2, 100],
          msg: "Breed must contain between 2 and 100 characters",
        },
      },
    },

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "Birth date must be valid",
        },
      },
    },

    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Color cannot be empty",
        },
      },
    },

    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Dog",
    tableName: "dogs",
    timestamps: false,
  }
);

Dog.hasMany(Adoption, {
  foreignKey: "dog_id",
  sourceKey: "id",
});

Adoption.belongsTo(Dog, {
  foreignKey: "dog_id",
  targetKey: "id",
});