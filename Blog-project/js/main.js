import '../css/styles.css';
import { posts } from './posts.js';
import { initializeComments } from './comments.js';
import { initializeNavigation } from './navigation.js';
import { initializeSearch } from './search.js';

// Initialize navigation
initializeNavigation();

// Initialize post data
function initializePosts() {
  const postsContainer = document.getElementById('posts-container');
  const postTemplate = document.getElementById('post-template');

  // Clear existing posts
  postsContainer.innerHTML = '';

  // Loop through posts and create post cards
  posts.forEach(post => {
    const postCard = postTemplate.content.cloneNode(true);
    
    // Set post data
    postCard.querySelector('.post-image img').src = post.image;
    postCard.querySelector('.post-image img').alt = post.title;
    postCard.querySelector('.post-title').textContent = post.title;
    postCard.querySelector('.post-date').textContent = post.date;
    postCard.querySelector('.post-excerpt').textContent = post.excerpt;
    
    // Add tags
    const tagsContainer = postCard.querySelector('.post-tags');
    post.tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'post-tag';
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });
    
    // Add click event for opening post details
    const article = postCard.querySelector('.post-card');
    article.dataset.postId = post.id;
    article.addEventListener('click', () => openPostDetails(post.id));
    
    // Apply staggered animation delay
    const index = posts.indexOf(post);
    article.style.animationDelay = `${index * 0.1}s`;
    
    postsContainer.appendChild(postCard);
  });
}

// Open post details in a modal
function openPostDetails(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  
  const modalTemplate = document.getElementById('post-modal-template');
  const modalClone = modalTemplate.content.cloneNode(true);
  const modalOverlay = modalClone.querySelector('.modal-overlay');
  
  // Set post content
  modalClone.querySelector('.post-title').textContent = post.title;
  modalClone.querySelector('.post-date').textContent = post.date;
  modalClone.querySelector('.post-image img').src = post.image;
  modalClone.querySelector('.post-image img').alt = post.title;
  
  // Add post body content
  const postBody = modalClone.querySelector('.post-body');
  post.content.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    postBody.appendChild(p);
  });
  
  // Add tags
  const tagsContainer = modalClone.querySelector('.post-tags');
  post.tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'post-tag';
    tagEl.textContent = tag;
    tagsContainer.appendChild(tagEl);
  });
  
  // Handle close button
  const closeBtn = modalClone.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(modalOverlay);
    }, 300);
  });
  
  // Handle click outside to close
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modalOverlay);
      }, 300);
    }
  });
  
  // Initialize comments for this post
  const commentsContainer = modalClone.querySelector('.comments-container');
  const commentForm = modalClone.querySelector('.comment-form');
  
  // Set data attributes for post ID
  commentsContainer.dataset.postId = post.id;
  commentForm.dataset.postId = post.id;
  
  // Add to DOM
  document.body.appendChild(modalOverlay);
  
  // Trigger animation after a small delay
  setTimeout(() => {
    modalOverlay.classList.add('active');
  }, 10);
  
  // Initialize comments
  initializeComments(post.id, commentsContainer, commentForm);
}

// Initialize search functionality
initializeSearch(posts, initializePosts);

// Initialize posts on page load
document.addEventListener('DOMContentLoaded', initializePosts);

// Export functions for other modules
export { openPostDetails };