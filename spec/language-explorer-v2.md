# Language Explorer v2 - Specification

## Overview
Interactive language learning web app that displays random greetings from around the world with beautiful location imagery and native pronunciation, following Apple's Human Interface Guidelines and spatial design principles.

## Current Implementation (v2.0)
- **Single HTML file** - Zero dependencies, works on GitHub Pages
- **15 languages** - Real locations + 3 spatial emoji locations
- **Image performance** - 800px images with preloading and caching
- **Spatial animations** - Physics-based spring animations with depth
- **TTS pronunciation** - Native browser speech synthesis with language-specific voices
- **Proper attribution** - Unsplash photographer credits

## Design System (Apple HIG Compliant)

### Visual Hierarchy
- **Typography**: SF Pro system font stack (-apple-system, BlinkMacSystemFont)
- **Scale**: Clear hierarchy with pronounced size differences (3rem → 160rem for flying text)
- **Weight**: Light (300) for primary content, Medium (500) for labels, Semibold (600) for headers
- **Color**: High contrast white text with appropriate opacity levels (1.0, 0.9, 0.7)

### Materials & Depth
- **Glass Morphism**: `rgba(255, 255, 255, 0.1)` with `backdrop-filter: blur(20px) saturate(180%)`
- **Subtle Borders**: `0.5px solid rgba(255, 255, 255, 0.2)` for definition without prison-like appearance
- **Layered Shadows**: `0 8px 32px rgba(0, 0, 0, 0.1)` for spatial depth
- **Corner Radius**: 20px for UI elements, maintaining Apple's rounded aesthetic

### Animation & Motion
- **Spring Physics**: `cubic-bezier(0.1, 0.1, 0.9, 1)` for natural, physics-based motion
- **Spatial Transitions**: Flying text creates depth and dimensionality
- **Responsive Feedback**: Subtle scale transforms (1.1x) for interactive elements
- **Rotation Effects**: Emoji elements use playful rotation (0° → 720°) for delight

### Interaction Design
- **Touch Targets**: Minimum 44pt touch targets for accessibility
- **Gesture Support**: Click, keyboard, and spatial navigation
- **Feedback**: Immediate visual and audio response to interactions
- **Progressive Disclosure**: Location details expand with contextual information

## Technical Architecture
- **Frontend**: Pure HTML/CSS/JavaScript optimized for Safari and WebKit
- **Images**: Unsplash API with proper attribution and WebP support
- **Audio**: Browser Web Speech API with language-specific voice selection
- **Hosting**: GitHub Pages (static) with PWA capabilities
- **Performance**: Image preloading, 800px optimized images, service worker caching

## User Experience Principles

### Spatial Design
- **Immersive Backgrounds**: Full-screen location imagery creates spatial context
- **Floating Elements**: UI components appear to float above the background plane
- **Depth Cues**: Layered shadows and blur effects create visual hierarchy
- **Cultural Awareness**: RTL/LTR layout adaptation respects reading patterns

### Interaction Patterns
- **Navigation**: Arrow keys, spacebar, or click anywhere for fluid exploration
- **Audio**: Click anywhere to replay with native pronunciation
- **Discovery**: Keyboard shortcuts revealed through help terminal (?)
- **Details**: Period (.) reveals contextual location information in natural language

### Accessibility & Inclusion
- **Voice Over**: Screen reader support for all interactive elements
- **Reduced Motion**: Respects user motion preferences
- **High Contrast**: Maintains readability across all backgrounds
- **Keyboard Navigation**: Full keyboard accessibility without mouse dependency

## Future Enhancements (v2.0)

### Content Expansion
- [ ] More languages (target: 30+ languages)
- [ ] Multiple greetings per language (formal/informal)
- [ ] Cultural context for each greeting
- [ ] Regional variations (Mexican Spanish vs Argentinian Spanish)

### Performance Improvements
- [ ] Service worker for offline caching
- [ ] WebP image format support
- [ ] Lazy loading for unused images
- [ ] CDN integration for faster global delivery

### User Features
- [ ] Favorites system (save preferred greetings)
- [ ] Learning progress tracking
- [ ] Pronunciation practice mode
- [ ] Share functionality (social media)

### Technical Enhancements
- [ ] PWA capabilities (installable app)
- [ ] Better TTS voice selection
- [ ] Keyboard shortcuts help overlay
- [ ] Analytics integration (privacy-focused)

### Accessibility
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Reduced motion preferences
- [ ] Keyboard navigation improvements

## Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Image Load Time**: < 1s per transition
- **Audio Latency**: < 500ms

## Browser Support
- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: ES2018, Web Speech API, CSS Grid

## Deployment
- **Primary**: GitHub Pages (gogeske.github.io)
- **Backup**: Netlify/Vercel for redundancy
- **Domain**: gogeske.com (custom domain)

## Maintenance
- **Image URLs**: Monitor Unsplash API changes
- **Browser compatibility**: Test quarterly
- **Performance**: Monitor Core Web Vitals
- **Content**: Review language accuracy annually