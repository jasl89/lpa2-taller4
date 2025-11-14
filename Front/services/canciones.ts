import apiClient from '@/lib/api-client'
import { Cancion, CreateCancionRequest, UpdateCancionRequest, ApiListResponse } from '@/types'

export const cancionesService = {
  getAll: async (skip = 0, limit = 10, artista?: string, genero?: string) => {
    const response = await apiClient.get<ApiListResponse<Cancion>>('/canciones/', {
      params: { skip, limit, artista, genero },
    })
    return response.data.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Cancion>(`/canciones/${id}/`)
    return response.data
  },

  create: async (data: CreateCancionRequest) => {
    const response = await apiClient.post<Cancion>('/canciones/', data)
    return response.data
  },

  update: async (id: number, data: UpdateCancionRequest) => {
    const response = await apiClient.patch<Cancion>(`/canciones/${id}/`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/canciones/${id}/`)
  },
}
