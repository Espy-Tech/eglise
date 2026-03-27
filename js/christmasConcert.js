  
        function showRegistrationForm(date) {
            document.getElementById('selectedDate').textContent = 'большой рождественский концерт ' + date;
            document.getElementById('mainPage').style.display = 'none';
            document.getElementById('registrationForm').style.display = 'block';
            window.scrollTo(0, 0);
        }
        
        function showMainPage() {
            document.getElementById('registrationForm').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
            window.scrollTo(0, 0);
        }
        
        document.getElementById('registrationFormElement').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Регистрация успешно завершена! На вашу почту будет отправлен QR-код для входа на мероприятие.');
            showMainPage();
        });
        
        // Gallery Carousel Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.gallery-track');
            const slides = document.querySelectorAll('.gallery-slide');
            const dots = document.querySelectorAll('.gallery-dot');
            const prevBtn = document.querySelector('.gallery-nav.prev');
            const nextBtn = document.querySelector('.gallery-nav.next');
            
            let currentSlide = 0;
            const slideCount = slides.length;
            
            function goToSlide(index) {
                if (index < 0) index = slideCount - 1;
                if (index >= slideCount) index = 0;
                
                track.style.transform = `translateX(-${index * 100}%)`;
                currentSlide = index;
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            
            function nextSlide() {
                goToSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                goToSlide(currentSlide - 1);
            }
            
            // Event listeners
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    goToSlide(index);
                });
            });
            
            // Auto-play
            let autoPlay = setInterval(nextSlide, 5000);
            
            // Pause auto-play on hover
            const carousel = document.querySelector('.gallery-carousel');
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoPlay);
            });
            
            carousel.addEventListener('mouseleave', () => {
                autoPlay = setInterval(nextSlide, 5000);
            });
            
            // Countdown Timer
            function updateCountdown() {
                const now = new Date();
                const eventDate = new Date('December 12, 2023 19:00:00');
                const diff = eventDate - now;
                
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    
                    document.getElementById('days').textContent = days.toString().padStart(2, '0');
                    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
                }
            }
            
            setInterval(updateCountdown, 1000);
            updateCountdown();
            
            // Video Player Functionality
            const videoFilters = document.querySelectorAll('.video-filter');
            const videoContainers = document.querySelectorAll('.video-container');
            const videoThumbnails = document.querySelectorAll('.video-thumbnail');
            
            videoFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    // Remove active class from all filters
                    videoFilters.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to clicked filter
                    this.classList.add('active');
                    
                    const videoType = this.getAttribute('data-video');
                    
                    // Hide all video containers
                    videoContainers.forEach(container => {
                        container.classList.remove('active');
                    });
                    
                    // Show selected video container
                    document.getElementById(`${videoType}-player`).classList.add('active');
                });
            });
            
            videoThumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    const videoType = this.getAttribute('data-video');
                    
                    // Remove active class from all filters
                    videoFilters.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to corresponding filter
                    document.querySelector(`.video-filter[data-video="${videoType}"]`).classList.add('active');
                    
                    // Hide all video containers
                    videoContainers.forEach(container => {
                        container.classList.remove('active');
                    });
                    
                    // Show selected video container
                    document.getElementById(`${videoType}-player`).classList.add('active');
                    
                    // Scroll to video player
                    document.getElementById(`${videoType}-player`).scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                });
            });
        });
    