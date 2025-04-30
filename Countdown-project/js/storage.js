/**
 * Save a timer to localStorage
 * @param {Object} timer - Timer object to save
 */
export function saveTimer(timer) {
  const timers = loadTimers();
  
  // Check if timer already exists, if so update it
  const existingTimerIndex = timers.findIndex(t => t.id === timer.id);
  
  if (existingTimerIndex >= 0) {
    timers[existingTimerIndex] = timer;
  } else {
    timers.push(timer);
  }
  
  // Save to localStorage
  localStorage.setItem('countdownTimers', JSON.stringify(timers));
}

/**
 * Load all timers from localStorage
 * @returns {Array} Array of timer objects
 */
export function loadTimers() {
  const timers = localStorage.getItem('countdownTimers');
  return timers ? JSON.parse(timers) : [];
}

/**
 * Remove a timer from localStorage
 * @param {string} timerId - ID of the timer to remove
 */
export function removeTimer(timerId) {
  const timers = loadTimers();
  const updatedTimers = timers.filter(timer => timer.id !== timerId);
  localStorage.setItem('countdownTimers', JSON.stringify(updatedTimers));
}

/**
 * Clear all timers from localStorage
 */
export function clearAllTimers() {
  localStorage.removeItem('countdownTimers');
}