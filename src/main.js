import './styles/main.css';

console.log('Aurora Ecoliving loaded.');

// Header Scroll Effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // optional: observer.unobserve(entry.target); if you want it to happen only once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(section => {
    observer.observe(section);
});

// Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    // Arrange slides next to one another
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Reset positions just in case (though flex handles this mostly)
    // We will translate the track

    let currentSlideIndex = 0;

    const moveToSlide = (targetIndex) => {
        // Wrap around
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        const amountToMove = - (slideWidth * targetIndex);
        track.style.transform = 'translateX(' + amountToMove + 'px)';
        currentSlideIndex = targetIndex;
    }

    // Since width might be dynamic (responsiveness), recalculate on resize is ideal
    // simplified version relying on 100% width slides:

    const updateSlidePosition = () => {
        const width = slides[0].getBoundingClientRect().width;
        const amountToMove = - (width * currentSlideIndex);
        track.style.transform = 'translateX(' + amountToMove + 'px)';
    };

    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex - 1);
    });

    window.addEventListener('resize', updateSlidePosition);
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "flex"; // Flex for centering
        lightboxImg.src = img.src;
        // Disable scroll body
        document.body.style.overflow = 'hidden';
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
}

// Hero Background Slider
const setupHeroSlider = () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    setInterval(() => {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');

        // Calculate next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to next
        slides[currentSlide].classList.add('active');
    }, slideInterval);
};

// Mobile Menu Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
        const isActive = mainNav.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    });

    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileNavToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    setupHeroSlider();
});
