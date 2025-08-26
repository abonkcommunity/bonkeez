
import React, { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-red-400 font-bold text-lg">Something went wrong</h3>
          </div>
          <p className="text-red-300 mb-4">
            This component encountered an error and couldn't render properly.
          </p>
          <details className="text-left bg-red-900/20 rounded p-3">
            <summary className="text-red-400 cursor-pointer mb-2">Error Details</summary>
            <pre className="text-red-300 text-sm overflow-auto">
              {this.state.error?.message || 'Unknown error'}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
