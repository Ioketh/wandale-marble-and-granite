// Interactive Projects with Tuning Effect
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('#projectsGrid .interactive-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.querySelector('.close-video-modal');
    const viewMoreBtn = document.querySelectorAll('.view-more-btn')[1]; // Second view more button
    
    let currentFilter = 'all';

    // Tuning effect on card click
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.close-card') || e.target.closest('.project-tag') || e.target.closest('.btn-outline') || e.target.closest('iframe')) {
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

        // Handle play indicator for videos
        const playIndicator = card.querySelector('.play-indicator i.fa-play');
        if (playIndicator) {
            playIndicator.addEventListener('click', function(e) {
                e.stopPropagation();
                const videoFrame = card.querySelector('iframe');
                if (videoFrame) {
                    openVideoModal(videoFrame.src);
                }
            });
        }

        // Handle product tag clicks
        card.querySelectorAll('.project-tag').forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const targetId = this.getAttribute('href');
                
                // Switch to products section
                document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the target product card
                setTimeout(() => {
                    const targetCard = document.querySelector(targetId);
                    if (targetCard) {
                        targetCard.classList.add('highlight');
                        setTimeout(() => {
                            targetCard.classList.remove('highlight');
                        }, 2000);
                    }
                }, 500);
            });
        });
    });

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

    // Category filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            
            cards.forEach(card => {
                if (currentFilter === 'all' || card.dataset.category === currentFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                    // Close card if hidden
                    if (card.classList.contains('tuned')) {
                        card.classList.remove('tuned');
                    }
                }
            });
        });
    });

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

    // Escape key to close cards and modal
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

    // Handle view more button
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'projects.html';
        });
    }

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