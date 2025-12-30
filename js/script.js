// Zen of Coding - Production-grade, Minimalist, Zen-Style Interactive Elements

(function() {
    'use strict';

    // Debounce utility function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Add subtle breathing animation to the main title
        const title = document.querySelector('header h1');
        if (title) {
            title.style.transition = 'transform 4s ease-in-out';

            function breathe() {
                title.style.transform = 'scale(1.02)';
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        title.style.transform = 'scale(1)';
                    }, 2000);
                });
            }

            // Start breathing animation after a delay
            setTimeout(breathe, 2000);
            setInterval(breathe, 6000); // Repeat every 6 seconds
        }

        // Add scroll-based animations for sections using Intersection Observer
        const sections = document.querySelectorAll('.section');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Stop observing the element after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Add subtle hover effects to list items and cards with performance optimization
        // Use event delegation to handle hover effects efficiently
        document.addEventListener('mouseover', function(e) {
            if (e.target.matches('li')) {
                e.target.style.transform = 'translateX(5px)';
                e.target.style.transition = 'transform 0.3s ease';
            } else if (e.target.closest('.card')) {
                const card = e.target.closest('.card');
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            } else if (e.target.closest('.circular-card')) {
                const circularCard = e.target.closest('.circular-card');
                circularCard.style.transform = 'translateY(-5px)';
                circularCard.style.transition = 'transform 0.3s ease';
            }
        });

        document.addEventListener('mouseout', function(e) {
            if (e.target.matches('li')) {
                e.target.style.transform = 'translateX(0)';
            } else if (e.target.closest('.card')) {
                const card = e.target.closest('.card');
                card.style.transform = 'translateY(0)';
            } else if (e.target.closest('.circular-card')) {
                const circularCard = e.target.closest('.circular-card');
                circularCard.style.transform = 'translateY(0)';
            }
        });

        // Add click ripple effect with performance optimization
        let rippleTimeout;
        document.addEventListener('click', function(e) {
            // Create a ripple effect at click position
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.position = 'fixed';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'radial-gradient(circle, rgba(212,184,150,0.4) 0%, rgba(212,184,150,0) 70%)';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.left = (e.clientX - 10) + 'px';
            ripple.style.top = (e.clientY - 10) + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '9999';
            ripple.style.opacity = '0.7';
            ripple.style.willChange = 'transform, opacity';

            document.body.appendChild(ripple);

            // Animate the ripple using Web Animations API
            const size = Math.max(window.innerWidth, window.innerHeight) * 0.3;
            const animation = ripple.animate([
                { width: '0px', height: '0px', opacity: 0.7 },
                { width: size + 'px', height: size + 'px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });

            // Remove the ripple after animation completes
            animation.onfinish = () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            };
        });

        // Navigation link interactions
        const navLinks = document.querySelectorAll('.nav-links span');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Add visual feedback for navigation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Add functionality based on link text
                if (this.textContent === '文章') {
                    // Scroll to first content section
                    document.getElementById('ziqing').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else if (this.textContent === '我') {
                    // Scroll to footer
                    document.querySelector('footer').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Handle keyboard navigation for accessibility
        document.addEventListener('keydown', function(e) {
            // Handle Enter key for navigation links
            if (e.key === 'Enter' && e.target.matches('.nav-links span')) {
                e.target.click();
            }
        });

        // Optimize scroll performance with debouncing
        let ticking = false;
        function updateScrollEffects() {
            // Add scroll-based effects here if needed
            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', debounce(requestScrollUpdate, 16));

        // Clean up resources when page is unloaded
        window.addEventListener('beforeunload', function() {
            // Cleanup code if needed
        });
    });
})();