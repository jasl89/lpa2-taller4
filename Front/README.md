#  API de Música - Frontend

Frontend profesional y moderno para la gestión de usuarios, canciones y favoritos, desarrollado con React, TypeScript, Next.js y Tailwind CSS.

**Desarrollado por:** Jhon Salcedo (salcedo.lenis@gmail.com)

---

##  Descripción

Aplicación web completa que permite gestionar un sistema de música con las siguientes funcionalidades:

-  **Gestión de Usuarios**: CRUD completo con validaciones
-  **Gestión de Canciones**: CRUD completo con filtros por artista y género
-  **Sistema de Favoritos**: Agregar y eliminar canciones favoritas por usuario
-  **Dashboard**: Estadísticas y visualización de datos
-  **Diseño Responsivo**: Compatible con dispositivos móviles y desktop
-  **Validaciones en tiempo real**: Feedback inmediato al usuario
-  **Manejo robusto de errores**: Mensajes claros y descriptivos
-  **Notificaciones**: Toast notifications para acciones exitosas/fallidas

---

##  Tecnologías

### Core
- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Next.js 16** - Framework React con SSR
- **Tailwind CSS 4** - Estilos utility-first

### UI Components
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos modernos
- **Sonner** - Toast notifications
- **Recharts** - Gráficos y visualizaciones

### Data Management
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### Quality & Testing
- **Vitest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Husky** - Git hooks
- **lint-staged** - Pre-commit hooks
- **Commitlint** - Validación de commits

---

##  Estructura del Proyecto

```
Front/
├── app/                          # Pages de Next.js
│   ├── canciones/               # Página de gestión de canciones
│   ├── dashboard/               # Dashboard principal
│   ├── favoritos/               # Gestión de favoritos
│   ├── usuarios/                # Gestión de usuarios
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página de inicio
├── components/                   # Componentes React
│   ├── canciones/               # Componentes de canciones
│   ├── dashboard/               # Componentes del dashboard
│   ├── favoritos/               # Componentes de favoritos
│   ├── layout/                  # Layout components
│   ├── ui/                      # Componentes UI reutilizables
│   └── usuarios/                # Componentes de usuarios
├── services/                     # Servicios API
│   ├── api.ts                   # Configuración Axios
│   ├── canciones.ts             # Servicios de canciones
│   ├── favoritos.ts             # Servicios de favoritos
│   └── usuarios.ts              # Servicios de usuarios
├── types/                        # Definiciones TypeScript
│   └── index.ts                 # Tipos principales
├── hooks/                        # Custom hooks
├── lib/                         # Utilidades
├── styles/                       # Estilos globales
├── .husky/                      # Git hooks
├── .env.local                   # Variables de entorno locales
├── .env.example                 # Ejemplo de variables de entorno
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración TypeScript
├── vitest.config.ts             # Configuración Vitest
├── commitlint.config.js         # Configuración Commitlint
└── .lintstagedrc.js             # Configuración lint-staged
```

---

##  Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 20+** - [Descargar](https://nodejs.org/)
- **PNPM** - Gestor de paquetes (se instala con: `npm install -g pnpm`)
- **Git** - Control de versiones
- **API Backend** - La API de música debe estar corriendo en `http://localhost:8081`

---

##  Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd lpa2-taller4/Front
```

### 2. Instalar Node.js 20 (si no lo tienes)

```bash
# Configurar repositorio Node.js 20
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js y npm
sudo apt install nodejs -y

# Verificar instalación
node --version  # Debe mostrar v20.x.x
npm --version
```

### 3. Instalar PNPM

```bash
sudo npm install -g pnpm

# Verificar instalación
pnpm --version
```

### 4. Instalar dependencias

```bash
pnpm install
```

### 5. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local si tu API está en otra URL
# Por defecto apunta a: http://localhost:8081/api
```

**Contenido de `.env.local`:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081/api
```

---

##  Ejecutar la Aplicación

### Modo Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Modo Producción

```bash
# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

---

##  Testing

### Ejecutar todos los tests

```bash
pnpm test
```

### Ejecutar tests en modo watch

```bash
pnpm test -- --watch
```

### Ejecutar tests con UI

```bash
pnpm test:ui
```

### Generar reporte de cobertura

```bash
pnpm test:coverage
```

---

##  Calidad de Código

### Linting

```bash
# Verificar errores de linting
pnpm lint

# Corregir errores automáticamente
pnpm lint:fix
```

### Formateo con Prettier

```bash
# Verificar formato
pnpm format:check

# Formatear código
pnpm format
```

---

##  Git Hooks y Commits

Este proyecto utiliza **Conventional Commits** para mantener un historial de commits limpio y semántico.

### Formato de commits

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[pie opcional]
```

**Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan el código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en el proceso de build o herramientas
- `perf`: Mejoras de rendimiento

**Ejemplos:**

```bash
git commit -m "feat(usuarios): agregar formulario de creación de usuarios"
git commit -m "fix(canciones): corregir validación de duración"
git commit -m "docs(readme): actualizar instrucciones de instalación"
```

### Pre-commit Hooks

Antes de cada commit se ejecutan automáticamente:
-  ESLint (corrección automática)
-  Prettier (formateo de código)
-  Validación de sintaxis TypeScript

### Commit-msg Hook

Valida que el mensaje de commit siga el formato de Conventional Commits.

---

##  Arquitectura

### Patrón de Diseño

El proyecto sigue una arquitectura **modular** y **basada en componentes** con las siguientes capas:

1. **Presentación (Components)**: Componentes React reutilizables
2. **Lógica de Negocio (Hooks)**: Custom hooks para lógica compartida
3. **Servicios (Services)**: Comunicación con la API
4. **Tipos (Types)**: Definiciones TypeScript para type-safety

### Flujo de Datos

```
Usuario → Componente → Hook → Servicio → API Backend
                ↓
          Estado Local
                ↓
          Re-renderizado
```

### Manejo de Estado

- **Estado Local**: React useState para estado de componentes
- **Formularios**: React Hook Form + Zod para validación
- **Estado Global**: Context API (si es necesario)

### Manejo de Errores

Todas las llamadas a la API están envueltas en try-catch con:
- Manejo de errores por código HTTP (400, 404, 422, 500)
- Mensajes descriptivos al usuario
- Toast notifications para feedback visual
- Logging en consola para debugging

---

##  Funcionalidades Principales

### 1. Dashboard

- Estadísticas generales (total de usuarios, canciones, favoritos)
- Top 5 canciones más populares
- Top 5 artistas más populares
- Actividad reciente

### 2. Gestión de Usuarios

- **Listar**: Tabla con todos los usuarios registrados
- **Crear**: Formulario con validaciones (nombre, correo único)
- **Editar**: Actualizar información del usuario
- **Eliminar**: Con confirmación previa
- **Ver Favoritos**: Navegación a favoritos del usuario

**Validaciones:**
- Nombre: obligatorio, min 1 caracter, max 100
- Correo: formato email válido, único en el sistema

### 3. Gestión de Canciones

- **Listar**: Tabla con todas las canciones
- **Filtros**: Búsqueda por artista y género en tiempo real
- **Crear**: Formulario completo con validaciones
- **Editar**: Actualizar información de la canción
- **Eliminar**: Con confirmación previa
- **Formateo**: Duración mostrada en formato mm:ss

**Validaciones:**
- Título: obligatorio, max 200 caracteres
- Artista: obligatorio, max 100 caracteres
- Duración: número positivo (en segundos)
- Año: entre 1900 y 2100 (opcional)
- Álbum, Género: opcionales

### 4. Sistema de Favoritos

- **Ver Favoritos por Usuario**: Selector de usuario + grid de canciones
- **Agregar Favorito**: Modal para seleccionar usuario y canción
- **Eliminar Favorito**: Botón en cada tarjeta de canción
- **Prevención de Duplicados**: No permite agregar la misma canción dos veces

---

##  Diseño Visual

### Paleta de Colores

- **Primary**: Orange-500 (#F97316) - Acción principal
- **Secondary**: Violet-500 (#8B5CF6) - Acción secundaria
- **Accent**: Blue-500 (#3B82F6) - Énfasis
- **Success**: Green-500 (#10B981) - Éxito
- **Error**: Red-500 (#EF4444) - Error
- **Background**: Gray-50 (#F9FAFB) - Fondo
- **Text**: Gray-900 (#111827) - Texto

### Componentes UI

Todos los componentes UI siguen el sistema de diseño de **shadcn/ui** con:
- Variantes consistentes
- Estados hover/focus/disabled
- Animaciones suaves
- Accesibilidad WCAG 2.1

---

##  Integración con la API

### Configuración

La URL base de la API se configura en `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081/api
```

### Endpoints Consumidos

#### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios/{id}` - Obtener usuario
- `PATCH /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

#### Canciones
- `GET /api/canciones` - Listar canciones
- `POST /api/canciones` - Crear canción
- `GET /api/canciones/{id}` - Obtener canción
- `PATCH /api/canciones/{id}` - Actualizar canción
- `DELETE /api/canciones/{id}` - Eliminar canción

#### Favoritos
- `GET /api/favoritos` - Listar favoritos
- `POST /api/favoritos` - Agregar favorito
- `GET /api/favoritos/usuario/{id}` - Favoritos de usuario
- `DELETE /api/favoritos/{id}` - Eliminar favorito
- `DELETE /api/favoritos/usuario/{userId}/cancion/{cancionId}` - Eliminar favorito específico

---

##  Responsividad

La aplicación está optimizada para:

- **Desktop**: 1920px+
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

Utiliza breakpoints de Tailwind CSS:
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

##  Troubleshooting

### La API no responde

```bash
# Verificar que la API esté corriendo
curl http://localhost:8081/api/usuarios

# Si no funciona, iniciar la API backend
cd ../lpa2-taller3
pnpm dev
```

### Errores de CORS

Asegúrate de que el backend tenga configurado CORS para aceptar peticiones desde `http://localhost:3000`.

### Puerto 3000 ocupado

```bash
# Cambiar el puerto en el comando dev
pnpm dev -- -p 3001
```

### Errores de tipo TypeScript

```bash
# Limpiar cache y reinstalar
rm -rf .next node_modules
pnpm install
```

---

##  Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Desplegar
vercel
```

### Otros servicios

El proyecto es compatible con:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **Digital Ocean App Platform**

---

##  Autor

**Jhon Salcedo**
- Email: salcedo.lenis@gmail.com
- GitHub: [@jasl89](https://github.com/jasl89)

---

##  Licencia

Este proyecto fue desarrollado como parte del **LPA2 - Taller 4** y es de uso educativo.

---

##  Agradecimientos

- **v0.app** - Por la generación inicial del código
- **shadcn/ui** - Por los componentes UI
- **Vercel** - Por Next.js y el hosting
- **Tailwind CSS** - Por el sistema de diseño

---

##  Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)
- [Conventional Commits](https://www.conventionalcommits.org)

---

**¡Happy Coding! **
