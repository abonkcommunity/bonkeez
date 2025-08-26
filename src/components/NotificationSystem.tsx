import React, { useState, useEffect } from 'react'
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { createPortal } from 'react-dom/client'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  timestamp: Date
}

interface NotificationSystemProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onRemove }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default: return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-400/30 bg-green-400/10'
      case 'error': return 'border-red-400/30 bg-red-400/10'
      case 'warning': return 'border-yellow-400/30 bg-yellow-400/10'
      default: return 'border-blue-400/30 bg-blue-400/10'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getColors(notification.type)} border rounded-lg p-4 backdrop-blur-sm animate-slide-in`}
        >
          <div className="flex items-start space-x-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">{notification.title}</h4>
              <p className="text-slate-300 text-xs mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: Notification['type'], title: string, message: string) => {
    const id = Date.now().toString()
    const notification: Notification = {
      id,
      type,
      title,
      message,
      timestamp: new Date()
    }

    setNotifications(prev => [...prev, notification])

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}

export default NotificationSystem