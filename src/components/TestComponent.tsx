
import React from 'react'

const TestComponent = () => {
  console.log('🧪 TestComponent rendering...')
  
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-black mb-4">
          🧪 Test Component Rendered Successfully
        </h1>
        <p className="text-gray-700">
          If you can see this text, React and basic Tailwind are working.
        </p>
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <p className="text-blue-800">
            Tailwind utility classes are processing correctly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestComponent
