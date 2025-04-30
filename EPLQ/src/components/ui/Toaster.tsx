import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { cn } from '../../utils/cn';

export function Toast({ notification, onDismiss }: { 
  notification: { id: string; type: string; title: string; message: string }; 
  onDismiss: () => void 
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getToastClasses = () => {
    const baseClasses = "pointer-events-auto flex w-full max-w-md rounded-lg shadow-lg ring-1 ring-black ring-opacity-5";
    
    switch (notification.type) {
      case 'success':
        return cn(baseClasses, "bg-success text-success-foreground");
      case 'error':
        return cn(baseClasses, "bg-destructive text-destructive-foreground");
      case 'warning':
        return cn(baseClasses, "bg-warning text-warning-foreground");
      default:
        return cn(baseClasses, "bg-primary text-primary-foreground");
    }
  };

  return (
    <div className={getToastClasses()}>
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{notification.title}</p>
            <p className="mt-1 text-sm opacity-90">{notification.message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-600">
        <button
          onClick={onDismiss}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function Toaster() {
  const { notifications, dismissNotification } = useNotification();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end space-y-4 pointer-events-none p-6">
      {notifications.map((toast) => (
        <div key={toast.id} className="animate-[slideInRight_0.35s_ease-out_forwards]">
          <Toast 
            notification={toast} 
            onDismiss={() => dismissNotification(toast.id)} 
          />
        </div>
      ))}
    </div>
  );
}