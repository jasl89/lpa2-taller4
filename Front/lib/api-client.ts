import axios, { AxiosInstance, AxiosError } from 'axios'
import { toast } from 'sonner'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081/api'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const data = error.response?.data as any

    let errorMessage = 'Error del servidor. Intenta nuevamente.'

    if (status === 400) {
      errorMessage = data?.message || 'Datos inválidos'
    } else if (status === 404) {
      errorMessage = 'No encontrado'
    } else if (status === 422) {
      errorMessage = data?.message || 'Validación fallida'
    } else if (status === 500) {
      errorMessage = 'Error del servidor. Intenta nuevamente.'
    }

    console.error('[API Error]', { status, message: errorMessage, data })

    return Promise.reject({
      status,
      message: errorMessage,
      data,
    })
  }
)

export default apiClient
