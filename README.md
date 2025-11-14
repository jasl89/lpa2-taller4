# Frontend para el API de Música

**Autor:** Jhon Salcedo ([@jasl89](https://github.com/jasl89))  
**Email:** salcedo.lenis@gmail.com

## Descripción

Frontend profesional para el API de Música desarrollado con Next.js 16, React 19, TypeScript y Tailwind CSS 4. Proporciona una interfaz moderna y responsiva para la gestión de usuarios, canciones y favoritos.
## Tecnologías

- **Next.js 16.0.3** - Framework React con Turbopack
- **React 19.2.0** - Biblioteca UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4.1.17** - Estilos utility-first
- **Axios** - Cliente HTTP
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast
- **Vitest** - Framework de testing

## Características

- Dashboard con estadísticas y gráficos
- Gestión completa de usuarios (CRUD)
- Administración de canciones
- Sistema de favoritos por usuario
- Diseño responsivo con gradientes modernos
- Validación de formularios
- Manejo de errores profesional
- Animaciones suaves
- Testing unitario

## Prerrequisitos

- Node.js 18+ instalado
- PNPM (gestor de paquetes)
- API del backend corriendo en `http://localhost:8081/api`

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/jasl89/lpa2-taller4.git
cd lpa2-taller4/Front
```

2. Instalar PNPM (si no lo tienes):
```bash
sudo npm install -g pnpm
```

3. Instalar dependencias:
```bash
pnpm install
```

4. Configurar variables de entorno (opcional):
```bash
# Crear archivo .env.local
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

## Ejecución

### Modo desarrollo
```bash
pnpm dev
```
Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

### Modo producción
```bash
pnpm build
pnpm start
```

## Scripts disponibles

- `pnpm dev` - Inicia servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia servidor de producción
- `pnpm lint` - Ejecuta el linter
- `pnpm format` - Formatea el código con Prettier
- `pnpm test` - Ejecuta los tests

## Estructura del proyecto

```
Front/
├── app/                    # Páginas y layouts de Next.js
├── components/             # Componentes React
│   ├── layout/            # Layout (Sidebar, Header)
│   ├── pages/             # Componentes de páginas
│   ├── ui/                # Componentes UI reutilizables
│   ├── usuarios/          # Componentes específicos de usuarios
│   ├── canciones/         # Componentes específicos de canciones
│   └── favoritos/         # Componentes específicos de favoritos
├── lib/                   # Utilidades y configuración
│   ├── api-client.ts      # Cliente Axios configurado
│   └── utils.ts           # Funciones auxiliares
├── services/              # Servicios de API
│   ├── usuarios.ts
│   ├── canciones.ts
│   └── favoritos.ts
├── types/                 # Definiciones TypeScript
└── __tests__/            # Tests unitarios
```

## Configuración de Git Hooks

El proyecto usa Husky para ejecutar hooks de git automáticamente:

- **pre-commit**: Ejecuta lint-staged (ESLint + Prettier)
- **commit-msg**: Valida formato de conventional commits

## Convenciones de commits

Este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato
- `refactor:` - Refactorización de código
- `test:` - Añadir o modificar tests
- `chore:` - Tareas de mantenimiento

## API Backend

El frontend espera que el backend esté corriendo en `http://localhost:8081/api` con los siguientes endpoints:

### Usuarios
- `GET /usuarios/` - Listar usuarios
- `POST /usuarios/` - Crear usuario
- `PUT /usuarios/{id}` - Actualizar usuario
- `DELETE /usuarios/{id}` - Eliminar usuario

### Canciones
- `GET /canciones/` - Listar canciones
- `POST /canciones/` - Crear canción
- `PUT /canciones/{id}` - Actualizar canción
- `DELETE /canciones/{id}` - Eliminar canción
- `GET /canciones/top` - Top canciones

### Favoritos
- `GET /favoritos/usuario/{usuario_id}` - Favoritos de usuario
- `POST /favoritos/` - Agregar favorito
- `DELETE /favoritos/{id}` - Eliminar favorito

## Licencia

MIT

## Autor

**Jhon Salcedo**
- GitHub: [@jasl89](https://github.com/jasl89)
- Email: salcedo.lenis@gmail.com

