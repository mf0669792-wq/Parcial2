# Parcial 2

## 1. Configuración inicial del proyecto

Primero se configuró TypeScript con `tsconfig.json`, dejando el código fuente dentro de `src` y la salida compilada en `dist`. También se preparó el archivo `.env` para manejar las variables de conexión a la base de datos sin escribir esos datos directamente en el código.

![Configuración de TypeScript](src/imagenes/capturas/tsconfig.json.png)

![Archivo env](src/imagenes/capturas/archivo.env.png)

## 2. Conexión a la base de datos

Después se creó la conexión con Sequelize en `src/database/db.ts`. Allí se definió el motor de base de datos, en este caso MySQL, y se dejó lista la función para probar la conexión antes de levantar el servidor.

![Configuración de base de datos](src/imagenes/capturas/db.ts%20de%20database.png)

![Base de datos MySQL](src/imagenes/capturas/mysql.png)

## 3. Configuración del servidor

Luego se configuró Express desde `src/config/index.ts` y el archivo principal del servidor. Se agregaron middlewares como `morgan`, `cors`, `express.json()` y la sincronización con Sequelize para que las tablas se creen o se mantengan actualizadas.

![Config index](src/imagenes/capturas/index.ts%20de%20config.png)

![Server](src/imagenes/capturas/server.ts%20de%20src.png)

## 4. Creación de los modelos

Se crearon los modelos principales del proyecto: `Dog` y `Adoption`. El modelo de perros guarda datos como raza, fecha de nacimiento, color, vacunación y estado. El modelo de adopciones guarda la fecha, documento, nombre del adoptante, valor y el perro relacionado.

`EN ESTE PASO SE LE PIDIO AYUDA A LA IA`

![Modelo Dog](src/imagenes/capturas/modelo_dog.png)

![Modelo Adoption](src/imagenes/capturas/modelo_adoption.png)

## 5. Creación de rutas

Con los modelos listos, se organizaron las rutas de perros y adopciones. También se creó el archivo `index.ts` dentro de `src/routes` para centralizar las rutas principales del proyecto.

`EN ESTE PASO SE LE PIDIO AYUDA A LA IA`

![Ruta Dog](src/imagenes/capturas/ruta_dog.png)

![Ruta Adoption](src/imagenes/capturas/ruta_adoption.png)

![Index routes](src/imagenes/capturas/idex_routes.png)

## 6. Pruebas con archivos HTTP

Para probar la API se crearon archivos `.http`. Con ellos se pueden ejecutar peticiones para listar, crear, actualizar y eliminar perros o adopciones sin tener que escribir las solicitudes manualmente cada vez.

![HTTP Dog](src/imagenes/capturas/http_dog.png)

![HTTP Adoption](src/imagenes/capturas/http_adoption.png)

## 7. Datos falsos con Faker

Finalmente se creó `src/faker/populate_data.ts` para llenar la base de datos con información falsa. El script genera roles, recursos, usuarios, tokens, perros y adopciones. Para ejecutarlo se usa:

```bash
npx ts-node src/faker/populate_data.ts
```

También se corrigieron detalles de importación para que `ts-node` pudiera ejecutar el proyecto sin errores.

![Faker](src/imagenes/capturas/faker.png)

![Datos falsos en MySQL](src/imagenes/capturas/datos_falsos_mysql.png)


