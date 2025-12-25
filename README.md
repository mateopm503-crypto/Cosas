# Malla Curricular Interactiva - Pedagogía Básica UC

Hice esta aplicación para visualizar mi malla curricular de Pedagogía en Educación General Básica de la UC de forma interactiva. Me ayuda a planificar qué cursos tomar y ver mi progreso en la carrera.

## 🎯 ¿Qué hace?

- **Vista por semestres**: Todos los cursos organizados del 1° al 10° semestre
- **Prerrequisitos visuales**: Al hacer clic en un curso, se destacan los prerrequisitos y los cursos que desbloquea
- **Seguimiento de progreso**: Puedo marcar cursos como aprobados y el progreso se guarda en el navegador
- **Chatbot de ayuda**: Para consultar información sobre cursos específicos
- **Categorías por color**: Cada tipo de curso tiene su color (formación general, disciplinarios, etc.)

## 🖥️ Demo

Puedes ver la aplicación funcionando en: https://mateopm503-crypto.github.io/Cosas/

## 🛠️ Tecnologías

- React + TypeScript + Vite (Frontend)
- Node.js + Express (Backend para el chatbot)

## 📦 Instalación local

Si quieres correrlo en tu computadora:

```bash
# Clonar
git clone https://github.com/mateopm503-crypto/Cosas.git
cd Cosas

# Instalar dependencias del cliente
cd client
npm install

# Correr en modo desarrollo
npm run dev
```

Para el chatbot necesitas también correr el servidor:
```bash
cd server
npm install
npm run dev
```

## 📝 Notas

Este proyecto está hecho específicamente para la malla de Pedagogía Básica UC. Si estudias otra carrera, tendrías que modificar el archivo de datos con tu propia malla.
