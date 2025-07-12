// js/persona-manager.js - Persona section functionality

import { PERSONA_STEPS, PERSONA_ARCHETYPES } from './data.js';
import { ModalManager } from './ui-utils.js';

export class PersonaManager {
    constructor() {
        this.modalManager = new ModalManager();
        this.init();
    }

    init() {
        this.initializePersonaSteps();
        this.initializeArchetypesTable();
        this.initializePersonaBuilder();
        this.initializeInteractiveElements();
    }

    initializePersonaSteps() {
        const tabsContainer = document.getElementById('persona-tabs');
        const contentContainer = document.getElementById('persona-content');
        if (!tabsContainer || !contentContainer) return;

        // Create tabs
        tabsContainer.innerHTML = PERSONA_STEPS.map((step, index) => `
            <button class="tab-button ${index === 0 ? 'active' : ''}" data-step="${index}">
                Step ${index + 1}
            </button>
        `).join('');

        // Create content
        contentContainer.innerHTML = PERSONA_STEPS.map((step, index) => `
            <div class="tab-content ${index === 0 ? 'active' : ''}" data-step="${index}">
                <div class="step-card bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 mb-4">
                    <div class="flex items-start">
                        <div class="step-number bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                            ${index + 1}
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">${step.title}</h3>
                            <p class="text-gray-600 leading-relaxed">${step.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add tab click handlers
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const stepIndex = parseInt(button.getAttribute('data-step'));
                this.switchTab(stepIndex);
            });
        });
    }

    switchTab(stepIndex) {
        // Update tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach((button, index) => {
            if (index === stepIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Update content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach((content, index) => {
            if (index === stepIndex) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    initializeArchetypesTable() {
        const tableContainer = document.getElementById('persona-archetypes');
        if (!tableContainer) return;

        tableContainer.innerHTML = `
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persona</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pain Points</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Must-Haves</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing Hook</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${PERSONA_ARCHETYPES.map(archetype => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${archetype.p}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">${archetype.pain}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">${archetype.must}</td>
                                <td class="px-6 py-4 text-sm text-gray-600">${archetype.hook}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    initializePersonaBuilder() {
        const builderContainer = document.getElementById('persona-builder');
        if (!builderContainer) return;

        builderContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Build Your Buyer Persona</h3>
                
                <form id="persona-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Persona Name</label>
                            <input type="text" id="persona-name" placeholder="e.g., Urban Starter Sarah" 
                                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                            <select id="age-range" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                <option value="">Select age range</option>
                                <option value="25-35">25-35</option>
                                <option value="35-45">35-45</option>
                                <option value="45-55">45-55</option>
                                <option value="55-65">55-65</option>
                                <option value="65+">65+</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Income Level</label>
                        <select id="income-level" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            <option value="">Select income level</option>
                            <option value="50k-75k">$50k - $75k</option>
                            <option value="75k-100k">$75k - $100k</option>
                            <option value="100k-150k">$100k - $150k</option>
                            <option value="150k-200k">$150k - $200k</option>
                            <option value="200k+">$200k+</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Primary Pain Points (comma-separated)</label>
                        <input type="text" id="pain-points" placeholder="e.g., limited budget, fear of being priced out, lack of down payment" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Must-Have Features (comma-separated)</label>
                        <input type="text" id="must-haves" placeholder="e.g., affordability, close to work, low maintenance" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Marketing Hook</label>
                        <textarea id="marketing-hook" rows="3" placeholder="e.g., 'Rent vs. Buy' blog posts, newbie homebuyer tips" 
                                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>
                    
                    <button type="submit" class="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                        Generate Persona Profile
                    </button>
                </form>
                
                <div id="persona-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Your Buyer Persona Profile:</h4>
                    <div id="persona-profile" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Generated persona will appear here -->
                    </div>
                    <button id="copy-persona" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializePersonaForm();
    }

    initializePersonaForm() {
        const form = document.getElementById('persona-form');
        const copyBtn = document.getElementById('copy-persona');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generatePersonaProfile();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyPersonaToClipboard();
            });
        }
    }

    generatePersonaProfile() {
        const name = document.getElementById('persona-name').value;
        const ageRange = document.getElementById('age-range').value;
        const incomeLevel = document.getElementById('income-level').value;
        const painPoints = document.getElementById('pain-points').value;
        const mustHaves = document.getElementById('must-haves').value;
        const marketingHook = document.getElementById('marketing-hook').value;

        if (!name || !ageRange || !incomeLevel || !painPoints || !mustHaves || !marketingHook) {
            alert('Please fill in all fields');
            return;
        }

        const profile = `# ${name} - Buyer Persona Profile

## Demographics
- **Age Range:** ${ageRange}
- **Income Level:** $${incomeLevel.replace('-', ' - $')}

## Pain Points
${painPoints.split(',').map(point => `- ${point.trim()}`).join('\n')}

## Must-Have Features
${mustHaves.split(',').map(feature => `- ${feature.trim()}`).join('\n')}

## Marketing Hook
${marketingHook}

## How We Help
We address ${name}'s primary concerns by providing:
- Educational content about ${painPoints.split(',')[0].trim()}
- Properties that match their ${mustHaves.split(',')[0].trim()} requirements
- Personalized guidance through the homebuying process

## Content Strategy
- Create blog posts about ${marketingHook}
- Develop social media content addressing their pain points
- Provide market insights relevant to their income level and preferences`;

        const profileOutput = document.getElementById('persona-profile');
        const personaOutput = document.getElementById('persona-output');
        
        if (profileOutput && personaOutput) {
            profileOutput.textContent = profile;
            personaOutput.classList.remove('hidden');
        }
    }

    copyPersonaToClipboard() {
        const profileOutput = document.getElementById('persona-profile');
        if (!profileOutput) return;

        const text = profileOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copy-persona');
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
        this.initializePersonaExamples();
        this.initializeDayInLifeGenerator();
    }

    initializePersonaExamples() {
        const examplesContainer = document.getElementById('persona-examples');
        if (!examplesContainer) return;

        const examples = [
            {
                name: "Urban Starter Sarah",
                age: "28-32",
                income: "$60k-$80k",
                description: "First-time buyer working in tech, wants to stop renting but worried about affordability",
                painPoints: ["Limited down payment", "Fear of being priced out", "Uncertainty about homeownership"],
                mustHaves: ["Affordability", "Close to work", "Low maintenance", "Good resale potential"]
            },
            {
                name: "Upsizing Family Mike & Lisa",
                age: "35-42",
                income: "$120k-$180k",
                description: "Growing family with 2 kids, needs more space and better schools",
                painPoints: ["Outgrown current home", "School district concerns", "Need for more bedrooms"],
                mustHaves: ["4+ bedrooms", "Good school district", "Family-friendly neighborhood", "Space for kids"]
            },
            {
                name: "Downsizing Empty-Nester Barbara",
                age: "60-68",
                income: "$80k-$120k",
                description: "Retired professional looking to simplify and reduce maintenance",
                painPoints: ["Too much house to maintain", "High utility costs", "Stairs becoming difficult"],
                mustHaves: ["Single-level living", "Low maintenance", "Near healthcare", "Smaller footprint"]
            }
        ];

        examplesContainer.innerHTML = examples.map(example => `
            <div class="example-card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">${example.name}</h4>
                <p class="text-sm text-gray-600 mb-3">${example.age} • ${example.income}</p>
                <p class="text-gray-700 mb-4">${example.description}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h5 class="font-medium text-gray-800 mb-2">Pain Points:</h5>
                        <ul class="text-sm text-gray-600 space-y-1">
                            ${example.painPoints.map(point => `<li>• ${point}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-medium text-gray-800 mb-2">Must-Haves:</h5>
                        <ul class="text-sm text-gray-600 space-y-1">
                            ${example.mustHaves.map(have => `<li>• ${have}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }

    initializeDayInLifeGenerator() {
        const generatorContainer = document.getElementById('day-in-life-generator');
        if (!generatorContainer) return;

        generatorContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Generate a "Day-in-the-Life" Story</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Persona Name</label>
                        <input type="text" id="story-persona-name" placeholder="e.g., Urban Starter Sarah" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Key Frustrations (comma-separated)</label>
                        <input type="text" id="story-frustrations" placeholder="e.g., paying high rent, feeling stuck, watching prices rise" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Desired Lifestyle</label>
                        <textarea id="story-desires" rows="3" placeholder="e.g., own a home, build equity, have a place to call their own" 
                                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>
                    
                    <button id="generate-story" class="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                        Generate Story
                    </button>
                </div>
                
                <div id="story-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Day-in-the-Life Story:</h4>
                    <div id="story-content" class="bg-gray-50 p-4 rounded-lg border border-gray-200 prose max-w-none">
                        <!-- Generated story will appear here -->
                    </div>
                    <button id="copy-story" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializeStoryGenerator();
    }

    initializeStoryGenerator() {
        const generateBtn = document.getElementById('generate-story');
        const copyBtn = document.getElementById('copy-story');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateDayInLifeStory();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyStoryToClipboard();
            });
        }
    }

    generateDayInLifeStory() {
        const personaName = document.getElementById('story-persona-name').value;
        const frustrations = document.getElementById('story-frustrations').value;
        const desires = document.getElementById('story-desires').value;

        if (!personaName || !frustrations || !desires) {
            alert('Please fill in all fields');
            return;
        }

        const story = `# A Day in the Life of ${personaName}

## Morning (7:00 AM - 9:00 AM)
${personaName} wakes up in their cramped apartment, the sound of neighbors arguing filtering through thin walls. As they make coffee in their tiny kitchen, they scroll through real estate listings on their phone, watching prices climb higher each month. The frustration builds as they realize their rent payment could be going toward building equity instead of lining their landlord's pockets.

## Midday (12:00 PM - 2:00 PM)
During lunch break, ${personaName} meets with a coworker who just bought their first home. The coworker shares stories about painting walls, hosting dinner parties, and the pride of homeownership. ${personaName} feels a mix of excitement and anxiety - they want that life too, but worry about the down payment, closing costs, and whether they're making the right decision.

## Evening (6:00 PM - 8:00 PM)
After work, ${personaName} drives past beautiful homes in their desired neighborhood, imagining what it would be like to pull into their own driveway. They think about ${frustrations.split(',').map(f => f.trim()).join(', ')} and how homeownership could solve these problems. They dream of ${desires} and the sense of stability and accomplishment that would come with it.

## Night (9:00 PM - 11:00 PM)
Before bed, ${personaName} researches first-time homebuyer programs and calculates potential mortgage payments. They feel overwhelmed by the process but determined to make their dream a reality. They save a few more listings to their favorites, hoping that one day soon, they'll be the one hosting dinner parties in their own home.`;

        const storyContent = document.getElementById('story-content');
        const storyOutput = document.getElementById('story-output');
        
        if (storyContent && storyOutput) {
            storyContent.innerHTML = story.replace(/\n/g, '<br>');
            storyOutput.classList.remove('hidden');
        }
    }

    copyStoryToClipboard() {
        const storyContent = document.getElementById('story-content');
        if (!storyContent) return;

        const text = storyContent.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copy-story');
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