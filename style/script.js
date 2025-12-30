// Zen of Coding - Subtle interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Add subtle breathing animation to the main title
    const title = document.querySelector('header h1');
    if (title) {
        title.style.transition = 'transform 4s ease-in-out';
        
        function breathe() {
            title.style.transform = 'scale(1.02)';
            setTimeout(() => {
                title.style.transform = 'scale(1)';
            }, 2000);
        }
        
        // Start breathing animation after a delay
        setTimeout(breathe, 2000);
        setInterval(breathe, 6000); // Repeat every 6 seconds
    }
    
    // Add scroll-based animations for sections
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
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add subtle hover effects to list items
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add a subtle background animation for zen feeling
    const body = document.body;
    let animationFrame;
    
    function createSubtleMovement() {
        const time = Date.now() * 0.001; // Convert to seconds
        const opacity = 0.95 + Math.sin(time) * 0.02; // Very subtle opacity change
        body.style.backgroundColor = `rgba(248, 248, 245, ${opacity})`;
        animationFrame = requestAnimationFrame(createSubtleMovement);
    }
    
    // Start the subtle background animation
    createSubtleMovement();
    
    // Clean up animation on page unload
    window.addEventListener('beforeunload', function() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
    
    // Add click effect for a more interactive feel
    document.addEventListener('click', function(e) {
        // Create a ripple effect at click position
        const ripple = document.createElement('div');
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
        
        document.body.appendChild(ripple);
        
        // Animate the ripple
        const size = Math.max(window.innerWidth, window.innerHeight) * 0.3;
        ripple.animate([
            { width: '0px', height: '0px', opacity: 0.7 },
            { width: size + 'px', height: size + 'px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        // Remove the ripple after animation
        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 600);
    });
});