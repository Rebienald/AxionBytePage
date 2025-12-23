        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-link-item');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                // Disable scroll detection during navigation
                isNavigating = true;
                
                // Get target section and update active state immediately
                const targetSection = item.getAttribute('href').substring(1);
                navItems.forEach(link => link.classList.remove('active'));
                item.classList.add('active');
                
                // Re-enable scroll detection after navigation completes
                setTimeout(() => {
                    isNavigating = false;
                }, 1000);
            });
        });

        // Navigation highlighting based on scroll position
        let isNavigating = false;
        
        function updateActiveNavigation() {
            if (isNavigating) return; // Skip update during navigation
            
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link-item');
            
            let currentSection = '';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Update navigation on scroll
        window.addEventListener('scroll', updateActiveNavigation);
        
        // Update navigation on page load
        updateActiveNavigation();

        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const icon = themeToggle;

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });

        const carousel = document.getElementById('teamCarousel');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
        });

        // Typing Animation
        const typingElement = document.getElementById('typing-text');
        const services = [
            'Web Development',
            'Mobile App Development',
            'UI/UX Design',
            'E-Commerce Solutions',
            'Web Systems & Dashboards',
            'Hosting & Maintenance',
            'Bot Development'
        ];

        let currentServiceIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        const typeSpeed = 120;
        const deleteSpeed = 60;
        const waitTime = 1500;

        function type() {
            if (!typingElement) return;
            
            const currentService = services[currentServiceIndex];
            
            if (isWaiting) {
                setTimeout(() => {
                    isWaiting = false;
                    isDeleting = true;
                    type();
                }, waitTime);
                return;
            }

            if (!isDeleting) {
                // Typing
                if (currentCharIndex < currentService.length) {
                    typingElement.textContent = currentService.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    setTimeout(type, typeSpeed);
                } else {
                    // Finished typing, wait before deleting
                    isWaiting = true;
                    type();
                }
            } else {
                // Deleting
                if (currentCharIndex > 0) {
                    typingElement.textContent = currentService.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    setTimeout(type, deleteSpeed);
                } else {
                    // Finished deleting, move to next service
                    isDeleting = false;
                    currentServiceIndex = (currentServiceIndex + 1) % services.length;
                    setTimeout(type, typeSpeed);
                }
            }
        }

        // Start typing animation
        type();



        