// js/interactive-features.js - Enhanced interactive features for Phase 3

class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.initCollapsibleSections();
        this.initCopyToClipboard();
        this.initTooltips();
        this.initSmoothScrolling();
        this.initProgressIndicators();
    }

    // Collapsible Sections
    initCollapsibleSections() {
        const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
        
        collapsibleHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const section = header.closest('.collapsible-section');
                const isActive = section.classList.contains('active');
                
                // Close all other sections
                document.querySelectorAll('.collapsible-section').forEach(s => {
                    s.classList.remove('active');
                    s.querySelector('.collapsible-header').classList.remove('active');
                });
                
                // Toggle current section
                if (!isActive) {
                    section.classList.add('active');
                    header.classList.add('active');
                }
            });
        });
    }

    // Copy to Clipboard with Animation
    initCopyToClipboard() {
        const copyButtons = document.querySelectorAll('.copy-btn, .copy-prompt-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const textToCopy = this.getTextToCopy(button);
                if (!textToCopy) return;
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    this.showCopySuccess(button);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    this.showCopyError(button);
                }
            });
        });
    }

    getTextToCopy(button) {
        // Try different selectors to find the text to copy
        const promptText = button.closest('.prompt-card')?.querySelector('.prompt-text')?.textContent;
        const templateContent = button.closest('.prompt-template')?.querySelector('.template-content')?.textContent;
        const codeBlock = button.closest('.code-block')?.textContent;
        
        return promptText || templateContent || codeBlock || '';
    }

    showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.classList.add('copy-success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copy-success');
        }, 2000);
    }

    showCopyError(button) {
        const originalText = button.textContent;
        button.textContent = '✗ Failed';
        button.classList.add('copy-error');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copy-error');
        }, 2000);
    }

    // Enhanced Tooltips
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'enhanced-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        setTimeout(() => tooltip.classList.add('show'), 10);
    }

    hideTooltip() {
        const tooltip = document.querySelector('.enhanced-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Add active state to clicked link
                    this.updateActiveTocLink(link);
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add highlight effect to target section
                    this.highlightTargetSection(targetElement);
                }
            });
        });
        
        // Handle scroll-based active state updates
        this.initScrollSpy();
    }
    
    // Update active state for TOC links
    updateActiveTocLink(activeLink) {
        // Remove active class from all TOC links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }
    
    // Highlight target section
    highlightTargetSection(targetElement) {
        // Remove existing highlights
        document.querySelectorAll('.collapsible-section').forEach(section => {
            section.classList.remove('highlight-target');
        });
        
        // Add highlight to target
        targetElement.classList.add('highlight-target');
        
        // Remove highlight after animation
        setTimeout(() => {
            targetElement.classList.remove('highlight-target');
        }, 2000);
    }
    
    // Scroll spy for TOC navigation
    initScrollSpy() {
        const tocLinks = document.querySelectorAll('a[href^="#"]');
        const sections = Array.from(tocLinks).map(link => {
            const id = link.getAttribute('href').substring(1);
            return document.getElementById(id);
        }).filter(Boolean);
        
        if (sections.length === 0) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    const activeLink = document.querySelector(`a[href="#${targetId}"]`);
                    if (activeLink) {
                        this.updateActiveTocLink(activeLink);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Progress Indicators
    initProgressIndicators() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const progress = bar.dataset.progress || 0;
            this.animateProgressBar(bar, progress);
        });
    }

    animateProgressBar(bar, targetProgress) {
        let currentProgress = 0;
        const increment = targetProgress / 50; // 50 steps for smooth animation
        
        const interval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(interval);
            }
            
            bar.style.width = currentProgress + '%';
            bar.setAttribute('aria-valuenow', currentProgress);
        }, 20);
    }

    // Skeleton Loading
    showSkeletonLoading(container) {
        container.classList.add('loading');
        container.innerHTML = `
            <div class="skeleton-card">
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-text-short"></div>
            </div>
        `;
    }

    hideSkeletonLoading(container) {
        container.classList.remove('loading');
    }

    // Search and Filter
    initSearchAndFilter() {
        const searchInput = document.querySelector('#prompt-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterPrompts(searchTerm);
        });
    }

    filterPrompts(searchTerm) {
        const promptCards = document.querySelectorAll('.prompt-card');
        
        promptCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm);
            
            card.style.display = isVisible ? 'block' : 'none';
            card.style.opacity = isVisible ? '1' : '0';
            card.style.transform = isVisible ? 'scale(1)' : 'scale(0.95)';
        });
    }

    // Drag and Drop (for prompt organization)
    initDragAndDrop() {
        const draggableItems = document.querySelectorAll('.prompt-card[draggable="true"]');
        
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.id);
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });
        
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const itemId = e.dataTransfer.getData('text/plain');
                const item = document.getElementById(itemId);
                
                if (item && zone !== item.parentNode) {
                    zone.appendChild(item);
                }
            });
        });
    }
}

// Export for use in other modules
export { InteractiveFeatures }; 