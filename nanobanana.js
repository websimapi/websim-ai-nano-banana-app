/**
 * NanoBanana AI Prompt Enhancer Module
 * This module uses the websim.chat.completions API to enhance a user's prompt
 * by applying an "AI Nano Banana" methodology:
 * 1. Nano: Make it concise and focused.
 * 2. Banana: Make it appealing, unique, and slightly whimsical (adding flavor).
 * 3. AI: Structure it for optimal Large Language Model (LLM) interaction.
 */

// System message to guide the AI's persona and output format
const SYSTEM_PROMPT = `You are the AI Nano Banana Prompt Generator. Your task is to take a raw user idea for an application or concept and transform it into a powerful, concise, and structured prompt ready for an advanced AI model (like GPT-4 or Claude Opus).

Follow these rules strictly:
1. **Nano-Focus:** Distill the core value proposition into a single, strong sentence.
2. **Banana-Flavor:** Add 1-2 whimsical, creative, or unexpected elements that enhance the concept without breaking it. This is the unique "banana twist."
3. **AI-Structure:** Format the final output as a clear, multi-part prompt, using headings and bullet points for maximum clarity.

The final output MUST be a structured, single block of text containing only the enhanced prompt. Do not include any introductory phrases, explanations, or dialogue outside of the generated prompt itself.

Use the following structure for your output:

# Amazing Application Prompt: [Concise Title]

## Core Concept
[Your single, strong, nano-focused sentence distillation of the user's idea.]

## Key Features (The Banana Twist)
- [Whimsical or unique feature 1.]
- [Whimsical or unique feature 2.]

## Technical Requirements
- Target Audience: [Specify who the app is for.]
- Required Output: [Specify the desired outcome, e.g., 'a detailed design spec', 'a marketing plan', 'a creative short story', etc.]
- Tone/Style: [Specify the desired tone, e.g., 'Professional and futuristic', 'Playful and retro', etc.]

---
This prompt is now ready for deep LLM consumption.
`;

/**
 * Generates an enhanced, AI-ready prompt from a user's raw idea.
 * @param {string} userIdea The initial, raw prompt from the user.
 * @returns {Promise<string>} The structured, amazing application prompt.
 */
export async function generateAmazingPrompt(userIdea) {
    if (!websim || !websim.chat || !websim.chat.completions) {
        throw new Error("Websim AI capabilities are not available.");
    }

    if (!userIdea || userIdea.trim() === "") {
        throw new Error("User idea cannot be empty.");
    }

    const conversationHistory = [
        {
            role: "system",
            content: SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: `My application idea is: "${userIdea.trim()}"`,
        },
    ];

    try {
        const completion = await websim.chat.completions.create({
            messages: conversationHistory,
        });

        const promptResult = completion.content;
        return promptResult.trim();

    } catch (error) {
        console.error("Error generating prompt:", error);
        throw new Error("Failed to communicate with the Nano Banana AI model.");
    }
}

