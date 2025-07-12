// js/prompts-manager.js - Prompts section functionality

import { PROMPT_CATEGORIES } from './data.js';
import { ModalManager, ClipboardManager } from './ui-utils.js';

export class PromptsManager {
    constructor() {
        this.modalManager = new ModalManager();
        this.init();
    }

    init() {
        this.initializePromptCategories();
        this.initializePromptBuilder();
        this.initializeInteractiveElements();
    }

    initializePromptCategories() {
        const categoriesContainer = document.getElementById('prompt-accordion');
        if (!categoriesContainer) return;

        categoriesContainer.innerHTML = `
            <div class="space-y-6">
                ${PROMPT_CATEGORIES.map(category => `
                    <div class="category-section bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">${category.category}</h3>
                        
                        <div class="space-y-4">
                            ${category.prompts.map((prompt, index) => `
                                <div class="prompt-card border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-3">${prompt.title}</h4>
                                    <div class="prompt-content bg-gray-50 p-4 rounded-lg mb-4">
                                        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">${prompt.content}</p>
                                    </div>
                                    
                                    <div class="flex space-x-2">
                                        <button class="copy-prompt bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors font-medium" 
                                                data-prompt="${prompt.content.replace(/"/g, '&quot;')}">
                                            📋 Copy Prompt
                                        </button>
                                        <button class="customize-prompt bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors font-medium"
                                                data-prompt="${prompt.content.replace(/"/g, '&quot;')}">
                                            ✏️ Customize
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.initializePromptEventListeners();
    }

    initializePromptEventListeners() {
        const copyButtons = document.querySelectorAll('.copy-prompt');
        const customizeButtons = document.querySelectorAll('.customize-prompt');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const prompt = button.getAttribute('data-prompt');
                this.copyPrompt(prompt);
            });
        });
        
        customizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const prompt = button.getAttribute('data-prompt');
                this.customizePrompt(prompt);
            });
        });
    }

    copyPrompt(prompt) {
        ClipboardManager.copyToClipboard(prompt).then(success => {
            if (success) {
                // Find the button that was clicked and show feedback
                const buttons = document.querySelectorAll('.copy-prompt');
                buttons.forEach(btn => {
                    if (btn.getAttribute('data-prompt') === prompt) {
                        ClipboardManager.showCopyFeedback(btn);
                    }
                });
            } else {
                alert('Failed to copy to clipboard');
            }
        });
    }

    customizePrompt(originalPrompt) {
        this.modalManager.openModal(
            'Customize Prompt',
            `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Original Prompt:</label>
                    <textarea id="original-prompt" rows="4" class="w-full p-3 border border-gray-300 rounded-lg" readonly>${originalPrompt}</textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Customizations:</label>
                    <div class="space-y-2">
                        <input type="text" id="custom-property" placeholder="Property address or type" class="w-full p-2 border border-gray-300 rounded">
                        <input type="text" id="custom-audience" placeholder="Target audience" class="w-full p-2 border border-gray-300 rounded">
                        <input type="text" id="custom-features" placeholder="Key features" class="w-full p-2 border border-gray-300 rounded">
                        <select id="custom-tone" class="w-full p-2 border border-gray-300 rounded">
                            <option value="">Select tone</option>
                            <option value="professional">Professional</option>
                            <option value="friendly">Friendly</option>
                            <option value="luxury">Luxury</option>
                            <option value="casual">Casual</option>
                        </select>
                    </div>
                </div>
                
                <button id="generate-custom-prompt" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    Generate Custom Prompt
                </button>
                
                <div id="custom-prompt-output" class="hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Customized Prompt:</label>
                    <textarea id="customized-prompt" rows="4" class="w-full p-3 border border-gray-300 rounded-lg" readonly></textarea>
                    <button id="copy-custom-prompt" class="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy Custom Prompt
                    </button>
                </div>
            </div>
            `
        );

        this.initializeCustomizationEventListeners(originalPrompt);
    }

    initializeCustomizationEventListeners(originalPrompt) {
        const generateBtn = document.getElementById('generate-custom-prompt');
        const copyBtn = document.getElementById('copy-custom-prompt');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateCustomizedPrompt(originalPrompt);
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const customizedPrompt = document.getElementById('customized-prompt');
                if (customizedPrompt) {
                    ClipboardManager.copyToClipboard(customizedPrompt.value).then(success => {
                        if (success) {
                            ClipboardManager.showCopyFeedback(copyBtn);
                        } else {
                            alert('Failed to copy to clipboard');
                        }
                    });
                }
            });
        }
    }

    generateCustomizedPrompt(originalPrompt) {
        const property = document.getElementById('custom-property').value;
        const audience = document.getElementById('custom-audience').value;
        const features = document.getElementById('custom-features').value;
        const tone = document.getElementById('custom-tone').value;

        let customizedPrompt = originalPrompt;

        // Replace placeholders with custom values
        if (property) {
            customizedPrompt = customizedPrompt.replace(/\[Property Address\]/g, property);
            customizedPrompt = customizedPrompt.replace(/\[Address\]/g, property);
        }
        
        if (audience) {
            customizedPrompt = customizedPrompt.replace(/\[Target Audience\]/g, audience);
            customizedPrompt = customizedPrompt.replace(/\[Persona Name\]/g, audience);
        }
        
        if (features) {
            customizedPrompt = customizedPrompt.replace(/\[Key Feature 1\]/g, features.split(',')[0]?.trim() || '');
            customizedPrompt = customizedPrompt.replace(/\[Key Feature 2\]/g, features.split(',')[1]?.trim() || '');
            customizedPrompt = customizedPrompt.replace(/\[Key Features\]/g, features);
        }
        
        if (tone) {
            customizedPrompt = customizedPrompt.replace(/\[Tone\]/g, tone);
        }

        const output = document.getElementById('customized-prompt');
        const outputContainer = document.getElementById('custom-prompt-output');
        
        if (output && outputContainer) {
            output.value = customizedPrompt;
            outputContainer.classList.remove('hidden');
        }
    }

    initializePromptBuilder() {
        const builderContainer = document.getElementById('prompt-builder');
        if (!builderContainer) return;

        builderContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Custom Prompt Builder</h3>
                
                <form id="builder-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Prompt Type</label>
                        <select id="builder-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select prompt type</option>
                            <option value="listing">Listing Description</option>
                            <option value="social">Social Media Post</option>
                            <option value="email">Email Newsletter</option>
                            <option value="blog">Blog Post</option>
                            <option value="video">Video Script</option>
                            <option value="persona">Buyer Persona</option>
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                            <select id="builder-audience" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select audience</option>
                                <option value="first-time">First-Time Buyers</option>
                                <option value="upsizing">Upsizing Families</option>
                                <option value="downsizing">Downsizing Empty-Nesters</option>
                                <option value="investors">Real Estate Investors</option>
                                <option value="sellers">Home Sellers</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                            <select id="builder-tone" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select tone</option>
                                <option value="professional">Professional</option>
                                <option value="friendly">Friendly & Warm</option>
                                <option value="luxury">Luxury & Sophisticated</option>
                                <option value="casual">Casual & Relatable</option>
                                <option value="energetic">Energetic & Exciting</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Key Details (comma-separated)</label>
                        <input type="text" id="builder-details" placeholder="e.g., property features, location, price range" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                        <textarea id="builder-instructions" rows="3" placeholder="Any specific requirements or preferences..." 
                                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    
                    <button type="submit" class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                        Build Custom Prompt
                    </button>
                </form>
                
                <div id="builder-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Your Custom Prompt:</h4>
                    <div id="built-prompt" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Built prompt will appear here -->
                    </div>
                    <button id="copy-built-prompt" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializeBuilderForm();
    }

    initializeBuilderForm() {
        const form = document.getElementById('builder-form');
        const copyBtn = document.getElementById('copy-built-prompt');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.buildCustomPrompt();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyBuiltPrompt();
            });
        }
    }

    buildCustomPrompt() {
        const type = document.getElementById('builder-type').value;
        const audience = document.getElementById('builder-audience').value;
        const tone = document.getElementById('builder-tone').value;
        const details = document.getElementById('builder-details').value;
        const instructions = document.getElementById('builder-instructions').value;

        if (!type || !audience || !tone) {
            alert('Please fill in the required fields');
            return;
        }

        const prompt = this.createCustomPrompt(type, audience, tone, details, instructions);
        
        const promptOutput = document.getElementById('built-prompt');
        const outputContainer = document.getElementById('builder-output');
        
        if (promptOutput && outputContainer) {
            promptOutput.textContent = prompt;
            outputContainer.classList.remove('hidden');
        }
    }

    createCustomPrompt(type, audience, tone, details, instructions) {
        const toneDescriptions = {
            professional: 'professional, trustworthy, and knowledgeable',
            friendly: 'friendly, approachable, and warm',
            luxury: 'luxury, sophisticated, and exclusive',
            casual: 'casual, relatable, and down-to-earth',
            energetic: 'energetic, exciting, and dynamic'
        };

        let prompt = `Act as an expert real estate ${this.getRoleForType(type)} with a ${toneDescriptions[tone]} tone. `;

        switch (type) {
            case 'listing':
                prompt += `Write a compelling listing description for a property targeting ${audience}. `;
                if (details) prompt += `Key features to highlight: ${details}. `;
                prompt += `Make the description engaging and ensure it's Fair Housing compliant.`;
                break;
                
            case 'social':
                prompt += `Create an engaging social media post about real estate for ${audience}. `;
                if (details) prompt += `Include: ${details}. `;
                prompt += `Make it shareable and include relevant hashtags.`;
                break;
                
            case 'email':
                prompt += `Write a professional email newsletter for ${audience}. `;
                if (details) prompt += `Cover these topics: ${details}. `;
                prompt += `Include a clear call to action and make it valuable to the reader.`;
                break;
                
            case 'blog':
                prompt += `Create a blog post outline for ${audience}. `;
                if (details) prompt += `Focus on: ${details}. `;
                prompt += `Include an engaging headline, key points, and conclusion.`;
                break;
                
            case 'video':
                prompt += `Write a video script for ${audience}. `;
                if (details) prompt += `Key points to cover: ${details}. `;
                prompt += `Make it conversational and engaging for video format.`;
                break;
                
            case 'persona':
                prompt += `Create a detailed buyer persona for ${audience}. `;
                if (details) prompt += `Include: ${details}. `;
                prompt += `Make it comprehensive and actionable for marketing purposes.`;
                break;
        }

        if (instructions) {
            prompt += `\n\nSpecial instructions: ${instructions}`;
        }

        return prompt;
    }

    getRoleForType(type) {
        const roles = {
            listing: 'copywriter',
            social: 'social media strategist',
            email: 'email marketer',
            blog: 'content writer',
            video: 'video scriptwriter',
            persona: 'market analyst'
        };
        return roles[type] || 'marketer';
    }

    copyBuiltPrompt() {
        const promptOutput = document.getElementById('built-prompt');
        if (!promptOutput) return;

        const text = promptOutput.textContent;
        ClipboardManager.copyToClipboard(text).then(success => {
            if (success) {
                ClipboardManager.showCopyFeedback(document.getElementById('copy-built-prompt'));
            } else {
                alert('Failed to copy to clipboard');
            }
        });
    }

    initializeInteractiveElements() {
        this.initializePromptTips();
        this.initializePromptExamples();
    }

    initializePromptTips() {
        const tipsContainer = document.getElementById('prompt-tips');
        if (!tipsContainer) return;

        const tips = [
            {
                title: "Be Specific",
                description: "Include concrete details about property type, location, features, and target audience",
                example: "Instead of 'Write a listing', say 'Write a 150-word listing for a 3-bedroom ranch in suburban Atlanta'"
            },
            {
                title: "Set the Context",
                description: "Tell the AI who to be and what tone to use",
                example: "'Act as a friendly local Realtor with 15 years of experience'"
            },
            {
                title: "Include Constraints",
                description: "Specify length, format, and style requirements",
                example: "'Write a 30-second video script in a casual, conversational tone'"
            },
            {
                title: "Add Examples",
                description: "Provide samples of your preferred style",
                example: "'Match the tone and style of these examples: [paste your examples]'"
            },
            {
                title: "Request Iterations",
                description: "Ask for multiple versions or refinements",
                example: "'Provide 3 different versions: professional, friendly, and luxury'"
            }
        ];

        tipsContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Prompt Writing Tips</h3>
                
                <div class="space-y-4">
                    ${tips.map(tip => `
                        <div class="tip-card border border-gray-200 rounded-lg p-4">
                            <h4 class="text-lg font-semibold text-gray-800 mb-2">${tip.title}</h4>
                            <p class="text-gray-600 mb-3">${tip.description}</p>
                            <div class="bg-gray-50 p-3 rounded border-l-2 border-blue-500">
                                <p class="text-sm text-gray-700"><strong>Example:</strong> ${tip.example}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initializePromptExamples() {
        const examplesContainer = document.getElementById('prompt-examples');
        if (!examplesContainer) return;

        const examples = [
            {
                category: "Listing Descriptions",
                prompts: [
                    "Act as an expert real estate copywriter. Write a compelling 150-word listing description for a 3-bedroom, 2-bathroom ranch-style home in [neighborhood]. Target audience: first-time buyers. Highlight the updated kitchen, large backyard, and proximity to schools. Ensure Fair Housing compliance.",
                    "Create a luxury listing description for a 5-bedroom estate in [area]. Target: high-net-worth buyers. Emphasize premium finishes, privacy, and exclusivity. Tone: sophisticated and elegant."
                ]
            },
            {
                category: "Social Media",
                prompts: [
                    "Act as a social media strategist. Create 5 engaging Instagram posts about homebuying tips for millennials. Include relevant hashtags and make them visually appealing.",
                    "Write a Facebook post announcing a new listing. Target: local community. Include property highlights and call to action. Tone: friendly and approachable."
                ]
            },
            {
                category: "Email Marketing",
                prompts: [
                    "Act as an email marketer. Write a monthly newsletter for past clients. Include market updates, helpful tips, and a personal touch. Tone: professional but warm.",
                    "Create a follow-up email sequence for new leads. 3 emails over 7 days. Focus on providing value and building trust."
                ]
            }
        ];

        examplesContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Prompt Examples by Category</h3>
                
                <div class="space-y-6">
                    ${examples.map(category => `
                        <div class="category-examples">
                            <h4 class="text-lg font-semibold text-gray-800 mb-3">${category.category}</h4>
                            <div class="space-y-3">
                                ${category.prompts.map((prompt, index) => `
                                    <div class="example-prompt bg-gray-50 p-4 rounded-lg border">
                                        <p class="text-gray-700 text-sm mb-2">${prompt}</p>
                                        <button class="copy-example bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                                                data-prompt="${prompt.replace(/"/g, '&quot;')}">
                                            Copy Example
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners for example copy buttons
        const exampleButtons = document.querySelectorAll('.copy-example');
        exampleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const prompt = button.getAttribute('data-prompt');
                this.copyPrompt(prompt);
            });
        });
    }
} 