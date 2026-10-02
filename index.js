/**
 * Harshavardhan Reddy Chennadi - Portfolio Engine
 * Author: Harshavardhan Reddy Chennadi
 * Features: Mobile Navigation, Scroll Progress, Active Nav Highlighting, Project Drawers, Contact Form Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Initialization
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // 3. Navbar Scroll Behavior & Scroll Progress
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        highlightActiveSection();
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Active Navigation Section Detection
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    // 5. Project Technical Architecture Modal Data & Drawer
    const projectData = {
        'project-1': {
            title: 'Controlling and Detection of Sleep Apnea Using AI and Image Processing',
            domain: 'Artificial Intelligence & Computer Vision',
            overview: 'Sleep apnea is a severe sleep disorder characterized by repeated breathing cessation during sleep. This project implements a real-time computer vision system that monitors facial features and respiratory patterns to detect apnea episodes autonomously.',
            highlights: [
                'Developed AI and image processing algorithms for non-invasive patient monitoring.',
                'Configured dynamic alert mechanisms to notify caregivers or individuals upon condition trigger.',
                'Designed to run efficiently without requiring heavy dedicated server hardware.'
            ],
            tech: ['Python', 'Image Processing', 'AI Principles', 'Computer Vision', 'Alerting Logic']
        },
        'project-2': {
            title: 'Smart Street Light Activated by Vehicle Movement',
            domain: 'Embedded Systems & Automation',
            overview: 'Municipal street lighting accounts for high power consumption. This embedded system uses an Arduino UNO microcontroller coupled with motion sensors to dynamically toggle street light intensity based on active vehicular detection.',
            highlights: [
                'Built hardware control logic using Arduino UNO and infrared/ultrasonic sensor integration.',
                'Drastically reduces electrical energy wastage during zero-traffic periods.',
                'Provides immediate illumination response upon detecting incoming traffic.'
            ],
            tech: ['Arduino UNO', 'Embedded C/C++', 'Sensory Circuits', 'Relays & Power Optimization']
        }
    };

    const projectBtns = document.querySelectorAll('.project-details-btn');
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && projectModal && modalContent) {
                modalContent.innerHTML = `
                    <div style="margin-bottom: 1rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); text-transform: uppercase;">
                        ${data.domain}
                    </div>
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary);">${data.title}</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">${data.overview}</p>
                    <h3 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 0.75rem;">Technical Features & Contributions:</h3>
                    <ul style="margin-bottom: 1.5rem; padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem;">
                        ${data.highlights.map(h => `<li style="margin-bottom: 0.5rem;">${h}</li>`).join('')}
                    </ul>
                    <h3 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 0.75rem;">Technologies Used:</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                    </div>
                `;
                projectModal.classList.add('active');
                projectModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    if (modalClose && projectModal) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                projectModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // 6. Interactive Form Handling Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }

            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been prepared for Harshavardhan.';
                }
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                }
            }, 1200);
        });
    }
});