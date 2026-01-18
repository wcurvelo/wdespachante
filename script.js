// ============================================
// W DESPACHANTE - INTERACTIVE FEATURES
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // === MOBILE MENU TOGGLE ===
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = navbarToggle.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navbarLinks = navbarMenu.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarMenu.classList.remove('active');
                const spans = navbarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .testimonial, .hero-stat');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // === FORM VALIDATION & SUBMISSION ===
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Create WhatsApp message
            const whatsappMessage = `Olá! Meu nome é ${formData.name}.%0A%0A` +
                `📧 E-mail: ${formData.email}%0A` +
                `📱 Telefone: ${formData.phone}%0A` +
                `🔧 Serviço: ${getServiceName(formData.service)}%0A%0A` +
                `Mensagem:%0A${formData.message}`;

            // Open WhatsApp with pre-filled message
            const whatsappURL = `https://wa.me/5521964474147?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');

            // Reset form
            contactForm.reset();

            // Show success message
            alert('Redirecionando para o WhatsApp! Em breve entraremos em contato.');
        });
    }

    // Helper function to get service name
    function getServiceName(serviceValue) {
        const services = {
            'transferencia': 'Transferência de Veículos',
            'licenciamento': 'Licenciamento CRLV',
            'segunda-via': '2ª Via de Documentos',
            'baixa': 'Baixa de Veículos',
            'multas': 'Regularização de Multas',
            'outros': 'Outros Serviços'
        };
        return services[serviceValue] || serviceValue;
    }

    // === PHONE NUMBER FORMATTING ===
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }

            e.target.value = value;
        });
    }

    // === WHATSAPP FLOAT BUTTON ANIMATION ===
    const whatsappFloat = document.querySelector('.whatsapp-float');

    if (whatsappFloat) {
        // Add click tracking
        whatsappFloat.addEventListener('click', function () {
            console.log('WhatsApp button clicked');
        });
    }

    // === LAZY LOADING FOR IMAGES (if any are added later) ===
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // === PERFORMANCE OPTIMIZATION ===
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // === ANALYTICS TRACKING (placeholder) ===
    // Add your analytics tracking code here
    function trackEvent(category, action, label) {
        console.log('Event tracked:', category, action, label);
        // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
    }

    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-whatsapp, .btn-primary, .btn-accent');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            trackEvent('CTA', 'Click', buttonText);
        });
    });

    // Track service card clicks
    const serviceCards = document.querySelectorAll('.card a');
    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            const serviceName = this.closest('.card').querySelector('.card-title').textContent;
            trackEvent('Service', 'View', serviceName);
        });
    });

    // ============================================
    // SERVICES CAROUSEL
    // ============================================
    const initServicesCarousel = () => {
        const track = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('services-prev');
        const nextBtn = document.getElementById('services-next');
        const dotsContainer = document.getElementById('carousel-dots');
        const cards = document.querySelectorAll('.carousel-card');

        if (!track || !prevBtn || !nextBtn || cards.length === 0) {
            console.log('Carousel elements not found');
            return;
        }

        let currentIndex = 0;
        const totalCards = cards.length;
        let cardsPerView = 3; // Desktop default
        let autoPlayInterval;

        // Calculate cards per view based on screen size
        const updateCardsPerView = () => {
            if (window.innerWidth < 768) {
                cardsPerView = 1;
            } else if (window.innerWidth < 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        };

        // Calculate total pages
        const getTotalPages = () => Math.ceil(totalCards / cardsPerView);

        // Create dots
        const createDots = () => {
            dotsContainer.innerHTML = '';
            const totalPages = getTotalPages();
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Ir para página ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToPage(i));
                dotsContainer.appendChild(dot);
            }
        };

        // Update carousel position
        const updateCarousel = () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = 32; // 2rem gap
            const offset = -(currentIndex * cardsPerView * (cardWidth + gap));
            track.style.transform = `translateX(${offset}px)`;

            // Update dots
            document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Update button states
            const totalPages = getTotalPages();
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalPages - 1;
        };

        // Go to specific page
        const goToPage = (pageIndex) => {
            const totalPages = getTotalPages();
            currentIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
            updateCarousel();
            resetAutoPlay();
        };

        // Next slide
        const nextSlide = () => {
            const totalPages = getTotalPages();
            if (currentIndex < totalPages - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        };

        // Previous slide
        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const totalPages = getTotalPages();
                currentIndex = totalPages - 1; // Loop to end
            }
            updateCarousel();
        };

        // Auto-play functionality
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000); // 4 seconds
        };

        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };

        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        // Event listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        // Pause on hover
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) nextSlide(); // Swipe left
            if (touchEndX > touchStartX + 50) prevSlide(); // Swipe right
        };

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            }
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            }
        });

        // Responsive handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateCardsPerView();
                currentIndex = 0; // Reset to first page on resize
                createDots();
                updateCarousel();
            }, 250);
        });

        // Initialize
        updateCardsPerView();
        createDots();
        updateCarousel();
        startAutoPlay(); // Start auto-play

        console.log('Carousel initialized with auto-play (4s interval)');
    };

    // Initialize carousel
    initServicesCarousel();

    // ============================================
    // TESTIMONIALS CAROUSEL
    // ============================================
    const initTestimonialsCarousel = () => {
        const track = document.getElementById('testimonials-track');
        const prevBtn = document.getElementById('testimonials-prev');
        const nextBtn = document.getElementById('testimonials-next');
        const dotsContainer = document.getElementById('testimonials-dots');
        const cards = document.querySelectorAll('#testimonials-track .carousel-card');

        if (!track || !prevBtn || !nextBtn || cards.length === 0) {
            console.log('Testimonials carousel elements not found');
            return;
        }

        let currentIndex = 0;
        const totalCards = cards.length;
        let cardsPerView = 3; // Desktop default
        let autoPlayInterval;

        // Calculate cards per view based on screen size
        const updateCardsPerView = () => {
            if (window.innerWidth < 768) {
                cardsPerView = 1;
            } else if (window.innerWidth < 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        };

        // Calculate total pages
        const getTotalPages = () => Math.ceil(totalCards / cardsPerView);

        // Create dots
        const createDots = () => {
            dotsContainer.innerHTML = '';
            const totalPages = getTotalPages();
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Ir para página ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToPage(i));
                dotsContainer.appendChild(dot);
            }
        };

        // Update carousel position
        const updateCarousel = () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = 32; // 2rem gap
            const offset = -(currentIndex * cardsPerView * (cardWidth + gap));
            track.style.transform = `translateX(${offset}px)`;

            // Update dots
            document.querySelectorAll('#testimonials-dots .carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Update button states
            const totalPages = getTotalPages();
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalPages - 1;
        };

        // Go to specific page
        const goToPage = (pageIndex) => {
            const totalPages = getTotalPages();
            currentIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
            updateCarousel();
            resetAutoPlay();
        };

        // Next slide
        const nextSlide = () => {
            const totalPages = getTotalPages();
            if (currentIndex < totalPages - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        };

        // Previous slide
        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const totalPages = getTotalPages();
                currentIndex = totalPages - 1; // Loop to end
            }
            updateCarousel();
        };

        // Auto-play functionality
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000); // 4 seconds
        };

        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };

        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        // Event listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        // Pause on hover
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) nextSlide(); // Swipe left
            if (touchEndX > touchStartX + 50) prevSlide(); // Swipe right
        };

        // Responsive handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateCardsPerView();
                currentIndex = 0; // Reset to first page on resize
                createDots();
                updateCarousel();
            }, 250);
        });

        // Initialize
        updateCardsPerView();
        createDots();
        updateCarousel();
        startAutoPlay(); // Start auto-play

        console.log('Testimonials carousel initialized with auto-play (4s interval)');
    };

    // Initialize testimonials carousel
    initTestimonialsCarousel();

    console.log('W Despachante website loaded successfully! 🚀');

    // ============================================
    // IMAGE ZOOM MODAL
    // ============================================
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const calendarImages = document.querySelectorAll('.calendar-zoom');

    // Add click event to all calendar images
    calendarImages.forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.textContent = this.alt;
        });
    });

    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});

// === EXTERNAL FUNCTIONS ===

// Function to update WhatsApp number (call this if you need to change the number)
function updateWhatsAppNumber(newNumber) {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        const newHref = currentHref.replace(/5521\d+/, newNumber);
        link.setAttribute('href', newHref);
    });
    console.log('WhatsApp number updated to:', newNumber);
}

// Function to show notification (can be used for form success, etc.)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-accent)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
