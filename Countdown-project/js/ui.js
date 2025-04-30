import { formatTargetDate, formatTimeElement } from './countdownTimer.js';

/**
 * Set up the timer display for a given timer
 * @param {Object} timer - Timer object to display
 */
export function setupTimerDisplay(timer) {
  const timerDisplay = document.getElementById('timer-display');
  
  // Clear any existing displays
  clearTimerDisplay();
  
  // Create timer display
  const timerHTML = `
    <div class="card">
      <h2 class="event-title">${timer.name}</h2>
      <p class="target-date">Counting down to: ${formatTargetDate(timer.targetDate)}</p>
      
      <div class="countdown" data-timer-id="${timer.id}">
        <div class="countdown-item">
          <div class="countdown-value" data-unit="days">${formatTimeElement(0)}</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" data-unit="hours">${formatTimeElement(0)}</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" data-unit="minutes">${formatTimeElement(0)}</div>
          <div class="countdown-label">Minutes</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value" data-unit="seconds">${formatTimeElement(0)}</div>
          <div class="countdown-label">Seconds</div>
        </div>
      </div>
      
      <div class="timer-actions">
        <button class="action-button delete" data-timer-id="${timer.id}">Delete</button>
      </div>
    </div>
  `;
  
  timerDisplay.innerHTML = timerHTML;
}

/**
 * Set up the saved timers list
 * @param {Array} timers - Array of timer objects
 */
export function setupSavedTimers(timers) {
  const savedTimersContainer = document.getElementById('saved-timers');
  
  if (!timers || timers.length === 0) {
    savedTimersContainer.innerHTML = '<p>No saved timers yet</p>';
    return;
  }
  
  const now = new Date().getTime();
  let timerCards = '';
  
  // Sort timers by creation date (newest first)
  timers.sort((a, b) => b.created - a.created);
  
  timers.forEach(timer => {
    const isExpired = timer.targetDate <= now;
    const timeLeft = getTimeLeftDisplay(timer.targetDate);
    
    timerCards += `
      <div class="card timer-card" data-timer-id="${timer.id}">
        <button class="delete-timer" aria-label="Delete timer">✕</button>
        <h3>${timer.name}</h3>
        <p>${formatTargetDate(timer.targetDate)}</p>
        <p class="time-remaining ${isExpired ? 'expired' : ''}" data-target-date="${timer.targetDate}">
          ${isExpired ? '⏰ Expired' : timeLeft}
        </p>
        <button class="action-button load-timer">Load Timer</button>
      </div>
    `;
  });
  
  savedTimersContainer.innerHTML = timerCards;
  
  // Update time remaining every second for all saved timers
  const updateTimeRemaining = () => {
    const timeElements = document.querySelectorAll('.time-remaining');
    timeElements.forEach(element => {
      const targetDate = parseInt(element.dataset.targetDate);
      const now = new Date().getTime();
      if (targetDate <= now) {
        element.textContent = '⏰ Expired';
        element.classList.add('expired');
      } else {
        element.textContent = getTimeLeftDisplay(targetDate);
      }
    });
  };
  
  // Start updating time remaining
  setInterval(updateTimeRemaining, 1000);
}

/**
 * Clear the timer display
 */
export function clearTimerDisplay() {
  const timerDisplay = document.getElementById('timer-display');
  
  // Clear any running intervals
  const countdownElements = document.querySelectorAll('.countdown');
  countdownElements.forEach(element => {
    const intervalId = element.dataset.intervalId;
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
  
  // Clear the display
  timerDisplay.innerHTML = '';
}

/**
 * Show a notification when a timer expires
 * @param {string} eventName - Name of the event that expired
 */
export function showNotification(eventName) {
  const container = document.getElementById('notifications-container');
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification expired';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-title">Timer Expired!</div>
      <div class="notification-message">${eventName} has ended</div>
    </div>
    <button class="notification-close" aria-label="Close notification">✕</button>
  `;
  
  // Add click handler to close button
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Add to container
  container.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/**
 * Get a simple display of time left
 * @param {number} targetDate - Target date in milliseconds
 * @returns {string} Simple time left display
 */
function getTimeLeftDisplay(targetDate) {
  const now = new Date().getTime();
  const total = targetDate - now;
  
  if (total <= 0) {
    return 'Expired';
  }
  
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  
  let timeDisplay = '';
  
  if (days > 0) {
    timeDisplay += `${days}d `;
  }
  
  timeDisplay += `${formatTimeElement(hours)}h ${formatTimeElement(minutes)}m ${formatTimeElement(seconds)}s left`;
  
  return timeDisplay;
}