# Address Book

Aplicación web full-stack para gestionar contactos con información detallada incluyendo emails, teléfonos y direcciones.

### Backend
- PHP 8.1+
- Laravel 10
- MySQL 8.0

### Frontend
- Angular 17+
- TypeScript
- Tailwind CSS

## Requisitos Previos

Antes de instalar, asegúrate de tener:

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MySQL** >= 8.0
- **Git**

## Instalación

### 1. Clonar el repositorio

### 2. Configurar Backend (Laravel)

```bash
# Ir a la carpeta del backend
cd backend/address-book-backend

# Instalar dependencias
composer install

# Copiar archivo de configuración
copy .env.example .env

# Generar key de la aplicación
php artisan key:generate

# Configurar base de datos en .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=address_book
# DB_USERNAME=root
# DB_PASSWORD=root
```

### 3. Crear Base de Datos

### 4. Ejecutar Migraciones y Seeders

```bash
# Ejecutar migraciones
php artisan migrate

# (Opcional) Generar datos de prueba (5,000 contactos)
php artisan db:seed

# O todo en uno:
php artisan migrate:fresh --seed
```

### 5. Iniciar Servidor Backend

```bash
php artisan serve
```

### 6. Configurar Frontend (Angular)

**Abrir nueva terminal:**

```bash
# Ir a la carpeta del frontend
cd frontend/address-book-frontend

# Instalar dependencias
npm install

# Instalar Tailwind CSS (si no está)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 7. Configurar API URL

````typescript
// filepath: frontend/address-book-frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
````

### 8. Iniciar Servidor Frontend
```bash
ng serve
```
