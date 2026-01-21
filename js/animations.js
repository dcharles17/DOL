// Advanced Animation Scripts

// Stagger Animation for Lists
function initStaggerAnimations() {
    const staggerGroups = document.querySelectorAll('[data-stagger]');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                const delay = entry.target.dataset.staggerDelay || 100;

                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * delay);
                });

                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    staggerGroups.forEach(group => {
        staggerObserver.observe(group);
    });
}

// Parallax Scrolling Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);

            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic Buttons Effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Text Split Animation
function initTextSplitAnimation() {
    const splitTextElements = document.querySelectorAll('[data-split-text]');

    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.classList.add('char');
            element.appendChild(span);
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 10000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Tilt Effect for Cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.service-card, .info-item');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Morphing Shape Animation
function initMorphingShapes() {
    const shapes = document.querySelectorAll('[data-morph]');

    shapes.forEach(shape => {
        let morphIndex = 0;
        const morphShapes = [
            'M100,50 Q150,0 200,50 T300,50',
            'M100,50 Q150,100 200,50 T300,50',
            'M100,50 Q150,25 200,50 T300,50'
        ];

        setInterval(() => {
            morphIndex = (morphIndex + 1) % morphShapes.length;
            shape.setAttribute('d', morphShapes[morphIndex]);
        }, 2000);
    });
}

// Number Rolling Animation
function initNumberRolling() {
    const numbers = document.querySelectorAll('[data-number]');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('rolled')) {
                const target = parseInt(entry.target.dataset.number);
                const duration = parseInt(entry.target.dataset.duration) || 2000;
                const start = 0;
                const startTime = performance.now();

                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const current = Math.floor(progress * (target - start) + start);
                    entry.target.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        entry.target.classList.add('rolled');
                    }
                }

                requestAnimationFrame(updateNumber);
            }
        });
    }, {
        threshold: 0.5
    });

    numbers.forEach(number => {
        numberObserver.observe(number);
    });
}

// Ripple Effect on Click
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .service-card');

    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth Fade In on Scroll
function initFadeInOnScroll() {
    const fadeElements = document.querySelectorAll('[data-fade]');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const direction = entry.target.dataset.fade || 'up';
                entry.target.classList.add('fade-in-' + direction);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        fadeObserver.observe(element);
    });
}

// Add fade animations to CSS
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    .fade-in-down {
        animation: fadeInDown 0.8s ease forwards;
    }
    .fade-in-left {
        animation: fadeInLeft 0.8s ease forwards;
    }
    .fade-in-right {
        animation: fadeInRight 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.classList.add('trail-dot');
        dot.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            border-radius: 50%;
            background: rgba(17, 138, 150, ${0.5 - i * 0.05});
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';

            const nextDot = trail[index + 1] || trail[0];
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    // Uncomment to enable mouse trail
    // animateTrail();
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initStaggerAnimations();
    initParallaxEffects();
    initMagneticButtons();
    initTextSplitAnimation();
    initScrollProgress();
    initTiltEffect();
    initNumberRolling();
    initRippleEffect();
    initFadeInOnScroll();
    // initMouseTrail(); // Uncomment to enable

    console.log('Advanced animations initialized');
});