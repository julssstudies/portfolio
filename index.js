// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Handle profile image error
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('error', function() {
            this.style.display = 'none';
            document.querySelector('.profile-placeholder').style.display = 'flex';
        });
    }

    // Custom cursor effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delay follower for smooth effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Enhance cursor on hover over links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(255, 105, 180, 0.1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursor.style.backgroundColor = 'var(--primary-color)';
            cursor.style.border = 'none';
        });
    });

    // Animate skill bars on scroll
    const animateSkillBars = () => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.parentElement.getAttribute('data-width') || bar.style.width;
            }
        });
    };

    // Set skill bar data-width attributes
    document.querySelectorAll('.skill-level').forEach(bar => {
        const width = bar.style.width;
        bar.parentElement.setAttribute('data-width', width);
        bar.style.width = '0';
    });

    // Call once on load
    setTimeout(animateSkillBars, 1000);
    
    // Add scroll event for skill bars
    window.addEventListener('scroll', animateSkillBars);

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Project hover effect enhancement
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.querySelectorAll('h3, p, .project-links').forEach((element, index) => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
        
        project.addEventListener('mouseleave', function() {
            this.querySelectorAll('h3, p, .project-links').forEach(element => {
                element.style.transform = '';
                element.style.opacity = '';
                element.style.transitionDelay = '';
            });
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Add success message (in a real implementation, you'd send this to a server)
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
});

// Original toggle function (keeping for compatibility)
function toggleAboutMe() {
    const section = document.getElementById('about-me');
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
}
