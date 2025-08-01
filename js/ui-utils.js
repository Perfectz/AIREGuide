// js/ui-utils.js - UI utility functions for the Real Estate Training application

// Modal functionality
export class ModalManager {
    constructor() {
        this.modalContainer = document.getElementById('modal-container');
        this.modalTitle = document.getElementById('modal-title');
        this.modalContent = document.getElementById('modal-content');
        this.modalClose = document.getElementById('modal-close');
        this.init();
    }

    init() {
        // Close modal on background click
        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.closeModal();
            }
        });

        // Close modal on X button
        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modalContainer.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    openModal(title, content) {
        this.modalTitle.textContent = title;
        this.modalContent.innerHTML = content;
        this.modalContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modalContainer.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Tooltip functionality
export class TooltipManager {
    constructor() {
        this.tooltips = [];
        this.init();
    }

    init() {
        // Create tooltip container
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.className = 'tooltip-container';
        this.tooltipContainer.style.cssText = `
            position: fixed;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            max-width: 250px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
        `;
        document.body.appendChild(this.tooltipContainer);

        // Add event listeners for tooltip elements
        document.addEventListener('mouseover', (e) => {
            const tooltip = e.target.getAttribute('data-tooltip');
            if (tooltip) {
                this.showTooltip(e, tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.getAttribute('data-tooltip')) {
                this.hideTooltip();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.tooltipContainer.style.opacity === '1') {
                this.updateTooltipPosition(e);
            }
        });
    }

    showTooltip(event, text) {
        this.tooltipContainer.textContent = text;
        this.tooltipContainer.style.opacity = '1';
        this.updateTooltipPosition(event);
    }

    hideTooltip() {
        this.tooltipContainer.style.opacity = '0';
    }

    updateTooltipPosition(event) {
        const rect = this.tooltipContainer.getBoundingClientRect();
        const x = event.clientX + 10;
        const y = event.clientY - rect.height - 10;

        // Adjust if tooltip would go off screen
        const adjustedX = x + rect.width > window.innerWidth ? event.clientX - rect.width - 10 : x;
        const adjustedY = y < 0 ? event.clientY + 20 : y;

        this.tooltipContainer.style.left = adjustedX + 'px';
        this.tooltipContainer.style.top = adjustedY + 'px';
    }
}

// Navigation functionality
export class NavigationManager {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'chatgpt-features', 'formula', 'example-prompt', 'persona', 'copy', 'omnichannel', 'multimedia', 'multimedia-example', 'prompt-library'];
        
        // Ensure DOM is ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        
        // Desktop navigation
        const desktopNav = document.getElementById('desktop-nav');
        if (desktopNav) {
            desktopNav.addEventListener('click', (e) => {
                if (e.target.closest('.nav-item')) {
                    e.preventDefault();
                    const href = e.target.closest('.nav-item').getAttribute('href');
                    this.navigateToSection(href.substring(1));
                }
            });
        } else {
        }

        // Mobile navigation
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
            mobileNav.addEventListener('click', (e) => {
                if (e.target.closest('.nav-item')) {
                    e.preventDefault();
                    const href = e.target.closest('.nav-item').getAttribute('href');
                    this.navigateToSection(href.substring(1));
                    this.closeMobileMenu();
                }
            });
        }

        // Mobile menu toggle - initialize immediately
        this.initializeMobileMenuToggle();
        
        // Try again after delays to catch late-loading elements
        setTimeout(() => {
            this.initializeMobileMenuToggle();
        }, 100);
        
        setTimeout(() => {
            this.initializeMobileMenuToggle();
        }, 500);
        
        // Also initialize on window resize (responsive behavior)
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.initializeMobileMenuToggle();
            }, 100);
        });
        
        // Fallback: Use event delegation on document for menu button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('#menu-btn')) {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuBtn = document.getElementById('menu-btn');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });
        
        // Keyboard navigation for mobile menu
        document.addEventListener('keydown', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuBtn = document.getElementById('menu-btn');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                const menuItems = mobileMenu.querySelectorAll('.mobile-nav-item');
                const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement);
                
                switch (e.key) {
                    case 'Escape':
                        e.preventDefault();
                        this.closeMobileMenu();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentIndex < menuItems.length - 1) {
                            menuItems[currentIndex + 1].focus();
                        } else {
                            menuItems[0].focus();
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentIndex > 0) {
                            menuItems[currentIndex - 1].focus();
                        } else {
                            menuItems[menuItems.length - 1].focus();
                        }
                        break;
                    case 'Home':
                        e.preventDefault();
                        menuItems[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        menuItems[menuItems.length - 1].focus();
                        break;
                }
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.showSection(e.state.section);
            }
        });

        // Handle hash changes for internal links
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.sections.includes(hash)) {
                this.navigateToSection(hash);
            }
        });

        // Initial navigation
        const hash = window.location.hash.substring(1);
        if (hash && this.sections.includes(hash)) {
            this.navigateToSection(hash);
        } else {
            this.navigateToSection('home');
        }
    }

    navigateToSection(sectionId) {
        if (this.sections.includes(sectionId)) {
            this.showSection(sectionId);
            this.updateActiveNav(sectionId);
            this.updateURL(sectionId);
            this.currentSection = sectionId;
        }
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    updateActiveNav(sectionId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active-nav');
        });

        // Add active class to current nav item
        const activeNavItem = document.querySelector(`[href="#${sectionId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active-nav');
        }
    }

    updateURL(sectionId) {
        const url = new URL(window.location);
        url.hash = sectionId;
        window.history.pushState({ section: sectionId }, '', url);
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuBtn = document.getElementById('menu-btn');
        
        if (mobileMenu) {
            
            const wasHidden = mobileMenu.classList.contains('hidden-mobile');
            mobileMenu.classList.toggle('hidden-mobile');
            const isHidden = mobileMenu.classList.contains('hidden-mobile');
            
            // Update aria-expanded attribute for accessibility
            if (menuBtn) {
                const isExpanded = !isHidden;
                menuBtn.setAttribute('aria-expanded', isExpanded);
                
                // Announce menu state to screen readers
                const announcement = isExpanded ? 'Mobile navigation menu opened' : 'Mobile navigation menu closed';
                this.announceToScreenReader(announcement);
            }
            
            // Update aria-hidden on mobile menu
            mobileMenu.setAttribute('aria-hidden', isHidden);
            
            // Focus management
            if (!isHidden) {
                // Focus first menu item when opening
                const firstMenuItem = mobileMenu.querySelector('.mobile-nav-item');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            } else {
                // Return focus to menu button when closing
                if (menuBtn) {
                    menuBtn.focus();
                }
            }
            
            // Force a reflow to ensure changes are applied
            mobileMenu.offsetHeight;
            
            // Dispatch custom event for other components
            const event = new CustomEvent('mobileMenuToggle', {
                detail: { isOpen: !isHidden }
            });
            document.dispatchEvent(event);
            
        } else {
            console.warn('Mobile menu not found!');
            console.warn('Available elements with mobile-menu:', document.querySelectorAll('#mobile-menu, [class*="mobile-menu"]'));
        }
        
        if (!menuBtn) {
            console.warn('Menu button not found during toggle!');
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuBtn = document.getElementById('menu-btn');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden-mobile')) {
            mobileMenu.classList.add('hidden-mobile');
            mobileMenu.setAttribute('aria-hidden', 'true');
            
            // Update aria-expanded attribute
            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus(); // Return focus to menu button
            }
            
            // Announce to screen readers
            this.announceToScreenReader('Mobile navigation menu closed');
        }
    }

    initializeMobileMenuToggle() {
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn && !menuBtn.hasAttribute('data-initialized')) {
            
            // Add multiple event types for better compatibility
            const clickHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            };
            
            menuBtn.addEventListener('click', clickHandler);
            menuBtn.addEventListener('touchend', clickHandler);
            menuBtn.addEventListener('pointerup', clickHandler);
            
            // Set initial aria-expanded state
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('data-initialized', 'true');
            
        } else if (!menuBtn) {
            console.warn('Menu button not found! DOM state:', document.readyState);
            console.warn('Available elements with menu-btn class:', document.querySelectorAll('.menu-btn, [class*="menu-btn"]'));
        }
    }

    announceToScreenReader(message) {
        const statusRegion = document.getElementById('status');
        if (statusRegion) {
            statusRegion.textContent = message;
            // Clear the message after a short delay
            setTimeout(() => {
                statusRegion.textContent = '';
            }, 3000);
        }
    }
}

// Copy to clipboard functionality
export class ClipboardManager {
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (fallbackErr) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    }

    static showCopyFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('bg-green-500');
        button.classList.remove('bg-blue-500');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-500');
            button.classList.add('bg-blue-500');
        }, 2000);
    }
}

// Accordion functionality
export class AccordionManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.init();
    }

    init() {
        if (!this.container) return;

        this.container.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-accordion-trigger]');
            if (trigger) {
                e.preventDefault();
                this.toggleAccordion(trigger);
            }
        });
    }

    toggleAccordion(trigger) {
        const content = trigger.nextElementSibling;
        const isOpen = content.style.display === 'block';

        // Close all other accordions
        this.container.querySelectorAll('[data-accordion-content]').forEach(item => {
            item.style.display = 'none';
        });

        this.container.querySelectorAll('[data-accordion-trigger]').forEach(item => {
            item.classList.remove('bg-blue-600');
            item.classList.add('bg-gray-600');
        });

        // Toggle current accordion
        if (!isOpen) {
            content.style.display = 'block';
            trigger.classList.remove('bg-gray-600');
            trigger.classList.add('bg-blue-600');
        }
    }
}

// Loading state management
export class LoadingManager {
    static show(container) {
        const loader = document.createElement('div');
        loader.className = 'loading-spinner';
        loader.innerHTML = `
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="text-gray-600 mt-2">Loading...</p>
        `;
        container.appendChild(loader);
        return loader;
    }

    static hide(loader) {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }
} 