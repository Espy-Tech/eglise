   
        // Script JavaScript robuste et professionnel
        document.addEventListener('DOMContentLoaded', function() {
            // Initialisation des animations
            initAnimations();
            
            // Initialisation du carousel
            initCarousel();
            
            // Initialisation des événements
            initEvents();
            
            // Initialisation de l'intersection observer pour les animations au défilement
            initScrollAnimations();
        });

        // Fonction pour initialiser les animations
        function initAnimations() {
            // Ajouter la classe fade-in à tous les éléments qui doivent être animés
            const elementsToAnimate = document.querySelectorAll('.events-carousel, .support-card, .director-blog, .special-events, .fund-directions, .news-section, .supported-orgs, .partners-section, .volunteer-section, .awards-section, .team-section, .newsletter-section');
            
            elementsToAnimate.forEach(element => {
                element.classList.add('fade-in');
            });
            
            // Ajouter la classe hover-lift aux cartes
            const cardsToLift = document.querySelectorAll('.direction-card, .news-card, .partner-card, .award-card, .team-member, .event-card, .help-card, .vp-card');
            
            cardsToLift.forEach(card => {
                card.classList.add('hover-lift');
            });
        }

        // Fonction pour initialiser le carousel
        function initCarousel() {
            const indicators = document.querySelectorAll('.indicator');
            const slides = document.querySelectorAll('.carousel-slide');
            let currentSlide = 0;
            let slideInterval;
            
            function showSlide(index) {
                // Masquer toutes les slides
                slides.forEach(slide => {
                    slide.style.display = 'none';
                });
                
                // Afficher la slide active
                slides[index].style.display = 'flex';
                
                // Mettre à jour les indicateurs
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === index);
                });
                
                currentSlide = index;
            }
            
            function nextSlide() {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }
            
            function prevSlide() {
                let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
            
            // Ajouter les événements aux indicateurs
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    showSlide(index);
                    startAutoSlide();
                });
            });
            
            // Ajouter les événements aux boutons de navigation
            const prevBtn = document.querySelector('.carousel-btn:first-child');
            const nextBtn = document.querySelector('.carousel-btn:last-child');
            
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    prevSlide();
                    startAutoSlide();
                });
                
                nextBtn.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    nextSlide();
                    startAutoSlide();
                });
            }
            
            // Fonction pour démarrer le défilement automatique
            function startAutoSlide() {
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Initialiser le carousel
            showSlide(0);
            startAutoSlide();
            
            // Pause du carousel au survol
            const carousel = document.querySelector('.events-carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                carousel.addEventListener('mouseleave', () => {
                    startAutoSlide();
                });
            }
        }

        // Fonction pour initialiser les événements
        function initEvents() {
            // Gestion des liens "ПОДРОБНЕЕ"
            const moreLinks = document.querySelectorAll('.more-link');
            const mainPage = document.getElementById('main-page');
            const detailedPage = document.getElementById('detailed-page');
            const helpPage = document.getElementById('help-page');
            const donationPage = document.getElementById('donation-page');
            const interviewPage = document.getElementById('interview-page');
            const partnerPage = document.getElementById('partner-page');
            const detailedTitle = document.getElementById('detailed-title');
            const backBtn = document.getElementById('back-btn');
            const interviewBackBtn = document.getElementById('interview-back-btn');
            const partnerBackBtn = document.getElementById('partner-back-btn');
            const howToHelpLink = document.getElementById('how-to-help-link');
            const donateBtn = document.getElementById('donate-btn');
            
            // Fonction pour changer de page avec animation
            function changePage(fromPage, toPage) {
                fromPage.style.opacity = '0';
                setTimeout(() => {
                    fromPage.style.display = 'none';
                    toPage.style.display = 'block';
                    toPage.classList.add('page-transition');
                    setTimeout(() => {
                        toPage.style.opacity = '1';
                        window.scrollTo(0, 0);
                    }, 50);
                }, 300);
            }
            
            // Événements pour les liens "ПОДРОБНЕЕ"
            moreLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const title = this.getAttribute('data-title');
                    
                    // Vérifier s'il s'agit d'un lien d'interview
                    if (title.includes('Интервью')) {
                        // Afficher la page d'interview
                        changePage(mainPage, interviewPage);
                        
                        // Mettre à jour le titre de l'interview
                        document.getElementById('interview-title').textContent = title.replace('Интервью с ', '');
                    } else if (title.includes('Стать партнёром')) {
                        // Afficher la page partenaire
                        changePage(mainPage, partnerPage);
                        
                        // Mettre à jour le titre du partenaire
                        document.getElementById('partner-title').textContent = title;
                    } else {
                        // Afficher la page détaillée
                        if (title) {
                            detailedTitle.innerHTML = title.replace(/(в хосписах и домах престарелых|многодетным, неполным и малообеспеченным семьям|беженцам с ДНР и ЛНР|людям на территории проведения СВО)/, 
                                '<span>в хосписах и домах престарелых</span>');
                            
                            // Traitement spécial pour différents titres
                            if (title.includes('Помощь')) {
                                detailedTitle.innerHTML = title.replace(/Помощь (.*)/, 'Помощь <span>$1</span>');
                            } else if (title.includes('Стать')) {
                                detailedTitle.innerHTML = title.replace(/Стать (.*)/, 'Стать <span>$1</span>');
                            } else if (title.includes('Подопечные')) {
                                detailedTitle.innerHTML = '<span>Подопечные фонда</span>';
                            } else {
                                detailedTitle.textContent = title;
                            }
                        }
                        
                        // Afficher la page détaillée et masquer la page principale
                        changePage(mainPage, detailedPage);
                    }
                });
            });
            
            // Événement pour le bouton retour
            if (backBtn) {
                backBtn.addEventListener('click', function() {
                    changePage(detailedPage, mainPage);
                });
            }
            
            // Événement pour le bouton retour d'interview
            if (interviewBackBtn) {
                interviewBackBtn.addEventListener('click', function() {
                    changePage(interviewPage, mainPage);
                });
            }
            
            // Événement pour le bouton retour partenaire
            if (partnerBackBtn) {
                partnerBackBtn.addEventListener('click', function() {
                    changePage(partnerPage, mainPage);
                });
            }
            
            // Événement pour le lien "здесь" dans la section des besoins
            if (howToHelpLink) {
                howToHelpLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    changePage(detailedPage, helpPage);
                });
            }
            
            // Événement pour le bouton "ПОЖЕРТВОВАТЬ"
            if (donateBtn) {
                donateBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    changePage(helpPage, donationPage);
                });
            }
            
            // Validation des formulaires d'inscription à la newsletter
            document.querySelectorAll('.newsletter-form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('.newsletter-input');
                    const checkbox = this.querySelector('input[type="checkbox"]');
                    
                    if (!emailInput.value || !checkbox.checked) {
                        showNotification('Пожалуйста, заполните все поля и дайте согласие на обработку данных.', 'error');
                        return;
                    }
                    
                    // Animation de succès
                    const submitBtn = this.querySelector('.newsletter-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = '✓';
                    submitBtn.style.backgroundColor = '#4CAF50';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                        showNotification('Спасибо за подписку на наши новости!', 'success');
                        this.reset();
                    }, 1500);
                });
            });
            
            // Validation du formulaire partenaire
            const partnerForm = document.querySelector('.partner-form');
            if (partnerForm) {
                partnerForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const requiredFields = this.querySelectorAll('[required]');
                    let isValid = true;
                    
                    requiredFields.forEach(field => {
                        if (!field.value) {
                            isValid = false;
                            field.style.borderColor = 'red';
                        } else {
                            field.style.borderColor = '';
                        }
                    });
                    
                    if (!isValid) {
                        showNotification('Пожалуйста, заполните все обязательные поля.', 'error');
                        return;
                    }
                    
                    // Animation de soumission
                    const submitBtn = this.querySelector('.submit-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Отправка...';
                    submitBtn.disabled = true;
                    
                    // Simulation d'envoi
                    setTimeout(() => {
                        submitBtn.textContent = '✓ Отправлено';
                        submitBtn.style.backgroundColor = '#4CAF50';
                        
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = '';
                            submitBtn.disabled = false;
                            showNotification('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.', 'success');
                            this.reset();
                        }, 2000);
                    }, 1500);
                });
            }
            
            // Fonction pour afficher les notifications
            function showNotification(message, type) {
                // Créer l'élément de notification
                const notification = document.createElement('div');
                notification.textContent = message;
                notification.style.position = 'fixed';
                notification.style.top = '20px';
                notification.style.right = '20px';
                notification.style.padding = '15px 20px';
                notification.style.borderRadius = '5px';
                notification.style.color = 'white';
                notification.style.zIndex = '1000';
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                notification.style.transition = 'all 0.3s ease';
                
                if (type === 'success') {
                    notification.style.backgroundColor = '#4CAF50';
                } else {
                    notification.style.backgroundColor = '#f44336';
                }
                
                document.body.appendChild(notification);
                
                // Animation d'entrée
                setTimeout(() => {
                    notification.style.opacity = '1';
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                // Supprimer après 3 secondes
                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            }
            
            // Navigation pour les événements, nouvelles, etc.
            document.querySelectorAll('.events-navigation button, .news-navigation button, .partners-navigation button, .awards-navigation button, .team-navigation button').forEach(button => {
                button.addEventListener('click', function() {
                    // Animation de clic
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    // Logique de navigation (à implémenter selon les besoins)
                    console.log('Bouton de navigation cliqué');
                });
            });
        }

        // Fonction pour initialiser les animations au défilement
        function initScrollAnimations() {
            const elementsToAnimate = document.querySelectorAll('.fade-in');
            
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                elementsToAnimate.forEach(element => {
                    observer.observe(element);
                });
            } else {
                // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
                elementsToAnimate.forEach(element => {
                    element.classList.add('visible');
                });
            }
        }

        // Gestion des erreurs
        window.addEventListener('error', function(e) {
            console.error('Erreur JavaScript:', e.error);
        });

        // Gestion des promesses non gérées
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Promesse non gérée:', e.reason);
        });
    