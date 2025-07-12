// js/copy-manager.js - Copy section functionality

import { COMPLIANCE_BAD_WORDS, COMPLIANCE_DOS_DONTS } from './data.js';
import { ModalManager, ClipboardManager } from './ui-utils.js';

export class CopyManager {
    constructor() {
        this.modalManager = new ModalManager();
        this.init();
    }

    init() {
        this.initializeComplianceChecker();
        this.initializeCopyGenerator();
        this.initializeDosAndDonts();
        this.initializeInteractiveElements();
    }

    initializeComplianceChecker() {
        const checkerContainer = document.getElementById('compliance-checker');
        if (!checkerContainer) return;

        checkerContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Fair Housing Compliance Checker</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Paste your ad copy here:</label>
                        <textarea id="ad-copy-input" rows="6" placeholder="Paste your real estate ad copy here to check for Fair Housing compliance issues..." 
                                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
                    </div>
                    
                    <button id="check-compliance" class="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors">
                        Check Compliance
                    </button>
                </div>
                
                <div id="compliance-results" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Compliance Analysis:</h4>
                    <div id="compliance-issues" class="space-y-3">
                        <!-- Results will appear here -->
                    </div>
                </div>
            </div>
        `;

        this.initializeComplianceEventListeners();
    }

    initializeComplianceEventListeners() {
        const checkBtn = document.getElementById('check-compliance');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.checkCompliance();
            });
        }
    }

    checkCompliance() {
        const input = document.getElementById('ad-copy-input').value;
        if (!input.trim()) {
            alert('Please paste some ad copy to check');
            return;
        }

        const issues = this.analyzeCompliance(input);
        this.displayComplianceResults(issues);
    }

    analyzeCompliance(text) {
        const issues = [];
        const lowerText = text.toLowerCase();

        // Check for bad words
        COMPLIANCE_BAD_WORDS.forEach(word => {
            if (lowerText.includes(word.toLowerCase())) {
                issues.push({
                    type: 'warning',
                    word: word,
                    message: `Potentially problematic word: "${word}"`,
                    suggestion: this.getSuggestion(word)
                });
            }
        });

        // Check for specific phrases
        const problematicPhrases = [
            { phrase: 'master bedroom', suggestion: 'primary suite' },
            { phrase: 'walking distance', suggestion: '0.2 miles to' },
            { phrase: 'family-friendly', suggestion: 'near parks and schools' },
            { phrase: 'handyman special', suggestion: 'fixer-upper opportunity' },
            { phrase: 'safe neighborhood', suggestion: 'quiet street' },
            { phrase: 'exclusive', suggestion: 'desirable' },
            { phrase: 'perfect for', suggestion: 'ideal for' }
        ];

        problematicPhrases.forEach(({ phrase, suggestion }) => {
            if (lowerText.includes(phrase)) {
                issues.push({
                    type: 'error',
                    word: phrase,
                    message: `Fair Housing violation: "${phrase}"`,
                    suggestion: `Use "${suggestion}" instead`
                });
            }
        });

        return issues;
    }

    getSuggestion(word) {
        const suggestion = COMPLIANCE_DOS_DONTS.find(item => 
            item.dont.toLowerCase().includes(word.toLowerCase())
        );
        return suggestion ? suggestion.do : 'Consider removing or rephrasing';
    }

    displayComplianceResults(issues) {
        const resultsContainer = document.getElementById('compliance-results');
        const issuesContainer = document.getElementById('compliance-issues');
        
        if (!resultsContainer || !issuesContainer) return;

        if (issues.length === 0) {
            issuesContainer.innerHTML = `
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <p class="text-green-800 font-medium">No compliance issues found!</p>
                    </div>
                </div>
            `;
        } else {
            issuesContainer.innerHTML = issues.map(issue => `
                <div class="bg-${issue.type === 'error' ? 'red' : 'yellow'}-50 border border-${issue.type === 'error' ? 'red' : 'yellow'}-200 rounded-lg p-4">
                    <div class="flex items-start">
                        <svg class="w-5 h-5 text-${issue.type === 'error' ? 'red' : 'yellow'}-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <div class="flex-1">
                            <p class="text-${issue.type === 'error' ? 'red' : 'yellow'}-800 font-medium">${issue.message}</p>
                            <p class="text-${issue.type === 'error' ? 'red' : 'yellow'}-700 text-sm mt-1">Suggestion: ${issue.suggestion}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        resultsContainer.classList.remove('hidden');
    }

    initializeCopyGenerator() {
        const generatorContainer = document.getElementById('copy-generator');
        if (!generatorContainer) return;

        generatorContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">AI Ad Copy Generator</h3>
                
                <form id="copy-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                            <select id="copy-property-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                <option value="">Select property type</option>
                                <option value="single-family">Single Family Home</option>
                                <option value="condo">Condo</option>
                                <option value="townhouse">Townhouse</option>
                                <option value="multi-family">Multi-Family</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                            <select id="copy-target-audience" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                <option value="">Select target audience</option>
                                <option value="first-time">First-Time Buyers</option>
                                <option value="upsizing">Upsizing Families</option>
                                <option value="downsizing">Downsizing Empty-Nesters</option>
                                <option value="investors">Real Estate Investors</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Key Features (comma-separated)</label>
                        <input type="text" id="copy-features" placeholder="e.g., updated kitchen, large backyard, good schools" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                        <select id="copy-tone" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                            <option value="professional">Professional</option>
                            <option value="friendly">Friendly & Warm</option>
                            <option value="luxury">Luxury & Upscale</option>
                            <option value="casual">Casual & Relaxed</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                        <select id="copy-content-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                            <option value="listing">Listing Description</option>
                            <option value="social">Social Media Post</option>
                            <option value="email">Email Newsletter</option>
                            <option value="blog">Blog Post</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors">
                        Generate Copy
                    </button>
                </form>
                
                <div id="copy-output" class="mt-6 hidden">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Generated Copy:</h4>
                    <div id="generated-copy" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <!-- Generated copy will appear here -->
                    </div>
                    <div class="mt-3 flex space-x-3">
                        <button id="copy-generated-copy" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                            Copy to Clipboard
                        </button>
                        <button id="check-generated-copy" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                            Check Compliance
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initializeCopyForm();
    }

    initializeCopyForm() {
        const form = document.getElementById('copy-form');
        const copyBtn = document.getElementById('copy-generated-copy');
        const checkBtn = document.getElementById('check-generated-copy');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateCopy();
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyGeneratedCopy();
            });
        }
        
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.checkGeneratedCopy();
            });
        }
    }

    generateCopy() {
        const propertyType = document.getElementById('copy-property-type').value;
        const targetAudience = document.getElementById('copy-target-audience').value;
        const features = document.getElementById('copy-features').value;
        const tone = document.getElementById('copy-tone').value;
        const contentType = document.getElementById('copy-content-type').value;

        if (!propertyType || !targetAudience || !features || !tone || !contentType) {
            alert('Please fill in all fields');
            return;
        }

        const copy = this.createCopy(propertyType, targetAudience, features, tone, contentType);
        
        const copyOutput = document.getElementById('generated-copy');
        const outputContainer = document.getElementById('copy-output');
        
        if (copyOutput && outputContainer) {
            copyOutput.textContent = copy;
            outputContainer.classList.remove('hidden');
        }
    }

    createCopy(propertyType, targetAudience, features, tone, contentType) {
        const featureList = features.split(',').map(f => f.trim());
        const toneWords = {
            professional: ['excellent', 'outstanding', 'superior', 'exceptional'],
            friendly: ['wonderful', 'amazing', 'fantastic', 'delightful'],
            luxury: ['stunning', 'magnificent', 'breathtaking', 'sophisticated'],
            casual: ['great', 'awesome', 'cool', 'nice']
        };

        const selectedTone = toneWords[tone] || toneWords.professional;
        const randomTone = selectedTone[Math.floor(Math.random() * selectedTone.length)];

        let copy = '';
        
        switch (contentType) {
            case 'listing':
                copy = `Discover this ${randomTone} ${propertyType} that's perfect for ${targetAudience}! This exceptional property features ${featureList.slice(0, 2).join(' and ')}, making it an ideal choice for those seeking quality and comfort.

${featureList.length > 2 ? `Additional highlights include ${featureList.slice(2).join(', ')}. ` : ''}Don't miss this opportunity to own a home that combines modern amenities with timeless appeal. Contact us today to schedule your private showing!`;
                break;
                
            case 'social':
                copy = `🏠 Just Listed! 

This ${randomTone} ${propertyType} is perfect for ${targetAudience}! 

✨ ${featureList.slice(0, 3).join('\n✨ ')}${featureList.length > 3 ? '\n✨ And so much more!' : ''}

DM us for details or visit our website! #RealEstate #JustListed`;
                break;
                
            case 'email':
                copy = `Subject: New ${propertyType} Perfect for ${targetAudience}

Hi there!

I wanted to share this ${randomTone} ${propertyType} that just hit the market. It's ideal for ${targetAudience} and features ${featureList.slice(0, 3).join(', ')}.

${featureList.length > 3 ? `Plus, you'll love the ${featureList.slice(3).join(', ')}!` : ''}

Would you like to schedule a showing? Just reply to this email or give me a call.

Best regards,
[Your Name]`;
                break;
                
            case 'blog':
                copy = `# Why This ${propertyType} is Perfect for ${targetAudience}

Looking for the ideal ${propertyType}? This ${randomTone} property might be exactly what you've been searching for!

## What Makes This Property Special

${featureList.map(feature => `- **${feature}**: This feature adds significant value and appeal`).join('\n')}

## Perfect for ${targetAudience}

This property addresses the specific needs of ${targetAudience}, offering ${featureList.slice(0, 2).join(' and ')} that make it an excellent choice.

Ready to learn more? Contact us today for a private showing!`;
                break;
        }

        return copy;
    }

    copyGeneratedCopy() {
        const copyOutput = document.getElementById('generated-copy');
        if (!copyOutput) return;

        const text = copyOutput.textContent;
        ClipboardManager.copyToClipboard(text).then(success => {
            if (success) {
                ClipboardManager.showCopyFeedback(document.getElementById('copy-generated-copy'));
            } else {
                alert('Failed to copy to clipboard');
            }
        });
    }

    checkGeneratedCopy() {
        const copyOutput = document.getElementById('generated-copy');
        if (!copyOutput) return;

        const text = copyOutput.textContent;
        const issues = this.analyzeCompliance(text);
        
        if (issues.length === 0) {
            alert('✅ No compliance issues found in the generated copy!');
        } else {
            alert(`⚠️ Found ${issues.length} potential compliance issue(s). Please review the copy carefully.`);
        }
    }

    initializeDosAndDonts() {
        const dosDontsContainer = document.getElementById('dos-donts');
        if (!dosDontsContainer) return;

        dosDontsContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Fair Housing Do's and Don'ts</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold text-red-600 mb-3">❌ Don't Use</h4>
                        <ul class="space-y-2">
                            ${COMPLIANCE_DOS_DONTS.map(item => `
                                <li class="flex items-start">
                                    <span class="text-red-500 mr-2">•</span>
                                    <span class="text-gray-700">${item.dont}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold text-green-600 mb-3">✅ Do Use Instead</h4>
                        <ul class="space-y-2">
                            ${COMPLIANCE_DOS_DONTS.map(item => `
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    <span class="text-gray-700">${item.do}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    initializeInteractiveElements() {
        this.initializeComplianceQuiz();
    }

    initializeComplianceQuiz() {
        const quizContainer = document.getElementById('compliance-quiz');
        if (!quizContainer) return;

        const quizQuestions = [
            {
                question: "Which phrase is Fair Housing compliant?",
                options: [
                    "Master bedroom with walk-in closet",
                    "Primary suite with walk-in closet",
                    "Family-friendly neighborhood",
                    "Perfect for families"
                ],
                correct: 1,
                explanation: "Use 'primary suite' instead of 'master bedroom' to avoid Fair Housing violations."
            },
            {
                question: "What should you say instead of 'walking distance to schools'?",
                options: [
                    "Close to schools",
                    "Near schools",
                    "0.3 miles to schools",
                    "Convenient to schools"
                ],
                correct: 2,
                explanation: "Use specific distances instead of subjective terms like 'walking distance'."
            },
            {
                question: "Which is the best way to describe a property?",
                options: [
                    "Handyman special",
                    "Fixer-upper opportunity",
                    "Needs work",
                    "Project home"
                ],
                correct: 1,
                explanation: "'Fixer-upper opportunity' is more positive and compliant than 'handyman special'."
            }
        ];

        quizContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Fair Housing Quiz</h3>
                
                <div id="quiz-questions" class="space-y-6">
                    ${quizQuestions.map((q, index) => `
                        <div class="quiz-question border border-gray-200 rounded-lg p-4">
                            <h4 class="font-medium text-gray-800 mb-3">${index + 1}. ${q.question}</h4>
                            <div class="space-y-2">
                                ${q.options.map((option, optIndex) => `
                                    <label class="flex items-center cursor-pointer">
                                        <input type="radio" name="q${index}" value="${optIndex}" class="mr-2">
                                        <span class="text-gray-700">${option}</span>
                                    </label>
                                `).join('')}
                            </div>
                            <div class="quiz-explanation mt-3 hidden bg-gray-50 p-3 rounded border-l-2 border-blue-500">
                                <p class="text-sm text-gray-700">${q.explanation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <button id="check-quiz" class="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors">
                    Check Answers
                </button>
            </div>
        `;

        this.initializeQuizEventListeners(quizQuestions);
    }

    initializeQuizEventListeners(questions) {
        const checkBtn = document.getElementById('check-quiz');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.checkQuizAnswers(questions);
            });
        }
    }

    checkQuizAnswers(questions) {
        let correctAnswers = 0;
        
        questions.forEach((question, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const explanation = document.querySelectorAll('.quiz-explanation')[index];
            
            if (selected) {
                const isCorrect = parseInt(selected.value) === question.correct;
                if (isCorrect) {
                    correctAnswers++;
                    selected.parentElement.classList.add('text-green-600');
                    selected.parentElement.classList.remove('text-gray-700');
                } else {
                    selected.parentElement.classList.add('text-red-600');
                    selected.parentElement.classList.remove('text-gray-700');
                }
                
                if (explanation) {
                    explanation.classList.remove('hidden');
                }
            }
        });

        const percentage = Math.round((correctAnswers / questions.length) * 100);
        alert(`Quiz complete! You got ${correctAnswers} out of ${questions.length} correct (${percentage}%).`);
    }
} 