
     class ChurchWebsite {
            constructor() {
                this.pages = {
                    main: document.getElementById('mainPage'),
                    fund: document.getElementById('fundPage'),
                    help: document.getElementById('helpPage'),
                    qr: document.getElementById('qrPaymentPage'),
                    volunteer: document.getElementById('volunteerPage')
                };
                
                this.currentPage = 'main';
                this.isAnimating = false;
                this.scrollPosition = 0;
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.setupScrollAnimations();
                this.setupIntersectionObserver();
                this.setupSmoothScrolling();
                this.setupFormValidation();
                this.setupSearchFunctionality();
                this.hideLoading();
                this.handleMobileMenu();
                this.setupNewsFunctionality();
                this.setupPageTransitions();
                
                // Initialize animations
                this.animateOnLoad();
            }

            setupEventListeners() {
                // Navigation buttons with enhanced animations
                const navConfig = {
                    'showFundPageBtn': () => this.showPage('fund'),
                    'showHelpPageBtn': () => this.showPage('help'),
                    'backToMainFromFundBtn': () => this.showPage('main'),
                    'backToFundFromHelpBtn': () => this.showPage('fund'),
                    'backToHelpFromQRBtn': () => this.showPage('help'),
                    'backToHelpFromVolunteerBtn': () => this.showPage('help'),
                    'showQRPaymentPageBtn': () => this.showPage('qr'),
                    'showVolunteerPageBtn': () => this.showPage('volunteer'),
                    'showVolunteerPageFromHelpBtn': () => this.showPage('volunteer'),
                    'becomePartnerFromHelpBtn': () => this.showPage('volunteer'),
                    'viewAllNewsBtn': () => this.showAllNews(),
                    'close-all-news': () => this.hideAllNews()
                };

                Object.entries(navConfig).forEach(([id, callback]) => {
                    const element = document.getElementById(id) || document.querySelector(`.${id}`);
                    if (element) {
                        element.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.animateButtonClick(e.target);
                            callback();
                        });
                    }
                });

                // Donation buttons with enhanced feedback
                const donationButtons = document.querySelectorAll('.submit-btn, .card-submit-btn:not([id])');
                donationButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.handleDonation(e.target);
                    });
                });

                // Form submissions
                const forms = document.querySelectorAll('form');
                forms.forEach(form => {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleFormSubmission(e.target);
                    });
                });

                // Window events
                window.addEventListener('scroll', () => this.handleScroll());
                window.addEventListener('resize', () => this.handleResize());
            }

            setupScrollAnimations() {
                // Enhanced scroll animations with parallax effect
                const scrollElements = document.querySelectorAll('.scroll-reveal');
                
                const elementInView = (el, dividend = 1) => {
                    const elementTop = el.getBoundingClientRect().top;
                    return (
                        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
                    );
                };

                const displayScrollElement = (element) => {
                    element.classList.add('revealed');
                };

                const hideScrollElement = (element) => {
                    element.classList.remove('revealed');
                };

                const handleScrollAnimation = () => {
                    scrollElements.forEach((el) => {
                        if (elementInView(el, 1.2)) {
                            displayScrollElement(el);
                        } else {
                            hideScrollElement(el);
                        }
                    });
                };

                window.addEventListener('scroll', () => {
                    handleScrollAnimation();
                });

                // Initial check
                handleScrollAnimation();
            }

            setupIntersectionObserver() {
                // Advanced intersection observer for complex animations
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            this.animateStagger(entry.target);
                        }
                    });
                }, observerOptions);

                // Observe all stagger animation elements
                document.querySelectorAll('.stagger-animation').forEach(el => {
                    observer.observe(el);
                });
            }

            animateStagger(container) {
                // Stagger animation for child elements
                const children = container.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150);
                });
            }

            setupSmoothScrolling() {
                // Enhanced smooth scrolling with momentum
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });
            }

            setupFormValidation() {
                // Advanced form validation with real-time feedback
                const forms = document.querySelectorAll('form');
                
                forms.forEach(form => {
                    const inputs = form.querySelectorAll('input, textarea, select');
                    
                    inputs.forEach(input => {
                        // Real-time validation
                        input.addEventListener('input', () => {
                            this.validateField(input);
                        });
                        
                        // Focus effects
                        input.addEventListener('focus', () => {
                            input.parentElement.classList.add('focused');
                        });
                        
                        input.addEventListener('blur', () => {
                            input.parentElement.classList.remove('focused');
                            this.validateField(input);
                        });
                    });
                });

                // Amount input formatting
                const amountInputs = document.querySelectorAll('.amount-input');
                amountInputs.forEach(input => {
                    input.addEventListener('input', this.formatAmount.bind(this));
                    input.addEventListener('blur', this.validateAmount.bind(this));
                });
            }

            formatAmount(event) {
                const input = event.target;
                let value = input.value.replace(/\D/g, '');
                
                if (value) {
                    value = parseInt(value).toLocaleString('ru-RU');
                    input.value = value;
                }
            }

            validateAmount(event) {
                const input = event.target;
                const value = parseInt(input.value.replace(/\D/g, ''));
                
                if (!value || value < 1) {
                    this.showFieldError(input, 'Введите корректную сумму');
                } else {
                    this.clearFieldError(input);
                }
            }

            validateField(field) {
                const value = field.value.trim();
                const type = field.type;
                
                // Clear previous states
                this.clearFieldError(field);
                
                // Required field validation
                if (field.hasAttribute('required') && !value) {
                    this.showFieldError(field, 'Это поле обязательно для заполнения');
                    return false;
                }
                
                // Email validation
                if (type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        this.showFieldError(field, 'Введите корректный email адрес');
                        return false;
                    }
                }
                
                // Phone validation
                if (field.type === 'tel' && value) {
                    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
                    if (!phoneRegex.test(value)) {
                        this.showFieldError(field, 'Введите корректный номер телефона');
                        return false;
                    }
                }
                
                return true;
            }

            showFieldError(field, message) {
                field.classList.add('error');
                
                let errorElement = field.parentElement.querySelector('.error-message');
                if (!errorElement) {
                    errorElement = document.createElement('span');
                    errorElement.className = 'error-message';
                    field.parentElement.appendChild(errorElement);
                }
                errorElement.textContent = message;
            }

            clearFieldError(field) {
                field.classList.remove('error');
                const errorElement = field.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }

            setupSearchFunctionality() {
                // Enhanced search with debouncing and suggestions
                const searchInput = document.getElementById('site-search');
                const searchResults = document.getElementById('search-results');
                
                if (!searchInput || !searchResults) return;
                
                let searchTimeout;
                
                searchInput.addEventListener('input', (e) => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        this.performSearch(e.target.value);
                    }, 300);
                });
                
                searchInput.addEventListener('focus', () => {
                    if (searchResults.innerHTML.trim()) {
                        searchResults.classList.add('active');
                    }
                });
                
                // Close search results when clicking outside
                document.addEventListener('click', (e) => {
                    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                        searchResults.classList.remove('active');
                    }
                });
            }

            performSearch(query) {
                const searchResults = document.getElementById('search-results');
                if (!searchResults) return;
                
                if (query.length < 2) {
                    searchResults.classList.remove('active');
                    searchResults.innerHTML = '';
                    return;
                }
                
                // Simulate search results (in real implementation, this would be an API call)
                const results = this.generateSearchResults(query);
                this.displaySearchResults(results);
            }

            generateSearchResults(query) {
                // Mock search results - replace with actual search logic
                const allPages = [
                    { title: 'История церкви', url: 'history.html', category: 'О нас' },
                    { title: 'Основы нашей Веры', url: 'Faith.html', category: 'О нас' },
                    { title: 'Пасторская команда', url: 'Pastoral-teams.html', category: 'О нас' },
                    { title: 'Конференции', url: 'Conferences.html', category: 'События' },
                    { title: 'Мероприятия', url: 'Meetings.html', category: 'События' },
                    { title: 'Богослужения', url: 'Generale.html', category: 'Богослужения' }
                ];
                
                return allPages.filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.category.toLowerCase().includes(query.toLowerCase())
                );
            }

            displaySearchResults(results) {
                const searchResults = document.getElementById('search-results');
                if (!searchResults) return;
                
                searchResults.innerHTML = '';
                
                if (results.length === 0) {
                    searchResults.innerHTML = '<div class="search-result-item">Ничего не найдено</div>';
                } else {
                    results.forEach(result => {
                        const item = document.createElement('div');
                        item.className = 'search-result-item';
                        item.innerHTML = `
                            <div class="search-result-title">${result.title}</div>
                            <div class="search-result-category">${result.category}</div>
                        `;
                        item.addEventListener('click', () => {
                            window.location.href = result.url;
                        });
                        searchResults.appendChild(item);
                    });
                }
                
                searchResults.classList.add('active');
            }

            hideLoading() {
                const loading = document.getElementById('loading');
                if (!loading) return;
                
                // Simulate loading time
                setTimeout(() => {
                    loading.classList.add('hidden');
                    setTimeout(() => {
                        loading.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 800);
                }, 2000);
            }

            handleMobileMenu() {
                const menuToggle = document.querySelector('.menu-toggle');
                const navUl = document.querySelector('nav ul');
                
                if (menuToggle && navUl) {
                    menuToggle.addEventListener('click', () => {
                        navUl.classList.toggle('mobile-active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.toggle('fa-bars');
                        icon.classList.toggle('fa-times');
                        
                        // Animate menu toggle
                        menuToggle.style.transform = navUl.classList.contains('mobile-active') ? 
                            'rotate(90deg)' : 'rotate(0deg)';
                    });
                    
                    // Close menu when clicking on links
                    navUl.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', () => {
                            navUl.classList.remove('mobile-active');
                            menuToggle.querySelector('i').classList.add('fa-bars');
                            menuToggle.querySelector('i').classList.remove('fa-times');
                            menuToggle.style.transform = 'rotate(0deg)';
                        });
                    });
                }
            }

            setupNewsFunctionality() {
                const newsButtons = document.querySelectorAll('.news-button');
                newsButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const details = e.target.dataset.details;
                        this.showPage('fund');
                        setTimeout(() => {
                            this.showAllNews();
                        }, 600);
                    });
                });
            }

            showAllNews() {
                const allNewsView = document.getElementById('allNewsView');
                if (allNewsView) {
                    allNewsView.classList.add('active');
                    this.scrollToElement(allNewsView, 100);
                }
            }

            hideAllNews() {
                const allNewsView = document.getElementById('allNewsView');
                if (allNewsView) {
                    allNewsView.classList.remove('active');
                this.scrollToTop();
                }
            }

            setupPageTransitions() {
                // Enhanced page transition system
                this.setupNavigationState();
            }

            setupNavigationState() {
                // Handle browser navigation
                window.addEventListener('popstate', (event) => {
                    if (event.state && event.state.page) {
                        this.showPage(event.state.page, false);
                    }
                });
            }

            showPage(pageName, pushState = true) {
                if (this.isAnimating || this.currentPage === pageName) return;
                
                this.isAnimating = true;
                this.scrollPosition = window.pageYOffset;
                
                // Store current page reference
                const currentPage = this.pages[this.currentPage];
                const targetPage = this.pages[pageName];
                
                if (!targetPage) return;
                
                // Animation sequence
                this.animatePageOut(currentPage)
                    .then(() => {
                        this.hideAllPages();
                        targetPage.classList.add('active');
                        this.currentPage = pageName;
                        
                        if (pushState) {
                            window.history.pushState({ page: pageName }, '', `#${pageName}`);
                        }
                        
                        return this.animatePageIn(targetPage);
                    })
                    .then(() => {
                        this.isAnimating = false;
                        this.scrollToTop();
                    })
                    .catch(error => {
                        console.error('Page transition error:', error);
                        this.isAnimating = false;
                    });
            }

            animatePageOut(page) {
                return new Promise((resolve) => {
                    if (!page) return resolve();
                    
                    page.style.transform = 'translateY(-20px)';
                    page.style.opacity = '0';
                    
                    setTimeout(resolve, 400);
                });
            }

            animatePageIn(page) {
                return new Promise((resolve) => {
                    if (!page) return resolve();
                    
                    // Reset styles
                    page.style.transform = 'translateY(0)';
                    page.style.opacity = '1';
                    
                    // Trigger animations for page content
                    const animatedElements = page.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
                    animatedElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 100);
                    });
                    
                    setTimeout(resolve, 600);
                });
            }

            hideAllPages() {
                Object.values(this.pages).forEach(page => {
                    if (page) {
                        page.classList.remove('active');
                        page.style.transform = '';
                        page.style.opacity = '';
                    }
                });
            }

            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            scrollToElement(element, offset = 0) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }

            handleDonation(button) {
                // Enhanced donation handling with loading states
                this.showLoadingState(button);
                
                // Simulate API call
                setTimeout(() => {
                    this.hideLoadingState(button);
                    this.showSuccessMessage('Спасибо за ваше пожертвование!');
                    this.showPage('qr');
                }, 1500);
            }

            handleFormSubmission(form) {
                const submitButton = form.querySelector('button[type="submit"]');
                this.showLoadingState(submitButton);
                
                // Validate all fields
                const inputs = form.querySelectorAll('input, textarea, select');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    this.hideLoadingState(submitButton);
                    this.showErrorMessage('Пожалуйста, исправьте ошибки в форме');
                    return;
                }
                
                // Simulate form submission
                setTimeout(() => {
                    this.hideLoadingState(submitButton);
                    this.showSuccessMessage('Форма успешно отправлена!');
                    form.reset();
                }, 2000);
            }

            showLoadingState(button) {
                button.classList.add('loading-state');
                button.disabled = true;
                const originalText = button.textContent;
                button.setAttribute('data-original-text', originalText);
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
            }

            hideLoadingState(button) {
                button.classList.remove('loading-state');
                button.disabled = false;
                const originalText = button.getAttribute('data-original-text');
                if (originalText) {
                    button.textContent = originalText;
                }
            }

            showSuccessMessage(message) {
                this.showNotification(message, 'success');
            }

            showErrorMessage(message) {
                this.showNotification(message, 'error');
            }

            showNotification(message, type = 'info') {
                // Remove existing notification
                const existingNotification = document.querySelector('.notification');
                if (existingNotification) {
                    existingNotification.remove();
                }
                
                // Create notification element
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                notification.innerHTML = `
                    <div class="notification-content">
                        <span class="notification-icon">
                            ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                        </span>
                        <span class="notification-text">${message}</span>
                        <button class="notification-close">×</button>
                    </div>
                `;
                
                // Add styles
                Object.assign(notification.style, {
                    position: 'fixed',
                    top: '100px',
                    right: '30px',
                    background: type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#3742fa',
                    color: 'white',
                    padding: '20px 25px',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--shadow)',
                    zIndex: '10000',
                    maxWidth: '400px',
                    animation: 'slideInRight 0.4s ease'
                });
                
                document.body.appendChild(notification);
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.animation = 'slideOutRight 0.4s ease';
                        setTimeout(() => notification.remove(), 400);
                    }
                }, 5000);
                
                // Close on click
                notification.querySelector('.notification-close').addEventListener('click', () => {
                    notification.style.animation = 'slideOutRight 0.4s ease';
                    setTimeout(() => notification.remove(), 400);
                });
            }

            animateButtonClick(button) {
                // Ripple effect animation
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }

            animateOnLoad() {
                // Initial page animations
                const headerElements = document.querySelectorAll('.header-content > *');
                headerElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s both`;
                    }, index * 200);
                });
            }

            handleScroll() {
                // Enhanced scroll effects
                const navbar = document.querySelector('.navbar');
                const scrollY = window.pageYOffset;
                
                if (scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Parallax effects
                this.handleParallax();
            }

            handleParallax() {
                const parallaxElements = document.querySelectorAll('.parallax');
                parallaxElements.forEach(el => {
                    const speed = el.dataset.speed || 0.5;
                    const yPos = -(window.pageYOffset * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
            }

            handleResize() {
                // Handle responsive adjustments
                this.adjustLayout();
            }

            adjustLayout() {
                // Responsive layout adjustments
                const width = window.innerWidth;
                
                if (width < 768) {
                    // Mobile adjustments
                    document.body.classList.add('mobile-view');
                } else {
                    document.body.classList.remove('mobile-view');
                }
            }
        }

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
            
            .notification {
                font-family: inherit;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .notification-icon {
                font-size: 20px;
                font-weight: bold;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .search-result-title {
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .search-result-category {
                font-size: 12px;
                color: #666;
            }
            
            .stagger-child {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .stagger-child.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        // Initialize the website
        document.addEventListener('DOMContentLoaded', () => {
            window.churchWebsite = new ChurchWebsite();

            // Gestion des dons (enregistrés dans localStorage pour l'espace admin)
            const DONATION_KEY = 'church_admin_donations';
            const SUBS_KEY = 'church_admin_subscriptions';

            function pushToStorage(key, obj) {
                try {
                    const raw = localStorage.getItem(key);
                    const arr = raw ? JSON.parse(raw) : [];
                    arr.unshift(obj);
                    localStorage.setItem(key, JSON.stringify(arr));
                } catch (e) {
                    console.warn('Erreur enregistrement', key, e);
                }
            }

            // Boutons "Отправить" sur les cartes de dons
            document.querySelectorAll('.card-submit-btn').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    // Ne pas bloquer la logique de paiement réelle si elle est branchée plus tard
                    const container = btn.closest('.card-donation-form, .mission-donation-form');
                    if (!container) return;

                    const amountInput = container.querySelector('.amount-input');
                    const amount = amountInput ? parseFloat(amountInput.value || '0') || 0 : 0;

                    const radio = container.querySelector('input[type="radio"][name^="citizenship"]:checked');
                    const citizenship = radio && radio.nextElementSibling
                        ? radio.nextElementSibling.textContent.trim()
                        : '';

                    const donation = {
                        id: Date.now(),
                        amount: amount,
                        citizenship: citizenship,
                        purpose: btn.dataset.purpose || 'Пожертвование',
                        createdAt: new Date().toISOString()
                    };

                    pushToStorage(DONATION_KEY, donation);
                });
            });

            // Abonnement newsletter en bas de page "Пожертвовать"
            const subscribeBtn = document.getElementById('subscribeBtn');
            if (subscribeBtn) {
                subscribeBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const emailInput = document.querySelector('.subscribe-input');
                    const consentCheckbox = document.getElementById('consent');
                    const email = emailInput ? emailInput.value.trim() : '';
                    const consent = consentCheckbox ? consentCheckbox.checked : false;

                    if (!email) {
                        alert('Пожалуйста, введите email.');
                        return;
                    }

                    const subscription = {
                        id: Date.now(),
                        email: email,
                        consent: consent,
                        createdAt: new Date().toISOString()
                    };

                    // Toujours garder une sauvegarde locale
                    pushToStorage(SUBS_KEY, subscription);

                    // Envoi au backend (MySQL)
                    try {
                        const resp = await fetch('backend/save_subscription.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                            },
                            body: new URLSearchParams({
                                email: email,
                                consent: consent ? '1' : '0'
                            })
                        });

                        let data = {};
                        try {
                            data = await resp.json();
                        } catch (err) {
                            data = {};
                        }

                        if (!resp.ok) {
                            console.warn('Erreur abonnement backend:', data.error || resp.status);
                        }
                    } catch (err) {
                        console.warn('Erreur réseau abonnement:', err);
                    }

                    if (emailInput) emailInput.value = '';
                    if (consentCheckbox) consentCheckbox.checked = false;
                    alert('Спасибо! Вы подписались на новости.');
                });
            }
        });

        // Handle initial page state
        window.addEventListener('load', () => {
            // Check URL hash for deep linking
            const hash = window.location.hash.replace('#', '');
            if (hash && window.churchWebsite.pages[hash]) {
                window.churchWebsite.showPage(hash, false);
            }
        });
    