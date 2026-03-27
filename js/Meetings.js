    
        class EventApp {
            static events = [
                {
                    id: 1,
                    title: "Большой рождественский концерт 6+",
                    location: "Алексеевская",
                    date: "12–13 декабря 2025",
                    image: "images/img1.webp",
                    description: "Праздничный концерт для всей семьи с духовными песнями и вдохновляющими выступлениями.",
                    badge: "Семейное"
                },
                {
                    id: 2,
                    title: "Водное крещение",
                    location: "Алексеевская",
                    date: "25 октября 2025",
                    image: "https://placehold.co/600x400/059669/FFFFFF?text=Крещение",
                    description: "Священное таинство водного крещения для новых верующих.",
                    badge: "Духовное"
                },
                {
                    id: 3,
                    title: "Членство в церкви",
                    location: "Алексеевская",
                    date: "09 ноября 2025",
                    image: "https://placehold.co/600x400/dc2626/FFFFFF?text=Членство",
                    description: "Официальное вступление в члены церкви Слово Жизни.",
                    badge: "Важное"
                },
                {
                    id: 4,
                    title: "Благословение детей",
                    location: "Алексеевская",
                    date: "17–20 апреля 2025",
                    image: "https://placehold.co/600x400/f59e0b/FFFFFF?text=Дети",
                    description: "Особое благословение для детей и их родителей.",
                    badge: "Семейное"
                },
                {
                    id: 5,
                    title: "Время поста и молитвы",
                    location: "Алексеевская",
                    date: "01–07 сентября 2025",
                    image: "https://placehold.co/600x400/0891b2/FFFFFF?text=Пост",
                    description: "Семидневный период духовного поста и усиленной молитвы.",
                    badge: "Духовное"
                },
                {
                    id: 6,
                    title: "Благословение пар",
                    location: "Алексеевская",
                    date: "23 ноября 2025",
                    image: "https://placehold.co/600x400/7c3aed/FFFFFF?text=Пары",
                    description: "Специальное благословение для супружеских пар и помолвленных.",
                    badge: "Семейное"
                },
                {
                    id: 7,
                    title: "Добро пожаловать в церковь",
                    location: "Алексеевская",
                    date: "25 апреля 2025",
                    image: "https://placehold.co/600x400/047857/FFFFFF?text=Добро",
                    description: "Ориентационная встреча для новых посетителей церкви.",
                    badge: "Знакомство"
                },
                {
                    id: 8,
                    title: "Пасха",
                    location: "Алексеевская",
                    date: "17–20 апреля 2025",
                    image: "https://placehold.co/600x400/be123c/FFFFFF?text=Пасха",
                    description: "Празднование Воскресения Христова с богослужениями и общинными мероприятиями.",
                    badge: "Праздник"
                }
            ];

            static currentEvent = null;
            static currentSlide = 0;
            static autoSlideInterval = null;
            static isAnimating = false;

            static init() {
                this.renderSlider();
                this.bindFormEvents();
                this.startAutoSlide();
                this.setupEventListeners();
            }

            static renderSlider() {
                const slider = document.getElementById('eventsSlider');
                const dotsContainer = document.getElementById('sliderDots');
                
                // Générer les slides
                slider.innerHTML = this.events.map(event => `
                    <div class="slide" data-id="${event.id}">
                        <img src="${event.image}" alt="${event.title}" class="slide-image">
                        <div class="slide-overlay">
                            <div class="slide-content">
                                <div class="slide-badge">${event.badge}</div>
                                <h3 class="slide-title">${event.title}</h3>
                                <div class="slide-meta">
                                    <div class="slide-location">
                                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                                    </div>
                                    <div class="slide-date">
                                        <i class="fas fa-calendar-alt"></i> ${event.date}
                                    </div>
                                </div>
                                <p class="slide-description">${event.description}</p>
                                <a href="#" class="slide-cta">
                                    Подробнее <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Générer les points de navigation
                dotsContainer.innerHTML = this.events.map((_, index) => 
                    `<div class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
                ).join('');
                
                this.updateProgressBar();
            }

            static setupEventListeners() {
                // Navigation par boutons
                document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
                document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
                
                // Navigation par points
                document.querySelectorAll('.slider-dot').forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        const index = parseInt(e.target.dataset.index);
                        this.goToSlide(index);
                    });
                });
                
                // Navigation par clavier
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    if (e.key === 'ArrowRight') this.nextSlide();
                });
                
                // Gestionnaires pour les boutons "Подробнее"
                document.querySelectorAll('.slide-cta').forEach((btn, index) => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const slide = e.target.closest('.slide');
                        const eventId = parseInt(slide.dataset.id);
                        this.showEventDetail(eventId);
                    });
                });
                
                // Gestionnaires pour les clics sur les slides
                document.querySelectorAll('.slide').forEach(slide => {
                    slide.addEventListener('click', (e) => {
                        if (!e.target.classList.contains('slide-cta') && 
                            !e.target.closest('.slide-cta')) {
                            const eventId = parseInt(slide.dataset.id);
                            this.showEventDetail(eventId);
                        }
                    });
                });
            }

            static nextSlide() {
                if (this.isAnimating) return;
                this.isAnimating = true;
                
                this.currentSlide = (this.currentSlide + 1) % this.events.length;
                this.updateSlider();
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600);
            }

            static prevSlide() {
                if (this.isAnimating) return;
                this.isAnimating = true;
                
                this.currentSlide = (this.currentSlide - 1 + this.events.length) % this.events.length;
                this.updateSlider();
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600);
            }

            static goToSlide(index) {
                if (this.isAnimating || index === this.currentSlide) return;
                this.isAnimating = true;
                
                this.currentSlide = index;
                this.updateSlider();
                
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600);
            }

            static updateSlider() {
                const slider = document.getElementById('eventsSlider');
                const dots = document.querySelectorAll('.slider-dot');
                
                // Mettre à jour la position du slider
                slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
                
                // Mettre à jour les points actifs
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
                
                this.updateProgressBar();
                this.restartAutoSlide();
            }

            static updateProgressBar() {
                const progressBar = document.getElementById('sliderProgress');
                progressBar.style.width = `${((this.currentSlide + 1) / this.events.length) * 100}%`;
            }

            static startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            }

            static restartAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                }
                this.startAutoSlide();
            }

            static showEventDetail(eventId = null) {
                if (eventId) {
                    this.currentEvent = this.events.find(e => e.id === eventId);
                }

                if (!this.currentEvent) {
                    console.error('Event not found');
                    return;
                }

                document.getElementById('detailTitle').textContent = this.currentEvent.title;
                document.getElementById('detailHeaderTitle').textContent = this.currentEvent.title;
                document.getElementById('detailDate').textContent = this.currentEvent.date;
                document.getElementById('detailLocation').textContent = this.currentEvent.location;
                document.getElementById('detailImage').src = this.currentEvent.image;
                document.getElementById('formEventTitle').textContent = this.currentEvent.title;

                document.querySelector('.events-slider-section').style.display = 'none';
                document.getElementById('eventDetailPage').style.display = 'block';
                document.getElementById('registrationForm').style.display = 'none';
            }

            static showEvents() {
                document.querySelector('.events-slider-section').style.display = 'block';
                document.getElementById('eventDetailPage').style.display = 'none';
                document.getElementById('registrationForm').style.display = 'none';
            }

            static showRegistration() {
                if (!this.currentEvent) return;
                
                document.getElementById('eventDetailPage').style.display = 'none';
                document.getElementById('registrationForm').style.display = 'block';
            }

            static bindFormEvents() {
                const form = document.getElementById('registrationFormElement');
                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleRegistration();
                    });
                }
            }

            static handleRegistration() {
                // Dans une application réelle, cela enverrait les données à un serveur
                alert('Регистрация успешно завершена! Мы свяжемся с вами в ближайшее время.');
                this.showEventDetail();
            }
        }

        // Initialiser l'application quand le DOM est chargé
        document.addEventListener('DOMContentLoaded', () => {
            EventApp.init();
        });
    