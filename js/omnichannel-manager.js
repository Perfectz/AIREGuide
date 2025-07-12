// js/omnichannel-manager.js - Omnichannel section functionality

import { MODAL_DATA } from './data.js';
import { ModalManager } from './ui-utils.js';

export class OmnichannelManager {
    constructor() {
        this.modalManager = new ModalManager();
        this.init();
    }

    init() {
        this.initializeFlowchart();
        this.initializeChannelGrid();
        this.initializeAutomationBuilder();
        this.initializeInteractiveElements();
    }

    initializeFlowchart() {
        const flowchartContainer = document.getElementById('automation-flowchart');
        if (!flowchartContainer) return;

        flowchartContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">5-Step Automation Flow</h3>
                
                <div class="flowchart-container relative">
                    <div class="flow-step bg-blue-500 text-white p-4 rounded-lg mb-4 cursor-pointer hover:bg-blue-600 transition-colors" data-modal="modal1">
                        <div class="flex items-center">
                            <div class="step-number bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                1
                            </div>
                            <div>
                                <h4 class="font-semibold">New Lead Captured</h4>
                                <p class="text-sm opacity-90">Form submission, Facebook Lead Ad, or landing page</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flow-arrow text-center text-gray-400 mb-4">↓</div>
                    
                    <div class="flow-step bg-green-500 text-white p-4 rounded-lg mb-4 cursor-pointer hover:bg-green-600 transition-colors" data-modal="modal2">
                        <div class="flex items-center">
                            <div class="step-number bg-white text-green-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                2
                            </div>
                            <div>
                                <h4 class="font-semibold">Trigger AI with Zapier/Make</h4>
                                <p class="text-sm opacity-90">Automation tool watches for new entries</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flow-arrow text-center text-gray-400 mb-4">↓</div>
                    
                    <div class="flow-step bg-purple-500 text-white p-4 rounded-lg mb-4 cursor-pointer hover:bg-purple-600 transition-colors" data-modal="modal3">
                        <div class="flex items-center">
                            <div class="step-number bg-white text-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                3
                            </div>
                            <div>
                                <h4 class="font-semibold">Generate Content with ChatGPT</h4>
                                <p class="text-sm opacity-90">AI creates personalized follow-up sequence</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flow-arrow text-center text-gray-400 mb-4">↓</div>
                    
                    <div class="flow-step bg-orange-500 text-white p-4 rounded-lg mb-4 cursor-pointer hover:bg-orange-600 transition-colors" data-modal="modal4">
                        <div class="flex items-center">
                            <div class="step-number bg-white text-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                4
                            </div>
                            <div>
                                <h4 class="font-semibold">Agent Review & Send</h4>
                                <p class="text-sm opacity-90">30-second human review for quality & compliance</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flow-arrow text-center text-gray-400 mb-4">↓</div>
                    
                    <div class="flow-step bg-red-500 text-white p-4 rounded-lg cursor-pointer hover:bg-red-600 transition-colors" data-modal="modal5">
                        <div class="flex items-center">
                            <div class="step-number bg-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                5
                            </div>
                            <div>
                                <h4 class="font-semibold">Update CRM & Nurture</h4>
                                <p class="text-sm opacity-90">Log communication and prepare for next touchpoint</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initializeFlowchartEventListeners();
    }

    initializeFlowchartEventListeners() {
        const flowSteps = document.querySelectorAll('.flow-step');
        flowSteps.forEach(step => {
            step.addEventListener('click', () => {
                const modalKey = step.getAttribute('data-modal');
                const modalData = MODAL_DATA[modalKey];
                if (modalData) {
                    this.modalManager.openModal(modalData.title, modalData.content);
                }
            });
        });
    }

    initializeChannelGrid() {
        const gridContainer = document.getElementById('channel-grid');
        if (!gridContainer) return;

        const channels = [
            {
                name: 'Email Marketing',
                icon: '📧',
                description: 'Personalized drip campaigns and newsletters',
                tools: ['Mailchimp', 'ConvertKit', 'ActiveCampaign'],
                bestFor: 'Long-form content, detailed property information',
                frequency: 'Weekly'
            },
            {
                name: 'Social Media',
                icon: '📱',
                description: 'Platform-specific content and engagement',
                tools: ['Buffer', 'Hootsuite', 'Later'],
                bestFor: 'Visual content, community building, brand awareness',
                frequency: 'Daily'
            },
            {
                name: 'SMS Marketing',
                icon: '💬',
                description: 'Quick updates and urgent notifications',
                tools: ['Twilio', 'SimpleTexting', 'EZ Texting'],
                bestFor: 'Time-sensitive updates, appointment reminders',
                frequency: 'As needed'
            },
            {
                name: 'Content Marketing',
                icon: '📝',
                description: 'Blog posts, videos, and educational content',
                tools: ['WordPress', 'YouTube', 'Canva'],
                bestFor: 'SEO, thought leadership, lead nurturing',
                frequency: 'Weekly'
            },
            {
                name: 'Paid Advertising',
                icon: '💰',
                description: 'Targeted ads across multiple platforms',
                tools: ['Facebook Ads', 'Google Ads', 'Instagram Ads'],
                bestFor: 'Lead generation, property promotion',
                frequency: 'Ongoing'
            },
            {
                name: 'Direct Mail',
                icon: '📬',
                description: 'Physical mailers and postcards',
                tools: ['Vistaprint', 'Mailchimp Print', 'Canva Print'],
                bestFor: 'Local market domination, luxury properties',
                frequency: 'Monthly'
            }
        ];

        gridContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${channels.map(channel => `
                    <div class="channel-card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                        <div class="flex items-center mb-4">
                            <span class="text-3xl mr-3">${channel.icon}</span>
                            <h3 class="text-lg font-semibold text-gray-800">${channel.name}</h3>
                        </div>
                        
                        <p class="text-gray-600 mb-4">${channel.description}</p>
                        
                        <div class="space-y-3">
                            <div>
                                <h4 class="font-medium text-gray-800 text-sm">Recommended Tools:</h4>
                                <p class="text-sm text-gray-600">${channel.tools.join(', ')}</p>
                            </div>
                            
                            <div>
                                <h4 class="font-medium text-gray-800 text-sm">Best For:</h4>
                                <p class="text-sm text-gray-600">${channel.bestFor}</p>
                            </div>
                            
                            <div>
                                <h4 class="font-medium text-gray-800 text-sm">Frequency:</h4>
                                <p class="text-sm text-gray-600">${channel.frequency}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    initializeAutomationBuilder() {
        const builderContainer = document.getElementById('automation-builder');
        if (!builderContainer) return;

        builderContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Build Your Automation</h3>
                
                <form id="automation-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Trigger Source</label>
                            <select id="trigger-source" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select trigger source</option>
                                <option value="website-form">Website Contact Form</option>
                                <option value="facebook-lead">Facebook Lead Ad</option>
                                <option value="landing-page">Landing Page</option>
                                <option value="open-house">Open House Sign-in</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Lead Type</label>
                            <select id="lead-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select lead type</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                                <option value="investor">Investor</option>
                                <option value="general">General Inquiry</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Channels to Use</label>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <label class="flex items-center">
                                <input type="checkbox" value="email" class="mr-2">
                                <span class="text-sm">Email</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" value="sms" class="mr-2">
                                <span class="text-sm">SMS</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" value="social" class="mr-2">
                                <span class="text-sm">Social</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" value="crm" class="mr-2">
                                <span class="text-sm">CRM</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Brand Voice</label>
                        <select id="brand-voice" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select brand voice</option>
                            <option value="professional">Professional & Trustworthy</option>
                            <option value="friendly">Friendly & Approachable</option>
                            <option value="luxury">Luxury & Sophisticated</option>
                            <option value="casual">Casual & Relatable</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                        Generate Automation Prompt
                    </button>
                </form>
                
                <div id="automation-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Your Automation Setup:</h4>
                    <div id="automation-prompt" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Generated automation will appear here -->
                    </div>
                    <button id="copy-automation" class="mt-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        this.initializeAutomationForm();
    }

    initializeAutomationForm() {
        const form = document.getElementById('automation-form');
        const copyBtn = document.getElementById('copy-automation');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateAutomation();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyAutomationToClipboard();
            });
        }
    }

    generateAutomation() {
        const triggerSource = document.getElementById('trigger-source').value;
        const leadType = document.getElementById('lead-type').value;
        const brandVoice = document.getElementById('brand-voice').value;
        const channels = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

        if (!triggerSource || !leadType || !brandVoice || channels.length === 0) {
            alert('Please fill in all fields and select at least one channel');
            return;
        }

        const automation = this.createAutomationPrompt(triggerSource, leadType, brandVoice, channels);
        
        const promptOutput = document.getElementById('automation-prompt');
        const outputContainer = document.getElementById('automation-output');
        
        if (promptOutput && outputContainer) {
            promptOutput.textContent = automation;
            outputContainer.classList.remove('hidden');
        }
    }

    createAutomationPrompt(triggerSource, leadType, brandVoice, channels) {
        const channelText = channels.join(', ');
        const voiceDescription = {
            professional: 'professional, trustworthy, and knowledgeable',
            friendly: 'friendly, approachable, and warm',
            luxury: 'luxury, sophisticated, and exclusive',
            casual: 'casual, relatable, and down-to-earth'
        };

        return `# AI Automation Setup for ${leadType.charAt(0).toUpperCase() + leadType.slice(1)} Leads

## Trigger Configuration
- **Source:** ${triggerSource}
- **Lead Type:** ${leadType}
- **Channels:** ${channelText}
- **Brand Voice:** ${voiceDescription[brandVoice]}

## ChatGPT Prompt for Content Generation

Act as an expert real estate marketer with a ${voiceDescription[brandVoice]} tone. 

A new ${leadType} lead has been captured from ${triggerSource}. Create a personalized follow-up sequence that includes:

${channels.includes('email') ? '- A welcome email (150 words)\n' : ''}${channels.includes('sms') ? '- An SMS welcome message (160 characters max)\n' : ''}${channels.includes('social') ? '- A social media post for Facebook/Instagram\n' : ''}${channels.includes('crm') ? '- CRM notes and next steps\n' : ''}

The content should:
- Welcome them warmly
- Acknowledge their specific inquiry type (${leadType})
- Provide immediate value (market insights, helpful resources)
- Include a clear next step
- Ensure Fair Housing compliance
- Match our ${voiceDescription[brandVoice]} brand voice

Make the content feel personal and authentic, avoiding generic real estate language.`;

    }

    copyAutomationToClipboard() {
        const promptOutput = document.getElementById('automation-prompt');
        if (!promptOutput) return;

        const text = promptOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('copy-automation');
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
        this.initializeChannelComparison();
        this.initializeAutomationExamples();
    }

    initializeChannelComparison() {
        const comparisonContainer = document.getElementById('channel-comparison');
        if (!comparisonContainer) return;

        const comparisonData = [
            {
                metric: 'Response Rate',
                email: '2-5%',
                sms: '45-98%',
                social: '1-3%',
                direct: '0.5-2%'
            },
            {
                metric: 'Cost per Lead',
                email: '$0.50-2',
                sms: '$2-5',
                social: '$1-3',
                direct: '$5-15'
            },
            {
                metric: 'Time to Response',
                email: '24-48 hours',
                sms: '5-15 minutes',
                social: '1-4 hours',
                direct: '3-7 days'
            },
            {
                metric: 'Best Use Case',
                email: 'Detailed information',
                sms: 'Urgent updates',
                social: 'Brand building',
                direct: 'Local domination'
            }
        ];

        comparisonContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Channel Performance Comparison</h3>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SMS</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Social</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Direct Mail</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${comparisonData.map(row => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-3 text-sm font-medium text-gray-900">${row.metric}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.email}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.sms}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.social}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${row.direct}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    initializeAutomationExamples() {
        const examplesContainer = document.getElementById('automation-examples');
        if (!examplesContainer) return;

        const examples = [
            {
                title: 'New Buyer Lead',
                trigger: 'Website form submission',
                sequence: [
                    'Immediate SMS: "Thanks for your interest! I\'ll send you the latest listings in your area within 10 minutes."',
                    'Email 1 (5 min): Welcome + market report + 3 featured properties',
                    'Email 2 (Day 3): Neighborhood guide + mortgage calculator',
                    'Email 3 (Day 7): Open house schedule + buyer tips'
                ]
            },
            {
                title: 'New Seller Lead',
                trigger: 'Facebook Lead Ad',
                sequence: [
                    'Immediate SMS: "Thanks for reaching out! I\'ll send you a free home valuation report right away."',
                    'Email 1 (5 min): Welcome + home valuation + market analysis',
                    'Email 2 (Day 2): Selling timeline + staging tips',
                    'Email 3 (Day 5): Local agent success stories + next steps'
                ]
            },
            {
                title: 'Open House Attendee',
                trigger: 'Sign-in sheet',
                sequence: [
                    'Email 1 (Same day): Thank you + property details + similar listings',
                    'SMS (Day 2): "Did you have any questions about the property? I\'m here to help!"',
                    'Email 2 (Day 3): Market update + financing options',
                    'Email 3 (Day 7): New listings in same area + schedule showing'
                ]
            }
        ];

        examplesContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Automation Examples</h3>
                
                <div class="space-y-6">
                    ${examples.map(example => `
                        <div class="example-card border border-gray-200 rounded-lg p-4">
                            <h4 class="text-lg font-semibold text-gray-800 mb-2">${example.title}</h4>
                            <p class="text-sm text-gray-600 mb-3"><strong>Trigger:</strong> ${example.trigger}</p>
                            
                            <h5 class="font-medium text-gray-800 mb-2">Sequence:</h5>
                            <ol class="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                ${example.sequence.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
} 