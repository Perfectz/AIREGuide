// js/main.js - Main application initialization and coordination

import { NavigationManager, TooltipManager, ModalManager } from './ui-utils.js';
import { ComponentManager } from './component-manager.js';
import { InteractiveFeatures } from './interactive-features.js';
import { AccessibilityManager } from './accessibility.js';

import { PersonalizationManager } from './personalization.js';
import { ContentManager } from './content-management.js';


class RealEstateApp {
    constructor() {
        this.navigationManager = null;
        this.tooltipManager = null;
        this.modalManager = null;
        this.componentManager = null;
        this.interactiveFeatures = null;
        this.accessibilityManager = null;
        this.performanceManager = null;
        this.personalizationManager = null;
        this.contentManager = null;

        this.init();
    }

    async init() {
        try {
            // Initialize core UI managers
            this.initializeCoreManagers();
            
            // Initialize component manager
            this.componentManager = new ComponentManager();
            
            // Initialize interactive features
            this.interactiveFeatures = new InteractiveFeatures();
            
            // Initialize additional managers
            this.initializeAdditionalManagers();
            
            // Set up global event listeners
            this.setupGlobalEventListeners();
            
            // Initialize any additional features
            this.initializeAdditionalFeatures();
            
            console.log('Real Estate Training App initialized successfully');
            
            // Initialize with current hash or default to home
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.navigateToSection(hash);
            } else {
                this.navigateToSection('home');
            }

            // Set up mobile menu toggle
            const menuBtn = document.getElementById('menu-btn');
            if (menuBtn) {
                menuBtn.addEventListener('click', () => {
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.classList.toggle('hidden');
                    }
                });
            }

        } catch (error) {
            console.error('Error initializing app:', error);
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    initializeCoreManagers() {
        // Initialize navigation
        this.navigationManager = new NavigationManager();
        
        // Initialize tooltips
        this.tooltipManager = new TooltipManager();
        
        // Initialize modals
        this.modalManager = new ModalManager();
    }

    async initializeAdditionalManagers() {
        // Initialize accessibility
        this.accessibilityManager = new AccessibilityManager();
        
        // Initialize performance monitoring
        const { PerformanceManager } = await import(`./performance.js`);
        this.performanceManager = new PerformanceManager();
        
        // Initialize personalization
        this.personalizationManager = new PersonalizationManager();
        
        // Initialize content management
        this.contentManager = new ContentManager();
    }

    setupGlobalEventListeners() {
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Handle beforeunload
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    }

    handleResize() {
        // Adjust UI elements based on screen size
        const isMobile = window.innerWidth < 768;
        
        // Hide mobile menu on desktop
        if (!isMobile) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    }

    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + K for search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            this.focusSearch();
        }
        
        // Escape to close modals
        if (event.key === 'Escape') {
            this.closeAllModals();
        }
        
        // Ctrl/Cmd + / for help
        if ((event.ctrlKey || event.metaKey) && event.key === '/') {
            event.preventDefault();
            this.showHelp();
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden
            this.onPageHidden();
        } else {
            // Page is visible
            this.onPageVisible();
        }
    }

    handleBeforeUnload(event) {
        // Save any unsaved data
        this.saveAppState();
    }

    focusSearch() {
        const searchInput = document.getElementById('prompt-search');
        if (searchInput) {
            searchInput.focus();
        }
    }

    closeAllModals() {
        if (this.modalManager) {
            this.modalManager.closeModal();
        }
    }

    showHelp() {
        const helpContent = `
            <h3>Keyboard Shortcuts</h3>
            <ul>
                <li><strong>Ctrl/Cmd + K:</strong> Focus search</li>
                <li><strong>Escape:</strong> Close modals</li>
                <li><strong>Ctrl/Cmd + /:</strong> Show this help</li>
            </ul>
            
            <h3>Navigation</h3>
            <ul>
                <li>Use the sidebar to navigate between sections</li>
                <li>On mobile, use the hamburger menu</li>
                <li>Browser back/forward buttons work as expected</li>
            </ul>
            
            <h3>Features</h3>
            <ul>
                <li>Copy prompts with one click</li>
                <li>Customize prompts for your specific needs</li>
                <li>Search and filter the prompt library</li>
                <li>Export prompts for offline use</li>
            </ul>
        `;
        
        if (this.modalManager) {
            this.modalManager.openModal('Help & Keyboard Shortcuts', helpContent);
        }
    }

    onPageHidden() {
        // Save current state
        this.saveAppState();
    }

    onPageVisible() {
        // Restore state if needed
        this.restoreAppState();
    }

    saveAppState() {
        try {
            const state = {
                currentSection: this.navigationManager?.currentSection || 'home',
                timestamp: Date.now()
            };
            localStorage.setItem('realEstateAppState', JSON.stringify(state));
        } catch (error) {
            console.warn('Could not save app state:', error);
        }
    }

    restoreAppState() {
        try {
            const savedState = localStorage.getItem('realEstateAppState');
            if (savedState) {
                const state = JSON.parse(savedState);
                const isRecent = Date.now() - state.timestamp < 300000; // 5 minutes
                
                if (isRecent && state.currentSection) {
                    this.navigationManager?.navigateToSection(state.currentSection);
                }
            }
        } catch (error) {
            console.warn('Could not restore app state:', error);
        }
    }

    initializeAdditionalFeatures() {
        this.initializeAnalytics();
        this.initializePerformanceMonitoring();
        this.initializeErrorHandling();
    }

    initializeAnalytics() {
        // Track page views and user interactions
        this.trackPageView();
        
        // Track component interactions
        document.addEventListener('click', (event) => {
            if (event.target.matches('.copy-prompt-btn, .copy-prompt')) {
                this.trackEvent('prompt_copied');
            }
            if (event.target.matches('.customize-prompt-btn, .customize-prompt')) {
                this.trackEvent('prompt_customized');
            }
        });
    }

    trackPageView() {
        // Simple analytics tracking
        const page = window.location.hash || '#home';
        console.log('Page view:', page);
        
        // You could integrate with Google Analytics or other services here
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: page
            });
        }
    }

    trackEvent(eventName, parameters = {}) {
        console.log('Event tracked:', eventName, parameters);
        
        // You could integrate with Google Analytics or other services here
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
    }

    initializePerformanceMonitoring() {
        // Monitor page load performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                // The PerformanceManager now handles detailed performance metrics.
                // This section is intentionally left blank or for future specific needs.
            });
        }
        
        // Monitor component load times
        this.monitorComponentPerformance();
    }

    monitorComponentPerformance() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Navigation timing:', entry);
                }
            }
        });
        
        try {
            observer.observe({ entryTypes: ['navigation'] });
        } catch (error) {
            console.warn('Performance monitoring not supported');
        }
    }

    initializeErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.trackEvent('error', {
                message: event.error?.message,
                filename: event.filename,
                lineno: event.lineno
            });
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.trackEvent('promise_rejection', {
                reason: event.reason?.toString()
            });
        });
    }

    showErrorMessage(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Public API methods
    getCurrentSection() {
        return this.navigationManager?.currentSection || 'home';
    }

    navigateToSection(section) {
        this.navigationManager?.navigateToSection(section);
    }

    reloadComponent(componentName) {
        return this.componentManager?.reloadComponent(componentName);
    }

    getComponentData(componentName) {
        return this.componentManager?.getComponentData(componentName);
    }

    isComponentLoaded(componentName) {
        return this.componentManager?.isComponentLoaded(componentName) || false;
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

// Function to highlight active nav item based on scroll position
function highlightActiveNav() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('#desktop-nav .nav-item, #mobile-nav .nav-item');
  
  let current = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 50 && pageYOffset < sectionTop + sectionHeight - 50) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach((link) => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
}

// Add event listeners
window.addEventListener('scroll', highlightActiveNav);
window.addEventListener('resize', highlightActiveNav);

// Initial call
highlightActiveNav();

// Add collapsible functionality for nav groups
document.querySelectorAll('.nav-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const subitems = toggle.nextElementSibling;
    if (subitems) {
      subitems.classList.toggle('hidden');
      const icon = toggle.querySelector('.fa-chevron-down');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    }
  });
});

// Add search functionality for nav items
const navSearch = document.getElementById('nav-search');
if (navSearch) {
  navSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.nav-group').forEach(group => {
      const toggleText = group.querySelector('.nav-toggle').textContent.toLowerCase();
      const subitems = group.querySelectorAll('.nav-subitems a');
      let hasMatch = toggleText.includes(searchTerm);
      subitems.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchTerm)) {
          hasMatch = true;
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      if (hasMatch) {
        group.style.display = '';
        // Open the group if there's a match inside
        const subitemsDiv = group.querySelector('.nav-subitems');
        if (subitemsDiv && subitemsDiv.classList.contains('hidden')) {
          subitemsDiv.classList.remove('hidden');
          const icon = group.querySelector('.fa-chevron-down');
          if (icon) icon.classList.add('rotate-180');
        }
      } else {
        group.style.display = 'none';
      }
    });
    // Handle standalone items like Welcome and Prompt Library
    document.querySelectorAll('.nav-item:not(.nav-group .nav-item)').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Initialize the app when DOM is ready
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new RealEstateApp();
    });
} else {
    app = new RealEstateApp();
}

// Make app available globally for debugging
window.realEstateApp = app;

// Export for module usage
export default RealEstateApp; 