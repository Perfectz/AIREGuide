// js/performance.js - Performance optimizations for Phase 4

export class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.initResourceHints();
        this.initPerformanceMonitoring();
    }

    // Lazy Loading
    initLazyLoading() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Image Optimization
    initImageOptimization() {
        // Responsive images
        this.setupResponsiveImages();
        
        // WebP support detection
        this.detectWebPSupport();
    }

    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-srcset]');
        images.forEach(img => {
            const srcset = img.dataset.srcset;
            const sizes = img.dataset.sizes;
            
            if (srcset) {
                img.srcset = srcset;
            }
            
            if (sizes) {
                img.sizes = sizes;
            }
        });
    }

    detectWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            const isSupported = webP.height === 2;
            if (isSupported) {
                document.documentElement.classList.add('webp');
            } else {
                document.documentElement.classList.add('no-webp');
            }
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    // Resource Hints
    initResourceHints() {
        // DNS prefetch
        this.setupDNSPrefetch();
    }

    setupDNSPrefetch() {
        const domains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'cdn.jsdelivr.net'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
    }

    // Performance Monitoring
    initPerformanceMonitoring() {
        // Core Web Vitals monitoring
        this.monitorCoreWebVitals();
    }

    monitorCoreWebVitals() {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            // LCP measurement complete
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                // FID measurement complete
            });
        }).observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        new PerformanceObserver((list) => {
            let cls = 0;
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
            // CLS measurement complete
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize performance features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceManager();
});