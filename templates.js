// HTML Templates for Language Explorer
// Separates presentation markup from business logic

export const templates = {
    loadingIndicator: () => `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1.1rem;
            z-index: 10000;
            backdrop-filter: blur(10px);
        ">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="
                    width: 20px;
                    height: 20px;
                    border: 2px solid #ffffff40;
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                Loading next location...
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `,

    mobileInstructions: () => `
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
            <div class="terminal-line">
                <span class="terminal-prompt">Mobile:</span>Swipe left/right for new phrases
            </div>
            <div class="terminal-line">
                <span class="terminal-prompt">Gestures:</span>Swipe up for help, down to close
            </div>
            <div class="terminal-line">
                <span class="terminal-prompt">Long press:</span>Repeat current phrase
            </div>
        </div>
    `,

    flyingTextContent: (phrase) => {
        if (!phrase.meaning) {
            return phrase.text;
        }
        
        return `
            <div>${phrase.text}</div>
            <div style="font-size: 0.8em; opacity: 0.9;">${phrase.meaning}</div>
        `;
    }
};

// CSS that needs to be injected dynamically
export const dynamicStyles = {
    spin: `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `
};