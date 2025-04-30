// Initialize navigation functionality
export function initializeNavigation() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuBtn || !navLinks) return;
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    this.classList.toggle('active');
    
    // If menu is open, listen for clicks outside to close it
    if (navLinks.classList.contains('active')) {
      document.addEventListener('click', closeMenuOnClickOutside);
    } else {
      document.removeEventListener('click', closeMenuOnClickOutside);
    }
  });
  
  // Close menu when clicking outside
  function closeMenuOnClickOutside(e) {
    if (!navLinks.contains(e.target) && e.target !== mobileMenuBtn) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.removeEventListener('click', closeMenuOnClickOutside);
    }
  }
  
  // Update active link based on current page
  function updateActiveLink() {
    const currentPath = window.location.pathname;
    
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current page link
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      
      if (currentPath.endsWith(href) || 
         (currentPath === '/' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // Call on page load
  updateActiveLink();
}