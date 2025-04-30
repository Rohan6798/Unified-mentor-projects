// Initialize contact form functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (!contactForm || !formSuccess) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields');
      return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // In a real application, you would send this data to a server
    // Since we're only using client-side JavaScript, we'll simulate success
    
    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.classList.remove('hidden');
    
    // Reset form for if they navigate away and come back
    contactForm.reset();
  });
  
  // Email validation function
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
});