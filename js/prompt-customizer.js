// js/prompt-customizer.js - Shared prompt customization functionality

import { ClipboardManager } from './ui-utils.js';

export class PromptCustomizer {
    customizePrompt(prompt) {
        // Note: prompt should have title and prompt properties
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Customize: ${prompt.title}</h3>
                    <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Original Prompt:</label>
                        <textarea class="w-full p-3 border border-gray-300 rounded-lg h-32" readonly>${prompt.prompt}</textarea>
                    </div>
                    
                    <div id="dynamic-variables" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                    
                    <button id="generate-custom" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                        Generate Customized Prompt
                    </button>
                    
                    <div id="custom-result" class="hidden">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Customized Prompt:</label>
                        <textarea id="customized-text" class="w-full p-3 border border-gray-300 rounded-lg h-32"></textarea>
                        <button id="copy-custom" class="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                            Copy Customized Prompt
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        this.generateDynamicInputs(prompt.prompt, modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('#generate-custom').addEventListener('click', () => {
            this.generateCustomizedPrompt(prompt, modal);
        });

        modal.querySelector('#copy-custom').addEventListener('click', () => {
            const customizedText = modal.querySelector('#customized-text').value;
            ClipboardManager.copyToClipboard(customizedText).then(success => {
                if (success) {
                    ClipboardManager.showCopyFeedback(modal.querySelector('#copy-custom'));
                }
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    generateDynamicInputs(promptText, modal) {
        const variablesContainer = modal.querySelector('#dynamic-variables');
        const variables = this.extractVariables(promptText);
        
        if (variables.length === 0) {
            variablesContainer.innerHTML = '<p class="text-gray-600">No customizable variables found in this prompt.</p>';
            return;
        }

        variables.forEach(varName => {
            const inputId = `custom-${varName.toLowerCase().replace(/\s+/g, '-')}`;
            const inputHtml = `
                <div>
                    <label for="${inputId}" class="block text-sm font-medium text-gray-700 mb-2">${varName}</label>
                    <input type="text" id="${inputId}" placeholder="Enter value for ${varName}" class="w-full p-2 border border-gray-300 rounded">
                </div>
            `;
            variablesContainer.insertAdjacentHTML('beforeend', inputHtml);
        });
    }

    extractVariables(promptText) {
        const regex = /\[([A-Z\s\/-]+)\]/g;
        const matches = new Set();
        let match;
        while ((match = regex.exec(promptText)) !== null) {
            matches.add(match[1].trim());
        }
        return Array.from(matches);
    }

    generateCustomizedPrompt(originalPrompt, modal) {
        let customizedPrompt = originalPrompt.prompt;
        const variables = this.extractVariables(customizedPrompt);
        
        variables.forEach(varName => {
            const inputId = `custom-${varName.toLowerCase().replace(/\s+/g, '-')}`;
            const input = modal.querySelector(`#${inputId}`);
            if (input && input.value) {
                const regex = new RegExp(`\\[${varName}\\]`, 'g');
                customizedPrompt = customizedPrompt.replace(regex, input.value);
            }
        });

        const resultContainer = modal.querySelector('#custom-result');
        const customizedText = modal.querySelector('#customized-text');
        
        if (resultContainer && customizedText) {
            customizedText.value = customizedPrompt;
            resultContainer.classList.remove('hidden');
        }
    }
} 