# Sistema de Gestión de Incidencias - Guía de Despliegue (Frontend)

Este documento contiene las instrucciones necesarias para configurar y ejecutar la interfaz de usuario del sistema desarrollada con **Angular**.

## 🌐 Versión Online

La aplicación se encuentra desplegada y disponible para su uso en producción en la siguiente dirección: [https://ticketable.netlify.app](https://ticketable.netlify.app)

> [!IMPORTANT]
> **Nota sobre el primer acceso:** Debido a que el backend utiliza el plan gratuito de Render, el servidor puede entrar en reposo tras periodos de inactividad. La primera petición (Login) puede demorar entre 30 y 60 segundos mientras la instancia se reactiva. Una vez iniciada, el rendimiento es óptimo.

---

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

   Si tu servidor backend está ejecutándose en un puerto o dirección diferente, debes modificar la propiedad `backendUrl` en uno de los siguientes archivos:
   - **Desarrollo:** `src/environments/environment.development.ts`
   - **Producción:** `src/environments/environment.ts`

> [!NOTE]
> Al estar ambos archivos incluidos en el repositorio, la aplicación funcionará directamente. En caso del modo desarrollo se utiliza el puerto `3000` para el backend local.

---

## 3. Puesta en marcha del Frontend

Una vez instaladas las dependencias, dispones de varios comandos para ejecutar o compilar la aplicación:

### Ejecución en modo desarrollo

Para arrancar el servidor de desarrollo apuntando al backend local (`localhost:3000`):

```bash
npm start
```

O si quieres que se abra automáticamente una pestaña en el navegador:

```bash
ng serve --open
```

### Ejecución con Backend en Producción

Si deseas ejecutar el frontend en tu máquina local pero conectando con la **API desplegada en Render**, utiliza el perfil de producción:

```bash
ng serve --configuration=production
```

> [!IMPORTANT]
> Al usar esta configuración, la aplicación ignorará el backend local y realizará las peticiones a la URL de Render configurada en `environment.ts`. En este caso ten en cuenta que el servidor del backend puede tardar cierto tiempo en arrancarse, por lo que la primera petición tendrá una mayor latencia.

La aplicación estará disponible en `http://localhost:4200`. El servidor detectará cualquier cambio en el código y refrescará la página automáticamente.

---

## 4. Compilación para Producción

En caso de querer generar la build del proyecto, ejecuta el comando:

```bash
npm run build
```

Los archivos resultantes se generarán en la carpeta `dist/ticketable-frontend/browser`.
