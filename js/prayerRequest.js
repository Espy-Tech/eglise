 
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.navbar-center').classList.toggle('active');
        });

        // Form submission (send to backend via AJAX + MySQL)
        const prayerForm = document.getElementById('prayerRequestForm');
        if (prayerForm) {
            prayerForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const formData = new FormData(prayerForm);

                try {
                    const response = await fetch('backend/save_prayer_request.php', {
                        method: 'POST',
                        body: formData
                    });

                    let data = {};
                    try {
                        data = await response.json();
                    } catch (err) {
                        data = {};
                    }

                    if (response.ok) {
                        alert(data.message || 'Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
                        prayerForm.reset();
                    } else {
                        alert(data.error || 'Произошла ошибка при отправке заявки. Попробуйте позже.');
                    }
                } catch (error) {
                    alert('Ошибка соединения с сервером. Попробуйте позже.');
                }
            });
        }

        // Join form submission
        document.getElementById('joinForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const service = document.getElementById('joinService').value;
            alert(`Спасибо за вашу заявку на присоединение к "${service}"! Мы свяжемся с вами в ближайшее время.`);
            this.reset();
            closeModal('joinModal');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Service details data
        const serviceDetails = {
            "Ходатайственная молитва": {
                title: "Ходатайственная молитва",
                content: `
                    <h4>О служении</h4>
                    <p>Ходатайственная молитва - это молитва за других, когда мы становимся посредниками между Богом и людьми, вознося их нужды перед Ним.</p>
                    
                    <h4>Расписание</h4>
                    <ul>
                        <li><strong>Понедельник:</strong> 10:00 - 12:00 (молитва за лидеров)</li>
                        <li><strong>Вторник:</strong> 15:00 - 17:00 (молитва за церковь)</li>
                        <li><strong>Среда:</strong> 19:00 - 21:00 (молитва за город)</li>
                        <li><strong>Четверг:</strong> 10:00 - 12:00 (молитва за семьи)</li>
                        <li><strong>Пятница:</strong> 15:00 - 17:00 (молитва за молодежь)</li>
                    </ul>
                    
                    <h4>Как присоединиться</h4>
                    <p>Вы можете присоединиться к любой из наших молитвенных встреч онлайн или оффлайн. Для участия в закрытых молитвенных группах требуется предварительная регистрация.</p>
                    
                    <h4>Контакты</h4>
                    <p>Координатор: Анна Петрова<br>Телефон: +7 (999) 123-45-67<br>Email: prayer@slovo-zhizni.ru</p>
                `
            },
            "Исцеление и освобождение": {
                title: "Исцеление и освобождение",
                content: `
                    <h4>О служении</h4>
                    <p>Служение исцеления и освобождения помогает людям получить физическое, эмоциональное и духовное исцеление через молитву веры.</p>
                    
                    <h4>Расписание</h4>
                    <ul>
                        <li><strong>Пятница:</strong> 18:00 - 20:00 (групповая молитва)</li>
                        <li><strong>Суббота:</strong> 16:00 - 18:00 (индивидуальные сессии)</li>
                    </ul>
                    
                    <h4>Процесс</h4>
                    <ol>
                        <li>Предварительная запись по телефону или через сайт</li>
                        <li>Конфиденциальная беседа с молитвенным лидером</li>
                        <li>Молитва за конкретные нужды</li>
                        <li>Последующая поддержка и консультации</li>
                    </ol>
                    
                    <h4>Контакты</h4>
                    <p>Координатор: Сергей Иванов<br>Телефон: +7 (999) 765-43-21<br>Email: healing@slovo-zhizni.ru</p>
                `
            },
            "Молитва за пробуждение": {
                title: "Молитва за пробуждение",
                content: `
                    <h4>О служении</h4>
                    <p>Мы молимся за пробуждение в нашем городе, стране и во всем мире. Наша цель - увидеть движение Духа Святого, которое изменит сердца и преобразует общество.</p>
                    
                    <h4>Расписание</h4>
                    <ul>
                        <li><strong>Вторник:</strong> 20:30 - 22:00 (онлайн)</li>
                        <li><strong>Четверг:</strong> 19:00 - 21:00 (в церкви)</li>
                        <li><strong>Первая суббота месяца:</strong> 10:00 - 13:00 (молитвенный марафон)</li>
                    </ul>
                    
                    <h4>Направления молитвы</h4>
                    <ul>
                        <li>Молодежь и студенты</li>
                        <li>Семьи и браки</li>
                        <li>Образование и культура</li>
                        <li>Правительство и власть</li>
                        <li>Бизнес и экономика</li>
                        <li>Средства массовой информации</li>
                    </ul>
                    
                    <h4>Контакты</h4>
                    <p>Координатор: Дмитрий Смирнов<br>Телефон: +7 (999) 555-44-33<br>Email: awakening@slovo-zhizni.ru</p>
                `
            }
        };

        // Team details data
        const teamDetails = {
            "За Израиль": {
                title: "Молитвенная команда за Израиль",
                content: `
                    <h4>О команде</h4>
                    <p>Мы молимся за мир в Иерусалиме, за народ Израиля и исполнение библейских пророчеств. Наша команда следует библейскому призыву молиться за мир Иерусалиму.</p>
                    
                    <h4>Расписание</h4>
                    <p><strong>Понедельник:</strong> 15:00 - 16:30</p>
                    
                    <h4>Направления молитвы</h4>
                    <ul>
                        <li>Мир и безопасность в Израиле</li>
                        <li>Еврейский народ - познание Мессии</li>
                        <li>Исполнение библейских пророчеств</li>
                        <li>Израильские лидеры - мудрость и защита</li>
                        <li>Еврейско-христианские отношения</li>
                    </ul>
                    
                    <h4>Как присоединиться</h4>
                    <p>Присоединяйтесь к нам по понедельникам в 15:00 в главном зале церкви или онлайн через Zoom. Для получения ссылки на онлайн-встречу, свяжитесь с координатором.</p>
                    
                    <h4>Контакты</h4>
                    <p>Координатор: Елена Козлова<br>Телефон: +7 (999) 111-22-33<br>Email: israel@slovo-zhizni.ru</p>
                `
            },
            "Молодежная молитва": {
                title: "Молодежная молитвенная команда",
                content: `
                    <h4>О команде</h4>
                    <p>Молодежная молитвенная команда собирается для молитвы за нужды молодежи, студентов и за духовное пробуждение в новом поколении.</p>
                    
                    <h4>Расписание</h4>
                    <p><strong>Среда:</strong> 19:30 - 21:00</p>
                    
                    <h4>Направления молитвы</h4>
                    <ul>
                        <li>Духовное пробуждение среди молодежи</li>
                        <li>Студенты - успехи в учебе и твердость в вере</li>
                        <li>Призвание и предназначение молодого поколения</li>
                        <li>Отношения и создание благочестивых семей</li>
                        <li>Защита от негативного влияния мира</li>
                    </ul>
                    
                    <h4>Особенности</h4>
                    <p>Наши встречи проходят в неформальной обстановке с использованием современных worship песен. После молитвы мы обычно общаемся за чаем.</p>
                    
                    <h4>Контакты</h4>
                    <p>Координатор: Алексей Новиков<br>Телефон: +7 (999) 444-55-66<br>Email: youth@slovo-zhizni.ru</p>
                `
            },
            "За семьи": {
                title: "Молитвенная команда за семьи",
                content: `
                    <h4>О команде</h4>
                    <p>Мы молимся за укрепление браков, восстановление отношений и благословение семей. Наша цель - видеть сильные, здоровые семьи, основанные на библейских принципах.</p>
                    
                    <h4>Расписание</h4>
                    <p><strong>Понедельник:</strong> 21:00 - 22:30</p>
                    
                    <h4>Направления молитвы</h4>
                    <ul>
                        <li>Укрепление брачных союзов</li>
                        <li>Восстановление разрушенных отношений</li>
                        <li>Дети - защита, здоровье, мудрость</li>
                        <li>Единство и любовь в семьях</li>
                        <li>Финансовое благополучие семей</li>
                        <li>Семьи служителей церкви</li>
                    </ul>
                    
                    <h4>Особенности</h4>
                    <p>Мы практикуем как общие молитвы за все семьи, так и индивидуальные молитвы за конкретные нужды. Конфиденциальность гарантируется.</p>
                    
                    <h4>Контакты</h4>
                    <p>Координатор: Ольга Семенова<br>Телефон: +7 (999) 777-88-99<br>Email: family@slovo-zhizni.ru</p>
                `
            }
        };

        // Service join buttons
        document.querySelectorAll('.join-service').forEach(button => {
            button.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                openJoinModal(service, 'service');
            });
        });

        // Team join buttons
        document.querySelectorAll('.join-team').forEach(button => {
            button.addEventListener('click', function() {
                const team = this.getAttribute('data-team');
                openJoinModal(team, 'team');
            });
        });

        // Team details buttons
        document.querySelectorAll('.btn-outline-details').forEach(button => {
            button.addEventListener('click', function() {
                const team = this.getAttribute('data-team');
                openTeamModal(team);
            });
        });

        // Modal functions
        function openServiceModal(service) {
            const modal = document.getElementById('serviceModal');
            const title = document.getElementById('modalServiceTitle');
            const content = document.getElementById('modalServiceContent');
            
            title.textContent = serviceDetails[service].title;
            content.innerHTML = serviceDetails[service].content;
            
            modal.classList.add('active');
        }

        function openTeamModal(team) {
            const modal = document.getElementById('teamModal');
            const title = document.getElementById('modalTeamTitle');
            const content = document.getElementById('modalTeamContent');
            
            title.textContent = teamDetails[team].title;
            content.innerHTML = teamDetails[team].content;
            
            modal.classList.add('active');
        }

        function openJoinModal(item, type) {
            const modal = document.getElementById('joinModal');
            const title = document.getElementById('modalJoinTitle');
            const serviceInput = document.getElementById('joinService');
            
            if (type === 'service') {
                title.textContent = `Присоединиться к служению: ${item}`;
            } else {
                title.textContent = `Присоединиться к команде: ${item}`;
            }
            
            serviceInput.value = item;
            modal.classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        // Close modals when clicking the X button
        document.getElementById('closeServiceModal').addEventListener('click', function() {
            closeModal('serviceModal');
        });

        document.getElementById('closeTeamModal').addEventListener('click', function() {
            closeModal('teamModal');
        });

        document.getElementById('closeJoinModal').addEventListener('click', function() {
            closeModal('joinModal');
        });

        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            const serviceModal = document.getElementById('serviceModal');
            const teamModal = document.getElementById('teamModal');
            const joinModal = document.getElementById('joinModal');
            
            if (event.target === serviceModal) {
                closeModal('serviceModal');
            }
            if (event.target === teamModal) {
                closeModal('teamModal');
            }
            if (event.target === joinModal) {
                closeModal('joinModal');
            }
        });

        // Add hover effect to team cards
        document.querySelectorAll('.team-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
            });
        });

        // Pause testimonial animation on hover
        const testimonialsContainer = document.querySelector('.testimonials-container');
        testimonialsContainer.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        testimonialsContainer.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    

// Enregistrement des demandes de prière pour l'espace admin
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('prayerRequestForm');
    if (!form) return;

    function pushPrayerRequest(obj) {
        try {
            const raw = localStorage.getItem('church_admin_prayer_requests');
            const arr = raw ? JSON.parse(raw) : [];
            arr.unshift(obj);
            localStorage.setItem('church_admin_prayer_requests', JSON.stringify(arr));
        } catch (e) {
            console.warn('Erreur enregistrement des demandes de prière', e);
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = (document.getElementById('name')?.value || '').trim();
        const phone = (document.getElementById('phone')?.value || '').trim();
        const email = (document.getElementById('email')?.value || '').trim();
        const experience = (document.getElementById('experience')?.value || '').trim();
        const message = (document.getElementById('message')?.value || '').trim();

        const teams = Array.from(document.querySelectorAll('input[name="teams"]:checked'))
            .map(cb => cb.value);

        const request = {
            id: Date.now(),
            name,
            phone,
            email,
            experience,
            teams,
            message,
            createdAt: new Date().toISOString()
        };

        pushPrayerRequest(request);

        form.reset();
        alert('Спасибо! Ваша заявка на молитвенное служение отправлена.');
    });
});
