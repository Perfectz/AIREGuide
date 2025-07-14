// js/accessibility.js - Accessibility enhancements for Phase 4

export class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.initKeyboardNavigation();
        this.initFocusManagement();
        this.initScreenReaderSupport();
        this.initHighContrastMode();
        this.initSkipLinks();
        this.initARIALabels();
        this.initReducedMotion();
    }

    // Keyboard Navigation
    initKeyboardNavigation() {
        // Handle keyboard navigation for navigation items
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // Handle keyboard navigation for collapsible sections
        const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
        
        collapsibleHeaders.forEach(header => {
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });

        // Handle keyboard navigation for buttons
        const buttons = document.querySelectorAll('button, .btn');
        
        buttons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Handle escape key for modals and overlays
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
    }

    handleEscapeKey() {
        // Close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('block')) {
            this.closeMobileMenu();
        }

        // Close modal
        const modal = document.getElementById('modal-container');
        if (modal && !modal.classList.contains('hidden')) {
            this.closeModal();
        }

        // Close any open tooltips
        const tooltips = document.querySelectorAll('.enhanced-tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuBtn = document.getElementById('menu-btn');
        
        if (mobileMenu) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
        
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Mobile navigation menu closed');
    }

    closeModal() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Focus Management
    initFocusManagement() {
        // Store the last focused element before opening modal/menu
        let lastFocusedElement = null;

        // Handle focus trapping in modals
        const modal = document.getElementById('modal-container');
        if (modal) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }

        // Handle focus restoration
        document.addEventListener('focusin', (e) => {
            if (e.target.closest('#modal-container') || e.target.closest('#mobile-menu')) {
                lastFocusedElement = e.target;
            }
        });

        // Restore focus when modal/menu closes
        const restoreFocus = () => {
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }
        };

        // Listen for modal/menu close events
        document.addEventListener('modalClosed', restoreFocus);
        document.addEventListener('menuClosed', restoreFocus);
    }

    // Screen Reader Support
    initScreenReaderSupport() {
        // Add live regions for dynamic content
        this.createLiveRegion('status', 'status');
        this.createLiveRegion('alert', 'alert');

        // Announce page changes
        const announcePageChange = (pageName) => {
            this.announceToScreenReader(`Navigated to ${pageName} page`);
        };

        // Listen for navigation events
        document.addEventListener('navigationChange', (e) => {
            announcePageChange(e.detail.pageName);
        });

        // Announce loading states
        const announceLoading = (message) => {
            this.announceToScreenReader(message);
        };

        // Listen for loading events
        document.addEventListener('loadingStart', (e) => {
            announceLoading(e.detail.message || 'Loading...');
        });

        document.addEventListener('loadingComplete', (e) => {
            announceLoading(e.detail.message || 'Loading complete');
        });
    }

    createLiveRegion(id, role) {
        const region = document.createElement('div');
        region.id = id;
        region.setAttribute('aria-live', 'polite');
        region.setAttribute('aria-atomic', 'true');
        region.setAttribute('role', role);
        region.className = 'sr-only';
        document.body.appendChild(region);
    }

    announceToScreenReader(message) {
        const statusRegion = document.getElementById('status');
        if (statusRegion) {
            statusRegion.textContent = message;
            // Clear the message after a short delay
            setTimeout(() => {
                statusRegion.textContent = '';
            }, 1000);
        }
    }

    // High Contrast Mode
    initHighContrastMode() {
        // Check for user's high contrast preference
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
        
        if (prefersHighContrast.matches) {
            this.enableHighContrastMode();
        }

        // Listen for changes in contrast preference
        prefersHighContrast.addEventListener('change', (e) => {
            if (e.matches) {
                this.enableHighContrastMode();
            } else {
                this.disableHighContrastMode();
            }
        });

        // Removed: this.createHighContrastToggle(); // No longer creating the toggle button
    }

    enableHighContrastMode() {
        document.documentElement.classList.add('high-contrast');
        this.announceToScreenReader('High contrast mode enabled');
    }

    disableHighContrastMode() {
        document.documentElement.classList.remove('high-contrast');
        this.announceToScreenReader('High contrast mode disabled');
    }

    // Skip Links
    initSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    // ARIA Labels
    initARIALabels() {
        // Add missing ARIA labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });

        // Add ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('[data-tooltip]');
        interactiveElements.forEach(element => {
            const tooltip = element.getAttribute('data-tooltip');
            if (tooltip && !element.getAttribute('aria-label')) {
                element.setAttribute('aria-label', tooltip);
            }
        });

        // Add ARIA labels to form elements
        const inputs = document.querySelectorAll('input:not([aria-label])');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder) {
                input.setAttribute('aria-label', placeholder);
            }
        });
    }

    // Reduced Motion
    initReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            this.enableReducedMotion();
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                this.enableReducedMotion();
            } else {
                this.disableReducedMotion();
            }
        });
    }

    enableReducedMotion() {
        document.documentElement.classList.add('reduced-motion');
    }

    disableReducedMotion() {
        document.documentElement.classList.remove('reduced-motion');
    }

    // Utility methods
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }

    getNextFocusableElement(currentElement, direction = 'forward') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const currentIndex = Array.from(focusableElements).indexOf(currentElement);
        let nextIndex;
        
        if (direction === 'forward') {
            nextIndex = (currentIndex + 1) % focusableElements.length;
        } else {
            nextIndex = currentIndex - 1 < 0 ? focusableElements.length - 1 : currentIndex - 1;
        }
        
        return focusableElements[nextIndex];
    }
}

// Initialize accessibility features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityManager();
});

// Export for use in other modules
 