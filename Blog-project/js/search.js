// Initialize search functionality
export function initializeSearch(posts, refreshPostsCallback) {
  const searchInput = document.getElementById('search-input');
  
  if (!searchInput) return;
  
  // Add event listener for search input
  searchInput.addEventListener('input', function() {
    filterPosts(searchInput.value.trim().toLowerCase());
  });
  
  // Filter posts based on search term
  function filterPosts(searchTerm) {
    if (!searchTerm) {
      // If search is empty, display all posts
      refreshPostsCallback();
      return;
    }
    
    const filteredPosts = posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const contentMatch = post.content.some(paragraph => 
        paragraph.toLowerCase().includes(searchTerm)
      );
      const tagMatch = post.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm)
      );
      
      return titleMatch || contentMatch || tagMatch;
    });
    
    // Display filtered posts
    displayFilteredPosts(filteredPosts);
  }
  
  // Display filtered posts
  function displayFilteredPosts(filteredPosts) {
    const postsContainer = document.getElementById('posts-container');
    const postTemplate = document.getElementById('post-template');
    
    // Clear container
    postsContainer.innerHTML = '';
    
    // Show message if no posts match
    if (filteredPosts.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No posts match your search. Try different keywords.';
      postsContainer.appendChild(noResults);
      return;
    }
    
    // Loop through filtered posts and create post cards
    filteredPosts.forEach(post => {
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
      article.addEventListener('click', () => {
        const openPostDetails = window.openPostDetails || 
          (typeof module !== 'undefined' && module.exports && module.exports.openPostDetails);
        if (openPostDetails) {
          openPostDetails(post.id);
        }
      });
      
      // Apply staggered animation delay
      const index = filteredPosts.indexOf(post);
      article.style.animationDelay = `${index * 0.1}s`;
      
      postsContainer.appendChild(postCard);
    });
  }
}