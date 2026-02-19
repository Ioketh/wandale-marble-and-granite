// Interactive Products with Tuning Effect
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('#productsGrid .interactive-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    let currentCategory = 'all';

    // Tuning effect on card click
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.close-card') || e.target.closest('.project-tag')) {
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

        // Handle project tag clicks
        card.querySelectorAll('.project-tag').forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const targetId = this.getAttribute('href');
                
                // Switch to projects section
                document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the target project card (you can enhance this)
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
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            
            cards.forEach(card => {
                if (currentCategory === 'all' || card.dataset.category === currentCategory) {
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

    // Escape key to close cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cards.forEach(card => {
                if (card.classList.contains('tuned')) {
                    card.classList.remove('tuned');
                }
            });
            document.body.classList.remove('card-tuned');
        }
    });

    // Handle view more button
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'products.html';
        });
    }
});