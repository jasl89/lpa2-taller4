export interface Usuario {
  id: number
  nombre: string
  correo: string
  fecha_registro: string
}

export interface Cancion {
  id: number
  titulo: string
  artista: string
  album?: string
  duracion: number // segundos
  año?: number
  genero?: string
  fecha_creacion: string
}

export interface Favorito {
  id: number
  usuario_id: number
  cancion_id: number
  fecha_agregado: string
}

export interface FavoritoConDetalles extends Favorito {
  cancion: Cancion
}

export interface ApiResponse<T> {
  data: T
}

export interface ApiListResponse<T> {
  data: T[]
}

export interface CreateUsuarioRequest {
  nombre: string
  correo: string
}

export interface UpdateUsuarioRequest {
  nombre?: string
  correo?: string
}

export interface CreateCancionRequest {
  titulo: string
  artista: string
  album?: string
  duracion: number
  año?: number
  genero?: string
}

export interface UpdateCancionRequest {
  titulo?: string
  artista?: string
  album?: string
  duracion?: number
  año?: number
  genero?: string
}

export interface CreateFavoritoRequest {
  usuario_id: number
  cancion_id: number
}
