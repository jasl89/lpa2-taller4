'use client'

import React, { ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center max-w-md px-6 py-8 bg-white rounded-lg shadow">
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
            <p className="text-gray-600 mb-6">{this.state.error?.message || 'Ocurrió un error inesperado'}</p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <RefreshCw size={18} />
              Recargar página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
