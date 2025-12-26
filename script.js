// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        fadeObserver.observe(card);
    });

    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        fadeObserver.observe(item);
    });

    // Stats items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        fadeObserver.observe(item);
    });

    // Education cards
    const educationCards = document.querySelectorAll('.education-card, .cert-card');
    educationCards.forEach(card => {
        fadeObserver.observe(card);
    });

    // Tech cards
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        fadeObserver.observe(card);
    });
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple to all buttons
document.querySelectorAll('.btn, button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Floating WhatsApp Button - Show after scrolling past hero
const whatsappFloat = document.querySelector('.whatsapp-float');
const hero = document.querySelector('.hero');

if (whatsappFloat && hero) {
    window.addEventListener('scroll', function() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        
        if (window.pageYOffset > heroBottom) {
            whatsappFloat.classList.add('visible');
        } else {
            whatsappFloat.classList.remove('visible');
        }
    });
}

// Contact Form with Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    // Floating labels functionality
    const formInputs = contactForm.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Check if input has value on load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.remove('focused', 'has-value');
            } else {
                this.classList.add('has-value');
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name || name.length < 2) {
            isValid = false;
            errorMessage = 'El nombre debe tener al menos 2 caracteres.';
        }
        
        if (!email || !isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Por favor, ingresa un email válido.';
        }
        
        if (!message || message.length < 50) {
            isValid = false;
            errorMessage = 'El mensaje debe tener al menos 50 caracteres.';
        }
        
        if (!isValid) {
            showFormMessage(errorMessage, 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormMessage(`¡Gracias ${name}! Tu mensaje ha sido recibido. Te contactaré pronto en ${email}.`, 'success');
            contactForm.reset();
            
            // Reset form inputs
            formInputs.forEach(input => {
                input.classList.remove('focused', 'has-value');
            });
            
            // Reset button
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Parallax effect for hero background (subtle)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern && scrolled < window.innerHeight) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hero elements sequential animation
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');
    const heroText = document.querySelector('.hero-text');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Skill pills pulse animation
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s ease infinite';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Console welcome message
console.log('%c👋 ¡Bienvenido al portfolio de Edison Agudelo!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cRevenue & Sales Operations Leader', 'color: #6b7280; font-size: 12px;');
console.log('%cAutomatización e IA aplicada a eficiencia operativa', 'color: #9ca3af; font-size: 11px;');
