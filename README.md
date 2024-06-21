# Blog App Backend

Este es el backend para una aplicación de blog construida con TypeScript, mongo DB y Express. Incluye integración con Cloudinary para almacenamiento de imágenes y Docker para la contenedorización.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Uso](#uso)
- [Configuración de Docker](#configuración-de-docker)
- [Scripts](#scripts)

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/justin-A18/blog-app-backend.git
    cd blog-app-backend
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

## Variables de Entorno

Crea un archivo `.env` en el directorio raíz y añade las siguientes variables:
```sh
PORT=<tu_puerto>
MONGO_URI=<tu_cadena_de_conexión_mongodb>
CLOUDINARY_CLOUD_NAME=<tu_nombre_de_cloudinary>
CLOUDINARY_API_KEY=<tu_api_key_de_cloudinary>
CLOUDINARY_API_SECRET=<tu_api_secret_de_cloudinary>
JWT_SECRET=<tu_secreto_jwt>
```

## Uso

Para iniciar el servidor de desarrollo:

```sh
npm run dev
```
El servidor se ejecutará en el puerto especificado en el archivo .env.

## Configuración de Docker

Para ejecutar la aplicación usando Docker, asegúrate de tener Docker instalado. Luego, sigue estos pasos:

Inicia los contenedores de Docker:

```sh
docker compose up -d
```

## Scripts

- npm run build: Compila TypeScript a JavaScript.
- npm run dev: Ejecuta la aplicación en modo desarrollo.
- npm start: Ejecuta el código JavaScript compilado.
