// Main JavaScript file

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animate sections on scroll
const sections = document.querySelectorAll('section:not(#why-choose-us)');
sections.forEach(section => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        }
    );
});

// Animate service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.services',
                start: 'top 80%',
            }
        }
    );
});

// Animate stats
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((stat, index) => {
    gsap.fromTo(stat,
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
            }
        }
    );
});