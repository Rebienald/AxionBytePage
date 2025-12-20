 // --- LIGHT MODE TOGGLE ---
        const toggleBtn = document.getElementById('theme-toggle');
        const body = document.body;

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                toggleBtn.classList.replace('fa-sun', 'fa-moon');
            } else {
                toggleBtn.classList.replace('fa-moon', 'fa-sun');
            }
        });

        // --- INFINITE SCROLL LOGIC ---
        const carousel = document.getElementById('teamCarousel');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        const scrollCarousel = (direction) => {
            const cardWidth = carousel.querySelector('.team-card').offsetWidth;
            const gap = 20; // Matches CSS gap
            const scrollAmount = cardWidth + gap;
            
            // Current Scroll Info
            const currentScroll = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            if (direction === 'next') {
                // If we are near the end, Loop back to START
                if (currentScroll >= maxScroll - 10) {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                // If we are near the start, Loop to END
                if (currentScroll <= 10) {
                    carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        };

        nextBtn.addEventListener('click', () => scrollCarousel('next'));
        prevBtn.addEventListener('click', () => scrollCarousel('prev'));