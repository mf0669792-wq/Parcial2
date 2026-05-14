# Parcial 2

Este fue el paso a paso que seguí para construir y probar el proyecto. La idea fue dejar una API en TypeScript conectada a MySQL, con modelos, rutas, archivos de prueba y datos falsos para verificar que todo funcionara correctamente.

## 1. Configuración inicial

Primero configuré TypeScript con el archivo `tsconfig.json`. Allí quedó definido que el código fuente está en `src` y que la compilación sale hacia `dist`.

<p>
  <img src="src/imagenes/capturas/tsconfig.json.png" alt="Configuración de TypeScript" width="700">
</p>

También preparé el archivo `.env`, donde dejé las variables de conexión para no escribir directamente los datos de la base de datos dentro del código.

<p>
  <img src="src/imagenes/capturas/archivo.env.png" alt="Archivo env" width="700">
</p>

## 2. Conexión con MySQL

Después creé la configuración de la base de datos en `src/database/db.ts`. En este archivo se define el motor de base de datos, las credenciales que vienen desde `.env` y la conexión con Sequelize.

<p>
  <img src="src/imagenes/capturas/db.ts%20de%20database.png" alt="Archivo db.ts" width="700">
</p>

Luego verifiqué que la base de datos existiera en MySQL y que el proyecto pudiera conectarse correctamente.

<p>
  <img src="src/imagenes/capturas/mysql.png" alt="Base de datos MySQL" width="700">
</p>

## 3. Configuración del servidor

Luego organicé la configuración principal de Express. Se agregaron middlewares como `morgan`, `cors`, `express.json()` y la sincronización con Sequelize.

<p>
  <img src="src/imagenes/capturas/index.ts%20de%20config.png" alt="Configuración principal" width="700">
</p>

También dejé listo el archivo del servidor para iniciar la aplicación y escuchar el puerto configurado.

<p>
  <img src="src/imagenes/capturas/server.ts%20de%20src.png" alt="Archivo server.ts" width="700">
</p>

## 4. Modelos principales

Después creé los modelos `Dog` y `Adoption`. El modelo de perros guarda la raza, fecha de nacimiento, color, vacunación y estado. El modelo de adopciones guarda la fecha, documento, nombre del adoptante, valor y el perro asociado.

En este paso se pidió ayuda a la IA para organizar mejor la estructura de los modelos y corregir detalles de TypeScript.

<p>
  <img src="src/imagenes/capturas/modelo_dog.png" alt="Modelo Dog" width="700">
</p>

<p>
  <img src="src/imagenes/capturas/modelo_adoption.png" alt="Modelo Adoption" width="700">
</p>

## 5. Rutas del proyecto

Con los modelos listos, creé las rutas para perros y adopciones. Estas rutas permiten listar, consultar, crear, actualizar y eliminar registros.

En este paso también se pidió ayuda a la IA para corregir errores de importación y dejar las rutas funcionando.

<p>
  <img src="src/imagenes/capturas/ruta_dog.png" alt="Ruta Dog" width="700">
</p>

<p>
  <img src="src/imagenes/capturas/ruta_adoption.png" alt="Ruta Adoption" width="700">
</p>

También se creó el archivo `index.ts` de rutas para centralizar la organización del proyecto.

<p>
  <img src="src/imagenes/capturas/idex_routes.png" alt="Index de rutas" width="700">
</p>

## 6. Pruebas HTTP

Para probar la API creé archivos `.http`. Con ellos pude ejecutar las peticiones directamente desde el editor y comprobar los endpoints de perros y adopciones.

<p>
  <img src="src/imagenes/capturas/http_dog.png" alt="Pruebas HTTP Dog" width="700">
</p>

<p>
  <img src="src/imagenes/capturas/http_adoption.png" alt="Pruebas HTTP Adoption" width="700">
</p>

## 7. Datos falsos con Faker

Finalmente creé el archivo `src/faker/populate_data.ts` para insertar datos falsos en la base de datos. El script genera usuarios, roles, recursos, perros, adopciones y sus relaciones.

El comando usado para ejecutarlo fue:

```bash
npx ts-node src/faker/populate_data.ts
```

<p>
  <img src="src/imagenes/capturas/faker.png" alt="Archivo Faker" width="700">
</p>

Al ejecutarlo, los datos quedaron registrados en MySQL y se pudo confirmar que la base de datos estaba recibiendo la información correctamente.

<p>
  <img src="src/imagenes/capturas/datos_falsos_mysql.png" alt="Datos falsos en MySQL" width="700">
</p>

## Resultado final

Al final quedó una API funcional, conectada a MySQL, con modelos relacionados, rutas organizadas, pruebas HTTP y un script para poblar la base de datos. Esto permitió probar el proyecto de forma más rápida y sin tener que insertar cada registro manualmente.

