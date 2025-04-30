import { createCountdown, formatTimeElement } from './countdownTimer.js';
import { saveTimer, loadTimers, removeTimer } from './storage.js';
import { setupTimerDisplay, setupSavedTimers, clearTimerDisplay, showNotification } from './ui.js';

// DOM Elements
const countdownForm = document.getElementById('countdown-form');
const timerDisplay = document.getElementById('timer-display');
const savedTimersContainer = document.getElementById('saved-timers');

// Initialize the app
function initApp() {
  // Set min date to today
  const dateTimeInput = document.getElementById('date-time');
  const now = new Date();
  const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  dateTimeInput.min = localDateTime;
  dateTimeInput.value = localDateTime;
  
  // Load saved timers from localStorage
  setupSavedTimers(loadTimers());
  
  // Add event listeners
  countdownForm.addEventListener('submit', handleFormSubmit);
  document.addEventListener('click', handleDocumentClick);
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  const eventName = document.getElementById('event-name').value;
  const dateTime = document.getElementById('date-time').value;
  
  if (!eventName || !dateTime) {
    alert('Please fill in both the event name and date/time');
    return;
  }
  
  const targetDate = new Date(dateTime).getTime();
  const now = new Date().getTime();
  
  if (targetDate <= now) {
    alert('Please choose a future date and time');
    return;
  }
  
  // Create a new timer
  const timerId = 'timer-' + Date.now();
  const timer = {
    id: timerId,
    name: eventName,
    targetDate: targetDate,
    created: now
  };
  
  // Save timer to localStorage
  saveTimer(timer);
  
  // Setup timer display
  setupTimerDisplay(timer);
  
  // Reset form
  countdownForm.reset();
  
  // Refresh saved timers list
  setupSavedTimers(loadTimers());
  
  // Start the countdown
  startCountdown(timer.id, targetDate);
}

// Handle document clicks (for delete buttons, etc.)
function handleDocumentClick(e) {
  // Delete a saved timer
  if (e.target.matches('.delete-timer') || e.target.closest('.delete-timer')) {
    const timerId = e.target.closest('.timer-card').dataset.timerId;
    removeTimer(timerId);
    setupSavedTimers(loadTimers());
  }
  
  // Load a saved timer
  if (e.target.matches('.load-timer') || e.target.closest('.load-timer')) {
    const timerId = e.target.closest('.timer-card').dataset.timerId;
    const timers = loadTimers();
    const timer = timers.find(t => t.id === timerId);
    
    if (timer) {
      setupTimerDisplay(timer);
      startCountdown(timer.id, timer.targetDate);
    }
  }
}

// Start countdown for a specific timer
function startCountdown(timerId, targetDate) {
  // Clear any existing countdowns
  clearTimerDisplay();
  
  const countdown = createCountdown(targetDate);
  const countdownElement = document.querySelector(`.countdown[data-timer-id="${timerId}"]`);
  
  if (!countdownElement) return;
  
  let hasNotified = false;
  
  const updateCountdown = () => {
    const timeLeft = countdown.getTimeRemaining();
    
    if (timeLeft.total <= 0) {
      // Time is up
      if (!hasNotified) {
        const timer = loadTimers().find(t => t.id === timerId);
        if (timer) {
          showNotification(timer.name);
          playTimeUpSound();
        }
        hasNotified = true;
      }
      
      countdownElement.innerHTML = `
        <div class="time-up">
          <p>⏰ Time's up!</p>
        </div>
      `;
      clearInterval(intervalId);
      return;
    }
    
    // Update days
    updateDigit(countdownElement, 'days', timeLeft.days);
    
    // Update hours
    updateDigit(countdownElement, 'hours', timeLeft.hours);
    
    // Update minutes
    updateDigit(countdownElement, 'minutes', timeLeft.minutes);
    
    // Update seconds
    updateDigit(countdownElement, 'seconds', timeLeft.seconds);
  };
  
  // Initial update
  updateCountdown();
  
  // Update every second
  const intervalId = setInterval(updateCountdown, 1000);
  
  // Store interval ID to clear it later if needed
  countdownElement.dataset.intervalId = intervalId;
}

// Update a digit with animation if changed
function updateDigit(countdownElement, unit, value) {
  const digitElement = countdownElement.querySelector(`.countdown-value[data-unit="${unit}"]`);
  if (!digitElement) return;
  
  const currentValue = digitElement.textContent;
  const newValue = formatTimeElement(value);
  
  if (currentValue !== newValue) {
    // Add animation class
    digitElement.classList.add('digit-change');
    
    // Set new value
    digitElement.textContent = newValue;
    
    // Remove animation class after animation completes
    setTimeout(() => {
      digitElement.classList.remove('digit-change');
    }, 300);
  }
}

// Play a sound when time is up
function playTimeUpSound() {
  // Create audio element
  const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
  audio.volume = 0.5;
  
  // Play the sound
  audio.play().catch(error => {
    console.log('Audio play failed:', error);
  });
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', initApp);