# PROMPT PARA V0.APP - API DE MÚSICA

## Copia y pega este prompt completo en v0.app

---

Eres un ingeniero de frontend senior especializado en React, TypeScript y Tailwind CSS. Tu tarea es diseñar interfaces web responsivas y eficientes que consuman APIs existentes.

Crea un frontend web completo y profesional que interactúe con la siguiente API de Música:

## API ENDPOINTS

**Base URL:** `http://localhost:8081/api`

### USUARIOS (`/api/usuarios`)

```json
{
  "endpoint": "http://localhost:8081/api/usuarios",
  "método": "GET",
  "body_request": {},
  "body_response": {
    "data": [
      {
        "id": 1,
        "nombre": "María García",
        "correo": "maria.garcia@email.com",
        "fecha_registro": "2025-11-14T10:00:00Z"
      }
    ]
  },
  "errores": {
    "404": "Usuario no encontrado",
    "500": "Error del servidor"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/usuarios",
  "método": "POST",
  "body_request": {
    "nombre": "Juan Pérez",
    "correo": "juan.perez@email.com"
  },
  "body_response": {
    "id": 2,
    "nombre": "Juan Pérez",
    "correo": "juan.perez@email.com",
    "fecha_registro": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "400": "Correo duplicado o datos inválidos",
    "422": "Validación fallida: correo debe ser email válido"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/usuarios/{usuario_id}",
  "método": "GET",
  "body_request": {},
  "body_response": {
    "id": 1,
    "nombre": "María García",
    "correo": "maria.garcia@email.com",
    "fecha_registro": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "404": "Usuario no encontrado"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/usuarios/{usuario_id}",
  "método": "PATCH",
  "body_request": {
    "nombre": "María García Actualizada",
    "correo": "maria.nueva@email.com"
  },
  "body_response": {
    "id": 1,
    "nombre": "María García Actualizada",
    "correo": "maria.nueva@email.com",
    "fecha_registro": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "400": "Correo duplicado",
    "404": "Usuario no encontrado",
    "422": "Validación fallida"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/usuarios/{usuario_id}",
  "método": "DELETE",
  "body_request": {},
  "body_response": null,
  "status": 204,
  "errores": {
    "404": "Usuario no encontrado"
  }
}
```

### CANCIONES (`/api/canciones`)

```json
{
  "endpoint": "http://localhost:8081/api/canciones",
  "método": "GET",
  "query_params": {
    "skip": 0,
    "limit": 10,
    "artista": "Carlos Vives",
    "genero": "Vallenato"
  },
  "body_request": {},
  "body_response": {
    "data": [
      {
        "id": 1,
        "titulo": "La Tierra del Olvido",
        "artista": "Carlos Vives",
        "album": "La Tierra del Olvido",
        "duracion": 245,
        "año": 1995,
        "genero": "Vallenato",
        "fecha_creacion": "2025-11-14T10:00:00Z"
      }
    ]
  },
  "errores": {
    "500": "Error del servidor"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/canciones",
  "método": "POST",
  "body_request": {
    "titulo": "Nueva Canción",
    "artista": "Artista Nuevo",
    "album": "Album Opcional",
    "duracion": 180,
    "año": 2025,
    "genero": "Pop"
  },
  "body_response": {
    "id": 11,
    "titulo": "Nueva Canción",
    "artista": "Artista Nuevo",
    "album": "Album Opcional",
    "duracion": 180,
    "año": 2025,
    "genero": "Pop",
    "fecha_creacion": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "422": "Validación fallida: duracion debe ser mayor a 0"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/canciones/{cancion_id}",
  "método": "GET",
  "body_request": {},
  "body_response": {
    "id": 1,
    "titulo": "La Tierra del Olvido",
    "artista": "Carlos Vives",
    "album": "La Tierra del Olvido",
    "duracion": 245,
    "año": 1995,
    "genero": "Vallenato",
    "fecha_creacion": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "404": "Canción no encontrada"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/canciones/{cancion_id}",
  "método": "PATCH",
  "body_request": {
    "titulo": "Título Actualizado",
    "duracion": 200
  },
  "body_response": {
    "id": 1,
    "titulo": "Título Actualizado",
    "artista": "Carlos Vives",
    "album": "La Tierra del Olvido",
    "duracion": 200,
    "año": 1995,
    "genero": "Vallenato",
    "fecha_creacion": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "404": "Canción no encontrada",
    "422": "Validación fallida"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/canciones/{cancion_id}",
  "método": "DELETE",
  "body_request": {},
  "body_response": null,
  "status": 204,
  "errores": {
    "404": "Canción no encontrada"
  }
}
```

### FAVORITOS (`/api/favoritos`)

```json
{
  "endpoint": "http://localhost:8081/api/favoritos",
  "método": "GET",
  "query_params": {
    "skip": 0,
    "limit": 10
  },
  "body_request": {},
  "body_response": {
    "data": [
      {
        "id": 1,
        "usuario_id": 1,
        "cancion_id": 1,
        "fecha_agregado": "2025-11-14T10:00:00Z"
      }
    ]
  },
  "errores": {
    "500": "Error del servidor"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/favoritos",
  "método": "POST",
  "body_request": {
    "usuario_id": 1,
    "cancion_id": 2
  },
  "body_response": {
    "id": 2,
    "usuario_id": 1,
    "cancion_id": 2,
    "fecha_agregado": "2025-11-14T10:00:00Z"
  },
  "errores": {
    "400": "Favorito duplicado o usuario/canción no existe",
    "404": "Usuario o canción no encontrados"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/favoritos/usuario/{usuario_id}",
  "método": "GET",
  "body_request": {},
  "body_response": {
    "data": [
      {
        "id": 1,
        "usuario_id": 1,
        "cancion_id": 1,
        "fecha_agregado": "2025-11-14T10:00:00Z",
        "cancion": {
          "id": 1,
          "titulo": "La Tierra del Olvido",
          "artista": "Carlos Vives",
          "album": "La Tierra del Olvido",
          "duracion": 245,
          "año": 1995,
          "genero": "Vallenato",
          "fecha_creacion": "2025-11-14T10:00:00Z"
        }
      }
    ]
  },
  "errores": {
    "404": "Usuario no encontrado"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/favoritos/{favorito_id}",
  "método": "DELETE",
  "body_request": {},
  "body_response": null,
  "status": 204,
  "errores": {
    "404": "Favorito no encontrado"
  }
}
```

```json
{
  "endpoint": "http://localhost:8081/api/favoritos/usuario/{usuario_id}/cancion/{cancion_id}",
  "método": "DELETE",
  "body_request": {},
  "body_response": null,
  "status": 204,
  "errores": {
    "404": "Favorito no encontrado"
  }
}
```

## REQUISITOS FUNCIONALES

### 1. Interfaz de Usuario

**Diseño general:**
- Aplicación de una sola página (SPA) con navegación fluida
- Tema cálido y musical con paleta de colores vibrantes (naranjas, morados, azules)
- Header fijo con logo "🎵 API de Música" y menú de navegación
- Footer simple con información de autor
- Diseño completamente responsivo (mobile-first)
- Iconos de Lucide React para botones y acciones

**Pantallas obligatorias:**

#### A) Dashboard / Home
- Estadísticas en cards: Total de usuarios, canciones y favoritos
- Top 5 canciones más añadidas a favoritos (con contador)
- Top 5 artistas más populares
- Actividad reciente (últimos favoritos agregados)
- Diseño en grid responsivo

#### B) Gestión de Usuarios (CRUD completo)
- Tabla con columnas: ID, Nombre, Correo, Fecha registro, Acciones
- Botón "Nuevo Usuario" que abre modal/formulario
- Formulario con validaciones en tiempo real:
  - Nombre: obligatorio, min 1 caracter
  - Correo: formato email válido, único
- Botones de acción por fila: Editar, Eliminar, Ver favoritos
- Modal de confirmación para eliminar
- Paginación si hay más de 10 registros

#### C) Gestión de Canciones (CRUD completo)
- Tabla con columnas: ID, Título, Artista, Álbum, Duración, Año, Género, Acciones
- Filtros: por artista y género (búsqueda en tiempo real)
- Botón "Nueva Canción" que abre modal/formulario
- Formulario con validaciones:
  - Título: obligatorio
  - Artista: obligatorio
  - Duración: número positivo (mostrar en formato mm:ss)
  - Año: entre 1900-2100 (opcional)
  - Álbum, género: opcionales
- Botones de acción: Editar, Eliminar, Ver quién la tiene en favoritos
- Paginación

#### D) Favoritos por Usuario
- Selector de usuario (dropdown)
- Grid de cards con las canciones favoritas del usuario seleccionado
- Cada card muestra: portada placeholder, título, artista, álbum, duración
- Botón para eliminar de favoritos
- Botón para agregar nueva canción a favoritos del usuario
- Mensaje amigable si no tiene favoritos

#### E) Agregar a Favoritos
- Modal o página con dos selectores:
  - Usuario (nombre + correo)
  - Canción (título + artista)
- Validar que no exista duplicado antes de enviar
- Botón "Agregar a Favoritos"

### 2. Estados de carga/éxito/error

**Estados de carga:**
- Skeleton loaders en tablas y cards mientras carga
- Spinners en botones durante acciones (guardar, eliminar)
- Indicador global de carga en el header

**Estados de éxito:**
- Toast notifications verdes en esquina superior derecha:
  - "Usuario creado exitosamente"
  - "Canción actualizada"
  - "Favorito eliminado"
- Auto-dismissable después de 3 segundos
- Icono de check

**Estados de error:**
- Toast notifications rojas con mensaje descriptivo:
  - Mostrar mensaje del backend si está disponible
  - Ejemplos: "El correo ya está registrado", "Canción no encontrada"
- Validaciones en formularios con mensajes debajo de cada campo
- Mensaje de error global si falla la conexión con la API

**Estado vacío:**
- Ilustraciones o iconos grandes con mensaje amigable:
  - "No hay canciones aún. ¡Agrega la primera!"
  - "Este usuario no tiene favoritos"
- Botón CTA para crear el primer elemento

### 3. Comportamientos interactivos

**Validación en tiempo real:**
- Validar formato de email mientras el usuario escribe
- Mostrar indicador visual (borde rojo/verde) en inputs
- Deshabilitar botón de envío si hay errores de validación
- Contador de caracteres en campos con límite

**Paginación:**
- Botones "Anterior" y "Siguiente"
- Mostrar "Mostrando 1-10 de 45"
- Cargar datos al cambiar de página

**Búsqueda/Filtros:**
- Debounce de 500ms en búsquedas
- Limpiar filtros con botón "Reset"
- Actualizar resultados automáticamente

**Confirmaciones:**
- Modal de confirmación antes de eliminar con botones "Cancelar" y "Eliminar"
- Texto claro: "¿Estás seguro de eliminar a [Nombre]?"

**Ordenamiento:**
- Permitir ordenar tabla de canciones por: título, artista, año, duración
- Indicador visual de columna activa y dirección (asc/desc)

### 4. Lógica de integración

**Manejo de errores robusto:**
- Try-catch en todas las llamadas API
- Reintentar automáticamente en errores 5xx (máx 2 reintentos)
- Logging de errores en consola para debug
- Mostrar mensajes amigables al usuario según código de error:
  - 400: mostrar mensaje del backend
  - 404: "No encontrado"
  - 422: mostrar errores de validación específicos
  - 500: "Error del servidor. Intenta nuevamente."

**Optimización de rendimiento:**
- Implementar cache de peticiones GET (SWR o React Query)
- Revalidar cache después de mutaciones (POST, PATCH, DELETE)
- Lazy loading de componentes pesados
- Debounce en búsquedas y filtros
- Memoización de listas grandes

**Validaciones de datos necesarias:**
- Frontend valida antes de enviar al backend
- Validaciones:
  - Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Nombre: no vacío, max 100 caracteres
  - Duración: número entero positivo
  - Año: entre 1900 y 2100
  - No permitir espacios en blanco al inicio/fin
- Sanitizar datos antes de mostrar (escapar HTML si es necesario)

**Gestión de estado:**
- Estado local para formularios
- Estado global para usuario autenticado (si aplica)
- Sincronización automática después de cambios

## REQUISITOS TÉCNICOS

**Stack obligatorio:**
- React 18+
- TypeScript
- Tailwind CSS
- Axios para peticiones HTTP
- React Router para navegación
- Lucide React para iconos
- SWR o React Query para cache (recomendado)

**Configuración de API:**
- Variable de entorno para BASE_URL
- Archivo `.env.example` con:
  ```
  VITE_API_BASE_URL=http://localhost:8081/api
  ```
- Interceptores de Axios para manejo global de errores

**Estructura de carpetas sugerida:**
```
src/
├── components/
│   ├── usuarios/
│   ├── canciones/
│   ├── favoritos/
│   └── common/ (Toast, Modal, Loader)
├── pages/
│   ├── Dashboard.tsx
│   ├── Usuarios.tsx
│   ├── Canciones.tsx
│   └── Favoritos.tsx
├── services/
│   ├── api.ts
│   ├── usuarios.ts
│   ├── canciones.ts
│   └── favoritos.ts
├── types/
│   └── index.ts
├── hooks/
│   └── useFetch.ts
└── utils/
    └── formatters.ts
```

**Tipos TypeScript necesarios:**
```typescript
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fecha_registro: string;
}

interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  album?: string;
  duracion: number; // segundos
  año?: number;
  genero?: string;
  fecha_creacion: string;
}

interface Favorito {
  id: number;
  usuario_id: number;
  cancion_id: number;
  fecha_agregado: string;
}

interface FavoritoConDetalles extends Favorito {
  cancion: Cancion;
}
```

**Funciones helper necesarias:**
- `formatDuration(seconds: number): string` → "3:45"
- `formatDate(isoString: string): string` → "14/11/2025"
- `validateEmail(email: string): boolean`

## DISEÑO VISUAL

**Paleta de colores:**
- Primary: `#F97316` (orange-500)
- Secondary: `#8B5CF6` (violet-500)
- Accent: `#3B82F6` (blue-500)
- Success: `#10B981` (green-500)
- Error: `#EF4444` (red-500)
- Background: `#F9FAFB` (gray-50)
- Text: `#111827` (gray-900)

**Tipografía:**
- Font: Inter o system font stack
- Headings: font-bold
- Body: font-normal

**Espaciado:**
- Contenedores principales: `max-w-7xl mx-auto px-4`
- Cards: `p-6 rounded-lg shadow-md`
- Botones: `px-4 py-2 rounded-md`

**Animaciones:**
- Transiciones suaves: `transition-all duration-200`
- Hover effects en botones y cards
- Fade in/out para modales y toasts

## ENTREGABLES

1. **Aplicación completa funcional** con todas las pantallas implementadas
2. **Código limpio** y comentado en partes complejas
3. **Manejo robusto de errores** en todas las interacciones
4. **Diseño responsivo** verificado en mobile y desktop
5. **README.md** con:
   - Instrucciones de instalación
   - Cómo configurar las variables de entorno
   - Cómo ejecutar en desarrollo
   - Descripción de la arquitectura
6. **package.json** con todos los scripts necesarios

---

**NOTAS IMPORTANTES:**
- La API ya tiene datos de ejemplo (10 canciones colombianas y 5 usuarios)
- Implementar manejo de duplicados (no permitir mismo favorito dos veces)
- Formatear duración de canciones a formato mm:ss para mejor UX
- Incluir mensajes de confirmación antes de eliminar
- Mantener el código DRY (Don't Repeat Yourself)
- Priorizar la experiencia de usuario

**GENERA AHORA UN FRONTEND COMPLETO, PROFESIONAL Y LISTO PARA PRODUCCIÓN** 🎵
