import apiClient from '@/lib/api-client'
import { Favorito, FavoritoConDetalles, CreateFavoritoRequest, ApiListResponse } from '@/types'

export const favoritosService = {
  getAll: async (skip = 0, limit = 10) => {
    const response = await apiClient.get<Favorito[]>('/favoritos/', {
      params: { skip, limit },
    })
    return response.data
  },

  getByUsuario: async (usuarioId: number) => {
    const response = await apiClient.get<FavoritoConDetalles[]>(`/favoritos/usuario/${usuarioId}/`)
    return response.data
  },

  create: async (data: CreateFavoritoRequest) => {
    const response = await apiClient.post<Favorito>('/favoritos/', data)
    return response.data
  },

  delete: async (favoritoId: number) => {
    await apiClient.delete(`/favoritos/${favoritoId}/`)
  },

  deleteByUsuarioCancion: async (usuarioId: number, cancionId: number) => {
    await apiClient.delete(`/favoritos/usuario/${usuarioId}/cancion/${cancionId}/`)
  },
}
