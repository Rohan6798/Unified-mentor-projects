interface LogEvent {
  type: string;
  userId: string;
  userRole: string | null;
  timestamp?: number;
  details: Record<string, any>;
}

// In-memory log storage (in a real app, this would use Firebase Firestore)
let logs: LogEvent[] = [];

export function logEvent(event: LogEvent): void {
  const logEntry = {
    ...event,
    timestamp: Date.now(),
  };
  
  // Store the log entry
  logs.push(logEntry);
  
  // Also log to console for development
  console.log(`[LOG] ${event.type}:`, logEntry);
  
  // In a real app, we would send this to Firebase Firestore
  // Example: firestore.collection('logs').add(logEntry);
}

export function getLogs(): LogEvent[] {
  // Return a copy of the logs to avoid mutation
  return [...logs];
}

export function clearLogs(): void {
  logs = [];
}

export function filterLogs(predicate: (log: LogEvent) => boolean): LogEvent[] {
  return logs.filter(predicate);
}