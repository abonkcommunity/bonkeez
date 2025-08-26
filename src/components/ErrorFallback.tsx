
import React from 'react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 m-4">
      <h2 className="text-red-400 text-lg font-bold mb-2">Something went wrong</h2>
      <details className="mb-4">
        <summary className="text-red-300 cursor-pointer">Error details</summary>
        <pre className="text-red-200 text-sm mt-2 whitespace-pre-wrap">
          {error.message}
        </pre>
      </details>
      <button
        onClick={resetErrorBoundary}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
