// Unified data structure - keeping it simple and performant
// Responsive image URL helper function
const getResponsiveImageUrl = (baseUrl) => {
    // Extract base URL without existing parameters
    const urlParts = baseUrl.split('?');
    const base = urlParts[0];

    // Get current viewport width to determine appropriate size
    const width = window.innerWidth;
    let size;

    if (width <= 768) {
        size = 'w=400';  // Mobile
    } else if (width <= 1024) {
        size = 'w=800';  // Tablet
    } else {
        size = 'w=1200'; // Desktop
    }

    // Use WebP format with JPEG fallback and aggressive compression for performance
    return `${base}?ixlib=rb-4.0.3&auto=format&fit=crop&${size}&fm=webp&q=60`;
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
        { lang: 'th-TH', lang_name: 'Thai', location: 'Bangkok, Thailand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', photographer: 'Sumit Chinchane', photographerUrl: 'https://unsplash.com/@sumitchinchane', phrases: [{ text: 'สวัสดี', meaning: 'Hello' }, { text: 'หวัดดี', meaning: 'Hi' }] },

        // High-demand languages expansion
        { lang: 'sw-TZ', lang_name: 'Swahili', location: 'Stone Town, Zanzibar', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa', photographer: 'Sergey Pesterev', photographerUrl: 'https://unsplash.com/@sickle', phrases: [{ text: 'Hujambo', meaning: 'Hello (formal)' }, { text: 'Mambo', meaning: 'What\'s up?' }] },
        { lang: 'he-IL', lang_name: 'Hebrew', location: 'Jerusalem, Israel', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f', photographer: 'Sander Crombach', photographerUrl: 'https://unsplash.com/@sandercrombach', phrases: [{ text: 'שלום', meaning: 'Hello/Peace' }, { text: 'מה נשמע?', meaning: 'What\'s up?' }] },
        { lang: 'el-GR', lang_name: 'Greek', location: 'Athens, Greece', image: 'https://images.unsplash.com/photo-1555993539-1732b0258235', photographer: 'Arthur Yeti', photographerUrl: 'https://unsplash.com/@arthuryeti', phrases: [{ text: 'Γεια σας', meaning: 'Hello (formal)' }, { text: 'Γεια σου', meaning: 'Hello (informal)' }] },
        { lang: 'sv-SE', lang_name: 'Swedish', location: 'Stockholm, Sweden', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11', photographer: 'Raphael Andres', photographerUrl: 'https://unsplash.com/@raphaelandres', phrases: [{ text: 'Hej', meaning: 'Hello' }, { text: 'Tjena', meaning: 'Hi (casual)' }] },
        { lang: 'no-NO', lang_name: 'Norwegian', location: 'Oslo, Norway', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', photographer: 'Sven-Mieke Weinmann', photographerUrl: 'https://unsplash.com/@sxoxm', phrases: [{ text: 'Hei', meaning: 'Hello' }, { text: 'Halla', meaning: 'Hi (casual)' }] },
        { lang: 'fi-FI', lang_name: 'Finnish', location: 'Helsinki, Finland', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e', photographer: 'Tapio Haaja', photographerUrl: 'https://unsplash.com/@tapiohaaja', phrases: [{ text: 'Hei', meaning: 'Hello' }, { text: 'Terve', meaning: 'Hi' }] },
        { lang: 'cs-CZ', lang_name: 'Czech', location: 'Prague, Czech Republic', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d', photographer: 'Rodrigo Ardilha', photographerUrl: 'https://unsplash.com/@rodrigoardilha', phrases: [{ text: 'Ahoj', meaning: 'Hello' }, { text: 'Dobrý den', meaning: 'Good day' }] },
        { lang: 'hu-HU', lang_name: 'Hungarian', location: 'Budapest, Hungary', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d', photographer: 'Rodrigo Ardilha', photographerUrl: 'https://unsplash.com/@rodrigoardilha', phrases: [{ text: 'Szia', meaning: 'Hello (informal)' }, { text: 'Jó napot', meaning: 'Good day' }] },
        { lang: 'ro-RO', lang_name: 'Romanian', location: 'Bucharest, Romania', image: 'https://images.unsplash.com/photo-1555993539-1732b0258235', photographer: 'Arthur Yeti', photographerUrl: 'https://unsplash.com/@arthuryeti', phrases: [{ text: 'Salut', meaning: 'Hello' }, { text: 'Bună ziua', meaning: 'Good day' }] },
        { lang: 'bg-BG', lang_name: 'Bulgarian', location: 'Sofia, Bulgaria', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', photographer: 'Sven-Mieke Weinmann', photographerUrl: 'https://unsplash.com/@sxoxm', phrases: [{ text: 'Здравей', meaning: 'Hello' }, { text: 'Здрасти', meaning: 'Hi (casual)' }] },
        { lang: 'hr-HR', lang_name: 'Croatian', location: 'Zagreb, Croatia', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e', photographer: 'Tapio Haaja', photographerUrl: 'https://unsplash.com/@tapiohaaja', phrases: [{ text: 'Bok', meaning: 'Hello' }, { text: 'Dobar dan', meaning: 'Good day' }] },
        { lang: 'uk-UA', lang_name: 'Ukrainian', location: 'Kyiv, Ukraine', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d', photographer: 'Rodrigo Ardilha', photographerUrl: 'https://unsplash.com/@rodrigoardilha', phrases: [{ text: 'Привіт', meaning: 'Hello' }, { text: 'Добрий день', meaning: 'Good day' }] },
        { lang: 'fa-IR', lang_name: 'Persian', location: 'Isfahan, Iran', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa', photographer: 'Sergey Pesterev', photographerUrl: 'https://unsplash.com/@sickle', phrases: [{ text: 'سلام', meaning: 'Hello' }, { text: 'درود', meaning: 'Greetings' }] },
        { lang: 'ur-PK', lang_name: 'Urdu', location: 'Karachi, Pakistan', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f', photographer: 'Sander Crombach', photographerUrl: 'https://unsplash.com/@sandercrombach', phrases: [{ text: 'السلام علیکم', meaning: 'Peace be upon you' }, { text: 'آداب', meaning: 'Greetings' }] },
        { lang: 'bn-BD', lang_name: 'Bengali', location: 'Dhaka, Bangladesh', image: 'https://images.unsplash.com/photo-1555993539-1732b0258235', photographer: 'Arthur Yeti', photographerUrl: 'https://unsplash.com/@arthuryeti', phrases: [{ text: 'নমস্কার', meaning: 'Hello' }, { text: 'আসসালামু আলাইকুম', meaning: 'Peace be upon you' }] }
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
        { type: 'whimsical', lang_name: 'Wildlife', location: '🐾 Wildlife Wonder', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', photographer: 'Hu Chen', photographerUrl: 'https://unsplash.com/@huchenme', phrases: [{ text: '🐾' }, { text: '🦁' }, { text: '🐘' }, { text: '🦒' }, { text: '🦓' }, { text: '🐆' }, { text: '🦅' }, { text: '🌍' }, { text: '✨' }, { text: '👋' }] },

        // Enhanced whimsical locations
        { type: 'whimsical', lang_name: 'Desert', location: '🏜️ Desert Oasis', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9', photographer: 'Walid Ahmad', photographerUrl: 'https://unsplash.com/@walid_ahmad', phrases: [{ text: '🏜️' }, { text: '🐪' }, { text: '🌵' }, { text: '☀️' }, { text: '💧' }, { text: '🏛️' }, { text: '✨' }, { text: '🌙' }, { text: '⭐' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Volcanic', location: '🌋 Volcanic Islands', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', photographer: 'Marc Szeglat', photographerUrl: 'https://unsplash.com/@marcszeglat', phrases: [{ text: '🌋' }, { text: '🏝️' }, { text: '🔥' }, { text: '🌺' }, { text: '🥥' }, { text: '🐚' }, { text: '🌊' }, { text: '☀️' }, { text: '✨' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Himalayan', location: '🏔️ Himalayan Heights', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', photographer: 'Claudio Testa', photographerUrl: 'https://unsplash.com/@claudiotesta', phrases: [{ text: '🏔️' }, { text: '🕉️' }, { text: '🙏' }, { text: '❄️' }, { text: '🦅' }, { text: '☁️' }, { text: '✨' }, { text: '🌟' }, { text: '💫' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Amazon', location: '🌿 Amazon Rainforest', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', photographer: 'Casey Horner', photographerUrl: 'https://unsplash.com/@mischievous_penguins', phrases: [{ text: '🌿' }, { text: '🦜' }, { text: '🐒' }, { text: '🦋' }, { text: '🌺' }, { text: '🌳' }, { text: '💚' }, { text: '🌧️' }, { text: '✨' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Ancient', location: '🏛️ Ancient Ruins', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e', photographer: 'Tapio Haaja', photographerUrl: 'https://unsplash.com/@tapiohaaja', phrases: [{ text: '🏛️' }, { text: '⚱️' }, { text: '📜' }, { text: '🗿' }, { text: '⚡' }, { text: '🔮' }, { text: '✨' }, { text: '🌟' }, { text: '💫' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Sakura', location: '🌸 Sakura Season', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951', photographer: 'Sora Sagano', photographerUrl: 'https://unsplash.com/@sorasagano', phrases: [{ text: '🌸' }, { text: '🌺' }, { text: '🦋' }, { text: '🍃' }, { text: '🌿' }, { text: '💮' }, { text: '✨' }, { text: '💖' }, { text: '🌟' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Festival', location: '🎭 Festival Celebration', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3', photographer: 'Aditya Chinchure', photographerUrl: 'https://unsplash.com/@adityachinchure', phrases: [{ text: '🎭' }, { text: '🎪' }, { text: '🎨' }, { text: '🎵' }, { text: '💃' }, { text: '🕺' }, { text: '🎉' }, { text: '✨' }, { text: '🌟' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Sunrise', location: '🌅 Sunrise Meditation', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', photographer: 'Claudio Testa', photographerUrl: 'https://unsplash.com/@claudiotesta', phrases: [{ text: '🌅' }, { text: '🧘' }, { text: '☮️' }, { text: '🕯️' }, { text: '🙏' }, { text: '💆' }, { text: '✨' }, { text: '🌟' }, { text: '💫' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Coral', location: '🌊 Coral Reef', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000', photographer: 'Silas Baisch', photographerUrl: 'https://unsplash.com/@silasbaisch', phrases: [{ text: '🐠' }, { text: '🐟' }, { text: '🦈' }, { text: '🐙' }, { text: '🦀' }, { text: '🐚' }, { text: '🌊' }, { text: '💙' }, { text: '✨' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Butterfly', location: '🦋 Butterfly Garden', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951', photographer: 'Sora Sagano', photographerUrl: 'https://unsplash.com/@sorasagano', phrases: [{ text: '🦋' }, { text: '🌺' }, { text: '🌸' }, { text: '🌻' }, { text: '🌷' }, { text: '🐝' }, { text: '🌿' }, { text: '✨' }, { text: '💖' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Moonlight', location: '🌙 Moonlit Night', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2', photographer: 'NASA', photographerUrl: 'https://unsplash.com/@nasa', phrases: [{ text: '🌙' }, { text: '⭐' }, { text: '🌟' }, { text: '✨' }, { text: '🦉' }, { text: '🌌' }, { text: '💫' }, { text: '🔮' }, { text: '🌠' }, { text: '👋' }] },
        { type: 'whimsical', lang_name: 'Stargazing', location: '⭐ Stargazing', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2', photographer: 'NASA', photographerUrl: 'https://unsplash.com/@nasa', phrases: [{ text: '⭐' }, { text: '🌟' }, { text: '✨' }, { text: '💫' }, { text: '🌌' }, { text: '🔭' }, { text: '🌠' }, { text: '🪐' }, { text: '🚀' }, { text: '👋' }] }
    ]
};

// allLocations will be initialized in DOMContentLoaded

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
let locationBubble, locationName, detailSentence1, detailSentence2, photoCredit, photographerLink, liveRegion;

let currentLocation = null;
let currentPhraseIndex = 0;
let terminalVisible = false;
let detailsVisible = false;
let audioPlaying = false;

// Performance optimization variables
let imageCache = new Map();
let preloadedImages = new Set();
let isLoading = false;
let currentLocationIndex = 0;
let allLocations = [];

// History system for navigation
let locationHistory = [];
let historyIndex = -1;

// History management functions
function addToHistory(location, locationIndex, phraseIndex) {
    // Add new entry to history
    locationHistory.push({
        location: location,
        locationIndex: locationIndex,
        phraseIndex: phraseIndex
    });

    // Keep history reasonable size (last 20 items)
    if (locationHistory.length > 20) {
        locationHistory.shift();
    }

    // Update history index to point to the end (current position is not in history)
    historyIndex = locationHistory.length - 1;
    console.log('Added to history:', location.location, 'historyIndex:', historyIndex, 'history length:', locationHistory.length);
}

function goBackInHistory() {
    console.log('Going back - historyIndex:', historyIndex, 'history length:', locationHistory.length);

    if (historyIndex < 0 || locationHistory.length === 0) {
        // No history to go back to, just get a random phrase
        console.log('No history, getting random phrase');
        getRandomPhrase();
        return;
    }

    speechSynthesis.cancel();
    const historyItem = locationHistory[historyIndex];
    console.log('Going back to:', historyItem.location.location);
    historyIndex--; // Move back in history after getting the item

    // Show loading state if image isn't preloaded
    const imageUrl = getResponsiveImageUrl(historyItem.location.image);
    if (!preloadedImages.has(historyItem.location.image) && !imageCache.has(imageUrl)) {
        showLoadingState();
    }

    // Restore from history
    preloadImage(historyItem.location.image).then(() => {
        currentLocation = historyItem.location;
        currentLocationIndex = historyItem.locationIndex;
        currentPhraseIndex = historyItem.phraseIndex;

        updateAll();
        hideLoadingState();

        // Add haptic feedback
        triggerHapticFeedback();

        // Announce to screen readers
        const phrase = currentLocation.phrases[currentPhraseIndex];
        if (!isWhimsicalLocation(currentLocation)) {
            const announcement = `Going back: ${phrase.text}, meaning ${phrase.meaning || 'no translation'}, from ${currentLocation.location}`;
            announceToScreenReader(announcement);
        } else {
            announceToScreenReader(`Going back to: ${currentLocation.location}`);
        }

        setTimeout(() => speakPhrase(), 200);
    }).catch(() => {
        hideLoadingState();
        currentLocation = historyItem.location;
        currentLocationIndex = historyItem.locationIndex;
        currentPhraseIndex = historyItem.phraseIndex;
        updateAll();
        setTimeout(() => speakPhrase(), 200);
    });
}

function goForwardInHistory() {
    console.log('Going forward - historyIndex:', historyIndex, 'history length:', locationHistory.length);
    
    // Check if we can go forward in history
    if (historyIndex + 2 < locationHistory.length) {
        // There is forward history available
        historyIndex++; // Move forward in history
        speechSynthesis.cancel();
        
        const historyItem = locationHistory[historyIndex + 1];
        console.log('Going forward to:', historyItem.location.location);
        
        // Show loading state if image isn't preloaded
        const imageUrl = getResponsiveImageUrl(historyItem.location.image);
        if (!preloadedImages.has(historyItem.location.image) && !imageCache.has(imageUrl)) {
            showLoadingState();
        }
        
        // Restore from history
        preloadImage(historyItem.location.image).then(() => {
            currentLocation = historyItem.location;
            currentLocationIndex = historyItem.locationIndex;
            currentPhraseIndex = historyItem.phraseIndex;
            
            updateAll();
            hideLoadingState();
            
            // Add haptic feedback
            triggerHapticFeedback();
            
            // Announce to screen readers
            const phrase = currentLocation.phrases[currentPhraseIndex];
            if (!isWhimsicalLocation(currentLocation)) {
                const announcement = `Going forward: ${phrase.text}, meaning ${phrase.meaning || 'no translation'}, from ${currentLocation.location}`;
                announceToScreenReader(announcement);
            } else {
                announceToScreenReader(`Going forward to: ${currentLocation.location}`);
            }
            
            setTimeout(() => speakPhrase(), 200);
        }).catch(() => {
            hideLoadingState();
            currentLocation = historyItem.location;
            currentLocationIndex = historyItem.locationIndex;
            currentPhraseIndex = historyItem.phraseIndex;
            updateAll();
            setTimeout(() => speakPhrase(), 200);
        });
    } else {
        // No forward history, get a new random phrase
        console.log('No forward history, getting new random phrase');
        getRandomPhrase();
    }
}

// Touch gesture variables
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isLongPress = false;
let isSwipeInProgress = false;
let swipeAnimationTimeout = null;

// Accessibility functions
function announceToScreenReader(message) {
    if (liveRegion) {
        liveRegion.textContent = message;
        // Clear after announcement to allow repeated announcements
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

function updateAriaExpanded(element, expanded) {
    element.setAttribute('aria-expanded', expanded.toString());
}

// Performance optimization functions
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        if (imageCache.has(url)) {
            resolve(imageCache.get(url));
            return;
        }

        const img = new Image();
        img.onload = () => {
            imageCache.set(url, img);
            preloadedImages.add(url);
            resolve(img);
        };
        img.onerror = reject;
        img.src = getResponsiveImageUrl(url);
    });
}

function preloadNextImages(currentIndex, locations) {
    // Preload next 3 images for smooth transitions
    const preloadCount = 3;
    for (let i = 1; i <= preloadCount; i++) {
        const nextIndex = (currentIndex + i) % locations.length;
        const nextLocation = locations[nextIndex];
        if (nextLocation && !preloadedImages.has(nextLocation.image)) {
            preloadImage(nextLocation.image).catch(() => {
                // Silently handle preload failures
            });
        }
    }
}

function showLoadingState() {
    if (isLoading) return; // Prevent multiple loading states

    isLoading = true;
    document.body.style.filter = 'blur(2px)';
    document.body.style.transition = 'filter 0.3s ease';

    // Create loading indicator with proper DOM manipulation
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.className = 'loading-overlay';

    const content = document.createElement('div');
    content.className = 'loading-content';

    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';

    const text = document.createElement('span');
    text.textContent = 'Traveling...';

    content.appendChild(spinner);
    content.appendChild(text);
    loadingIndicator.appendChild(content);
    document.body.appendChild(loadingIndicator);
}

function hideLoadingState() {
    isLoading = false;
    document.body.style.filter = 'none';
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

function triggerHapticFeedback(pattern = 50) {
    if ('vibrate' in navigator && isMobileDevice()) {
        navigator.vibrate(pattern);
    }
}

// Touch gesture handlers
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    isLongPress = false;
    isSwipeInProgress = false;

    // Clear any existing swipe animation
    if (swipeAnimationTimeout) {
        clearTimeout(swipeAnimationTimeout);
        swipeAnimationTimeout = null;
    }
    document.body.className = document.body.className.replace(/swiping-\w+/g, '');

    // Set up long press detection
    setTimeout(() => {
        if (Date.now() - touchStartTime >= 500) {
            isLongPress = true;
            triggerHapticFeedback([100, 50, 100]); // Long press feedback
        }
    }, 500);
}

function handleTouchMove(e) {
    if (isLongPress || isSwipeInProgress) return;

    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only start visual feedback if we've moved enough
    if (distance > 20) {
        isSwipeInProgress = true;

        // Determine swipe direction and add visual feedback
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                document.body.classList.add('swiping-right');
            } else {
                document.body.classList.add('swiping-left');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                document.body.classList.add('swiping-down');
            } else {
                document.body.classList.add('swiping-up');
            }
        }
    }
}

function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchDuration = Date.now() - touchStartTime;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Clear swipe visual feedback
    const clearSwipeAnimation = () => {
        document.body.className = document.body.className.replace(/swiping-\w+/g, '');
        isSwipeInProgress = false;
    };

    // Handle long press
    if (isLongPress) {
        clearSwipeAnimation();
        speakPhrase(); // Repeat current phrase
        return;
    }

    // Handle swipe gestures with improved thresholds
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        triggerHapticFeedback();
        if (deltaX > 0) {
            // Swipe right - forward in history or new random phrase
            // Add a slight delay to show the animation
            swipeAnimationTimeout = setTimeout(() => {
                clearSwipeAnimation();
                goForwardInHistory();
            }, 150);
        } else {
            // Swipe left - back in history
            swipeAnimationTimeout = setTimeout(() => {
                clearSwipeAnimation();
                goBackInHistory();
            }, 150);
        }
    } else if (Math.abs(deltaY) > 30) {
        if (deltaY < 0) {
            // Swipe up - open help
            if (!terminalVisible) {
                triggerHapticFeedback();
                swipeAnimationTimeout = setTimeout(() => {
                    clearSwipeAnimation();
                    toggleTerminal();
                }, 150);
            } else {
                clearSwipeAnimation();
            }
        } else {
            // Swipe down - close help
            if (terminalVisible) {
                triggerHapticFeedback();
                swipeAnimationTimeout = setTimeout(() => {
                    clearSwipeAnimation();
                    toggleTerminal();
                }, 150);
            } else {
                clearSwipeAnimation();
            }
        }
    } else {
        // No significant swipe, just clear animation
        clearSwipeAnimation();

        // Handle tap if it was a short touch with minimal movement
        if (distance < 20 && touchDuration < 300) {
            speakPhrase(); // Tap to repeat phrase
        }
    }
}

function updateAll() {
    if (!currentLocation) return;

    const phrase = currentLocation.phrases[currentPhraseIndex];
    const isRTL = currentLocation.lang && currentLocation.lang.startsWith('ar');
    const isWhimsical = isWhimsicalLocation(currentLocation);

    // Update background with responsive image and error handling
    const imageUrl = getResponsiveImageUrl(currentLocation.image);
    
    // Test if image loads, fallback to gradient if it fails
    const testImage = new Image();
    testImage.onload = () => {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    };
    testImage.onerror = () => {
        console.log('Image failed to load:', imageUrl);
        // Keep the CSS gradient fallback
        document.body.style.backgroundImage = 'none';
    };
    testImage.src = imageUrl;

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
            detailSentence1.textContent = `This is ${currentLocation.lang_name} from ${currentLocation.location}.`;
            detailSentence2.textContent = `"${phrase.text}" translates to "${phrase.meaning || 'no translation available'}".`;
            document.getElementById('details').setAttribute('aria-hidden', 'false');
        } else {
            document.getElementById('details').setAttribute('aria-hidden', 'true');
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
    photographerLink.setAttribute('rel', 'noopener noreferrer');
    photographerLink.setAttribute('target', '_blank');


}

function getRandomPhrase() {
    speechSynthesis.cancel();

    // Get a random location different from current
    let newLocation;
    let newLocationIndex;
    do {
        newLocationIndex = Math.floor(Math.random() * allLocations.length);
        newLocation = allLocations[newLocationIndex];
    } while (newLocation === currentLocation && allLocations.length > 1);

    // Show loading state if image isn't preloaded
    const imageUrl = getResponsiveImageUrl(newLocation.image);
    if (!preloadedImages.has(newLocation.image) && !imageCache.has(imageUrl)) {
        showLoadingState();
    }

    // Preload the image and update when ready
    preloadImage(newLocation.image).then(() => {
        // Add current state to history before changing (if we have a current location)
        if (currentLocation) {
            addToHistory(currentLocation, currentLocationIndex, currentPhraseIndex);
        }

        currentLocation = newLocation;
        currentLocationIndex = newLocationIndex;

        // Always pick a different phrase/emoji from the selected location
        let newPhraseIndex;
        do {
            newPhraseIndex = Math.floor(Math.random() * currentLocation.phrases.length);
        } while (newPhraseIndex === currentPhraseIndex && currentLocation.phrases.length > 1);
        currentPhraseIndex = newPhraseIndex;

        updateAll();
        hideLoadingState();

        // Preload next images for smooth future transitions
        preloadNextImages(currentLocationIndex, allLocations);

        // Add haptic feedback for mobile users
        triggerHapticFeedback();

        // Announce new phrase to screen readers
        const phrase = currentLocation.phrases[currentPhraseIndex];
        if (!isWhimsicalLocation(currentLocation)) {
            const announcement = `New phrase: ${phrase.text}, meaning ${phrase.meaning || 'no translation'}, from ${currentLocation.location}`;
            announceToScreenReader(announcement);
        } else {
            announceToScreenReader(`New location: ${currentLocation.location}`);
        }

        setTimeout(() => speakPhrase(), 200);
    }).catch(() => {
        // Fallback: proceed without preloading
        hideLoadingState();
        currentLocation = newLocation;
        currentLocationIndex = newLocationIndex;

        let newPhraseIndex;
        do {
            newPhraseIndex = Math.floor(Math.random() * currentLocation.phrases.length);
        } while (newPhraseIndex === currentPhraseIndex && currentLocation.phrases.length > 1);
        currentPhraseIndex = newPhraseIndex;

        updateAll();
        triggerHapticFeedback();
        setTimeout(() => speakPhrase(), 200);
    });
}

function speakPhrase() {
    if (!currentLocation || audioPlaying) return;

    const phrase = currentLocation.phrases[currentPhraseIndex];
    const isEmoji = /^[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u.test(phrase.text);

    // iOS audio unlock - create a dummy utterance first if needed
    if (isMobileDevice() && 'speechSynthesis' in window && !window.speechSynthesisUnlocked) {
        const dummyUtterance = new SpeechSynthesisUtterance('');
        dummyUtterance.volume = 0;
        speechSynthesis.speak(dummyUtterance);
        window.speechSynthesisUnlocked = true;
    }

    // Create flying text
    const flyingText = document.createElement('div');
    flyingText.className = 'flying-text';

    if (isEmoji || !phrase.meaning) {
        flyingText.textContent = phrase.text;
    } else {
        // Create elements safely to prevent XSS
        const textDiv = document.createElement('div');
        textDiv.textContent = phrase.text;

        const meaningDiv = document.createElement('div');
        meaningDiv.textContent = phrase.meaning;
        meaningDiv.style.fontSize = '0.8em';
        meaningDiv.style.opacity = '0.9';

        flyingText.appendChild(textDiv);
        flyingText.appendChild(meaningDiv);
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

    setTimeout(() => flyingText.remove(), 2600);

    // Speak if not emoji and has language
    if (!isEmoji && currentLocation.lang && 'speechSynthesis' in window) {
        audioPlaying = true;

        // Cancel any existing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(phrase.text);
        utterance.lang = currentLocation.lang;
        utterance.rate = isMobileDevice() ? 0.9 : 1.0;
        utterance.volume = 1.0;
        utterance.pitch = 1.0;

        // Lazy initialize voices only when speech is first used
        if (cachedVoices.length === 0) updateVoicesCache();
        const langCode = currentLocation.lang.split('-')[0];
        const exactMatch = cachedVoices.find(voice => voice.lang === currentLocation.lang);
        const langMatch = cachedVoices.find(voice => voice.lang.startsWith(langCode));

        if (exactMatch) {
            utterance.voice = exactMatch;
        } else if (langMatch) {
            utterance.voice = langMatch;
        }

        utterance.onend = () => {
            audioPlaying = false;
        };

        utterance.onerror = (event) => {
            console.log('Speech synthesis error:', event.error);
            audioPlaying = false;
        };

        // iOS requires speech to be triggered by user interaction
        // Add a small delay to ensure proper iOS handling
        if (isMobileDevice()) {
            setTimeout(() => {
                speechSynthesis.speak(utterance);
            }, 100);
        } else {
            speechSynthesis.speak(utterance);
        }
    }
}

function toggleDetails() {
    detailsVisible = !detailsVisible;
    const details = document.getElementById('details');

    if (detailsVisible) {
        locationBubble.classList.add('expanded');
        details.classList.add('show');
        updateAriaExpanded(locationBubble, true);
        details.setAttribute('aria-hidden', 'false');
        updateAll(); // Refresh details
        announceToScreenReader('Location details expanded');
    } else {
        locationBubble.classList.remove('expanded');
        details.classList.remove('show');
        updateAriaExpanded(locationBubble, false);
        details.setAttribute('aria-hidden', 'true');
        announceToScreenReader('Location details collapsed');
    }
}

function toggleTerminal() {
    terminalVisible = !terminalVisible;
    const terminal = document.getElementById('terminal');
    const terminalDialog = document.getElementById('terminal-dialog');

    if (terminalVisible) {
        if (terminal) terminal.classList.add('show');
        if (terminalDialog) terminalDialog.setAttribute('aria-hidden', 'false');
        // Focus the close button for keyboard users
        const closeButton = terminal?.querySelector('.terminal-close');
        if (closeButton) {
            closeButton.focus();
        }
        announceToScreenReader('Help dialog opened');
    } else {
        if (terminal) terminal.classList.remove('show');
        if (terminalDialog) terminalDialog.setAttribute('aria-hidden', 'true');
        announceToScreenReader('Help dialog closed');
    }
}

// Event listeners
document.addEventListener('keydown', (e) => {
    // Handle terminal close with Escape key
    if (e.key === 'Escape' && terminalVisible) {
        e.preventDefault();
        toggleTerminal();
        return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        getRandomPhrase();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBackInHistory();
    } else if (e.key === '?' || e.key === 'h' || e.key === 'H') {
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

// Handle location bubble keyboard interaction
document.addEventListener('keydown', (e) => {
    if (e.target.id === 'location-bubble' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        toggleDetails();
    }
});

document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('.terminal')) return;

    // Handle terminal close button
    if (e.target.classList.contains('terminal-close')) {
        toggleTerminal();
        return;
    }

    // Check if click is on location bubble
    if (e.target.closest('.location-bubble')) {
        toggleDetails();
        return;
    }

    speakPhrase();
});

// Register service worker for performance caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize allLocations array
    allLocations = [...languageExplorer.countries, ...languageExplorer.whimsical];

    // Cache DOM elements for performance
    locationBubble = document.getElementById('location-bubble');
    locationName = document.getElementById('location-name');
    detailSentence1 = document.getElementById('detail-sentence1');
    detailSentence2 = document.getElementById('detail-sentence2');
    photoCredit = document.getElementById('photo-credit');
    photographerLink = document.getElementById('photographer-link');
    liveRegion = document.getElementById('live-region');

    // Set initial ARIA states
    const terminalDialog = document.getElementById('terminal-dialog');
    if (terminalDialog) {
        terminalDialog.setAttribute('aria-hidden', 'true');
    }

    // iOS viewport height fix
    if (isMobileDevice()) {
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    // iOS audio initialization - unlock audio on first user interaction
    if (isMobileDevice() && 'speechSynthesis' in window) {
        const unlockAudio = () => {
            if (!window.speechSynthesisUnlocked) {
                const dummyUtterance = new SpeechSynthesisUtterance('');
                dummyUtterance.volume = 0;
                speechSynthesis.speak(dummyUtterance);
                window.speechSynthesisUnlocked = true;

                // Remove the event listeners after first unlock
                document.removeEventListener('touchstart', unlockAudio);
                document.removeEventListener('click', unlockAudio);
            }
        };

        document.addEventListener('touchstart', unlockAudio, { once: true });
        document.addEventListener('click', unlockAudio, { once: true });
    }



    // Add touch event listeners for mobile gestures
    if (isMobileDevice()) {
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Add mobile-specific instructions to terminal
        const terminal = document.getElementById('terminal');
        if (terminal) {
            const mobileSection = document.createElement('div');
            mobileSection.className = 'mobile-instructions';

            // Create mobile instruction lines
            const instructions = [
                { prompt: 'Swipe:', text: 'Right for next, left to go back' },
                { prompt: 'Help:', text: 'Swipe up to open, down to close' },
                { prompt: 'Repeat:', text: 'Long press anywhere' }
            ];

            instructions.forEach(instruction => {
                const line = document.createElement('div');
                line.className = 'terminal-line';

                const prompt = document.createElement('span');
                prompt.className = 'terminal-prompt';
                prompt.textContent = instruction.prompt;

                line.appendChild(prompt);
                line.appendChild(document.createTextNode(instruction.text));
                mobileSection.appendChild(line);
            });

            terminal.appendChild(mobileSection);
        }
    }

    // Add build info to terminal
    const terminal = document.getElementById('terminal');
    if (terminal) {
        const buildSection = document.createElement('div');
        buildSection.style.marginTop = '1.5rem';
        buildSection.style.paddingTop = '1rem';
        buildSection.style.borderTop = '1px solid rgba(255,255,255,0.2)';
        
        const buildLine = document.createElement('div');
        buildLine.className = 'terminal-line';
        
        const buildPrompt = document.createElement('span');
        buildPrompt.className = 'terminal-prompt';
        buildPrompt.textContent = 'Build:';
        
        const buildInfo = document.createElement('span');
        buildInfo.textContent = `f1379ec • 2025-08-22 23:23`;
        
        buildLine.appendChild(buildPrompt);
        buildLine.appendChild(buildInfo);
        buildSection.appendChild(buildLine);
        terminal.appendChild(buildSection);
    }

    // Voice cache will be initialized lazily when first needed

    // Start the experience
    getRandomPhrase();
});