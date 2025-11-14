import apiClient from '@/lib/api-client'
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, ApiResponse, ApiListResponse } from '@/types'

export const usuariosService = {
  getAll: async (skip = 0, limit = 10) => {
    const response = await apiClient.get<ApiListResponse<Usuario>>('/usuarios', {
      params: { skip, limit },
    })
    return response.data.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Usuario>(`/usuarios/${id}`)
    return response.data
  },

  create: async (data: CreateUsuarioRequest) => {
    const response = await apiClient.post<Usuario>('/usuarios', data)
    return response.data
  },

  update: async (id: number, data: UpdateUsuarioRequest) => {
    const response = await apiClient.patch<Usuario>(`/usuarios/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/usuarios/${id}`)
  },
}
