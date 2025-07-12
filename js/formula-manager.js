// js/formula-manager.js - Formula section functionality

import { RULES_DATA } from './data.js';
import { ModalManager } from './ui-utils.js';

export class FormulaManager {
    constructor() {
        this.modalManager = new ModalManager();
        this.init();
    }

    init() {
        this.initializeRules();
        this.initializeCharts();
        this.initializeInteractiveElements();
    }

    initializeRules() {
        const rulesAccordion = document.getElementById('rules-accordion');
        if (!rulesAccordion) return;

        rulesAccordion.innerHTML = RULES_DATA.map((rule, index) => `
            <div class="accordion-item bg-white border border-gray-200 rounded-lg mb-2">
                <button class="accordion-header w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors" 
                        onclick="this.parentElement.classList.toggle('active')">
                    <div class="flex justify-between items-center">
                        <h4 class="text-lg font-semibold text-gray-800">${rule.title}</h4>
                        <span class="accordion-icon text-gray-500 transform transition-transform">▼</span>
                    </div>
                </button>
                <div class="accordion-content p-4 border-t border-gray-200">
                    <div class="text-gray-600 leading-relaxed">${rule.content}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers for accordion functionality
        const accordionHeaders = rulesAccordion.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');
                
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle content visibility
                if (item.classList.contains('active')) {
                    content.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.classList.remove('active');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    initializeCharts() {
        this.createEfficiencyChart();
        this.createQualityChart();
    }

    createEfficiencyChart() {
        const ctx = document.getElementById('efficiency-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Before AI', 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Content Creation Speed',
                    data: [1, 2.5, 4, 6, 8],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Pieces of Content per Hour'
                        }
                    }
                }
            }
        });
    }

    createQualityChart() {
        const ctx = document.getElementById('quality-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Generic Content', 'Personalized Content', 'Compliant Content'],
                datasets: [{
                    data: [30, 45, 25],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    initializeInteractiveElements() {
        this.initializeFormulaSteps();
        this.initializePracticeArea();
    }

    initializeFormulaSteps() {
        const stepsContainer = document.getElementById('formula-steps');
        if (!stepsContainer) return;

        const steps = [
            {
                step: 1,
                title: "Be Specific",
                description: "Provide concrete details about property type, location, features, and target audience",
                example: "Instead of 'Write a listing', say 'Write a 150-word listing for a 3-bedroom ranch in suburban Atlanta, targeting first-time buyers, highlighting the updated kitchen and large backyard'"
            },
            {
                step: 2,
                title: "Give Examples",
                description: "Show the AI your style with 2-3 examples of your best work",
                example: "Include your best listing descriptions and ask the AI to match that exact tone and style"
            },
            {
                step: 3,
                title: "One Task at a Time",
                description: "Focus on a single, clear task per prompt for better results",
                example: "Don't ask for a listing, tweet, and email all at once. Do one, then refine it"
            },
            {
                step: 4,
                title: "Set the Tone",
                description: "Tell the AI who to be and how to sound",
                example: "'Act as a friendly local Realtor with 15 years of experience' or 'Act as a compliance-savvy broker'"
            },
            {
                step: 5,
                title: "Compliance First",
                description: "Always include Fair Housing compliance in your prompts",
                example: "End every prompt with 'Ensure this is Fair Housing compliant'"
            },
            {
                step: 6,
                title: "Iterate & Refine",
                description: "Treat the first output as a starting point, not the final product",
                example: "Use follow-up prompts: 'Make it shorter,' 'Make it more casual,' 'Add more detail about the backyard'"
            }
        ];

        stepsContainer.innerHTML = steps.map(step => `
            <div class="step-card bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 mb-4">
                <div class="flex items-start">
                    <div class="step-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                        ${step.step}
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${step.title}</h3>
                        <p class="text-gray-600 mb-3">${step.description}</p>
                        <div class="bg-gray-50 p-3 rounded border-l-2 border-blue-300">
                            <p class="text-sm text-gray-700"><strong>Example:</strong> ${step.example}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    initializePracticeArea() {
        const practiceContainer = document.getElementById('practice-area');
        if (!practiceContainer) return;

        practiceContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Practice Your Formula</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                        <select id="property-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select property type</option>
                            <option value="single-family">Single Family Home</option>
                            <option value="condo">Condo</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="multi-family">Multi-Family</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                        <select id="target-audience" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select target audience</option>
                            <option value="first-time">First-Time Buyers</option>
                            <option value="upsizing">Upsizing Families</option>
                            <option value="downsizing">Downsizing Empty-Nesters</option>
                            <option value="investors">Real Estate Investors</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Key Features (comma-separated)</label>
                        <input type="text" id="key-features" placeholder="e.g., updated kitchen, large backyard, good schools" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    
                    <button id="generate-prompt" class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                        Generate AI Prompt
                    </button>
                </div>
                
                <div id="generated-prompt" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Your Custom AI Prompt:</h4>
                    <div id="prompt-output" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Generated prompt will appear here -->
                    </div>
                    <button id="copy-prompt" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializePracticeEventListeners();
    }

    initializePracticeEventListeners() {
        const generateBtn = document.getElementById('generate-prompt');
        const copyBtn = document.getElementById('copy-prompt');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateCustomPrompt();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyPromptToClipboard();
            });
        }
    }

    generateCustomPrompt() {
        const propertyType = document.getElementById('property-type').value;
        const targetAudience = document.getElementById('target-audience').value;
        const keyFeatures = document.getElementById('key-features').value;

        if (!propertyType || !targetAudience || !keyFeatures) {
            alert('Please fill in all fields');
            return;
        }

        const prompt = `Act as an expert real estate copywriter with a warm, professional tone. 

Write a compelling 150-word listing description for a ${propertyType} property targeting ${targetAudience}. 

Key features to highlight: ${keyFeatures}

Your description should:
- Grab attention in the first sentence
- Highlight the most appealing features for this specific audience
- Use emotional language that resonates with ${targetAudience}
- Include a clear call to action
- Ensure this is Fair Housing compliant

Make the copy feel personal and authentic, avoiding generic real estate language.`;

        const promptOutput = document.getElementById('prompt-output');
        const generatedPrompt = document.getElementById('generated-prompt');
        
        if (promptOutput && generatedPrompt) {
            promptOutput.textContent = prompt;
            generatedPrompt.classList.remove('hidden');
        }
    }

    copyPromptToClipboard() {
        const promptOutput = document.getElementById('prompt-output');
        if (!promptOutput) return;

        const text = promptOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copy-prompt');
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
} 