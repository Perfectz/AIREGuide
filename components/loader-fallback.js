// components/loader-fallback.js
// Alternative component loader for file:// protocol compatibility

class ComponentLoaderFallback {
    constructor() {
        this.components = new Map();
        this.basePath = 'components/';
    }

    /**
     * Load a component by name (fallback method)
     * @param {string} componentName - The name of the component file (without .html)
     * @returns {Promise<string>} - The HTML content of the component
     */
    async loadComponent(componentName) {
        // Check cache first
        if (this.components.has(componentName)) {
            return this.components.get(componentName);
        }

        // For file:// protocol, we'll use a different approach
        // This is a fallback that embeds components directly
        const componentContent = this.getEmbeddedComponent(componentName);
        
        if (componentContent) {
            this.components.set(componentName, componentContent);
            return componentContent;
        }

        // If no embedded component found, return error message
        return `<div class="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p class="text-red-600">Component not found: ${componentName}</p>
            <p class="text-sm text-red-500">Please use HTTP server (http://localhost:8000) for full functionality.</p>
        </div>`;
    }

    /**
     * Get embedded component content
     * @param {string} componentName - Component name
     * @returns {string|null} - Component HTML or null if not found
     */
    getEmbeddedComponent(componentName) {
        // This would contain the actual component HTML
        // For now, return null to indicate fallback needed
        return null;
    }

    /**
     * Load and inject a component into a target element
     * @param {string} componentName - The name of the component file
     * @param {string|Element} target - The target element or selector
     * @returns {Promise<void>}
     */
    async loadIntoElement(componentName, target) {
        const html = await this.loadComponent(componentName);
        
        const targetElement = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
            
        if (targetElement) {
            targetElement.innerHTML = html;
            
            // Dispatch custom event for component loaded
            targetElement.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { componentName, target: targetElement }
            }));
        } else {
            console.error(`Target element not found for component: ${componentName}`);
        }
    }

    /**
     * Preload multiple components
     * @param {string[]} componentNames - Array of component names to preload
     * @returns {Promise<void>}
     */
    async preloadComponents(componentNames) {
        const promises = componentNames.map(name => this.loadComponent(name));
        await Promise.all(promises);
    }

    /**
     * Clear the component cache
     */
    clearCache() {
        this.components.clear();
    }

    /**
     * Get cache statistics
     * @returns {Object} - Cache statistics
     */
    getCacheStats() {
        return {
            size: this.components.size,
            keys: Array.from(this.components.keys())
        };
    }
}

// Create global instance
window.componentLoader = new ComponentLoaderFallback(); 