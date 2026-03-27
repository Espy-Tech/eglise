    
        class PageManager {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 2;
                this.currentMediaTab = 'photos';
                this.init();
            }

            init() {
                this.bindEvents();
                this.initAutoSlide();
            }

            bindEvents() {
                // Navigation buttons
                document.querySelectorAll('[data-back]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const targetPage = e.currentTarget.dataset.back;
                        this.showPage(targetPage);
                    });
                });

                // Page navigation links
                document.querySelectorAll('[data-page]').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetPage = e.currentTarget.dataset.page;
                        this.showPage(targetPage);
                    });
                });

                // Slider navigation
                document.querySelectorAll('[data-slide]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const action = e.currentTarget.dataset.slide;
                        if (action === 'prev') {
                            this.changeSlide(-1);
                        } else if (action === 'next') {
                            this.changeSlide(1);
                        } else {
                            this.goToSlide(parseInt(action));
                        }
                    });
                });

                // Media tabs
                document.querySelectorAll('[data-tab]').forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        const tabType = e.currentTarget.dataset.tab;
                        this.switchMediaTab(tabType);
                    });
                });

                // Video cards
                document.querySelectorAll('[data-video]').forEach(card => {
                    card.addEventListener('click', (e) => {
                        const videoId = e.currentTarget.dataset.video;
                        this.playVideo(videoId);
                    });
                });

                // Form submissions
                document.getElementById('submitRegistration')?.addEventListener('click', () => {
                    this.submitForm('Регистрация на ЮС 25 успешно отправлена!');
                });
                document.getElementById('submitTeenRegistration')?.addEventListener('click', () => {
                    this.submitForm('Регистрация подростка на «Огонь» успешно отправлена!');
                });
                document.getElementById('submitParentRegistration')?.addEventListener('click', () => {
                    this.submitForm('Регистрация родителя на «Огонь» успешно отправлена!');
                });
                document.getElementById('submitServantRegistration')?.addEventListener('click', () => {
                    this.submitForm('Регистрация служителя на «Огонь» успешно отправлена!');
                });
                document.getElementById('submitBvppRegistration')?.addEventListener('click', () => {
                    this.submitForm('Регистрация на БВПП 2025 успешно отправлена!');
                });
            }

            showPage(pageId) {
                // Hide all pages
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show target page
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }

            changeSlide(direction) {
                this.currentSlide = (this.currentSlide + direction + this.totalSlides) % this.totalSlides;
                this.updateSlider();
            }

            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateSlider();
            }

            updateSlider() {
                const slider = document.getElementById('scheduleSlider');
                if (slider) {
                    slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                    
                    // Update dots
                    const dots = document.querySelectorAll('.dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === this.currentSlide);
                    });
                }
            }

            switchMediaTab(tab) {
                this.currentMediaTab = tab;
                
                // Update active tab
                document.querySelectorAll('.media-tab').forEach(tabEl => {
                    tabEl.classList.remove('active');
                });
                document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
                
                // Show/hide content
                document.getElementById('photos-content').style.display = tab === 'photos' ? 'block' : 'none';
                document.getElementById('videos-content').style.display = tab === 'videos' ? 'block' : 'none';
            }

            playVideo(videoId) {
                const videoTitles = {
                    'opening': 'Открытие ЮС 2024',
                    'sermon': 'Проповедь Маттс-Ола Исхоел',
                    'worship': 'Вечер хвалы ЮС 2024'
                };
                alert(`Воспроизведение видео: ${videoTitles[videoId] || 'Видео'}`);
            }

            submitForm(message) {
                // Simple validation - check if required fields are filled
                const form = event.currentTarget.closest('.registration-form');
                const requiredInputs = form.querySelectorAll('input[required], select[required]');
                let isValid = true;

                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#e74c3c';
                        setTimeout(() => {
                            input.style.borderColor = '#e1e8ed';
                        }, 2000);
                    }
                });

                if (isValid) {
                    alert(message);
                    form.reset();
                } else {
                    alert('Пожалуйста, заполните все обязательные поля.');
                }
            }

            initAutoSlide() {
                setInterval(() => {
                    if (document.getElementById('yus-schedule').classList.contains('active')) {
                        this.changeSlide(1);
                    }
                }, 5000);
            }
        }

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new PageManager();
        });
    