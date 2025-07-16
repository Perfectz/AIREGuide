// js/prompt-library-manager.js - Prompt Library section functionality

import { ClipboardManager, AccordionManager } from './ui-utils.js';
import { PromptCustomizer } from './prompt-customizer.js';

export class PromptLibraryManager {
    constructor() {
        this.prompts = this.initializePrompts();
        this.init();
    }

    init() {
        this.initializePromptLibrary();
        this.initializeSearchAndFilter();
        this.initializeInteractiveElements();
    }

    initializePrompts() {
        return [
            {
                category: "Listing & Property Marketing",
                prompts: [
                    {
                        title: "Compelling Listing Description",
                        prompt: "Act as an expert real estate copywriter. Write a compelling 150-word listing description for [PROPERTY ADDRESS]. Target audience: [TARGET AUDIENCE]. Key features to highlight: [KEY FEATURES]. Make the description engaging, emotional, and ensure it's Fair Housing compliant. Focus on benefits, not just features.",
                        tags: ["listing", "description", "marketing"]
                    },
                    {
                        title: "Luxury Property Listing",
                        prompt: "Act as a luxury real estate specialist. Create an upscale listing description for [PROPERTY ADDRESS]. Target: high-net-worth buyers. Emphasize premium finishes, exclusivity, privacy, and lifestyle benefits. Tone: sophisticated and elegant. Length: 200 words.",
                        tags: ["luxury", "listing", "upscale"]
                    },
                    {
                        title: "Fixer-Upper Listing",
                        prompt: "Act as a real estate agent specializing in investment properties. Write a listing description for [PROPERTY ADDRESS] that positions it as a great investment opportunity. Highlight potential ROI, renovation possibilities, and market appreciation. Target: real estate investors and DIY enthusiasts.",
                        tags: ["investment", "fixer-upper", "renovation"]
                    },
                    {
                        title: "New Construction Listing",
                        prompt: "Act as a new construction specialist. Write a listing description for [PROPERTY ADDRESS] that emphasizes the benefits of buying new. Highlight energy efficiency, modern amenities, warranty coverage, and customization options. Target: buyers who want move-in ready homes.",
                        tags: ["new construction", "modern", "efficiency"]
                    },
                    {
                        title: "Condo/Townhouse Listing",
                        prompt: "Act as a condo specialist. Write a listing description for [PROPERTY ADDRESS] that highlights the benefits of condo living. Emphasize amenities, low maintenance, security, and community features. Target: first-time buyers, downsizers, and busy professionals.",
                        tags: ["condo", "townhouse", "amenities"]
                    }
                ]
            },
            {
                category: "Social Media Content",
                prompts: [
                    {
                        title: "Instagram Property Post",
                        prompt: "Act as a social media strategist. Create an engaging Instagram post for [PROPERTY ADDRESS]. Include: compelling headline, property highlights, emojis, relevant hashtags, and call to action. Target: [TARGET AUDIENCE]. Make it visually appealing and shareable.",
                        tags: ["social media", "instagram", "property"]
                    },
                    {
                        title: "Facebook Market Update",
                        prompt: "Act as a local real estate expert. Write a Facebook post about current market conditions in [CITY/AREA]. Include: recent sales data, inventory levels, price trends, and tips for buyers/sellers. Tone: informative and helpful. Include relevant hashtags.",
                        tags: ["market update", "facebook", "local"]
                    },
                    {
                        title: "TikTok Video Script",
                        prompt: "Act as a TikTok content creator. Write a 30-second video script about [TOPIC]. Target: [TARGET AUDIENCE]. Include: hook in first 3 seconds, key points, trending hashtags, and call to action. Make it entertaining and educational.",
                        tags: ["tiktok", "video", "script"]
                    },
                    {
                        title: "LinkedIn Professional Post",
                        prompt: "Act as a real estate professional. Write a LinkedIn post about [TOPIC]. Target: other professionals and potential clients. Include: industry insights, professional tips, and thought leadership content. Tone: professional and authoritative.",
                        tags: ["linkedin", "professional", "networking"]
                    },
                    {
                        title: "Twitter Thread",
                        prompt: "Act as a real estate expert. Create a 5-tweet thread about [TOPIC]. Each tweet should be informative and valuable. Include: statistics, tips, and actionable advice. Target: [TARGET AUDIENCE]. Use relevant hashtags and mentions.",
                        tags: ["twitter", "thread", "tips"]
                    }
                ]
            },
            {
                category: "Email Marketing",
                prompts: [
                    {
                        title: "Welcome Email Sequence",
                        prompt: "Act as an email marketer. Create a 3-email welcome sequence for new [LEAD TYPE] leads. Email 1: Welcome and immediate value. Email 2: Market insights and resources. Email 3: Next steps and call to action. Tone: [BRAND VOICE]. Include personalization placeholders.",
                        tags: ["email", "welcome", "sequence"]
                    },
                    {
                        title: "Monthly Newsletter",
                        prompt: "Act as a real estate newsletter writer. Create a monthly newsletter for [AUDIENCE]. Include: market update, featured properties, helpful tips, personal update, and call to action. Tone: [BRAND VOICE]. Make it valuable and engaging.",
                        tags: ["newsletter", "monthly", "update"]
                    },
                    {
                        title: "Open House Follow-up",
                        prompt: "Act as a real estate agent. Write a follow-up email for open house attendees. Include: thank you, property details, similar listings, market insights, and next steps. Personalize based on their interest level and questions asked.",
                        tags: ["open house", "follow-up", "email"]
                    },
                    {
                        title: "Price Reduction Announcement",
                        prompt: "Act as a listing agent. Write an email announcing a price reduction for [PROPERTY ADDRESS]. Include: new price, reason for reduction, updated value proposition, and urgency. Target: previous prospects and new buyers. Tone: professional and confident.",
                        tags: ["price reduction", "announcement", "urgency"]
                    },
                    {
                        title: "Holiday Email Campaign",
                        prompt: "Act as a real estate marketer. Create a holiday-themed email for [HOLIDAY]. Include: seasonal greetings, market insights, helpful tips, and warm wishes. Target: past clients and prospects. Tone: warm and personal.",
                        tags: ["holiday", "seasonal", "personal"]
                    }
                ]
            },
            {
                category: "Content Marketing",
                prompts: [
                    {
                        title: "Blog Post Outline",
                        prompt: "Act as a content strategist. Create a detailed blog post outline about [TOPIC]. Include: compelling headline, introduction, 5-7 key points with subheadings, conclusion, and call to action. Target: [TARGET AUDIENCE]. Focus on providing value and SEO optimization.",
                        tags: ["blog", "outline", "content"]
                    },
                    {
                        title: "Buyer's Guide",
                        prompt: "Act as a real estate educator. Create a comprehensive buyer's guide for [TARGET AUDIENCE]. Include: preparation steps, financing options, home search process, negotiation tips, and closing process. Make it educational and actionable.",
                        tags: ["buyer's guide", "education", "process"]
                    },
                    {
                        title: "Neighborhood Spotlight",
                        prompt: "Act as a local expert. Write a neighborhood spotlight for [NEIGHBORHOOD]. Include: history, demographics, amenities, schools, transportation, real estate market, and lifestyle benefits. Target: potential buyers and sellers in the area.",
                        tags: ["neighborhood", "local", "spotlight"]
                    },
                    {
                        title: "Market Analysis Report",
                        prompt: "Act as a market analyst. Create a quarterly market analysis for [AREA]. Include: sales data, inventory levels, price trends, days on market, and predictions. Target: clients and prospects. Use data and charts when possible.",
                        tags: ["market analysis", "data", "report"]
                    },
                    {
                        title: "Home Improvement Tips",
                        prompt: "Act as a home improvement expert. Write an article about [TOPIC] for homeowners. Include: DIY tips, professional advice, cost estimates, and ROI information. Target: current homeowners and potential sellers.",
                        tags: ["home improvement", "tips", "DIY"]
                    }
                ]
            },
            {
                category: "Video & Multimedia",
                prompts: [
                    {
                        title: "Property Tour Video Script",
                        prompt: "Act as a video scriptwriter. Write a 2-minute property tour script for [PROPERTY ADDRESS]. Include: introduction, room-by-room highlights, key features, neighborhood benefits, and call to action. Target: [TARGET AUDIENCE]. Make it engaging and informative.",
                        tags: ["video", "property tour", "script"]
                    },
                    {
                        title: "Market Update Video",
                        prompt: "Act as a real estate video host. Write a 60-second market update script for [AREA]. Include: current conditions, recent activity, trends, and tips. Target: local buyers and sellers. Tone: professional and trustworthy.",
                        tags: ["market update", "video", "local"]
                    },
                    {
                        title: "Tips & Advice Video",
                        prompt: "Act as a real estate educator. Write a 90-second video script about [TOPIC]. Include: introduction, 3-4 key tips, examples, and conclusion. Target: [TARGET AUDIENCE]. Make it educational and engaging.",
                        tags: ["tips", "education", "video"]
                    },
                    {
                        title: "Testimonial Request Script",
                        prompt: "Act as a client relationship manager. Write a script for requesting video testimonials from past clients. Include: why testimonials matter, what to say, how to record, and next steps. Make it easy and comfortable for clients.",
                        tags: ["testimonials", "video", "client"]
                    },
                    {
                        title: "Live Stream Outline",
                        prompt: "Act as a live stream host. Create an outline for a 30-minute live stream about [TOPIC]. Include: introduction, main points, Q&A session, and call to action. Target: [TARGET AUDIENCE]. Make it interactive and valuable.",
                        tags: ["live stream", "interactive", "Q&A"]
                    }
                ]
            },
            {
                category: "Lead Generation & Follow-up",
                prompts: [
                    {
                        title: "Lead Nurturing Sequence",
                        prompt: "Act as a lead nurturing specialist. Create a 7-email sequence for [LEAD TYPE] leads. Include: welcome, value content, market insights, case studies, testimonials, special offers, and call to action. Space emails 3-5 days apart.",
                        tags: ["lead nurturing", "sequence", "follow-up"]
                    },
                    {
                        title: "Cold Outreach Email",
                        prompt: "Act as a real estate prospector. Write a cold outreach email to [TARGET AUDIENCE] in [AREA]. Include: personalized introduction, value proposition, market insights, and call to action. Tone: professional and helpful, not salesy.",
                        tags: ["cold outreach", "prospecting", "email"]
                    },
                    {
                        title: "Referral Request Script",
                        prompt: "Act as a referral specialist. Write a script for asking past clients for referrals. Include: appreciation, success story, referral request, and incentive. Make it natural and comfortable for both parties.",
                        tags: ["referrals", "client", "script"]
                    },
                    {
                        title: "FSBO Outreach",
                        prompt: "Act as a listing specialist. Write a script for contacting For Sale By Owner properties. Include: introduction, market analysis, professional benefits, and call to action. Tone: helpful and professional, not pushy.",
                        tags: ["FSBO", "listing", "outreach"]
                    },
                    {
                        title: "Expired Listing Follow-up",
                        prompt: "Act as a listing specialist. Write a follow-up script for expired listings. Include: market analysis, new strategy, success stories, and call to action. Target: homeowners whose listings expired.",
                        tags: ["expired listings", "follow-up", "strategy"]
                    }
                ]
            },
            {
                category: "Client Communication",
                prompts: [
                    {
                        title: "Buyer Consultation Script",
                        prompt: "Act as a buyer's agent. Create a consultation script for first-time buyers. Include: introduction, needs assessment, process overview, financing discussion, and next steps. Make it educational and reassuring.",
                        tags: ["buyer consultation", "first-time", "script"]
                    },
                    {
                        title: "Seller Presentation",
                        prompt: "Act as a listing agent. Create a seller presentation script for [PROPERTY ADDRESS]. Include: market analysis, pricing strategy, marketing plan, timeline, and commission discussion. Target: potential sellers.",
                        tags: ["seller presentation", "listing", "strategy"]
                    },
                    {
                        title: "Offer Negotiation Script",
                        prompt: "Act as a negotiation expert. Write a script for presenting offers to buyers/sellers. Include: offer summary, market context, negotiation strategy, and next steps. Tone: confident and professional.",
                        tags: ["negotiation", "offer", "presentation"]
                    },
                    {
                        title: "Closing Day Communication",
                        prompt: "Act as a transaction coordinator. Create communication templates for closing day. Include: pre-closing checklist, closing day timeline, post-closing follow-up, and congratulations message.",
                        tags: ["closing", "transaction", "communication"]
                    },
                    {
                        title: "Client Feedback Request",
                        prompt: "Act as a client satisfaction specialist. Write a script for requesting feedback from clients. Include: appreciation, feedback request, review platforms, and follow-up. Make it easy and comfortable.",
                        tags: ["feedback", "reviews", "satisfaction"]
                    }
                ]
            },
            {
                category: "Market Analysis & Reports",
                prompts: [
                    {
                        title: "Comparative Market Analysis",
                        prompt: "Act as a market analyst. Create a CMA report for [PROPERTY ADDRESS]. Include: property details, comparable sales, market trends, pricing recommendations, and marketing strategy. Target: sellers and buyers.",
                        tags: ["CMA", "market analysis", "pricing"]
                    },
                    {
                        title: "Investment Property Analysis",
                        prompt: "Act as an investment specialist. Create an analysis for [PROPERTY ADDRESS]. Include: purchase price, renovation costs, rental income potential, cash flow analysis, and ROI projections. Target: real estate investors.",
                        tags: ["investment", "analysis", "ROI"]
                    },
                    {
                        title: "Neighborhood Market Report",
                        prompt: "Act as a local market expert. Create a neighborhood market report for [AREA]. Include: sales data, inventory levels, price trends, demographics, and future outlook. Target: buyers, sellers, and investors.",
                        tags: ["neighborhood", "market report", "local"]
                    },
                    {
                        title: "Seasonal Market Update",
                        prompt: "Act as a seasonal market analyst. Create a report on how [SEASON] affects the real estate market in [AREA]. Include: historical data, current trends, predictions, and tips for buyers/sellers.",
                        tags: ["seasonal", "market update", "trends"]
                    },
                    {
                        title: "Luxury Market Analysis",
                        prompt: "Act as a luxury market specialist. Create an analysis of the luxury market in [AREA]. Include: high-end sales data, luxury amenities, buyer profiles, and market positioning. Target: luxury buyers and sellers.",
                        tags: ["luxury", "market analysis", "high-end"]
                    }
                ]
            },
            {
                category: "Compliance & Legal",
                prompts: [
                    {
                        title: "Fair Housing Compliance Check",
                        prompt: "Act as a compliance officer. Review the following real estate content for Fair Housing violations: [CONTENT]. Identify any problematic language, explain why it's an issue, and suggest compliant alternatives.",
                        tags: ["compliance", "Fair Housing", "legal"]
                    },
                    {
                        title: "Disclosure Statement",
                        prompt: "Act as a real estate attorney. Create a disclosure statement for [PROPERTY TYPE] in [STATE]. Include: required disclosures, property condition, known issues, and legal disclaimers. Ensure compliance with state laws.",
                        tags: ["disclosures", "legal", "compliance"]
                    },
                    {
                        title: "Contract Review Script",
                        prompt: "Act as a real estate professional. Create a script for reviewing contracts with clients. Include: key terms, important dates, contingencies, and client responsibilities. Make it educational and clear.",
                        tags: ["contracts", "review", "legal"]
                    },
                    {
                        title: "Agency Disclosure Script",
                        prompt: "Act as a real estate agent. Write a script for explaining agency relationships to clients. Include: types of agency, duties, responsibilities, and client rights. Ensure compliance with state requirements.",
                        tags: ["agency", "disclosure", "legal"]
                    },
                    {
                        title: "Privacy Policy Update",
                        prompt: "Act as a compliance specialist. Create a privacy policy update for real estate clients. Include: data collection, usage, sharing, and client rights. Ensure compliance with privacy laws and regulations.",
                        tags: ["privacy", "policy", "compliance"]
                    }
                ]
            },
            {
                category: "Business Development",
                prompts: [
                    {
                        title: "Business Plan Outline",
                        prompt: "Act as a business strategist. Create a real estate business plan outline for [AGENT/BROKER]. Include: mission statement, target market, marketing strategy, financial projections, and growth plans. Make it comprehensive and actionable.",
                        tags: ["business plan", "strategy", "development"]
                    },
                    {
                        title: "Team Building Script",
                        prompt: "Act as a team leader. Write a script for building a real estate team. Include: team structure, roles and responsibilities, compensation plans, and growth opportunities. Target: potential team members.",
                        tags: ["team building", "leadership", "recruitment"]
                    },
                    {
                        title: "Partnership Proposal",
                        prompt: "Act as a business development specialist. Create a partnership proposal for [PARTNER TYPE]. Include: mutual benefits, collaboration opportunities, shared resources, and success metrics. Target: potential business partners.",
                        tags: ["partnership", "business development", "collaboration"]
                    },
                    {
                        title: "Brand Development Strategy",
                        prompt: "Act as a branding expert. Create a brand development strategy for [AGENT/BROKER]. Include: brand positioning, visual identity, messaging, target audience, and marketing channels. Make it unique and memorable.",
                        tags: ["branding", "strategy", "identity"]
                    },
                    {
                        title: "Goal Setting Workshop",
                        prompt: "Act as a business coach. Create a goal-setting workshop for real estate professionals. Include: goal categories, SMART criteria, action planning, and accountability measures. Make it motivational and practical.",
                        tags: ["goal setting", "workshop", "motivation"]
                    }
                ]
            }
        ];
    }

    initializePromptLibrary() {
        const libraryContainer = document.getElementById('prompt-library-accordion');
        if (!libraryContainer) return;
        

        libraryContainer.innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Prompt Categories</h3>
                <div class="flex space-x-2">
                    <button id="expand-all-btn" class="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors font-medium">
                        📖 Expand All
                    </button>
                    <button id="collapse-all-btn" class="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors font-medium">
                        📚 Collapse All
                    </button>
                </div>
            </div>
            <div class="space-y-4">
                ${this.prompts.map((category, categoryIndex) => `
                    <div class="category-accordion bg-white border border-gray-200 rounded-lg shadow-sm">
                        <button class="category-header w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <span class="mr-3 text-2xl">${this.getCategoryIcon(category.category)}</span>
                                    <h3 class="text-xl font-semibold text-gray-800">${category.category}</h3>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <span class="text-sm text-gray-500">${category.prompts.length} prompts</span>
                                    <span class="category-icon text-gray-500 transform transition-transform">▼</span>
                                </div>
                            </div>
                        </button>
                        
                        <div class="category-content p-6 border-t border-gray-200">
                            <div class="space-y-4">
                                ${category.prompts.map((prompt, promptIndex) => `
                                    <div class="prompt-card border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div class="flex items-start justify-between mb-3">
                                            <h4 class="text-lg font-semibold text-gray-800">${prompt.title}</h4>
                                            <div class="flex space-x-2">
                                                <button class="copy-prompt-btn bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors font-medium"
                                                        data-category="${categoryIndex}" data-prompt="${promptIndex}">
                                                    📋 Copy
                                                </button>
                                                <button class="customize-prompt-btn bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors font-medium"
                                                        data-category="${categoryIndex}" data-prompt="${promptIndex}">
                                                    ✏️ Customize
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div class="prompt-content bg-gray-50 p-4 rounded-lg mb-3" style="max-height: none; overflow: visible;">
                                            <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap" style="text-overflow: unset; overflow: visible; display: block;">${prompt.prompt}</p>
                                        </div>
                                        
                                        <div class="flex flex-wrap gap-2 mb-3">
                                            ${prompt.tags.map(tag => `
                                                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${tag}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers for accordion functionality
        const categoryHeaders = libraryContainer.querySelectorAll('.category-header');
        categoryHeaders.forEach((header, index) => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.category-content');
                const icon = item.querySelector('.category-icon');
                
                // Toggle active class (CSS handles the animation)
                item.classList.toggle('active');
                
                // Rotate icon
                if (item.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });

        // Add expand/collapse all functionality
        const expandAllBtn = document.getElementById('expand-all-btn');
        const collapseAllBtn = document.getElementById('collapse-all-btn');
        
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                const accordions = libraryContainer.querySelectorAll('.category-accordion');
                accordions.forEach(accordion => {
                    const icon = accordion.querySelector('.category-icon');
                    
                    accordion.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                });
            });
        }
        
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                const accordions = libraryContainer.querySelectorAll('.category-accordion');
                accordions.forEach(accordion => {
                    const icon = accordion.querySelector('.category-icon');
                    
                    accordion.classList.remove('active');
                    icon.style.transform = 'rotate(0deg)';
                });
            });
        }

        this.initializePromptEventListeners();
    }

    getCategoryIcon(category) {
        const icons = {
            "Listing & Property Marketing": "🏠",
            "Social Media Content": "📱",
            "Email Marketing": "📧",
            "Content Marketing": "📝",
            "Video & Multimedia": "🎬",
            "Lead Generation & Follow-up": "🎯",
            "Client Communication": "💬",
            "Market Analysis & Reports": "📊",
            "Compliance & Legal": "⚖️",
            "Business Development": "🚀"
        };
        return icons[category] || "📋";
    }

    initializePromptEventListeners() {
        const copyButtons = document.querySelectorAll('.copy-prompt-btn');
        const customizeButtons = document.querySelectorAll('.customize-prompt-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryIndex = parseInt(button.getAttribute('data-category'));
                const promptIndex = parseInt(button.getAttribute('data-prompt'));
                const prompt = this.prompts[categoryIndex].prompts[promptIndex];
                this.copyPrompt(prompt.prompt);
            });
        });
        
        customizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryIndex = parseInt(button.getAttribute('data-category'));
                const promptIndex = parseInt(button.getAttribute('data-prompt'));
                const prompt = this.prompts[categoryIndex].prompts[promptIndex];
                new PromptCustomizer().customizePrompt(prompt);
            });
        });
    }

    copyPrompt(promptText) {
        ClipboardManager.copyToClipboard(promptText).then(success => {
            if (success) {
                // Show feedback on the button that was clicked
                const buttons = document.querySelectorAll('.copy-prompt-btn');
                buttons.forEach(btn => {
                    if (btn.getAttribute('data-prompt') === promptText) {
                        ClipboardManager.showCopyFeedback(btn);
                    }
                });
            } else {
                alert('Failed to copy to clipboard');
            }
        });
    }

    initializeSearchAndFilter() {
        const searchContainer = document.getElementById('search-filter');
        if (!searchContainer) return;

        searchContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Search Prompts</label>
                        <input type="text" id="prompt-search" placeholder="Search by title, content, or tags..." 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                        <select id="category-filter" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">All Categories</option>
                            ${this.prompts.map(category => `
                                <option value="${category.category}">${category.category}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Tags</label>
                        <select id="tag-filter" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">All Tags</option>
                            ${this.getAllTags().map(tag => `
                                <option value="${tag}">${tag}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="mt-4 flex justify-between items-center">
                    <span id="results-count" class="text-sm text-gray-600">Showing all prompts</span>
                    <button id="clear-filters" class="text-blue-500 hover:text-blue-700 text-sm">
                        Clear Filters
                    </button>
                </div>
            </div>
        `;

        this.initializeSearchEventListeners();
    }

    getAllTags() {
        const tags = new Set();
        this.prompts.forEach(category => {
            category.prompts.forEach(prompt => {
                prompt.tags.forEach(tag => tags.add(tag));
            });
        });
        return Array.from(tags).sort();
    }

    initializeSearchEventListeners() {
        const searchInput = document.getElementById('prompt-search');
        const categoryFilter = document.getElementById('category-filter');
        const tagFilter = document.getElementById('tag-filter');
        const clearFilters = document.getElementById('clear-filters');

        [searchInput, categoryFilter, tagFilter].forEach(element => {
            if (element) {
                element.addEventListener('change', () => this.filterPrompts());
                element.addEventListener('input', () => this.filterPrompts());
            }
        });

        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                searchInput.value = '';
                categoryFilter.value = '';
                tagFilter.value = '';
                this.filterPrompts();
            });
        }
    }

    filterPrompts() {
        const searchTerm = document.getElementById('prompt-search')?.value.toLowerCase() || '';
        const selectedCategory = document.getElementById('category-filter')?.value || '';
        const selectedTag = document.getElementById('tag-filter')?.value || '';

        const promptCards = document.querySelectorAll('.prompt-card');
        let visibleCount = 0;

        promptCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.bg-gray-100')).map(tag => tag.textContent.toLowerCase());
            const category = card.closest('.category-section').querySelector('h3').textContent.trim();

            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                content.includes(searchTerm) || 
                tags.some(tag => tag.includes(searchTerm));

            const matchesCategory = !selectedCategory || category === selectedCategory;
            const matchesTag = !selectedTag || tags.includes(selectedTag.toLowerCase());

            if (matchesSearch && matchesCategory && matchesTag) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `Showing ${visibleCount} of ${promptCards.length} prompts`;
        }
    }

    initializeInteractiveElements() {
        this.initializeFavorites();
    }

    initializeFavorites() {
        const favoritesContainer = document.getElementById('favorites-section');
        if (!favoritesContainer) return;

        favoritesContainer.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">⭐ Favorite Prompts</h3>
                <div id="favorites-list" class="space-y-3">
                    <p class="text-gray-600">No favorite prompts yet. Click the star icon on any prompt to add it to your favorites.</p>
                </div>
            </div>
        `;
    }
} 