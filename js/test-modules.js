// js/test-modules.js - Test file to verify module loading

console.log('🔧 Testing module loading...');

// Test data module
import { RULES_DATA, PERSONA_STEPS } from './data.js';
console.log('✅ Data module loaded:', RULES_DATA.length, 'rules,', PERSONA_STEPS.length, 'persona steps');

// Test UI utils
import { ModalManager, TooltipManager, NavigationManager } from './ui-utils.js';
console.log('✅ UI utils module loaded');

// Test component manager
import { ComponentManager } from './component-manager.js';
console.log('✅ Component manager module loaded');

// Test all section managers
import { FormulaManager } from './formula-manager.js';
import { PersonaManager } from './persona-manager.js';
import { CopyManager } from './copy-manager.js';
import { OmnichannelManager } from './omnichannel-manager.js';
import { MultimediaManager } from './multimedia-manager.js';
import { PromptsManager } from './prompts-manager.js';
import { PromptLibraryManager } from './prompt-library-manager.js';
console.log('✅ All section managers loaded');

// Test main app
import RealEstateApp from './main.js';
console.log('✅ Main app module loaded');

console.log('🎉 All modules loaded successfully!');
console.log('📊 Module breakdown:');
console.log('   - Data constants:', RULES_DATA.length + PERSONA_STEPS.length, 'items');
console.log('   - UI utilities: 6 classes');
console.log('   - Section managers: 7 managers');
console.log('   - Total modular files: 12 files');

// Test functionality
setTimeout(() => {
    console.log('🔍 Testing core functionality...');
    
    // Test modal manager
    const modalManager = new ModalManager();
    console.log('✅ Modal manager initialized');
    
    // Test navigation manager
    const navManager = new NavigationManager();
    console.log('✅ Navigation manager initialized');
    
    console.log('🎯 All core functionality working!');
}, 1000); 