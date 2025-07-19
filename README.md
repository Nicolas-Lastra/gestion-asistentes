# Gestión de Asistentes

Aplicación web desarrollada con **Angular 20** para la gestión de estudiantes/asistentes. Permite visualizar, agregar, eliminar y modificar registros de estudiantes de forma dinámica. Además, incluye validaciones y notificaciones visuales utilizando Angular Material.

## ✨ Funcionalidades

- ✅ Visualización de la lista de estudiantes mediante tabla responsiva
- ➕ Agregar nuevos estudiantes (ID generada automáticamente de forma incremental)
- 🗑️ Eliminar estudiante mediante su número de DNI
- ✏️ Modificar los datos de un estudiante existente por su ID
- ⚠️ Validación de formularios con control de campos requeridos y longitud mínima
- ❌ Verificación de unicidad del DNI al registrar nuevos estudiantes
- 🍞 Snackbars (mensajes emergentes) para notificar operaciones exitosas o fallidas

## 🛠️ Tecnologías utilizadas

- [Angular 20](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Bootstrap](https://getbootstrap.com/)
- TypeScript
- HTML + CSS (global y por componente)
- JSON para datos simulados

## 🗂️ Estructura del proyecto

```bash
├── src/
│   ├── app/
│   │   ├── add-form/
│   │   ├── delete-form/
│   │   ├── modify-form/
│   │   ├── navbar/
│   │   ├── students-table/
│   │   └── students-section/
│   ├── assets/
│   └── mocks/
│       └── students.json
├── angular.json
├── package.json
├── styles.css
└── README.md