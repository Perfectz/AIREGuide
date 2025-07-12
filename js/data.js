// js/data.js - Data constants for the Real Estate Training application

// Rules data for the core formula section
export const RULES_DATA = [
    { title: "1. Garbage In, Garbage Out", content: "Be specific. 'Write a listing' is lazy and gives generic results. Provide concrete details like property type, location, features, and your target audience." },
    { title: "2. Show, Don't Just Tell (One-Shot vs. Few-Shot)", content: "<b>One-Shot:</b> Give one clean, detailed command for a fast result. This is your daily workhorse. <br><b>Few-Shot:</b> To get a specific style, provide examples. Say, 'Here are two of my best listing descriptions. Write a new one in the exact same style.' This trains the AI on what you consider 'good'." },
    { title: "3. One Task at a Time", content: "Don't overload the AI by asking for a listing, a tweet, AND an email at once. Focus on a single, clear task per prompt to get higher quality results." },
    { title: "4. Give It a Job, Give It a Vibe", content: "Tell the AI who to be. 'Act as a friendly local Realtor' or 'Act as a compliance-savvy broker.' This gives the output a more authentic, human voice that matches your brand." },
    { title: "5. Stay Out of Jail (Compliance First)", content: "Always include the command 'Ensure this is Fair Housing compliant.' But don't stop there—you must still personally read and verify every output. The AI is a tool, not a lawyer." },
    { title: "6. The First Draft ALWAYS Sucks", content: "Treat the first output as a starting point, not the final product. Use follow-up prompts to refine it: 'Make it shorter,' 'Make it more casual,' or 'Add more detail about the backyard.'" }
];

// Persona creation steps
export const PERSONA_STEPS = [
    { title: "1. Data Dive", content: "Gather raw market data and client info (NAR reports, local trends). Feed key facts into ChatGPT and ask for patterns. <b>Fair Housing Tip:</b> Focus on lifestyles and needs (e.g., commute times, space requirements), not protected traits like race or religion." },
    { title: "2. Segment & Name", content: "Identify 3–4 distinct buyer types from the data. Prompt ChatGPT: 'From this info, suggest buyer persona categories with catchy names.' For example, 'Urban Starter' or 'Upsizing Family.' Giving each a nickname makes them memorable." },
    { title: "3. Map Pain/Gain", content: "For each persona, list their top pain points and goals. Use ChatGPT to expand these: 'What are the biggest worries and hopes for an Upsizing Family buying a home?' This ensures your marketing addresses what truly matters to them." },
    { title: "4. Day-in-the-Life", content: "Humanize the persona with a story. Prompt: 'Write a 1-day narrative of an Upsizing Family couple home-shopping, highlighting their frustrations and wishes.' This story format spotlights powerful emotional triggers you can use in your copy." },
    { title: "5. Synthesize Profile", content: "Condense each persona into a one-page profile. Include their name, tagline, key pains/gains, and a 'how we help' statement. Double-check that nothing violates Fair Housing guidelines. You now have a crystal-clear targeting guide!" }
];

// Persona archetypes table data
export const PERSONA_ARCHETYPES = [
    { p: 'First-Time "Urban Starter"', pain: 'Paying rent, limited budget, fears being priced out', must: 'Affordability, close to work, low maintenance', hook: '"Rent vs. Buy" blog posts, newbie homebuyer tips' },
    { p: 'Upsizing Family', pain: 'Outgrown current home, worried about schools', must: '4+ bedrooms, bigger yard, good schools', hook: 'Posts on family-friendly events, ads highlighting extra rooms' },
    { p: 'Downsizing Empty-Nester', pain: 'Too much house, maintenance stress', must: 'Single-level living, low upkeep, near healthcare', hook: '"Rightsizing" video series, emphasize "no-stairs lifestyle"' },
    { p: 'Relocating Professional', pain: 'New job pressure, need housing fast, zero local knowledge', must: 'Short commute, turnkey/move-in ready', hook: '"Neighborhood Spotlights," relocation checklists' },
];

// Compliance checker data
export const COMPLIANCE_BAD_WORDS = ['family', 'families', 'kid', 'kids', 'children', 'master', 'handyman', 'exclusive', 'walking distance', 'safe', 'christian', 'adult', 'senior', 'retiree', 'bachelor', 'no students', 'perfect for'];

export const COMPLIANCE_DOS_DONTS = [
    { dont: '"Master Bedroom"', do: '"Primary Suite"' },
    { dont: '"Walking distance to..."', do: '"0.2 miles to..."' },
    { dont: '"Family-friendly neighborhood"', do: '"Near parks and schools"' },
    { dont: '"Handyman special"', do: '"Fixer-upper opportunity"' },
    { dont: '"Safe, exclusive neighborhood"', do: '"Quiet cul-de-sac street"' },
];

// Sample prompt categories
export const PROMPT_CATEGORIES = [
    {
        category: "From 'The Core Formula'",
        prompts: [
            { title: "Few-Shot Prompt (To Match Your Style)", content: "Act as an expert real estate copywriter. Your tone should be exactly like the examples below. <br><br>Example 1: [Paste your first great listing description here] <br>Example 2: [Paste your second great listing description here] <br><br>Now, write a new 150-word listing description for [Property Address], highlighting [Key Feature 1] and [Key Feature 2], aimed at [Target Audience]." },
            { title: "Brainstorming Ideas", content: "Act as a marketing strategist. I need to market a 2-bedroom condo in downtown Atlanta. Brainstorm 5 unique marketing angles aimed at 'Young Professionals'. For each angle, suggest a headline and a primary channel (e.g., Instagram, Blog Post)." }
        ]
    },
    {
        category: "From 'Know Your Buyer'",
        prompts: [
            { title: "Create a Buyer Persona", content: "Act as a real estate market analyst. Based on the following data for Atlanta, GA: [e.g., average home price is $400k, popular neighborhoods are Midtown and Grant Park, major employers are Delta and Coca-Cola], create a detailed buyer persona for an 'Upsizing Family'. Include their name, estimated income, key housing pain points, and what they value most in a new home and neighborhood." },
            { title: "Write a 'Day-in-the-Life' Story", content: "Act as a creative writer. Write a short (200-word) 'day-in-the-life' narrative for our 'Downsizing Empty-Nester' persona. The story should highlight their frustrations with their current large home (e.g., too much maintenance, unused space) and their desire for a simpler, more convenient lifestyle." }
        ]
    },
    {
        category: "From 'Instant Ad Copy'",
        prompts: [
            { title: "Fair Housing Audit", content: "Act as a compliance officer. Review the following real estate ad copy for any potential Fair Housing violations. For each potentially problematic phrase, highlight it, explain why it's an issue, and suggest a compliant alternative. Here is the copy: [Paste your ad copy here]." }
        ]
    },
    {
        category: "From 'Go Omnichannel'",
        prompts: [
            { title: "The 'One-Prompt, Five-Outputs' Hack", content: "Act as an expert real estate marketer with a trustworthy, 'Southern hospitality' tone. Using the property facts for [Address, features...], and targeting the ['Persona Name'] persona, create the following 5 pieces of content: 1. An enthusiastic Instagram Caption. 2. A 30-second TikTok video script. 3. A friendly Email Newsletter Blurb. 4. A two-part SMS drip campaign. 5. A professional LinkedIn post. Ensure all content is on-brand and Fair Housing compliant." },
            { title: "Repurpose Blog to Social Media", content: "Act as a social media strategist. Take the key points from the following blog post and repurpose them into a 5-part Instagram carousel. Each slide should have a clear headline and 1-2 sentences of text. Also, create three engaging tweets from the same content. Blog post: [Paste blog post text here]." }
        ]
    },
    {
        category: "From 'Create Multimedia'",
        prompts: [
            { title: "Video Ad Script", content: "Act as a video ad scriptwriter. Write a punchy, 30-second video script for a new listing at [Address]. The target audience is [Persona Name]. The hook should grab their attention in the first 3 seconds. Highlight these three key features: [Feature 1], [Feature 2], [Feature 3]. End with a clear call to action. The tone should be [Tone]." },
            { title: "Midjourney Image Prompt", content: "Generate a photorealistic, ultra-wide angle interior shot of a modern kitchen with marble countertops and stainless steel appliances. The lighting should be bright and airy, as if from a large window just off-camera. The style should be clean and minimalist. Aspect ratio 16:9. --style raw" }
        ]
    }
];

// Multimedia tools data
export const MULTIMEDIA_TOOLS = [
    { name: "ElevenLabs", icon: "🔊", purpose: "AI Voiceovers", detail: "Turns any script into a natural, professional voiceover in seconds. Perfect for video ads and property tours." },
    { name: "Midjourney", icon: "🖼️", purpose: "AI Image Generation", detail: "Creates stunning, high-quality images from text prompts. Ideal for hero shots, ad visuals, and concept art." },
    { name: "Hedra", icon: "👤", purpose: "Talking Avatars", detail: "Upload your headshot and a script to create a lip-synced talking avatar video. Great for personalized introductions." },
    { name: "Google Veo", icon: "📹", purpose: "AI Video Generation", detail: "Stitches images, clips, and voiceovers into a polished video ad using a simple shot-list prompt. The final step in your production pipeline." }
];

// Modal data for flowchart
export const MODAL_DATA = {
    modal1: { title: "Step 1: New Lead Captured", content: "A potential buyer or seller fills out a form on your website, a Facebook Lead Ad, or a landing page. This action is the trigger for the entire automation, adding their information to a spreadsheet or CRM." },
    modal2: { title: "Step 2: Trigger AI with Zapier/Make", content: "An automation tool like Zapier or Make constantly watches your lead source. When a new entry appears, it automatically triggers an action, sending the lead's data to the next step." },
    modal3: { title: "Step 3: Generate Content with ChatGPT", content: "The automation feeds the lead's data into a pre-defined prompt in ChatGPT. The AI generates a personalized follow-up sequence (email, SMS, etc.) based on your brand voice and the lead's specific inquiry." },
    modal4: { title: "Step 4: Agent Review & Send", content: "The AI-generated content is sent to you for a quick 30-second review. This critical human-in-the-loop step ensures quality and compliance. With one click, you approve and the messages are sent out through your email or SMS platform." },
    modal5: { title: "Step 5: Update CRM & Nurture", content: "After the messages are sent, the automation updates the contact's record in your CRM, tagging them as 'Nurture Started' and logging the communication. This keeps your pipeline organized and ready for the next human touchpoint." }
}; 