// js/multimedia-manager.js - Multimedia section functionality

import { MULTIMEDIA_TOOLS } from './data.js';
import { ModalManager } from './ui-utils.js';

export class MultimediaManager {
    constructor() {
        this.modalManager = new ModalManager();
        this.init();
    }

    init() {
        this.initializeToolsGrid();
        this.initializeVideoScriptGenerator();
        this.initializeImagePromptGenerator();
        this.initializeInteractiveElements();
    }

    initializeToolsGrid() {
        const toolsContainer = document.getElementById('multimedia-tools');
        if (!toolsContainer) return;

        toolsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${MULTIMEDIA_TOOLS.map(tool => `
                    <div class="tool-card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                        <div class="flex items-center mb-4">
                            <span class="text-3xl mr-3">${tool.icon}</span>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">${tool.name}</h3>
                                <p class="text-sm text-gray-600">${tool.purpose}</p>
                            </div>
                        </div>
                        
                        <p class="text-gray-700 mb-4">${tool.detail}</p>
                        
                        <div class="flex space-x-2">
                            <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                                Learn More
                            </button>
                            <button class="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors">
                                Try Demo
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    initializeVideoScriptGenerator() {
        const generatorContainer = document.getElementById('video-script-generator');
        if (!generatorContainer) return;

        generatorContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Video Script Generator</h3>
                
                <form id="video-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Video Type</label>
                            <select id="video-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select video type</option>
                                <option value="property-tour">Property Tour</option>
                                <option value="market-update">Market Update</option>
                                <option value="buyer-tips">Buyer Tips</option>
                                <option value="seller-tips">Seller Tips</option>
                                <option value="neighborhood-spotlight">Neighborhood Spotlight</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                            <select id="video-duration" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select duration</option>
                                <option value="15">15 seconds</option>
                                <option value="30">30 seconds</option>
                                <option value="60">1 minute</option>
                                <option value="90">1.5 minutes</option>
                                <option value="120">2 minutes</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Key Points (comma-separated)</label>
                        <input type="text" id="video-points" placeholder="e.g., updated kitchen, large backyard, great location" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select id="video-audience" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select target audience</option>
                            <option value="first-time">First-Time Buyers</option>
                            <option value="upsizing">Upsizing Families</option>
                            <option value="downsizing">Downsizing Empty-Nesters</option>
                            <option value="investors">Real Estate Investors</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                        <select id="video-tone" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="professional">Professional</option>
                            <option value="friendly">Friendly & Warm</option>
                            <option value="energetic">Energetic & Exciting</option>
                            <option value="calm">Calm & Relaxed</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                        Generate Video Script
                    </button>
                </form>
                
                <div id="video-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Generated Video Script:</h4>
                    <div id="video-script" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Generated script will appear here -->
                    </div>
                    <button id="copy-video-script" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializeVideoForm();
    }

    initializeVideoForm() {
        const form = document.getElementById('video-form');
        const copyBtn = document.getElementById('copy-video-script');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateVideoScript();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyVideoScriptToClipboard();
            });
        }
    }

    generateVideoScript() {
        const videoType = document.getElementById('video-type').value;
        const duration = document.getElementById('video-duration').value;
        const points = document.getElementById('video-points').value;
        const audience = document.getElementById('video-audience').value;
        const tone = document.getElementById('video-tone').value;

        if (!videoType || !duration || !points || !audience || !tone) {
            alert('Please fill in all fields');
            return;
        }

        const script = this.createVideoScript(videoType, duration, points, audience, tone);
        
        const scriptOutput = document.getElementById('video-script');
        const outputContainer = document.getElementById('video-output');
        
        if (scriptOutput && outputContainer) {
            scriptOutput.textContent = script;
            outputContainer.classList.remove('hidden');
        }
    }

    createVideoScript(videoType, duration, points, audience, tone) {
        const pointList = points.split(',').map(p => p.trim());
        const toneWords = {
            professional: ['excellent', 'outstanding', 'superior'],
            friendly: ['wonderful', 'amazing', 'fantastic'],
            energetic: ['incredible', 'amazing', 'stunning'],
            calm: ['beautiful', 'peaceful', 'serene']
        };

        const selectedTone = toneWords[tone] || toneWords.professional;
        const randomTone = selectedTone[Math.floor(Math.random() * selectedTone.length)];

        let script = '';
        
        switch (videoType) {
            case 'property-tour':
                script = `[OPENING - 0-3 seconds]
Hey there! I'm [Your Name] with [Company], and I'm excited to show you this ${randomTone} property that's perfect for ${audience}.

[MAIN CONTENT - 3-${duration-5} seconds]
${pointList.map((point, index) => `[${index + 1}] ${point.charAt(0).toUpperCase() + point.slice(1)} - ${this.getPointDescription(point)}`).join('\n')}

[CLOSING - ${duration-5}-${duration} seconds]
If you're interested in this property or want to see more like it, give me a call or visit our website. Thanks for watching!`;
                break;
                
            case 'market-update':
                script = `[OPENING - 0-3 seconds]
Welcome to this week's market update! I'm [Your Name], and here's what's happening in our local real estate market.

[MAIN CONTENT - 3-${duration-5} seconds]
• Current inventory levels and what that means for ${audience}
• Recent sales in your area
• Price trends and predictions
• Best time to buy or sell

[CLOSING - ${duration-5}-${duration} seconds]
For a detailed market analysis, visit our website or give me a call. Thanks for tuning in!`;
                break;
                
            case 'buyer-tips':
                script = `[OPENING - 0-3 seconds]
Buying a home? Here are my top tips for ${audience} to help you navigate the process successfully.

[MAIN CONTENT - 3-${duration-5} seconds]
${pointList.map((point, index) => `[${index + 1}] ${point.charAt(0).toUpperCase() + point.slice(1)} - Essential advice for ${audience}`).join('\n')}

[CLOSING - ${duration-5}-${duration} seconds]
Ready to start your homebuying journey? Contact me for personalized guidance. Thanks for watching!`;
                break;
                
            case 'seller-tips':
                script = `[OPENING - 0-3 seconds]
Thinking of selling? Here are my proven strategies to help you get top dollar for your home.

[MAIN CONTENT - 3-${duration-5} seconds]
${pointList.map((point, index) => `[${index + 1}] ${point.charAt(0).toUpperCase() + point.slice(1)} - Key selling strategies`).join('\n')}

[CLOSING - ${duration-5}-${duration} seconds]
Want a free home valuation? Contact me today. Thanks for watching!`;
                break;
                
            case 'neighborhood-spotlight':
                script = `[OPENING - 0-3 seconds]
Discover why this neighborhood is perfect for ${audience}! I'm [Your Name], and today we're exploring what makes this area special.

[MAIN CONTENT - 3-${duration-5} seconds]
${pointList.map((point, index) => `[${index + 1}] ${point.charAt(0).toUpperCase() + point.slice(1)} - Neighborhood highlights`).join('\n')}

[CLOSING - ${duration-5}-${duration} seconds]
Interested in this neighborhood? Let me show you available properties. Thanks for watching!`;
                break;
        }

        return script;
    }

    getPointDescription(point) {
        const descriptions = {
            'updated kitchen': 'Show the modern appliances and countertops',
            'large backyard': 'Highlight the outdoor space and landscaping',
            'great location': 'Emphasize proximity to amenities',
            'good schools': 'Mention the excellent school district',
            'modern bathroom': 'Show the updated fixtures and design',
            'open floor plan': 'Demonstrate the spacious layout',
            'hardwood floors': 'Show the beautiful flooring throughout',
            'garage': 'Highlight the parking and storage space'
        };
        
        return descriptions[point.toLowerCase()] || 'Show this feature';
    }

    copyVideoScriptToClipboard() {
        const scriptOutput = document.getElementById('video-script');
        if (!scriptOutput) return;

        const text = scriptOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copy-video-script');
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('bg-green-600');
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard');
        });
    }

    initializeImagePromptGenerator() {
        const generatorContainer = document.getElementById('image-prompt-generator');
        if (!generatorContainer) return;

        generatorContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">AI Image Prompt Generator</h3>
                
                <form id="image-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Image Type</label>
                            <select id="image-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select image type</option>
                                <option value="interior">Interior Shot</option>
                                <option value="exterior">Exterior Shot</option>
                                <option value="lifestyle">Lifestyle Scene</option>
                                <option value="neighborhood">Neighborhood</option>
                                <option value="concept">Concept Art</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Style</label>
                            <select id="image-style" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select style</option>
                                <option value="photorealistic">Photorealistic</option>
                                <option value="modern">Modern</option>
                                <option value="traditional">Traditional</option>
                                <option value="luxury">Luxury</option>
                                <option value="minimalist">Minimalist</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Key Elements (comma-separated)</label>
                        <input type="text" id="image-elements" placeholder="e.g., marble countertops, stainless steel appliances, natural light" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Mood</label>
                        <select id="image-mood" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select mood</option>
                            <option value="bright">Bright & Airy</option>
                            <option value="warm">Warm & Cozy</option>
                            <option value="elegant">Elegant & Sophisticated</option>
                            <option value="peaceful">Peaceful & Serene</option>
                            <option value="energetic">Energetic & Dynamic</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                        Generate Image Prompt
                    </button>
                </form>
                
                <div id="image-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Generated Image Prompt:</h4>
                    <div id="image-prompt" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Generated prompt will appear here -->
                    </div>
                    <button id="copy-image-prompt" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializeImageForm();
    }

    initializeImageForm() {
        const form = document.getElementById('image-form');
        const copyBtn = document.getElementById('copy-image-prompt');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateImagePrompt();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyImagePromptToClipboard();
            });
        }
    }

    generateImagePrompt() {
        const imageType = document.getElementById('image-type').value;
        const style = document.getElementById('image-style').value;
        const elements = document.getElementById('image-elements').value;
        const mood = document.getElementById('image-mood').value;

        if (!imageType || !style || !elements || !mood) {
            alert('Please fill in all fields');
            return;
        }

        const prompt = this.createImagePrompt(imageType, style, elements, mood);
        
        const promptOutput = document.getElementById('image-prompt');
        const outputContainer = document.getElementById('image-output');
        
        if (promptOutput && outputContainer) {
            promptOutput.textContent = prompt;
            outputContainer.classList.remove('hidden');
        }
    }

    createImagePrompt(imageType, style, elements, mood) {
        const elementList = elements.split(',').map(e => e.trim());
        const moodDescriptions = {
            bright: 'bright and airy lighting',
            warm: 'warm and cozy atmosphere',
            elegant: 'elegant and sophisticated ambiance',
            peaceful: 'peaceful and serene environment',
            energetic: 'energetic and dynamic feel'
        };

        let prompt = '';
        
        switch (imageType) {
            case 'interior':
                prompt = `Generate a ${style} interior shot of a modern home featuring ${elementList.join(', ')}. The lighting should be ${moodDescriptions[mood]}, as if from large windows or skylights. The style should be clean and inviting. Aspect ratio 16:9. --style raw`;
                break;
                
            case 'exterior':
                prompt = `Generate a ${style} exterior shot of a beautiful home with ${elementList.join(', ')}. The lighting should be ${moodDescriptions[mood]}, with natural sunlight. The landscaping should be well-maintained and inviting. Aspect ratio 16:9. --style raw`;
                break;
                
            case 'lifestyle':
                prompt = `Generate a ${style} lifestyle scene showing people enjoying a home with ${elementList.join(', ')}. The mood should be ${moodDescriptions[mood]}, capturing authentic moments of daily life. Aspect ratio 16:9. --style raw`;
                break;
                
            case 'neighborhood':
                prompt = `Generate a ${style} neighborhood shot featuring ${elementList.join(', ')}. The lighting should be ${moodDescriptions[mood]}, showing a welcoming community atmosphere. Aspect ratio 16:9. --style raw`;
                break;
                
            case 'concept':
                prompt = `Generate a ${style} concept art of a dream home featuring ${elementList.join(', ')}. The mood should be ${moodDescriptions[mood]}, with an aspirational and inspiring feel. Aspect ratio 16:9. --style raw`;
                break;
        }

        return prompt;
    }

    copyImagePromptToClipboard() {
        const promptOutput = document.getElementById('image-prompt');
        if (!promptOutput) return;

        const text = promptOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copy-image-prompt');
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('bg-green-600');
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard');
        });
    }

    initializeInteractiveElements() {
        this.initializeWorkflowGuide();
        this.initializeToolComparison();
    }

    initializeWorkflowGuide() {
        const guideContainer = document.getElementById('workflow-guide');
        if (!guideContainer) return;

        const workflowSteps = [
            {
                step: 1,
                title: "Plan Your Content",
                description: "Decide on your message, target audience, and key points",
                tools: ["ChatGPT for script ideas", "Notion for planning"]
            },
            {
                step: 2,
                title: "Generate Script",
                description: "Use AI to create your video script or image prompt",
                tools: ["Our script generator", "ChatGPT for refinement"]
            },
            {
                step: 3,
                title: "Create Voiceover",
                description: "Convert your script to natural-sounding audio",
                tools: ["ElevenLabs", "Murf.ai", "Play.ht"]
            },
            {
                step: 4,
                title: "Generate Images",
                description: "Create visuals that match your brand and message",
                tools: ["Midjourney", "DALL-E", "Stable Diffusion"]
            },
            {
                step: 5,
                title: "Assemble Video",
                description: "Combine audio, images, and effects into final video",
                tools: ["Google Veo", "CapCut", "Adobe Premiere"]
            }
        ];

        guideContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Content Creation Workflow</h3>
                
                <div class="space-y-4">
                    ${workflowSteps.map(step => `
                        <div class="workflow-step bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <div class="flex items-start">
                                <div class="step-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                    ${step.step}
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-2">${step.title}</h4>
                                    <p class="text-gray-600 mb-3">${step.description}</p>
                                    <div class="bg-white p-3 rounded border">
                                        <p class="text-sm text-gray-700"><strong>Tools:</strong> ${step.tools.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initializeToolComparison() {
        const comparisonContainer = document.getElementById('tool-comparison');
        if (!comparisonContainer) return;

        const comparisonData = [
            {
                tool: 'ElevenLabs',
                bestFor: 'Natural voiceovers',
                pros: 'Very realistic, multiple voices',
                cons: 'Paid service, learning curve',
                price: '$22/month'
            },
            {
                tool: 'Midjourney',
                bestFor: 'High-quality images',
                pros: 'Excellent quality, artistic style',
                cons: 'Discord-based, paid',
                price: '$10/month'
            },
            {
                tool: 'Google Veo',
                bestFor: 'Video generation',
                pros: 'Easy to use, good quality',
                cons: 'Limited control, new tool',
                price: 'Free (beta)'
            },
            {
                tool: 'Hedra',
                bestFor: 'Talking avatars',
                pros: 'Personal touch, easy setup',
                cons: 'Limited customization',
                price: '$29/month'
            }
        ];

        comparisonContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Tool Comparison</h3>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tool</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best For</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pros</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cons</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${comparisonData.map(row => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-3 text-sm font-medium text-gray-900">${row.tool}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.bestFor}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.pros}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.cons}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.price}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
} 