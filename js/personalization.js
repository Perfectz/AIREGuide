// js/personalization.js - Personalization features for Phase 5

export class PersonalizationManager {
    constructor() {
        this.preferences = this.loadPreferences();
        this.bookmarks = this.loadBookmarks();
        this.initCustomizableThemes();
        this.initBookmarkSystem();
        this.applyPreferences();
    }

    // Bookmark System
    initBookmarkSystem() {
        // Add bookmark buttons to cards
        document.querySelectorAll('.card').forEach(card => {
            const bookmarkBtn = document.createElement('button');
            bookmarkBtn.className = 'bookmark-btn';
            bookmarkBtn.setAttribute('aria-label', 'Bookmark this content');
            
            // Check if already bookmarked
            const cardId = this.generateCardId(card);
            if (this.bookmarks.includes(cardId)) {
                bookmarkBtn.classList.add('bookmarked');
            }
            
            bookmarkBtn.addEventListener('click', () => {
                this.toggleBookmark(card, bookmarkBtn);
            });
            
            // Add to card header
            const cardHeader = card.querySelector('h2, h3') || card;
            cardHeader.style.position = 'relative';
            cardHeader.appendChild(bookmarkBtn);
        });
    }

    toggleBookmark(card, button) {
        const cardId = this.generateCardId(card);
        const isBookmarked = this.bookmarks.includes(cardId);
        
        if (isBookmarked) {
            this.bookmarks = this.bookmarks.filter(id => id !== cardId);
            button.classList.remove('bookmarked');
            this.announceToScreenReader('Bookmark removed');
        } else {
            this.bookmarks.push(cardId);
            button.classList.add('bookmarked');
            this.announceToScreenReader('Bookmark added');
        }
        
        this.saveBookmarks();
    }

    generateCardId(card) {
        const title = card.querySelector('h1, h2, h3')?.textContent || 'Untitled';
        const section = card.closest('section')?.id || 'unknown';
        return `${section}-${title.toLowerCase().replace(/\s+/g, '-')}`;
    }

    // Customizable Themes
    initCustomizableThemes() {
        this.themes = {
            default: {
                name: 'Default',
                colors: {
                    primary: '#3b82f6',
                    secondary: '#64748b',
                    accent: '#f59e0b'
                }
            },
            ocean: {
                name: 'Ocean',
                colors: {
                    primary: '#0891b2',
                    secondary: '#475569',
                    accent: '#06b6d4'
                }
            },
            forest: {
                name: 'Forest',
                colors: {
                    primary: '#059669',
                    secondary: '#374151',
                    accent: '#10b981'
                }
            },
            sunset: {
                name: 'Sunset',
                colors: {
                    primary: '#dc2626',
                    secondary: '#7c2d12',
                    accent: '#f97316'
                }
            }
        };

        this.applyTheme(this.preferences.customTheme || 'default');
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        Object.entries(theme.colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}-500`, value);
        });

        this.preferences.customTheme = themeName;
        this.savePreferences();
    }

    // Auto Save
    setupAutoSave() {
        if (!this.preferences.autoSave) return;

        // Auto save form data
        document.querySelectorAll('input, textarea, select').forEach(element => {
            element.addEventListener('input', this.debounce(() => {
                this.saveFormData();
            }, 1000));
        });

        // Auto save scroll position
        window.addEventListener('scroll', this.debounce(() => {
            this.saveScrollPosition();
        }, 500));
    }

    saveFormData() {
        const formData = {};
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (element.name || element.id) {
                const key = element.name || element.id;
                formData[key] = element.value;
            }
        });
        
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    saveScrollPosition() {
        const scrollData = {
            x: window.scrollX,
            y: window.scrollY,
            timestamp: Date.now()
        };
        
        localStorage.setItem('scrollPosition', JSON.stringify(scrollData));
    }

    // Utility Methods
    loadPreferences() {
        const defaultPrefs = {
            theme: 'light',
            autoTheme: true,
            reducedMotion: false,
            showProgress: true,
            autoSave: true,
            customTheme: 'default'
        };

        try {
            const saved = localStorage.getItem('userPreferences');
            return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs;
        } catch (error) {
            console.error('Error loading preferences:', error);
            return defaultPrefs;
        }
    }

    savePreferences() {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    }

    loadBookmarks() {
        try {
            const saved = localStorage.getItem('bookmarks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            return [];
        }
    }

    saveBookmarks() {
        try {
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        } catch (error) {
            console.error('Error saving bookmarks:', error);
        }
    }

    applyPreferences() {
        // Apply theme
        document.documentElement.setAttribute('data-theme', this.preferences.theme);
        
        // Apply reduced motion
        if (this.preferences.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        }
        
        // Apply custom theme
        if (this.preferences.customTheme) {
            this.applyTheme(this.preferences.customTheme);
        }
    }

    setupFocusTrap(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
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

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.className = 'announcement';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            announcement.classList.remove('show');
            setTimeout(() => {
                announcement.remove();
            }, 300);
        }, 3000);
    }

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
}

// Initialize personalization features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PersonalizationManager();
});

// Export for use in other modules
 