import { generateAmazingPrompt } from 'nanobanana';

document.addEventListener('DOMContentLoaded', () => {
    const userPromptEl = document.getElementById('user-prompt');
    const generateButton = document.getElementById('generate-button');
    const loadingEl = document.getElementById('loading');
    const resultContainerEl = document.getElementById('result-container');
    const generatedPromptEl = document.getElementById('generated-prompt');
    const copyButton = document.getElementById('copy-button');
    const errorEl = document.getElementById('error-message');

    function setLoading(isLoading) {
        generateButton.disabled = isLoading;
        loadingEl.classList.toggle('hidden', !isLoading);
    }

    function showResult(promptText) {
        generatedPromptEl.textContent = promptText;
        resultContainerEl.classList.remove('hidden');
    }

    function showError(message = "An unexpected error occurred.") {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }

    function hideNotifications() {
        resultContainerEl.classList.add('hidden');
        errorEl.classList.add('hidden');
    }

    generateButton.addEventListener('click', async () => {
        const userIdea = userPromptEl.value.trim();
        hideNotifications();

        if (userIdea.length < 10) {
            showError("Please provide a more detailed idea (at least 10 characters).");
            return;
        }

        setLoading(true);

        try {
            const amazingPrompt = await generateAmazingPrompt(userIdea);
            showResult(amazingPrompt);
        } catch (error) {
            console.error(error);
            showError(error.message || "Failed to generate prompt. Is your idea too complex for a Nano Banana?");
        } finally {
            setLoading(false);
        }
    });

    copyButton.addEventListener('click', () => {
        const promptText = generatedPromptEl.textContent;
        navigator.clipboard.writeText(promptText).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy Prompt';
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            // Fallback for non-secure contexts or older browsers
            alert("Copy failed! Please manually copy the text.");
        });
    });
});

