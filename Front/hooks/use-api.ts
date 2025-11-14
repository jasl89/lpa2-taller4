import { useState, useCallback } from 'react'
import { toast } from 'sonner'

interface UseApiOptions {
  showError?: boolean
  showSuccess?: boolean
  successMessage?: string
}

export function useApi<T>(
  asyncFunction: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const { showError = true, showSuccess = false, successMessage = '' } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await asyncFunction()
      setData(result)
      if (showSuccess) {
        toast.success(successMessage || 'Operación exitosa')
      }
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error desconocido'
      setError(errorMessage)
      if (showError) {
        toast.error(errorMessage)
      }
      throw err
    } finally {
      setLoading(false)
    }
  }, [asyncFunction, showError, showSuccess, successMessage])

  return { data, loading, error, execute }
}
