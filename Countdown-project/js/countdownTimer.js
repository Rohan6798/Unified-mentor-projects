/**
 * Creates a countdown timer for a specified target date
 * @param {number} targetDate - Target date in milliseconds
 * @returns {Object} Countdown methods
 */
export function createCountdown(targetDate) {
  return {
    /**
     * Get the time remaining until the target date
     * @returns {Object} Time remaining in days, hours, minutes, seconds
     */
    getTimeRemaining() {
      const now = new Date().getTime();
      let total = targetDate - now;
      
      // Ensure we don't go negative
      total = total < 0 ? 0 : total;
      
      // Calculate time components
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      
      return {
        total,
        days,
        hours,
        minutes,
        seconds
      };
    },
    
    /**
     * Check if the countdown has completed
     * @returns {boolean} True if the countdown is complete
     */
    isComplete() {
      return this.getTimeRemaining().total <= 0;
    }
  };
}

/**
 * Format a time element with leading zeros
 * @param {number} time - Time value to format
 * @returns {string} Formatted time string with leading zeros
 */
export function formatTimeElement(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

/**
 * Get a human-readable representation of the target date
 * @param {number} targetDate - Target date in milliseconds
 * @returns {string} Formatted date string
 */
export function formatTargetDate(targetDate) {
  const date = new Date(targetDate);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString(undefined, options);
}