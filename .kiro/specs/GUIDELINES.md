# Spec Development Guidelines

## Core Principles

### Minimal Design First
- **No visual clutter** - Avoid unnecessary indicators, status displays, or UI elements
- **Silent error handling** - Log errors to console, don't show them to users
- **Trust the user** - Don't over-explain obvious interactions (e.g., "right arrow moves right")
- **Subtle feedback** - Visual responses should be noticeable but not distracting

### Universal Approach
- **One interaction model** - Same gestures/interactions work across all devices
- **Cross-platform compatibility** - Test on iOS, Android, desktop browsers
- **Consistent behavior** - Same feature should work identically everywhere
- **Future-proof** - Design for new devices and input methods

### Performance & Accessibility
- **Smooth animations** - Use transforms and opacity for 60fps performance
- **Respect user preferences** - Support reduced motion, high contrast, etc.
- **Responsive design** - Work across all viewport sizes and device capabilities
- **Graceful degradation** - Function even when features are unavailable

## Task Management

### Completed Tasks
- **Remove completed tasks** from tasks.md once implemented and committed
- **Keep tasks.md focused** on remaining work only
- **Git history provides the record** of what was completed
- **Archive approach**: Delete completed tasks rather than marking them done

### Task Writing
- **Be specific** - Tasks should be actionable by a coding agent
- **Include requirements references** - Link back to specific acceptance criteria
- **Focus on code** - Only include tasks that involve writing/modifying code
- **Avoid non-coding tasks** - No deployment, user testing, or business process tasks

## Help Content Guidelines

### Simplicity Rules
- **Don't explain obvious** - Users know basic interactions
- **Focus on non-obvious features** - Hidden shortcuts, special gestures
- **Be concise** - Fewer lines, more impact
- **Universal instructions** - Don't separate mobile/desktop unless necessary

### Content Principles
- **Show, don't tell** - App should be intuitive enough to need minimal help
- **Essential only** - If it's not essential, don't include it
- **Personality over verbosity** - Keep character but cut fluff
- **Test with real users** - If they ask about it, maybe it needs to be in help

## Implementation Standards

### Error Handling
- **Silent failures** - Log to console, continue gracefully
- **Multiple fallbacks** - Have backup plans for when things fail
- **Cross-platform testing** - Ensure errors are handled consistently
- **User experience first** - Never let errors break the experience

### Animation & Feedback
- **Minimal but noticeable** - Users should see their actions acknowledged
- **Consistent timing** - Same duration/easing across similar interactions
- **Performance optimized** - Use CSS transforms, avoid layout thrashing
- **Accessibility aware** - Respect motion preferences

### Code Quality
- **Console logging is fine** - Helpful for debugging, doesn't hurt performance
- **No TODOs in production** - Resolve or remove before committing
- **Clean, readable code** - Future you will thank present you
- **Document complex logic** - Especially cross-platform compatibility code

## Validation Checklist

Before completing any spec, validate:

- [ ] **Minimal design** - No unnecessary visual elements
- [ ] **Universal approach** - Works the same across all devices
- [ ] **Performance** - Smooth animations, responsive interactions
- [ ] **Accessibility** - Supports user preferences and assistive technology
- [ ] **Error handling** - Graceful failures with appropriate logging
- [ ] **Help content** - Concise, essential information only
- [ ] **Cross-platform** - Tested on multiple browsers and devices
- [ ] **Clean tasks** - Completed tasks removed from tasks.md

## Common Pitfalls to Avoid

### Over-Engineering
- Don't create separate mobile/desktop code paths unless absolutely necessary
- Don't add visual indicators for every system state
- Don't explain every possible interaction in help text

### Under-Testing
- Don't assume desktop behavior works on mobile
- Don't skip testing on actual devices
- Don't ignore edge cases (slow networks, old devices, etc.)

### Breaking Consistency
- Don't introduce new interaction patterns without good reason
- Don't make similar features work differently
- Don't compromise the minimal aesthetic for convenience features

## When to Update Guidelines

Update these guidelines when:
- **Patterns emerge** - Same issues come up across multiple specs
- **New insights** - User feedback reveals better approaches
- **Technology changes** - New browser features or device capabilities
- **Team learning** - Discoveries about what works well or poorly

Remember: Guidelines should help, not hinder. If a guideline doesn't make sense for a specific situation, discuss and potentially update it.