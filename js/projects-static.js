// Static Projects Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all interactive cards
    const cards = document.querySelectorAll('.interactive-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mediaFilterBtns = document.querySelectorAll('.media-filter-btn');
    const searchInput = document.getElementById('projectSearch');
    const categoryItems = document.querySelectorAll('.category-item');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.querySelector('.close-video-modal');
    
    let currentFilter = 'all';
    let currentMediaFilter = 'all';
    let searchTerm = '';

    // Tuning effect on card click
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on close button, project tag, or video link
            if (e.target.closest('.close-card') || 
                e.target.closest('.project-tag') || 
                e.target.closest('.btn-outline') ||
                e.target.closest('iframe')) {
                return;
            }

            // Close any other open cards
            cards.forEach(c => {
                if (c !== card && c.classList.contains('tuned')) {
                    c.classList.remove('tuned');
                }
            });

            // Tune this card
            card.classList.add('tuned');

            // Add ripple effect
            createRippleEffect(e.clientX, e.clientY);

            // Change background color temporarily
            document.body.classList.add('card-tuned');

            // Auto close after 30 seconds (optional)
            setTimeout(() => {
                if (card.classList.contains('tuned')) {
                    card.classList.remove('tuned');
                    if (!document.querySelector('.interactive-card.tuned')) {
                        document.body.classList.remove('card-tuned');
                    }
                }
            }, 30000);
        });

        // Handle close button
        const closeBtn = card.querySelector('.close-card');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('tuned');
                if (!document.querySelector('.interactive-card.tuned')) {
                    document.body.classList.remove('card-tuned');
                }
            });
        }

        // Handle video play
        const playBtn = card.querySelector('.play-indicator');
        if (playBtn && card.dataset.media === 'video') {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const videoFrame = card.querySelector('iframe');
                if (videoFrame) {
                    openVideoModal(videoFrame.src);
                }
            });
        }
    });

    // Create ripple effect
    function createRippleEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'tuning-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    // Video Modal
    function openVideoModal(videoSrc) {
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = `<iframe width="100%" height="100%" src="${videoSrc}" frameborder="0" allowfullscreen></iframe>`;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', function() {
            videoModal.classList.remove('active');
            document.getElementById('videoContainer').innerHTML = '';
            document.body.style.overflow = '';
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                document.getElementById('videoContainer').innerHTML = '';
                document.body.style.overflow = '';
            }
        });
    }

    // Filter projects by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            filterProjects();
        });
    });

    // Filter by media type
    mediaFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            mediaFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentMediaFilter = this.dataset.media;
            filterProjects();
        });
    });

    // Category items click
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Find and click corresponding filter button
            filterBtns.forEach(btn => {
                if (btn.dataset.filter === category) {
                    btn.click();
                }
            });

            // Scroll to projects grid
            document.querySelector('.cards-grid').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase();
            filterProjects();
        });
    }

    function filterProjects() {
        cards.forEach(card => {
            const category = card.dataset.category;
            const media = card.dataset.media;
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.project-location')?.textContent.toLowerCase() || '';
            
            // Check category filter
            const categoryMatch = currentFilter === 'all' || category === currentFilter;
            
            // Check media filter
            const mediaMatch = currentMediaFilter === 'all' || media === currentMediaFilter;
            
            // Check search
            const searchMatch = searchTerm === '' || 
                title.includes(searchTerm) || 
                location.includes(searchTerm);
            
            if (categoryMatch && mediaMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
                // Close card if hidden
                if (card.classList.contains('tuned')) {
                    card.classList.remove('tuned');
                }
            }
        });

        // Check if any cards are visible
        const visibleCards = document.querySelectorAll('.interactive-card[style="display: block"]');
        const noResults = document.querySelector('.no-results');
        
        if (visibleCards.length === 0) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = '<i class="fas fa-search"></i><p>No projects found matching your criteria</p>';
                document.querySelector('.cards-grid').appendChild(message);
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    }

    // Close cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.interactive-card')) {
            cards.forEach(card => {
                if (card.classList.contains('tuned')) {
                    card.classList.remove('tuned');
                }
            });
            document.body.classList.remove('card-tuned');
        }
    });

    // Smooth scroll for project tag links
    document.querySelectorAll('.project-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Switch to products page if needed
            if (href.includes('products.html')) {
                window.location.href = href;
            }
        });
    });

    // Initialize with first card demo
    setTimeout(() => {
        const firstCard = document.querySelector('.interactive-card');
        if (firstCard && !window.location.hash) {
            // Optional: auto-show first card as demo
            // firstCard.click();
        }
    }, 1000);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open card
            cards.forEach(card => {
                if (card.classList.contains('tuned')) {
                    card.classList.remove('tuned');
                }
            });
            document.body.classList.remove('card-tuned');
            
            // Close video modal
            if (videoModal && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                document.getElementById('videoContainer').innerHTML = '';
                document.body.style.overflow = '';
            }
        }
    });

    // Handle hash navigation
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetCard = document.querySelector(`[data-id="${targetId}"]`);
        if (targetCard) {
            setTimeout(() => {
                targetCard.scrollIntoView({ behavior: 'smooth' });
                targetCard.click();
            }, 500);
        }
    }
});