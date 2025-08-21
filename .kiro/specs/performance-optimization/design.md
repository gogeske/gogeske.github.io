# Performance Optimization Design

## Image Optimization Design

### Responsive Image URL Structure
```javascript
// Current format
https://images.unsplash.com/photo-123?w=800

// New responsive format
const getResponsiveImageUrl = (baseUrl, size = 'desktop') => {
  const sizes = {
    mobile: 'w=400',
    tablet: 'w=800', 
    desktop: 'w=1200'
  };
  return `${baseUrl}?${sizes[size]}&fm=webp&q=75`;
};
```

### Lazy Loading Strategy
```javascript
class ImageLoader {
  constructor() {
    this.preloadedImages = new Set();
    this.currentImage = null;
  }
  
  async loadCurrentImage(url) {
    // Load and display current image immediately
  }
  
  preloadRandomImages(count = 3) {
    // Background preload 2-3 random images
  }
}
```

## JavaScript Performance Design

### File Structure
```
project/
├── index.html (minimal inline JS)
├── app.js (main application logic)
└── assets/
    └── images/ (optimized images)
```

### Lazy Location Loading
```javascript
const languageExplorer = {
  // Keep only essential data in memory
  activeLocations: new Map(), // Max 10 items
  
  async getLocation(type, index) {
    const key = `${type}-${index}`;
    if (!this.activeLocations.has(key)) {
      const location = await this.loadLocation(type, index);
      this.manageMemory(); // Remove old entries if > 10
      this.activeLocations.set(key, location);
    }
    return this.activeLocations.get(key);
  }
};
```

### Animation Cleanup Design
```javascript
const animationManager = {
  activeAnimations: new Set(),
  
  createFlyingText(text) {
    const element = this.createElement(text);
    const animation = element.animate(/* ... */);
    
    this.activeAnimations.add(animation);
    
    // Cleanup on completion or timeout (2600ms)
    Promise.race([
      animation.finished,
      new Promise(resolve => setTimeout(resolve, 2600))
    ]).then(() => {
      this.cleanup(element, animation);
    });
  }
};
```

### Voice Caching Strategy
```javascript
let voicesInitialized = false;

const initializeVoices = () => {
  if (!voicesInitialized) {
    updateVoicesCache();
    voicesInitialized = true;
  }
};

// Call only when speech is first used
const speakPhrase = (text, lang) => {
  initializeVoices(); // Lazy initialization
  // ... rest of speech logic
};
```

## Implementation Phases

### Phase 1: Image Optimization
1. Update all Unsplash URLs with responsive parameters
2. Implement image lazy loading system
3. Add WebP format support with fallbacks

### Phase 2: JavaScript Extraction
1. Create app.js file
2. Move inline scripts to external file
3. Update HTML to reference external script

### Phase 3: Performance Optimizations
1. Implement lazy location loading
2. Optimize animation cleanup
3. Add lazy voice initialization

### Phase 4: Testing & Validation
1. Measure performance improvements
2. Test across different devices/connections
3. Validate image loading behavior