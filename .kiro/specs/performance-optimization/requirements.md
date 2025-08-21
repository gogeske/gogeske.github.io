# Performance Optimization Requirements

## Overview
Optimize the gogeske.com Language Explorer website for better performance through image optimization and JavaScript improvements.

## Image Optimization Requirements

### 1. Responsive Image Sizing
- Convert all Unsplash image URLs to use responsive sizing parameters
- Mobile: `w=400` 
- Tablet: `w=800`
- Desktop: `w=1200`
- Add WebP format with JPEG fallback: `&fm=webp`

### 2. Image Compression
- Add quality parameter `&q=75` to all Unsplash URLs
- Target 40-60% file size reduction while maintaining visual quality

### 3. Lazy Loading Implementation
- Load only the current background image initially
- Preload 2-3 random images in background for smooth transitions
- Use intersection observer or similar technique for efficient loading

## JavaScript Performance Requirements

### 1. External JavaScript File
- Extract inline `<script>` block to separate `app.js` file
- Add `<script src="app.js" defer></script>` to HTML head
- Enable HTML parsing to continue while JS loads

### 2. Lazy Loading for Location Data
- Load locations on-demand when selected instead of upfront
- Keep only 5-10 locations in memory at once
- Reduce initial memory footprint of languageExplorer object

### 3. Animation Cleanup Optimization
- Reduce flying text removal timeout from 3000ms to 2600ms
- Add immediate cleanup when animations complete
- Prevent memory buildup during extended use

### 4. Voice Caching Optimization
- Call `updateVoicesCache()` only when speech synthesis is first used
- Remove from page load initialization
- Improve initial page load performance

## Success Metrics
- **Image Loading**: 60-70% reduction in loading time and bandwidth usage
- **JavaScript Performance**: 40-50% faster initial page load
- **Memory Usage**: Reduced memory consumption during interactions
- **User Experience**: Smoother transitions and faster responsiveness