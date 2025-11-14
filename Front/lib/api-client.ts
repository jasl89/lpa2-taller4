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
      errorMessage = data?.detail || data?.message || 'Datos inválidos o duplicados'
    } else if (status === 404) {
      errorMessage = data?.detail || 'Recurso no encontrado'
    } else if (status === 422) {
      // Handle FastAPI validation errors
      if (data?.detail && Array.isArray(data.detail)) {
        const errors = data.detail.map((err: any) => 
          `${err.loc?.join(' → ') || 'Campo'}: ${err.msg}`
        ).join(', ')
        errorMessage = errors
      } else {
        errorMessage = data?.detail || data?.message || 'Error de validación'
      }
    } else if (status === 500) {
      errorMessage = 'Error interno del servidor'
    } else if (!error.response) {
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.'
    }

    console.error('[API Error]', { status, message: errorMessage, data })
    
    // Show toast notification
    toast.error(errorMessage)

    return Promise.reject({
      status,
      message: errorMessage,
      data,
    })
  }
)

export default apiClient
