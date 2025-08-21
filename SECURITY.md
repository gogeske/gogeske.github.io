# Security Policy

## Security Overview

The Language Explorer is a client-side static website that prioritizes security and user privacy. This document outlines our security practices and how to report security vulnerabilities.

## Security Features

### Implemented Security Measures

- **Content Security Policy (CSP)**: Prevents XSS attacks and unauthorized resource loading
- **Security Headers**: Comprehensive set of security headers including:
  - `X-Frame-Options: DENY` - Prevents clickjacking
  - `X-Content-Type-Options: nosniff` - Prevents MIME sniffing attacks
  - `X-XSS-Protection: 1; mode=block` - Enables XSS filtering
  - `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- **Permissions Policy**: Restricts access to sensitive browser APIs
- **Secure DOM Manipulation**: All dynamic content uses safe DOM methods
- **Secure External Links**: All external links use `rel="noopener noreferrer"`

### Data Privacy

- **No Data Collection**: This application does not collect, store, or transmit any personal data
- **No Cookies**: No cookies or local storage are used
- **External Resources**: Images are loaded from Unsplash.com with appropriate security controls
- **Browser APIs**: Only uses Speech Synthesis API for text-to-speech functionality

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

### How to Report

1. **Email**: Send details to the repository owner via GitHub
2. **GitHub Issues**: For non-sensitive security improvements, you may open a public issue
3. **Security Advisory**: Use GitHub's private security advisory feature for sensitive vulnerabilities

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Implementation**: Within 2 weeks for critical issues
- **Public Disclosure**: After fix is deployed and tested

## Security Best Practices

### For Contributors

- Follow secure coding practices
- Never introduce `innerHTML` usage without proper sanitization
- Validate all external resources and links
- Test security headers and CSP policies
- Document any security-related changes

### For Users

- Keep your browser updated
- Be cautious when clicking external links
- Report any suspicious behavior or security concerns

## Security Audits

- **Last Security Review**: December 2024
- **Next Scheduled Review**: Quarterly
- **Automated Scanning**: Planned for future implementation

## Contact

For security-related questions or concerns, please contact the repository maintainers through GitHub.

---

*This security policy is reviewed and updated regularly to ensure it reflects current security practices and threats.*