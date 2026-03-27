        /**
         * Professional Auto-Slider Class
         * Features: auto-play, pause on hover, manual navigation, accessibility
         */
        class AutoSlider {
            constructor(sliderElement, options = {}) {
                this.slider = sliderElement;
                this.slides = Array.from(this.slider.querySelectorAll('.slide'));
                this.dotsContainer = document.getElementById('sliderDots');
                this.currentIndex = 0;
                this.isPlaying = true;
                this.intervalId = null;
                
                // Default options
                this.options = {
                    autoPlay: true,
                    interval: 5000,
                    pauseOnHover: true,
                    ...options
                };
                
                this.init();
            }
            
            init() {
                if (!this.slides.length) return;
                
                this.createDots();
                this.updateSlider();
                this.bindEvents();
                
                if (this.options.autoPlay) {
                    this.startAutoPlay();
                }
            }
            
            createDots() {
                this.slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'dot';
                    dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
                    dot.setAttribute('data-index', index);
                    
                    if (index === 0) dot.classList.add('active');
                    
                    dot.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.goToSlide(parseInt(e.currentTarget.dataset.index));
                    });
                    
                    this.dotsContainer.appendChild(dot);
                });
                
                this.dots = Array.from(this.dotsContainer.querySelectorAll('.dot'));
            }
            
            updateSlider() {
                // Update transform for smooth sliding
                this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
                
                // Update active dot
                this.dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                    dot.setAttribute('aria-current', index === this.currentIndex ? 'true' : 'false');
                });
                
                // Update ARIA attributes for accessibility
                this.slides.forEach((slide, index) => {
                    slide.setAttribute('aria-hidden', index !== this.currentIndex);
                });
            }
            
            goToSlide(index) {
                if (index < 0 || index >= this.slides.length || index === this.currentIndex) return;
                
                this.currentIndex = index;
                this.updateSlider();
                this.resetAutoPlay();
            }
            
            nextSlide() {
                this.goToSlide((this.currentIndex + 1) % this.slides.length);
            }
            
            prevSlide() {
                this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
            }
            
            startAutoPlay() {
                this.isPlaying = true;
                this.intervalId = setInterval(() => {
                    if (this.isPlaying) {
                        this.nextSlide();
                    }
                }, this.options.interval);
            }
            
            stopAutoPlay() {
                this.isPlaying = false;
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }
            
            resetAutoPlay() {
                if (this.options.autoPlay) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            }
            
            bindEvents() {
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight') this.nextSlide();
                    if (e.key === 'ArrowLeft') this.prevSlide();
                });
                
                // Pause on hover
                if (this.options.pauseOnHover) {
                    this.slider.closest('.slider-container').addEventListener('mouseenter', () => {
                        this.stopAutoPlay();
                    });
                    
                    this.slider.closest('.slider-container').addEventListener('mouseleave', () => {
                        this.resetAutoPlay();
                    });
                }
            }
        }

        /**
         * Timeline Animation Observer
         */
        class TimelineAnimator {
            constructor() {
                this.items = document.querySelectorAll('.timeline-item');
                this.init();
            }
            
            init() {
                if (!this.items.length) return;
                
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                            this.observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                this.items.forEach(item => this.observer.observe(item));
            }
        }

        /**
         * Smooth Scroll Handler
         */
        class SmoothScroller {
            constructor() {
                this.init();
            }
            
            init() {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = anchor.getAttribute('href');
                        const target = document.querySelector(targetId);
                        
                        if (target) {
                            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
            }
        }

        // Initialize all components when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize auto-slider
            const sliderElement = document.getElementById('autoSlider');
            if (sliderElement) {
                new AutoSlider(sliderElement, {
                    autoPlay: true,
                    interval: 5000,
                    pauseOnHover: true
                });
            }
            
            // Initialize timeline animations
            new TimelineAnimator();
            
            // Initialize smooth scrolling
            new SmoothScroller();
        });