// js/mobile-optimizations.js - Advanced mobile-first optimizations

export class MobileOptimizations {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.init();
    }

    init() {
        this.initializeMenu();
        if (this.isMobile) {
            this.initializeLazyLoading();
            this.initializeTouchGestures();
            this.initializePerformanceMonitoring();
            this.initializeMobileSpecificFeatures();
            this.initializeSkeletonScreens();
        }
    }

    initializeMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

        // Initial state: hide the mobile menu visually and from screen readers if it exists
        if (mobileMenu) {
            mobileMenu.setAttribute('aria-hidden', 'true');
        }

        if (menuBtn && mobileMenu && mobileMenuOverlay) {
            menuBtn.addEventListener('click', () => {
                const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                mobileMenu.classList.toggle('is-open'); // Use 'is-open' class
                mobileMenu.setAttribute('aria-hidden', isExpanded ? 'true' : 'false'); // Toggle aria-hidden
                mobileMenuOverlay.classList.toggle('hidden'); // Toggle overlay visibility
            });
        }
    }

    // Lazy loading for images and components
    initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('skeleton');
                    img.classList.add('fade-in-mobile');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        images.forEach(img => {
            // Add skeleton placeholder
            img.classList.add('skeleton');
            imageObserver.observe(img);
        });
    }

    // Touch gesture support
    initializeTouchGestures() {
        document.addEventListener('touchstart', (e) => {
            // Check if the touch started on an interactive element
            if (this.isInteractiveElement(e.target)) {
                return; // Do not track swipe if it starts on an interactive element
            }
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.handleSwipeGesture();
        }, { passive: true });

        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.btn, .nav-item, .feature-card');
        touchElements.forEach(element => {
            element.classList.add('touch-feedback');
        });
    }

    isInteractiveElement(element) {
        const interactiveTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
        const interactiveClasses = ['.btn', '.nav-item', '.feature-card', '.copy-prompt-btn', '.customize-prompt-btn', '.modal-close'];
        return interactiveTags.includes(element.tagName) ||
               interactiveClasses.some(className => element.closest(className));
    }

    handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartY - this.touchEndY;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe up - could trigger next section
                this.handleSwipeUp();
            } else {
                // Swipe down - could trigger previous section
                this.handleSwipeDown();
            }
        }
    }

    handleSwipeUp() {
        // Navigate to next section
        const currentSection = document.querySelector('.content-section.active');
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.classList.contains('content-section')) {
                this.navigateToSection(nextSection.id);
            }
        }
    }

    handleSwipeDown() {
        // Navigate to previous section
        const currentSection = document.querySelector('.content-section.active');
        if (currentSection) {
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.classList.contains('content-section')) {
                this.navigateToSection(prevSection.id);
            }
        }
    }

    // Performance monitoring for mobile
    initializePerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.logPerformanceMetric('LCP', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        this.logPerformanceMetric('FID', entry.processingStart - entry.startTime);
                    }
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        }

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
                    // High memory usage detected - optimizing
                    this.optimizeMemoryUsage();
                }
            }, 30000);
        }
    }

    logPerformanceMetric(metric, value) {
        // Could send to analytics here
    }

    optimizeMemoryUsage() {
        // Clear unused event listeners
        // Optimize images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!this.isElementInViewport(img)) {
                img.src = ''; // Clear src to free memory
            }
        });
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Mobile-specific features
    initializeMobileSpecificFeatures() {
        // Progressive disclosure for mobile
        this.initializeProgressiveDisclosure();
        
        // Mobile-specific animations
        this.initializeMobileAnimations();
        
        // Optimize scrolling
        this.optimizeScrolling();
        
        // Handle orientation changes
        this.handleOrientationChange();
    }

    initializeProgressiveDisclosure() {
        const collapsibleElements = document.querySelectorAll('.mobile-collapsible');
        collapsibleElements.forEach(element => {
            const trigger = element.previousElementSibling;
            if (trigger) {
                trigger.addEventListener('click', () => {
                    element.classList.toggle('expanded');
                });
            }
        });
    }

    initializeMobileAnimations() {
        // Intersection Observer for fade-in animations
        const animatedElements = document.querySelectorAll('.fade-in-mobile');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.1s';
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            animationObserver.observe(element);
        });
    }

    optimizeScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Optimize scroll performance
        let ticking = false;
        const updateScroll = () => {
            // Add scroll-based animations here
            ticking = false;
        };

        document.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            // Recalculate layouts after orientation change
            setTimeout(() => {
                this.recalculateLayouts();
            }, 100);
        });
    }

    recalculateLayouts() {
        // Recalculate any layout-dependent elements
        const tables = document.querySelectorAll('.modern-table');
        tables.forEach(table => {
            // Recalculate table column widths
            const cells = table.querySelectorAll('th, td');
            cells.forEach(cell => {
                cell.style.minWidth = '120px';
            });
        });
    }

    // Skeleton screen management
    initializeSkeletonScreens() {
        // Show skeleton screens while content loads
        const skeletonElements = document.querySelectorAll('.skeleton');
        skeletonElements.forEach(element => {
            element.style.display = 'block';
        });

        // Hide skeletons when content is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                skeletonElements.forEach(element => {
                    element.style.display = 'none';
                });
            }, 500);
        });
    }

    // Navigation helper
    navigateToSection(sectionId) {
        // Trigger navigation through the main app
        if (window.realEstateApp) {
            window.realEstateApp.navigateToSection(sectionId);
        }
    }

    // Public API methods
    isMobileDevice() {
        return this.isMobile;
    }

    optimizeForMobile() {
        // Additional mobile optimizations
        this.initializeLazyLoading();
        this.initializeTouchGestures();
    }
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    window.mobileOptimizations = new MobileOptimizations();
}); 