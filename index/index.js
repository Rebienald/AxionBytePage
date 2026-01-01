        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-link-item');

        // Clean URL routing system
        function initRouter() {
            // Handle navigation clicks
            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const url = item.getAttribute('href');
                    const route = url.substring(1); // Remove leading slash
                    navigateToRoute(route, url);
                });
            });

            // Handle other navigation buttons
            document.querySelectorAll('a[href^="/"]').forEach(link => {
                if (!link.classList.contains('nav-link-item')) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const url = link.getAttribute('href');
                        const route = url.substring(1);
                        navigateToRoute(route, url);
                    });
                }
            });

            // Handle browser back/forward buttons
            window.addEventListener('popstate', (e) => {
                const route = e.state ? e.state.route : getRouteFromPath();
                scrollToSection(route);
                updateActiveNavigation(route);
            });

            // Initialize on page load
            const initialRoute = getRouteFromPath();
            if (initialRoute && initialRoute !== 'home') {
                setTimeout(() => scrollToSection(initialRoute), 100);
            }
            updateActiveNavigation(initialRoute || 'home');
        }

        function getRouteFromPath() {
            const path = window.location.pathname;
            return path === '/' ? 'home' : path.substring(1);
        }

        function navigateToRoute(route, url) {
            // Update browser history
            history.pushState({ route: route }, '', url);
            
            // Scroll to section
            scrollToSection(route);
            
            // Update navigation state
            updateActiveNavigation(route);
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        function updateActiveNavigation(currentRoute) {
            navItems.forEach(item => {
                item.classList.remove('active');
                const itemRoute = item.getAttribute('href').substring(1);
                if (itemRoute === currentRoute) {
                    item.classList.add('active');
                }
            });
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Enhanced scroll-based navigation highlighting
        let isNavigating = false;
        
        function updateActiveNavigationOnScroll() {
            if (isNavigating) return;
            
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link-item');
            
            let currentSection = 'home';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Update URL without triggering navigation
            const newPath = currentSection === 'home' ? '/' : `/${currentSection}`;
            if (window.location.pathname !== newPath) {
                history.replaceState({ route: currentSection }, '', newPath);
            }
            
            // Update active navigation
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkRoute = link.getAttribute('href').substring(1);
                if (linkRoute === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        // Initialize router and scroll detection
        document.addEventListener('DOMContentLoaded', function() {
            initRouter();
            
            // Scroll detection with throttling
            let scrollTimeout;
            window.addEventListener('scroll', function() {
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(updateActiveNavigationOnScroll, 10);
            });
        });
        
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



          window.addEventListener('load', function() {
            setTimeout(function() {
                var preloader = document.getElementById('preloader');
                var body = document.body;

                preloader.classList.add('preloader-hidden');

                body.classList.remove('loading-active');

                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500); 
            }, 3000); // 3-second wait
        });