// js/component-manager.js - Component loading and initialization manager

import { LoadingManager } from './ui-utils.js';

export class ComponentManager {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
        this.init();
    }

    init() {
        // Load all components when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadAllComponents();
            });
        } else {
            this.loadAllComponents();
        }
    }

    async loadAllComponents() {
        const componentSections = [
            'home', 'chatgpt-features', 'formula', 'example-prompt', 'persona', 'copy', 
            'omnichannel', 'multimedia', 'multimedia-example', 'prompt-library'
        ];

        const loadPromises = componentSections.map(section => 
            this.loadComponent(section)
        );

        try {
            await Promise.all(loadPromises);
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    async loadComponent(componentName) {
        if (this.loadedComponents.has(componentName)) {
            return;
        }

        const section = document.getElementById(componentName);
        if (!section) {
            console.warn(`Section ${componentName} not found`);
            return;
        }



        // Show loading spinner
        const loader = LoadingManager.show(section);

        try {
            let html;
            if (location.protocol === 'file:') {
                html = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `components/${componentName}.html`, true);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 0 || xhr.status === 200) {
                                resolve(xhr.responseText);
                            } else {
                                reject(new Error(`XHR error! status: ${xhr.status}`));
                            }
                        }
                    };
                    xhr.send();
                });
            } else {
                const response = await fetch(`components/${componentName}.html`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                html = await response.text();
            }
            section.innerHTML = html;
            
            // Store component data
            this.components.set(componentName, {
                html: html,
                loaded: true,
                timestamp: Date.now()
            });
            
            this.loadedComponents.add(componentName);
            
            // Initialize component-specific functionality
            await this.initializeComponent(componentName);
            
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            let errorMessage = 'Error loading content';
            let additionalInfo = '';
            if (location.protocol === 'file:') {
                additionalInfo = '<p class="text-sm text-gray-600 mt-2">This site requires a web server when running from files. Please serve via HTTP/HTTPS.</p>';
            }
            section.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-red-600">${errorMessage}</p>
                    ${additionalInfo}
                    <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Retry
                    </button>
                </div>
            `;
        } finally {
            LoadingManager.hide(loader);
        }
    }

    async initializeComponent(componentName) {
        switch (componentName) {
            case 'home':
                await this.initializeHome();
                break;
            case 'chatgpt-features':
                await this.initializeChatGPTFeatures();
                break;
            case 'formula':
                await this.initializeFormula();
                break;
            case 'example-prompt':
                await this.initializeExamplePrompt();
                break;
            case 'persona':
                await this.initializePersona();
                break;
            case 'copy':
                await this.initializeCopy();
                break;
            case 'omnichannel':
                await this.initializeOmnichannel();
                break;
            case 'multimedia':
                await this.initializeMultimedia();
                break;
            case 'multimedia-example':
                await this.initializeMultimediaExample();
                break;
            case 'prompt-library':
                await this.initializePromptLibrary();
                break;

            default:
                console.warn(`No initialization found for component: ${componentName}`);
        }
    }

    async initializeHome() {
        // Home component doesn't need special initialization
    }

    async initializeChatGPTFeatures() {
        // ChatGPT Features component doesn't need special initialization
    }

    async initializeFormula() {
        const { FormulaManager } = await import('./formula-manager.js');
        new FormulaManager();
    }

    async initializePersona() {
        const { PersonaManager } = await import('./persona-manager.js');
        new PersonaManager();
    }

    async initializeCopy() {
        const { CopyManager } = await import('./copy-manager.js');
        new CopyManager();
    }

    async initializeOmnichannel() {
        const { OmnichannelManager } = await import('./omnichannel-manager.js');
        new OmnichannelManager();
    }

    async initializeMultimedia() {
        const { MultimediaManager } = await import('./multimedia-manager.js');
        new MultimediaManager();
    }

    async initializePromptLibrary() {
        const { PromptLibraryManager } = await import('./prompt-library-manager.js');
        new PromptLibraryManager();
    }

    async initializeExamplePrompt() {
        // Example prompt component doesn't need special initialization
    }

    async initializeMultimediaExample() {
        // Multimedia Example component doesn't need special initialization
    }


    // Method to reload a specific component
    async reloadComponent(componentName) {
        this.loadedComponents.delete(componentName);
        this.components.delete(componentName);
        await this.loadComponent(componentName);
    }

    // Method to get component data
    getComponentData(componentName) {
        return this.components.get(componentName);
    }

    // Method to check if component is loaded
    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    // Method to preload components (for better performance)
    async preloadComponents(componentNames) {
        const preloadPromises = componentNames.map(name => 
            this.loadComponent(name)
        );
        
        try {
            await Promise.all(preloadPromises);
        } catch (error) {
            console.error('Error preloading components:', error);
        }
    }
} 