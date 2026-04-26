# Sistema de Gestión de Incidencias - Guía de Despliegue (Frontend)

Este documento contiene las instrucciones necesarias para configurar y ejecutar la interfaz de usuario del sistema desarrollada con **Angular**.

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v24.0.0 o superior)
- **Backend en ejecución:** Es necesario que el servidor de la API esté operativo para que el frontend pueda cargar y gestionar los datos.

---

## 2. Configuración del Proyecto (Angular)

El cliente web requiere la instalación de sus dependencias y la verificación de la conexión con la API.

1. **Instalación de dependencias:**
   Desde la raíz de la carpeta del frontend, ejecuta:

```bash
  npm install
```

2. **Configuración de la URL de la API:**
   El proyecto viene preconfigurado para conectar con la API en la dirección por defecto del backend (`http://localhost:3000`).

   Si tu servidor backend está ejecutándose en un puerto o dirección diferente, debes modificar la propiedad `apiUrl` en el siguiente archivo:
   - `src/environments/environment.development.ts`

> [!NOTE]
> Al estar este archivo incluido en el repositorio, la aplicación funcionará directamente siempre que el backend utilice el puerto `3000`.

---

## 3. Puesta en marcha del Frontend

Una vez instaladas las dependencias, dispones de varios comandos para ejecutar o compilar la aplicación:

### Ejecución en modo desarrollo

Para arrancar el servidor de desarrollo y que la aplicación se abra automáticamente en tu navegador predefinido, ejecuta:

```bash
ng serve --open
```

O en su defecto:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`. El servidor detectará cualquier cambio en el código y refrescará la página automáticamente.

---

## 4. Compilación para Producción

En caso de querer generar la build del proyecto, ejecuta el comando:

```bash
npm run build
```

Los archivos resultantes se generarán en la carpeta `dist/ticketable-frontend`.
