/**
 * BlueGuardians Website JavaScript
 * Handles interactive elements, form validation, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            // Name validation
            if (!nameField.value.trim()) {
                showError(nameField, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
                showError(emailField, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            // Message validation
            if (!messageField.value.trim()) {
                showError(messageField, 'Please enter your message');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real implementation, you would send the form data to a server here
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting BlueGuardians. Our team will respond to your inquiry shortly.</p>
                    </div>
                `;
            }
        });
    }
    
    // Helper functions for form validation
    function showError(field, message) {
        // Remove any existing error
        removeError(field);
        
        // Add error class to field
        field.classList.add('error');
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    function removeError(field) {
        // Remove error class
        field.classList.remove('error');
        
        // Remove error message if it exists
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Add scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .article-card, .about-content, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-glow');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-glow');
        });
    });
});