// Why Choose Us section animations
gsap.registerPlugin(ScrollTrigger);

const whyImage = document.getElementById('whyImage');
const whyPanel = document.getElementById('whyPanel');
const whyHeadline = document.getElementById('whyHeadline');
const whyFeatures = document.getElementById('whyFeatures');
const whyCta = document.getElementById('whyCta');
const whyHairline = document.getElementById('whyHairline');

if (whyImage && whyPanel && whyHeadline && whyFeatures && whyCta && whyHairline) {
    const featureItems = whyFeatures.querySelectorAll('.feature-item');

    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#why-choose-us',
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
        }
    });

    // ENTRANCE (0-30%)
    scrollTl
        .fromTo(whyImage,
            { x: '-70vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
        )
        .fromTo(whyPanel,
            { x: '50vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
        )
        .fromTo(whyHairline,
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: 'center', ease: 'none' },
            0.05
        )
        .fromTo(whyHeadline,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.05
        )
        .fromTo(featureItems,
            { x: '6vw', opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
            0.1
        )
        .fromTo(whyCta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15
        );

    // EXIT (70-100%)
    scrollTl
        .to(whyImage,
            { x: '10vw', opacity: 0.35, ease: 'power2.in' },
            0.7
        )
        .to(whyPanel,
            { x: '18vw', opacity: 0.25, ease: 'power2.in' },
            0.7
        )
        .to(whyHeadline,
            { y: '-6vh', opacity: 0.2, ease: 'power2.in' },
            0.7
        )
        .to(featureItems,
            { x: '4vw', opacity: 0.15, stagger: 0.01, ease: 'power2.in' },
            0.72
        )
        .to(whyCta,
            { opacity: 0, ease: 'power2.in' },
            0.75
        )
        .to(whyHairline,
            { scaleY: 0.2, opacity: 0.1, ease: 'power2.in' },
            0.7
        );
}

// CTA button click
if (whyCta) {
    whyCta.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}