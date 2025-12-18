# Aplicación de Malla Curricular

Una aplicación web completa para visualizar y gestionar mallas curriculares universitarias.

## Características

- **Malla Interactiva**: Visualiza los cursos organizados por semestre.
- **Detalles del Curso**: Haz clic en un curso para ver sus prerrequisitos, cursos que abre (dependientes) y descripciones detalladas.
- **Seguimiento de Progreso**: Marca los cursos como aprobados; el estado se guarda localmente en tu navegador.
- **Asistente Chatbot**: Haz preguntas sobre los cursos, prerrequisitos y la malla en general.
- **Indicadores Visuales**: Colores intuitivos que indican el estado del curso (aprobado, bloqueado por prerrequisitos, disponible) y su categoría.

## Tecnologías Utilizadas

- **Cliente (Frontend)**: React, Vite, TypeScript
- **Servidor (Backend)**: Node.js, Express, TypeScript

## Comenzando

### Prerrequisitos

- Node.js instalado en tu computadora.

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd <directorio-del-repositorio>
    ```

2.  **Instalar dependencias del servidor:**
    ```bash
    cd server
    npm install
    ```

3.  **Instalar dependencias del cliente:**
    ```bash
    cd ../client
    npm install
    ```

### Ejecutando la Aplicación

1.  **Iniciar el Servidor:**
    Desde el directorio `server`:
    ```bash
    npm run dev
    ```
    El servidor típicamente corre en el puerto 3000 (o segun configuración).

2.  **Iniciar el Cliente:**
    Desde el directorio `client`:
    ```bash
    npm run dev
    ```
    Abre la URL que se muestra en la terminal (usualmente `http://localhost:5173`) en tu navegador.

## Contribuciones

¡Siéntete libre de abrir issues o enviar pull requests para mejorar el proyecto!
