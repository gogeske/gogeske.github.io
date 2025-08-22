# Implementation Plan

- [x] 1. Remove visual audio indicator to maintain minimal design
  - Remove audio-status element from HTML
  - Remove audio-status CSS styles and animations
  - Remove audio status display logic from JavaScript
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 2. Enhance swipe visual feedback for better user experience
  - Update CSS transforms to use minimum 15-20px movement instead of 8px
  - Add subtle scale effects (0.98) during swipe animations
  - Add brightness filter changes during swipes for additional feedback
  - Increase animation duration to 0.2s for more noticeable feedback
  - _Requirements: 2.1, 2.3, 2.4_

- [x] 3. Implement universal terminal slide-from-top mechanism
  - Modify terminal positioning to start above viewport (translateY(-100%))
  - Replace current up/down swipe logic with top-edge detection
  - Add slide-down animation using CSS transforms
  - Add slide-up animation for dismissal
  - Update keyboard shortcut to use same slide animation
  - _Requirements: 3.1, 3.2, 3.6_

- [x] 4. Add top-edge swipe detection for terminal access
  - Implement detection for swipes starting within 30px of top edge
  - Distinguish top-edge swipes from regular navigation swipes
  - Add threshold logic to prevent accidental terminal triggers
  - Test across different viewport sizes and devices
  - _Requirements: 3.1, 3.5_

- [x] 5. Implement tap-outside-to-close terminal functionality
  - Add event listener for clicks outside terminal area
  - Ensure clicks on terminal content don't trigger close
  - Maintain existing close button and swipe-up dismissal
  - Test interaction with other click handlers
  - _Requirements: 3.4_

- [x] 6. Improve cross-platform audio initialization and error handling
  - Enhance iOS audio unlock with multiple trigger events
  - Add comprehensive error logging for speech synthesis issues
  - Remove all visual error indicators (maintain silent failure)
  - Improve voice selection logic for better language matching
  - Add fallback mechanisms for audio unlock failures
  - _Requirements: 4.1, 4.3, 4.4, 5.4_

- [x] 7. Enhance universal tap-to-replay audio functionality
  - Ensure click handler works consistently across all devices
  - Add proper iOS audio unlock on first tap interaction
  - Maintain existing exclusions for links and terminal clicks
  - Test audio replay timing and responsiveness
  - _Requirements: 1.1, 1.2_

- [x] 8. Update help terminal content for new interaction model
  - Update terminal instructions to reflect slide-from-top access
  - Remove references to up/down swipes for terminal
  - Add clear instructions for top-edge swipe gesture
  - Ensure instructions work for both mobile and desktop users
  - _Requirements: 3.1, 3.5_

- [x] 9. Test and refine cross-platform consistency
  - Test all interactions on desktop browsers (Chrome, Firefox, Safari, Edge)
  - Test all interactions on mobile devices (iOS Safari, Android Chrome)
  - Verify consistent behavior across different viewport sizes
  - Ensure animations are smooth and responsive on all devices
  - _Requirements: 1.4, 2.5, 3.5, 4.5_