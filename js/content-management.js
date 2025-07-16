// js/content-management.js - Content management features for Phase 5

import { showNotification, loadData, saveData } from '/js/utils.js';

export class ContentManager {
    constructor() {
        this.ratings = this.loadRatings();
        this.favorites = this.loadFavorites();
        this.exportHistory = this.loadExportHistory();
        this.init();
    }

    init() {
        this.initSocialSharing();
        this.initContentFiltering();
        this.initContentRating();
        this.initContentAnalytics();
    }

    // Social Sharing
    initSocialSharing() {
        // Add social share buttons to cards
        document.querySelectorAll('.card').forEach(card => {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'btn btn-ghost share-btn';
            shareBtn.innerHTML = '📤 Share';
            shareBtn.setAttribute('aria-label', 'Share this content');
            
            shareBtn.addEventListener('click', () => {
                this.showShareDialog(card);
            });
            
            // Add to card
            const cardHeader = card.querySelector('h2, h3') || card;
            if (cardHeader.querySelector('.export-container')) {
                cardHeader.querySelector('.export-container').appendChild(shareBtn);
            } else {
                const container = document.createElement('div');
                container.className = 'export-container';
                container.appendChild(shareBtn);
                cardHeader.appendChild(container);
            }
        });
    }

    showShareDialog(card) {
        const content = this.extractSectionContent(card);
        const title = content.title;
        const text = content.text.substring(0, 200) + '...';
        const url = window.location.href;

        const shareOptions = [
            { platform: 'twitter', label: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
            { platform: 'linkedin', label: 'LinkedIn', icon: '💼', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
            // Using a simpler share URL for Facebook that works better on mobile
            { platform: 'facebook', label: 'Facebook', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}` },
            // Add WhatsApp for mobile sharing
            { platform: 'whatsapp', label: 'WhatsApp', icon: '📱', url: `whatsapp://send?text=${encodeURIComponent(title + ' ' + url)}` },
            { platform: 'email', label: 'Email', icon: '📧', url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}` },
            { platform: 'copy', label: 'Copy Link', icon: '📋', action: 'copy' }
        ];

        this.createShareDialog(shareOptions, title);
    }

    createShareDialog(options, title) {
        const dialog = document.createElement('div');
        dialog.className = 'share-dialog';
        dialog.innerHTML = `
            <div class="share-dialog-content">
                <div class="share-dialog-header">
                    <h3>Share "${title}"</h3>
                    <button class="share-dialog-close" aria-label="Close share dialog">×</button>
                </div>
                <div class="share-options">
                    ${options.map(option => `
                        <button class="share-option" data-platform="${option.platform}">
                            <span class="share-icon" aria-hidden="true">${option.icon}</span>
                            <span class="share-label">${option.label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners
        dialog.querySelector('.share-dialog-close').addEventListener('click', () => {
            dialog.remove();
        });

        dialog.querySelectorAll('.share-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                const option = options.find(opt => opt.platform === platform);
                
                if (option.action === 'copy') {
                    this.copyToClipboard(window.location.href);
                    showNotification('Link copied to clipboard!', 'success');
                } else {
                    window.open(option.url, '_blank', 'width=600,height=400');
                }
                
                dialog.remove();
            });
        });
        
        // Add responsiveness and mobile testing considerations
        dialog.classList.add('share-dialog-mobile-ready'); // Add class for specific mobile styles
        
        // Close dialog on outside click (useful for mobile overlay)
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) {
                dialog.remove();
            }
        });

        document.body.appendChild(dialog);
    }

    // Handle filter panel visibility (for mobile toggle)
    toggleFilterPanel() {
        const panel = document.querySelector('.filter-panel');
        const filterBtn = document.getElementById('toggle-filter-panel');
        if (panel && filterBtn) {
            const isHidden = panel.classList.toggle('hidden');
            filterBtn.setAttribute('aria-expanded', !isHidden);
            // Focus the panel when opened for accessibility
            if (!isHidden) {
                panel.focus();
            }
        }
    }

    // Content Filtering
    initContentFiltering() {
        this.createFilterToggleButton();
        this.createFilterPanel();
        this.setupFilterLogic();
    }

    createFilterPanel() {
        const filterPanel = document.createElement('div');
        filterPanel.className = 'filter-panel';
        // Add role and initial state for accessibility
        filterPanel.setAttribute('role', 'dialog');
        filterPanel.setAttribute('aria-modal', 'true');
        filterPanel.setAttribute('aria-labelledby', 'filter-panel-title');
        filterPanel.setAttribute('tabindex', '-1'); // Make panel focusable
        
        filterPanel.innerHTML = `
            <div class="filter-header">
                <h3 id="filter-panel-title">Filter Content</h3>
                <button class="filter-close" aria-label="Close filter panel">
                    <span aria-hidden="true">×</span>
                </button>
                <!-- Add a subtle close button for better mobile UX -->
                <button class="filter-close-overlay" aria-label="Close filter panel"></button>
            </div>
            <div class="filter-options">
                <div class="filter-group">
                    <label>Content Type</label>
                    <div class="filter-checkboxes">
                        <label><input type="checkbox" value="formula" checked> Formula</label>
                        <label><input type="checkbox" value="persona" checked> Persona</label>
                        <label><input type="checkbox" value="copy" checked> Copy</label>
                        <label><input type="checkbox" value="omnichannel" checked> Omnichannel</label>
                        <label><input type="checkbox" value="multimedia" checked> Multimedia</label>
                    </div>
                </div>
                <div class="filter-group">
                    <label>Difficulty Level</label>
                    <div class="filter-checkboxes">
                        <label><input type="checkbox" value="beginner" checked> Beginner</label>
                        <label><input type="checkbox" value="intermediate" checked> Intermediate</label>
                        <label><input type="checkbox" value="advanced" checked> Advanced</label>
                    </div>
                </div>
                <div class="filter-group">
                    <label>Show Only</label>
                    <div class="filter-checkboxes">
                        <label><input type="checkbox" value="bookmarked"> Bookmarked</label>
                        <label><input type="checkbox" value="rated"> Highly Rated</label>
                        <label><input type="checkbox" value="recent"> Recently Viewed</label>
                    </div>
                </div>
            </div>
            <div class="filter-actions">
                <button class="btn btn-secondary" id="clear-filters">Clear Filters</button>
                <button class="btn btn-primary" id="apply-filters">Apply Filters</button>
            </div>
        `;

        document.body.appendChild(filterPanel);
    }

    createFilterToggleButton() {
        // Assuming there's a place in the HTML to put this, like a header
        const header = document.querySelector('header') || document.body; // Fallback to body
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'toggle-filter-panel';
        toggleBtn.className = 'btn btn-secondary toggle-filter-panel';
        toggleBtn.innerHTML = '<span aria-hidden="true">📊</span> Filter';
        toggleBtn.setAttribute('aria-controls', 'filter-panel');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Toggle filter panel');

        toggleBtn.addEventListener('click', () => {
            this.toggleFilterPanel();
        });

        header.appendChild(toggleBtn); // Adjust where this button should be placed
    }

    setupFilterLogic() {
        const filterCheckboxes = document.querySelectorAll('.filter-checkboxes input');
        const clearFiltersBtn = document.getElementById('clear-filters');
        const applyFiltersBtn = document.getElementById('apply-filters');
        const filterPanel = document.querySelector('.filter-panel');
        const closeButtons = filterPanel ? filterPanel.querySelectorAll('.filter-close, .filter-close-overlay') : [];

        filterCheckboxes.forEach(checkbox => {
            // Add ARIA attributes to checkboxes (already standard HTML input accessibility)
            // Ensure they are correctly associated with labels (standard practice with <label> tag)
             const label = checkbox.closest('label');
             if (label) checkbox.setAttribute('aria-labelledby', label.id || label.textContent.trim().replace(/\s+/g, '-').toLowerCase());

            checkbox.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        clearFiltersBtn.addEventListener('click', () => {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            this.applyFilters();
            // Optionally close panel after clearing on mobile
             if (window.innerWidth <= 768) { // Example breakpoint
                 this.toggleFilterPanel();
             }
        });

        applyFiltersBtn.addEventListener('click', () => {
            this.applyFilters();
            // Optionally close panel after applying on mobile
            if (window.innerWidth <= 768) { // Example breakpoint
                this.toggleFilterPanel();
            }
        });

         closeButtons.forEach(btn => btn.addEventListener('click', () => {
             this.toggleFilterPanel();
         }));
     }

    applyFilters() {
        const selectedTypes = Array.from(document.querySelectorAll('input[value="formula"], input[value="persona"], input[value="copy"], input[value="omnichannel"], input[value="multimedia"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const selectedLevels = Array.from(document.querySelectorAll('input[value="beginner"], input[value="intermediate"], input[value="advanced"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const showOnly = Array.from(document.querySelectorAll('input[value="bookmarked"], input[value="rated"], input[value="recent"]'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Apply filters to content sections
        document.querySelectorAll('.content-section').forEach(section => {
            let shouldShow = true;

            // Check content type
            if (selectedTypes.length > 0) {
                const sectionType = this.getSectionType(section);
                if (!selectedTypes.includes(sectionType)) {
                    shouldShow = false;
                }
            }

            // Check difficulty level
            if (selectedLevels.length > 0) {
                const sectionLevel = this.getSectionLevel(section);
                if (!selectedLevels.includes(sectionLevel)) {
                    shouldShow = false;
                }
            }

            // Check show only filters
            if (showOnly.length > 0) {
                if (showOnly.includes('bookmarked') && !this.isBookmarked(section)) {
                    shouldShow = false;
                }
                if (showOnly.includes('rated') && !this.isHighlyRated(section)) {
                    shouldShow = false;
                }
                if (showOnly.includes('recent') && !this.isRecentlyViewed(section)) {
                    shouldShow = false;
                }
            }

            section.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Content Rating
    initContentRating() {
        document.querySelectorAll('.card').forEach(card => {
            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'rating-container';
            ratingContainer.setAttribute('role', 'group'); // Group stars semantically
            ratingContainer.setAttribute('aria-label', 'Content rating'); // Label for the group
            ratingContainer.innerHTML = `
                <div class="rating-stars">
                    <span class="star" data-rating="1" tabindex="0" role="radio" aria-label="1 star" aria-checked="false">☆</span>
                    <span class="star" data-rating="2" tabindex="0" role="radio" aria-label="2 stars" aria-checked="false">☆</span>
                    <span class="star" data-rating="3" tabindex="0" role="radio" aria-label="3 stars" aria-checked="false">☆</span>
                    <span class="star" data-rating="4" tabindex="0" role="radio" aria-label="4 stars" aria-checked="false">☆</span>
                    <span class="star" data-rating="5" tabindex="0" role="radio" aria-label="5 stars" aria-checked="false">☆</span>
                </div>
                <span class="rating-count">0 ratings</span>
            `;

            // Add event listeners
            ratingContainer.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', () => {
                    const rating = parseInt(star.dataset.rating);
                    this.rateContent(card, rating, ratingContainer);
                });

                star.addEventListener('mouseenter', () => {
                    this.highlightStars(ratingContainer, parseInt(star.dataset.rating));
                });

                star.addEventListener('mouseleave', () => {
                    this.resetStarHighlight(ratingContainer);
                });
                
                // Add keyboard interaction
                star.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault(); // Prevent default space behavior (scrolling)
                        this.rateContent(card, parseInt(star.dataset.rating), ratingContainer);
                    }
                });
            });

            // Add to card
            const cardHeader = card.querySelector('h2, h3') || card;
            if (cardHeader.querySelector('.export-container')) {
                cardHeader.querySelector('.export-container').appendChild(ratingContainer);
            } else {
                const container = document.createElement('div');
                container.className = 'export-container';
                container.appendChild(ratingContainer);
                cardHeader.appendChild(container);
            }
        });
    }

    rateContent(card, rating, container) {
        const cardId = this.generateCardId(card);
        
        if (!this.ratings[cardId]) {
            this.ratings[cardId] = { total: 0, count: 0, userRating: 0 };
        }

        // Update user rating
        this.ratings[cardId].userRating = rating;
        
        // Update average rating
        const currentTotal = this.ratings[cardId].total;
        const currentCount = this.ratings[cardId].count;
        const newTotal = currentTotal - this.ratings[cardId].userRating + rating;
        const newCount = currentCount + (this.ratings[cardId].userRating === 0 ? 1 : 0);
        
        this.ratings[cardId].total = newTotal;
        this.ratings[cardId].count = newCount;

        // Update display
        this.updateRatingDisplay(container, this.ratings[cardId]);
        this.saveRatings();

        showNotification(`Rated ${rating} stars!`, 'success');
    }

    updateRatingDisplay(container, ratingData) {
        const stars = container.querySelectorAll('.star');
        const countElement = container.querySelector('.rating-count');

        // Update ARIA attributes for selected state
        const userRating = ratingData.userRating || 0;
        container.setAttribute('aria-valuenow', userRating); // Convey the user's rating to the group
        
        const averageRating = ratingData.count > 0 ? ratingData.total / ratingData.count : 0;
        
        stars.forEach((star, index) => {
            const starRating = index + 1;
            if (starRating <= averageRating) {
                star.textContent = '★';
                star.classList.add('filled'); // Use class for styling
                // If the user has rated, highlight their rating
                if (userRating >= starRating) {
                    star.setAttribute('aria-checked', 'true');
                } else {
                    star.setAttribute('aria-checked', 'false');
                }
            } else {
                star.textContent = '☆';
                star.classList.remove('filled'); // Use class for styling
                star.setAttribute('aria-checked', 'false');
            }
        });

        countElement.textContent = `${ratingData.count} rating${ratingData.count !== 1 ? 's' : ''}`;
    }

    // Utility Methods

    loadFavorites() {
        try {
            const saved = localStorage.getItem('favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    loadExportHistory() {
        try {
            const saved = localStorage.getItem('exportHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading export history:', error);
            return [];
        }
    }

    saveExportHistory() {
        try {
            localStorage.setItem('exportHistory', JSON.stringify(this.exportHistory));
        } catch (error) {
            console.error('Error saving export history:', error);
        }
    }

    getSectionType(section) {
        const sectionId = section.id;
        if (sectionId.includes('formula')) return 'formula';
        if (sectionId.includes('persona')) return 'persona';
        if (sectionId.includes('copy')) return 'copy';
        if (sectionId.includes('omnichannel')) return 'omnichannel';
        if (sectionId.includes('multimedia')) return 'multimedia';
        return 'other';
    }

    getSectionLevel(section) {
        // This would be determined by content analysis or metadata
        // For now, we'll use a simple heuristic
        const content = section.textContent;
        if (content.length < 1000) return 'beginner';
        if (content.length < 3000) return 'intermediate';
        return 'advanced';
    }

    isBookmarked(section) {
        const cardId = this.generateCardId(section);
        return this.favorites.includes(cardId);
    }

    isHighlyRated(section) {
        const cardId = this.generateCardId(section);
        const rating = this.ratings[cardId];
        return rating && rating.count > 0 && (rating.total / rating.count) >= 4;
    }

    isRecentlyViewed(section) {
        const sectionId = section.id;
        const lastVisited = localStorage.getItem(`lastVisited_${sectionId}`);
        if (!lastVisited) return false;
        
        const daysSinceVisit = (Date.now() - new Date(lastVisited).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceVisit <= 7; // Viewed within last 7 days
    }

    generateCardId(card) {
        const title = card.querySelector('h1, h2, h3')?.textContent || 'Untitled';
        const section = card.closest('section')?.id || 'unknown';
        return `${section}-${title.toLowerCase().replace(/\s+/g, '-')}`;
    }

    highlightStars(container, rating) {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                 star.textContent = '★';
                 star.classList.add('filled'); // Use class for styling
            }
        });
    }

    resetStarHighlight(container) { // This needs to respect the user's actual rating
        const stars = container.querySelectorAll('.star');
        stars.forEach(star => {
            star.textContent = '☆';
            star.style.color = '#d1d5db';
        });
    }

    // Refactored resetStarHighlight to show actual rating on mouse leave
     resetStarHighlight(container) {
         const card = container.closest('.card');
         if (card) {
             const cardId = this.generateCardId(card);
             this.updateRatingDisplay(container, this.ratings[cardId] || { total: 0, count: 0, userRating: 0 });
         }
     }
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // Content Analytics
    initContentAnalytics() {
        this.trackContentViews();
        this.trackUserEngagement();
        this.setupAnalyticsEvents();
    }

    trackContentViews() {
        // Track when content sections are viewed
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.recordContentView(sectionId);
                }
            });
        });

        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }

    trackUserEngagement() {
        // Track time spent on content
        let startTime = Date.now();
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                const timeSpent = Date.now() - startTime;
                this.recordTimeSpent(timeSpent);
            } else {
                startTime = Date.now();
            }
        });
    }

    setupAnalyticsEvents() {
        // Track copy actions
        document.addEventListener('click', (event) => {
            if (event.target.matches('.copy-prompt-btn, .copy-prompt')) {
                this.recordCopyAction(event.target);
            }
        });

        // Track rating actions
        document.addEventListener('click', (event) => {
            if (event.target.matches('.star')) {
                this.recordRatingAction(event.target);
            }
        });
    }

    recordContentView(sectionId) {
        const analytics = this.loadAnalytics();
        if (!analytics.views || !analytics.views[sectionId]) {
            analytics.views[sectionId] = 0;
        }
        analytics.views[sectionId]++;
        this.saveAnalytics(analytics);
     }

    recordTimeSpent(timeSpent) {
        const analytics = this.loadAnalytics();
        analytics.totalTimeSpent = (analytics.totalTimeSpent || 0) + timeSpent;
        this.saveAnalytics(analytics);
    }

    recordCopyAction(element) {
        const analytics = this.loadAnalytics();
        analytics.copyActions = (analytics.copyActions || 0) + 1;
        this.saveAnalytics(analytics);
    }

    recordRatingAction(element) {
        const analytics = this.loadAnalytics();
        analytics.ratingActions = (analytics.ratingActions || 0) + 1;
        this.saveAnalytics(analytics);
    }

    loadAnalytics() {
        try {
            const saved = localStorage.getItem('contentAnalytics');
            return saved ? JSON.parse(saved) : { views: {}, totalTimeSpent: 0, copyActions: 0, ratingActions: 0 };
        } catch (error) {
            console.error('Error loading analytics:', error);
            return { views: {}, totalTimeSpent: 0, copyActions: 0, ratingActions: 0 };
        }
    }

    saveAnalytics(analytics) {
        try {
            localStorage.setItem('contentAnalytics', JSON.stringify(analytics));
        } catch (error) {
            console.error('Error saving analytics:', error);
        }
    }

    extractSectionContent(card) {
        const title = card.querySelector('h1, h2, h3')?.textContent || 'Untitled';
        const text = card.textContent || '';
        return { title, text };
    }
}

// Initialize content management features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentManager();
}); 