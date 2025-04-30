// Initialize comments functionality
export function initializeComments(postId, commentsContainer, commentForm) {
  loadComments(postId, commentsContainer);
  setupCommentForm(postId, commentForm, commentsContainer);
}

// Load comments from localStorage
function loadComments(postId, container) {
  // Get comments from localStorage
  const comments = getCommentsFromStorage(postId);
  
  // Clear container
  container.innerHTML = '';
  
  // If no comments, show a message
  if (comments.length === 0) {
    const noComments = document.createElement('p');
    noComments.textContent = 'No comments yet. Be the first to comment!';
    container.appendChild(noComments);
    return;
  }
  
  // Get the comment template
  const commentTemplate = document.getElementById('comment-template');
  
  // Render each comment
  comments.forEach(comment => {
    const commentElement = commentTemplate.content.cloneNode(true);
    
    commentElement.querySelector('.commenter-name').textContent = comment.name;
    commentElement.querySelector('.comment-date').textContent = formatDate(comment.date);
    commentElement.querySelector('.comment-body').textContent = comment.text;
    
    container.appendChild(commentElement);
  });
}

// Setup comment form submission
function setupCommentForm(postId, form, container) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const nameInput = form.querySelector('#commenter-name');
    const commentInput = form.querySelector('#comment-text');
    
    const name = nameInput.value.trim();
    const text = commentInput.value.trim();
    
    if (!name || !text) {
      alert('Please fill out all fields');
      return;
    }
    
    // Create new comment object
    const newComment = {
      id: Date.now(),
      postId: postId,
      name: name,
      text: text,
      date: new Date()
    };
    
    // Add to storage
    addCommentToStorage(newComment);
    
    // Reset form
    nameInput.value = '';
    commentInput.value = '';
    
    // Reload comments
    loadComments(postId, container);
  });
}

// Get comments from localStorage
function getCommentsFromStorage(postId) {
  // Get all comments
  const allComments = JSON.parse(localStorage.getItem('blog-comments') || '[]');
  
  // Filter for the current post
  return allComments.filter(comment => comment.postId === postId);
}

// Add comment to localStorage
function addCommentToStorage(comment) {
  // Get existing comments
  const allComments = JSON.parse(localStorage.getItem('blog-comments') || '[]');
  
  // Add new comment
  allComments.push(comment);
  
  // Save back to localStorage
  localStorage.setItem('blog-comments', JSON.stringify(allComments));
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Options for date formatting
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  
  return date.toLocaleDateString('en-US', options);
}