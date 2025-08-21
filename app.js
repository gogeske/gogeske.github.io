// Unified data structure - keeping it simple and performant
// Responsive image URL helper function
const getResponsiveImageUrl = (baseUrl) => {
    // Extract base URL without existing parameters
    const urlParts = baseUrl.split('?');
    const base = urlParts[0];
    
    // Get current viewport width to determine appropriate size
    const width = window.innerWidth;
    let size, quality;
    
    if (width <= 768) {
        size = 'w=400';  // Mobile
    } else if (width <= 1024) {
        size = 'w=800';  // Tablet
    } else {
        size = 'w=1200'; // Desktop
    }
    
    // Use WebP format with JPEG fallback and optimized quality
    return `${base}?ixlib=rb-4.0.3&auto=format&fit=crop&${size}&fm=webp&q=75`;
};

const languageExplorer = {
    // Country-based locations with language variations
    countries: [
        { lang: 'fr-FR', lang_name: 'French', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114', photographer: 'Fabien Maurin', photographerUrl: 'https://unsplash.com/@fabien_maurin', phrases: [{ text: 'Bonjour', meaning: 'Hello' }, { text: 'Salut', meaning: 'Hi' }] },
        { lang: 'es-ES', lang_name: 'Spanish', location: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4', photographer: 'Toa Heftiba', photographerUrl: 'https://unsplash.com/@heftiba', phrases: [{ text: '¡Hola!', meaning: 'Hello!' }, { text: 'Buenos días', meaning: 'Good morning' }] },
        { lang: 'es-MX', lang_name: 'Mexican Spanish', location: 'Mexico City, Mexico', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a', photographer: 'Jezael Melgoza', photographerUrl: 'https://unsplash.com/@jezar', phrases: [{ text: '¿Qué onda?', meaning: 'What\'s up?' }, { text: 'Órale', meaning: 'Wow/Cool' }] },
        { lang: 'es-AR', lang_name: 'Argentinian Spanish', location: 'Buenos Aires, Argentina', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849', photographer: 'Nico Baum', photographerUrl: 'https://unsplash.com/@nbaum', phrases: [{ text: 'Che, ¿qué tal?', meaning: 'Hey, how\'s it going?' }, { text: '¿Cómo andás?', meaning: 'How are you?' }] },
        { lang: 'ar-SA', lang_name: 'Arabic', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', photographer: 'ZQ Lee', photographerUrl: 'https://unsplash.com/@zqlee', phrases: [{ text: 'مرحبا', meaning: 'Hello' }, { text: 'أهلا', meaning: 'Welcome' }] },
        { lang: 'ja-JP', lang_name: 'Japanese', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', photographer: 'Tianshu Liu', photographerUrl: 'https://unsplash.com/@tianshu', phrases: [{ text: 'こんにちは', meaning: 'Hello' }, { text: 'おはよう', meaning: 'Good morning' }] },
        { lang: 'pt-BR', lang_name: 'Portuguese', location: 'Rio de Janeiro, Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325', photographer: 'Raphael Nogueira', photographerUrl: 'https://unsplash.com/@phaelnogueira', phrases: [{ text: 'Olá', meaning: 'Hello' }, { text: 'Oi', meaning: 'Hi' }] },
        { lang: 'nl-NL', lang_name: 'Dutch', location: 'Amsterdam, Netherlands', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017', photographer: 'Adrien Olichon', photographerUrl: 'https://unsplash.com/@adrienolichon', phrases: [{ text: 'Hallo', meaning: 'Hello' }, { text: 'Hoi', meaning: 'Hi' }] },
        { lang: 'de-DE', lang_name: 'German', location: 'Berlin, Germany', image: 'https://images.unsplash.com/photo-1587330979470-3016b6702d89', photographer: 'Ingo Stiller', photographerUrl: 'https://unsplash.com/@ingostiller', phrases: [{ text: 'Hallo', meaning: 'Hello' }, { text: 'Guten Tag', meaning: 'Good day' }] },
        { lang: 'it-IT', lang_name: 'Italian', location: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', photographer: 'Davi Costa', photographerUrl: 'https://unsplash.com/@davicosta', phrases: [{ text: 'Ciao', meaning: 'Hello/Bye' }, { text: 'Buongiorno', meaning: 'Good morning' }] },
        { lang: 'ru-RU', lang_name: 'Russian', location: 'Moscow, Russia', image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d', photographer: 'Nikolay Vorobyev', photographerUrl: 'https://unsplash.com/@nikolayv', phrases: [{ text: 'Привет', meaning: 'Hello' }, { text: 'Здравствуйте', meaning: 'Hello (formal)' }] },
        { lang: 'pl-PL', lang_name: 'Polish', location: 'Warsaw, Poland', image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25', photographer: 'Jacek Dylag', photographerUrl: 'https://unsplash.com/@dylu', phrases: [{ text: 'Cześć', meaning: 'Hi' }, { text: 'Dzień dobry', meaning: 'Good day' }] },
        { lang: 'tr-TR', lang_name: 'Turkish', location: 'Istanbul, Turkey', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b', photographer: 'Adli Wahid', photographerUrl: 'https://unsplash.com/@adliwahid', phrases: [{ text: 'Merhaba', meaning: 'Hello' }, { text: 'Selam', meaning: 'Hi' }] },
        { lang: 'ko-KR', lang_name: 'Korean', location: 'Seoul, South Korea', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451', photographer: 'Sven Mieke', photographerUrl: 'https://unsplash.com/@sxoxm', phrases: [{ text: '안녕하세요', meaning: 'Hello' }, { text: '안녕', meaning: 'Hi' }] },
        { lang: 'hi-IN', lang_name: 'Hindi', location: 'Mumbai, India', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f', photographer: 'Sonika Agarwal', photographerUrl: 'https://unsplash.com/@sonika_agarwal', phrases: [{ text: 'नमस्ते', meaning: 'Hello' }, { text: 'हैलो', meaning: 'Hello' }] },
        { lang: 'zh-CN', lang_name: 'Chinese', location: 'Beijing, China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d', photographer: 'Theodor Lundqvist', photographerUrl: 'https://unsplash.com/@umbriferous', phrases: [{ text: '你好', meaning: 'Hello' }, { text: '您好', meaning: 'Hello (formal)' }] },
        { lang: 'vi-VN', lang_name: 'Vietnamese', location: 'Ho Chi Minh City, Vietnam', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482', photographer: 'Linh Pham', photographerUrl: 'https://unsplash.com/@linhmadebyhand', phrases: [{ text: 'Xin chào', meaning: 'Hello' }, { text: 'Chào bạn', meaning: 'Hi' }] },
        { lang: 'id-ID', lang_name: 'Indonesian', location: 'Jakarta, Indonesia', image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f', photographer: 'Afif Kusuma', photographerUrl: 'https://unsplash.com/@javaistan', phrases: [{ text: 'Halo', meaning: 'Hello' }, { text: 'Selamat pagi', meaning: 'Good morning' }] },
        { lang: 'th-TH', lang_name: 'Thai', location: 'Bangkok, Thailand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', photographer: 'Sumit Chinchane', photographerUrl: 'https://unsplash.com/@sumitchinchane', phrases: [{ text: 'สวัสดี', meaning: 'Hello' }, { text: 'หวัดดี', meaning: 'Hi' }] }
    ],

    // Whimsical locations with thematic emoji collections
    whimsical: [
        { type: 'whimsical', lang_name: 'Universal', location: '🌍 Our Blue Planet', image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4', photographer: 'NASA', photographerUrl: 'https://unsplash.com/@nasa', phrases: [{ text: '🌍' }, { text: '🌎' }, { text: '🌏' }, { text: '✨' }, { text: '🌟' }, { text: '💫' }, { text: '🪐' }, { text: '🌌' }, { text: '🚀' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Ocean', location: '🌊 Ocean Depths', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000', photographer: 'Silas Baisch', photographerUrl: 'https://unsplash.com/@silasbaisch', phrases: [{ text: '🌊' }, { text: '🐋' }, { text: '🐠' }, { text: '🐙' }, { text: '🦈' }, { text: '🐚' }, { text: '💙' }, { text: '✨' }, { text: '🌀' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Cosmic', location: '🌌 Cosmic Wonder', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2', photographer: 'NASA', photographerUrl: 'https://unsplash.com/@nasa', phrases: [{ text: '🌌' }, { text: '⭐' }, { text: '🌟' }, { text: '✨' }, { text: '💫' }, { text: '🪐' }, { text: '🌙' }, { text: '🚀' }, { text: '🛸' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Mountains', location: '🏔️ Mountain Peaks', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', photographer: 'Claudio Testa', photographerUrl: 'https://unsplash.com/@claudiotesta', phrases: [{ text: '🏔️' }, { text: '⛰️' }, { text: '🗻' }, { text: '🌄' }, { text: '🌅' }, { text: '❄️' }, { text: '✨' }, { text: '🦅' }, { text: '🌟' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Nature', location: '🌸 Cherry Blossoms', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951', photographer: 'Sora Sagano', photographerUrl: 'https://unsplash.com/@sorasagano', phrases: [{ text: '🌸' }, { text: '🌺' }, { text: '🌷' }, { text: '🌻' }, { text: '🦋' }, { text: '🐝' }, { text: '✨' }, { text: '💖' }, { text: '🌿' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Hope', location: '🌈 After the Storm', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', photographer: 'Sergey Pesterev', photographerUrl: 'https://unsplash.com/@sickle', phrases: [{ text: '🌈' }, { text: '⛈️' }, { text: '🌦️' }, { text: '☀️' }, { text: '✨' }, { text: '💎' }, { text: '🦄' }, { text: '💫' }, { text: '🌟' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Aurora', location: '🔥 Aurora Dance', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7', photographer: 'Vincent Guth', photographerUrl: 'https://unsplash.com/@vinceguth', phrases: [{ text: '🔥' }, { text: '✨' }, { text: '🌌' }, { text: '💚' }, { text: '💙' }, { text: '💜' }, { text: '🌟' }, { text: '❄️' }, { text: '🏔️' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Wildlife', location: '🐾 Wildlife Wonder', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', photographer: 'Hu Chen', photographerUrl: 'https://unsplash.com/@huchenme', phrases: [{ text: '🐾' }, { text: '🦁' }, { text: '🐘' }, { text: '🦒' }, { text: '🦓' }, { text: '🐆' }, { text: '🦅' }, { text: '🌍' }, { text: '✨' }, { text: '👋' }] }
    ]
};

// Cache locations array for performance
const allLocations = [...languageExplorer.countries, ...languageExplorer.whimsical];

// Cache voices for performance
let cachedVoices = [];

// Simple helper function for backward compatibility
function isWhimsicalLocation(location) {
    return location.type === 'whimsical';
}

// Cache voices when available
function updateVoicesCache() {
    if ('speechSynthesis' in window) {
        cachedVoices = speechSynthesis.getVoices();
    }
}

// Cache DOM elements for performance
let locationBubble, locationName, detailSentence1, detailSentence2, photoCredit, photographerLink;

let currentLocation = null;
let currentPhraseIndex = 0;
let terminalVisible = false;
let detailsVisible = false;
let audioPlaying = false;

function updateAll() {
    if (!currentLocation) return;

    const phrase = currentLocation.phrases[currentPhraseIndex];
    const isRTL = currentLocation.lang && currentLocation.lang.startsWith('ar');
    const isWhimsical = isWhimsicalLocation(currentLocation);

    // Update background with responsive image
    document.body.style.backgroundImage = `url('${getResponsiveImageUrl(currentLocation.image)}')`;

    // No center overlay to update anymore

    // Update location bubble
    if (isWhimsical) {
        locationBubble.style.display = 'none';
    } else {
        locationBubble.style.display = 'block';
        locationName.textContent = currentLocation.location;

        // Position based on language direction
        if (isRTL) {
            locationBubble.style.left = 'auto';
            locationBubble.style.right = '1rem';
            locationBubble.style.textAlign = 'right';
        } else {
            locationBubble.style.right = 'auto';
            locationBubble.style.left = '1rem';
            locationBubble.style.textAlign = 'left';
        }

        // Update details if visible
        if (detailsVisible) {
            detailSentence1.textContent = `In ${currentLocation.location}, the language is ${currentLocation.lang_name}.`;
            detailSentence2.textContent = `"${phrase.text}" means ${phrase.meaning || 'N/A'}.`;
        }
    }

    // Update photo credit
    if (isRTL) {
        photoCredit.style.left = 'auto';
        photoCredit.style.right = '1rem';
        photoCredit.style.textAlign = 'right';
    } else {
        photoCredit.style.right = 'auto';
        photoCredit.style.left = '1rem';
        photoCredit.style.textAlign = 'left';
    }
    photographerLink.textContent = currentLocation.photographer;
    photographerLink.href = currentLocation.photographerUrl;
}

function getRandomPhrase() {
    speechSynthesis.cancel();

    currentLocation = allLocations[Math.floor(Math.random() * allLocations.length)];

    // Always pick a different phrase/emoji from the selected location
    let newPhraseIndex;
    do {
        newPhraseIndex = Math.floor(Math.random() * currentLocation.phrases.length);
    } while (newPhraseIndex === currentPhraseIndex && currentLocation.phrases.length > 1);
    currentPhraseIndex = newPhraseIndex;

    updateAll();
    setTimeout(() => speakPhrase(), 200);
}

function speakPhrase() {
    if (!currentLocation || audioPlaying) return;

    const phrase = currentLocation.phrases[currentPhraseIndex];
    const isEmoji = /^[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u.test(phrase.text);

    // Create flying text
    const flyingText = document.createElement('div');
    flyingText.className = 'flying-text';

    if (isEmoji || !phrase.meaning) {
        flyingText.textContent = phrase.text;
    } else {
        flyingText.innerHTML = `<div>${phrase.text}</div><div style="font-size: 0.8em; opacity: 0.9;">${phrase.meaning}</div>`;
    }

    // Random starting position around window edges
    const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
    const position = Math.random() * 80 + 10; // 10% to 90% along the edge

    const isRTL = currentLocation.lang && currentLocation.lang.startsWith('ar');

    switch (edge) {
        case 0: // Top edge
            flyingText.style.top = '5%';
            flyingText.style.left = position + '%';
            flyingText.style.textAlign = 'center';
            break;
        case 1: // Right edge
            flyingText.style.top = position + '%';
            flyingText.style.right = '5%';
            flyingText.style.textAlign = 'right';
            break;
        case 2: // Bottom edge
            flyingText.style.bottom = '5%';
            flyingText.style.left = position + '%';
            flyingText.style.textAlign = 'center';
            break;
        case 3: // Left edge
            flyingText.style.top = position + '%';
            flyingText.style.left = '5%';
            flyingText.style.textAlign = 'left';
            break;
    }

    // Override text alignment for RTL languages
    if (isRTL) {
        flyingText.style.textAlign = 'right';
    }

    document.body.appendChild(flyingText);

    setTimeout(() => {
        flyingText.style.animation = isEmoji ?
            'flyThroughRotate 2.5s cubic-bezier(0.1, 0.1, 0.9, 1) forwards' :
            'flyThrough 2.5s cubic-bezier(0.1, 0.1, 0.9, 1) forwards';
    }, 50);

    setTimeout(() => flyingText.remove(), 3000);

    // Speak if not emoji and has language
    if (!isEmoji && currentLocation.lang && 'speechSynthesis' in window) {
        audioPlaying = true;
        const utterance = new SpeechSynthesisUtterance(phrase.text);
        utterance.lang = currentLocation.lang;
        utterance.rate = 1.0;

        // Find the best voice for the language using cached voices
        if (cachedVoices.length === 0) updateVoicesCache();
        const langCode = currentLocation.lang.split('-')[0];
        const exactMatch = cachedVoices.find(voice => voice.lang === currentLocation.lang);
        const langMatch = cachedVoices.find(voice => voice.lang.startsWith(langCode));

        if (exactMatch) {
            utterance.voice = exactMatch;
        } else if (langMatch) {
            utterance.voice = langMatch;
        }

        utterance.onend = () => audioPlaying = false;
        utterance.onerror = () => audioPlaying = false;
        speechSynthesis.speak(utterance);
    }
}

function toggleDetails() {
    detailsVisible = !detailsVisible;
    const details = document.getElementById('details');

    if (detailsVisible) {
        locationBubble.classList.add('expanded');
        details.classList.add('show');
        updateAll(); // Refresh details
    } else {
        locationBubble.classList.remove('expanded');
        details.classList.remove('show');
    }
}

function toggleTerminal() {
    terminalVisible = !terminalVisible;
    const terminal = document.getElementById('terminal');
    terminal.classList.toggle('show', terminalVisible);
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === ' ') {
        e.preventDefault();
        getRandomPhrase();
    } else if (e.key === '?') {
        e.preventDefault();
        toggleTerminal();
    } else if (e.key === '.') {
        e.preventDefault();
        toggleDetails();
    } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/dgeske/', '_blank');
    } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/stephanie-geske-7185014/', '_blank');
    } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        window.open('http://icloud.com', '_blank');
    }
});

document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('.terminal')) return;

    // Check if click is on location bubble
    if (e.target.closest('.location-bubble')) {
        toggleDetails();
        return;
    }

    speakPhrase();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for performance
    locationBubble = document.getElementById('location-bubble');
    locationName = document.getElementById('location-name');
    detailSentence1 = document.getElementById('detail-sentence1');
    detailSentence2 = document.getElementById('detail-sentence2');
    photoCredit = document.getElementById('photo-credit');
    photographerLink = document.getElementById('photographer-link');

    // Initialize voice cache
    updateVoicesCache();

    // Start the experience
    getRandomPhrase();
});