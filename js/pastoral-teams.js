    
        // Professional JavaScript for Church Website
        class ChurchWebsite {
            constructor() {
                this.teamData = [];
                this.currentSlide = 0;
                this.slidesPerView = 4;
                this.init();
            }

            init() {
                this.loadTeamData();
                this.setupEventListeners();
                this.setupResponsiveBehavior();
            }

            loadTeamData() {
                // In a real application, this would be an API call
                this.teamData = [
                    {
                        id: 1,
                        name: "Маттс-Ола Исхоел",
                        title: "епископ, старший пастор",
                        photo: "https://placehold.co/250x250/2ecc71/ffffff?text=Маттс-Ола",
                        quote: "Просите — и вам дадут, ищите — и найдете, стучите — и вам откроют. Потому что каждый, кто просит, получает, и кто ищет, находит, и тому, кто стучит, откроют. МАТФЕЯ 7:7-8",
                        bio: "Родился в 1989 году в городе Ереван в Армении, окончил среднюю школу. В возрасте 15 лет приехал в гости к родной сестре в Москву, посетил молодежный христианский лагерь, где пережил встречу с Богом. После чего начал посещать церковь «Слово жизни» в Москве. С того момента Армен стал служить в молодежном отделе и помогать в различных служениях поместной церкви.",
                        education: "Окончил Библейскую школу и Пасторскую школу, а также учился в Теологическом университете в Москве у учителей и докторов богословия Шведского Богословского Университета в Упсале.",
                        hobbies: "Армен с детства посещал различные спортивные кружки (шахматы, греко-римская борьба, футбол, настольный теннис), но самым любимым спортом для него стал большой теннис.",
                        family: "У Армена есть жена Мария и сын Патрик."
                    },
                    {
                        id: 2,
                        name: "Олег Попов",
                        title: "пастор, заместитель старшего пастора",
                        photo: "images/img1.webp",
                        quote: "Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, дабы всякий верующий в Него, не погиб, но имел жизнь вечную. ИОАННА 3:16",
                        bio: "Родился в 1975 году в Москве. Пришел к вере в 1998 году через друзей. Служит в церкви более 20 лет, прошел путь от волонтера до пастора.",
                        education: "Окончил Московскую Богословскую Семинарию, имеет степень магистра богословия.",
                        hobbies: "Увлекается историей, чтением классической литературы и велоспортом.",
                        family: "Женат на Елене, имеет двоих детей - сына Дмитрия и дочь Анну."
                    },
                    {
                        id: 3,
                        name: "Александр Неретин",
                        title: "пастор, исполнительный директор",
                        photo: "https://placehold.co/250x250/e74c3c/ffffff?text=Александр",
                        quote: "Все могу в укрепляющем меня Иисусе Христе. ФИЛИППИЙЦАМ 4:13",
                        bio: "Родился в 1980 году в Санкт-Петербурге. Пришел к вере в 2001 году. Имеет опыт управления в бизнесе, который теперь применяет в церковном служении.",
                        education: "Высшее экономическое образование, окончил пасторские курсы при церкви «Слово жизни».",
                        hobbies: "Любит горные походы, фотографию и классическую музыку.",
                        family: "Женат на Ольге, имеет сына Михаила."
                    },
                    {
                        id: 4,
                        name: "Сергей Мартюничев",
                        title: "пастор, заместитель старшего пастора по межцерковному взаимодействию",
                        photo: "https://placehold.co/250x250/9b59b6/ffffff?text=Сергей",
                        quote: "Служите друг другу, каждый тем даром, какой получил, как добрые домостроители многоразличной благодати Божией. 1 ПЕТРА 4:10",
                        bio: "Родился в 1972 году в Киеве. Служит в церкви с 1995 года. Отвечает за развитие партнерских отношений с другими церквями и организациями.",
                        education: "Окончил Киевскую Духовную Академию, имеет докторскую степень в области миссиологии.",
                        hobbies: "Интересуется международными отношениями, изучает иностранные языки.",
                        family: "Женат на Ирине, имеет троих детей."
                    },
                    {
                        id: 5,
                        name: "Алексей Романов",
                        title: "исполнительный пастор, молодежный пастор",
                        photo: "https://placehold.co/250x250/f1c40f/ffffff?text=Алексей",
                        quote: "Не о себе только каждый заботься, но каждый и о других. ФИЛИППИЙЦАМ 2:4",
                        bio: "Родился в 1985 году в Москве. Пришел к вере в подростковом возрасте. Специализируется на работе с молодежью и молодыми семьями.",
                        education: "Окончил молодежное служение в Библейской школе «Слово жизни».",
                        hobbies: "Увлекается современной музыкой, спортом и технологиями.",
                        family: "Женат на Светлане, имеет дочь Веронику."
                    },
                    {
                        id: 6,
                        name: "Борис Готовцев",
                        title: "пастор социального служения, руководитель фонда «Рука помощи»",
                        photo: "https://placehold.co/250x250/1abc9c/ffffff?text=Борис",
                        quote: "Так да светит свет ваш пред людьми, чтобы они видели ваши добрые дела и прославляли Отца вашего Небесного. МАТФЕЯ 5:16",
                        bio: "Родился в 1968 году в Новосибирске. Имеет многолетний опыт социальной работы. Возглавляет благотворительные проекты церкви.",
                        education: "Высшее педагогическое образование, окончил курсы социального служения.",
                        hobbies: "Волонтерство, помощь нуждающимся, садоводство.",
                        family: "Женат на Наталье, имеет взрослую дочь."
                    },
                    {
                        id: 7,
                        name: "Армен Асатрян",
                        title: "молодежный пастор",
                        photo: "https://placehold.co/250x250/34495e/ffffff?text=Армен",
                        quote: "Итак идите, научите все народы, крестя их во имя Отца и Сына и Святого Духа. МАТФЕЯ 28:19",
                        bio: "Родился в 1990 году в Ереване. Пришел к вере в 16 лет. Активно служит в молодежном ministry, организует мероприятия и конференции.",
                        education: "Окончил Библейскую школу «Слово жизни» в Москве.",
                        hobbies: "Баскетбол, путешествия, видеосъемка.",
                        family: "Холост."
                    },
                    {
                        id: 8,
                        name: "Михаил Котлан",
                        title: "пастор, исполнительный пастор по работе с подмосковными филиалами",
                        photo: "https://placehold.co/250x250/d35400/ffffff?text=Михаил",
                        quote: "Пасите Божие стадо, какое у вас, надзирая за ним не принужденно, но охотно и богоугодно. 1 ПЕТРА 5:2",
                        bio: "Родился в 1978 году в Минске. Служит в церкви с 2000 года. Координирует работу филиалов церкви в Подмосковье.",
                        education: "Окончил Минскую Духовную Семинарию, имеет степень магистра богословия.",
                        hobbies: "Чтение, рыбалка, автомобили.",
                        family: "Женат на Татьяне, имеет двух сыновей."
                    },
                    {
                        id: 9,
                        name: "Кирилл Семилетов",
                        title: "пастор, лидер служения домашних групп",
                        photo: "https://placehold.co/250x250/7f8c8d/ffffff?text=Кирилл",
                        quote: "Не будьте нерадивы в усердии, будьте пламенны духом, служите Господу. РИМЛЯНАМ 12:11",
                        bio: "Родился в 1982 году в Казани. Пришел к вере в 2003 году. Отвечает за развитие сети домашних групп и discipleship.",
                        education: "Окончил Казанскую Богословскую Семинарию.",
                        hobbies: "Настольные игры, кулинария, история церкви.",
                        family: "Женат на Марине, имеет сына и дочь."
                    },
                    {
                        id: 10,
                        name: "Алексей Кудаков",
                        title: "пастор служения старшего поколения",
                        photo: "https://placehold.co/250x250/8e44ad/ffffff?text=Алексей",
                        quote: "И даже до старости вашей Я тот же буду, и до седины вашей Я же буду носить вас. ИСАИЯ 46:4",
                        bio: "Родился в 1955 году в Москве. Служит в церкви более 30 лет. Специализируется на работе с пожилыми прихожанами.",
                        education: "Высшее педагогическое образование, окончил курсы геронтологии.",
                        hobbies: "Садоводство, история, классическая литература.",
                        family: "Женат на Галине, имеет троих детей и семерых внуков."
                    },
                    {
                        id: 11,
                        name: "Дмитрий Таранов",
                        title: "пастор, заместитель старшего пастора по внешним связям",
                        photo: "https://placehold.co/250x250/2980b9/ffffff?text=Дмитрий",
                        quote: "Старайтесь иметь мир со всеми и святость, без которой никто не увидит Господа. ЕВРЕЯМ 12:14",
                        bio: "Родился в 1970 году в Ростове-на-Дону. Имеет опыт работы в государственных структурах. Отвечает за взаимодействие церкви с общественными организациями.",
                        education: "Высшее юридическое образование, окончил богословские курсы.",
                        hobbies: "Гольф, политика, публичные выступления.",
                        family: "Женат на Екатерине, имеет сына."
                    },
                    {
                        id: 12,
                        name: "Лариса Асатрян",
                        title: "Руководитель молитвенного служения церкви «Слово жизни» Москва",
                        photo: "https://placehold.co/250x250/16a085/ffffff?text=Лариса",
                        quote: "Не заботьтесь ни о чем, но всегда в молитве и прошении с благодарением открывайте свои желания пред Богом. ФИЛИППИЙЦАМ 4:6",
                        bio: "Родилась в 1985 году в Ереване. Пришла к вере в 2002 году. Возглавляет молитвенное служение церкви, организует молитвенные собрания и марафоны.",
                        education: "Окончила Библейскую школу молитвенного служения.",
                        hobbies: "Музыка, поэзия, рукоделие.",
                        family: "Замужем за Арменом Асатряном."
                    }
                ];

                this.renderTeamGrid();
                this.renderSlider();
            }

            renderTeamGrid() {
                const gridContainer = document.getElementById('teamGrid');
                gridContainer.innerHTML = '';

                this.teamData.forEach(member => {
                    const memberElement = this.createTeamMemberElement(member);
                    gridContainer.appendChild(memberElement);
                });
            }

            renderSlider() {
                const sliderContainer = document.getElementById('teamSlider');
                const dotsContainer = document.getElementById('sliderDots');
                
                sliderContainer.innerHTML = '';
                dotsContainer.innerHTML = '';

                this.teamData.forEach(member => {
                    const slideElement = this.createSliderItemElement(member);
                    sliderContainer.appendChild(slideElement);
                });

                this.updateSlidesPerView();
                this.createSliderDots();
                this.updateSlider();
            }

            createTeamMemberElement(member) {
                const element = document.createElement('div');
                element.className = 'team-member';
                element.setAttribute('data-member-id', member.id);
                
                element.innerHTML = `
                    <div class="member-photo">
                        <img src="${member.photo}" alt="${member.name}" loading="lazy">
                    </div>
                    <div class="member-info">
                        <div class="member-name">${member.name}</div>
                        <div class="member-title">${member.title}</div>
                        <div class="arrow">→</div>
                    </div>
                `;

                element.addEventListener('click', () => this.openModal(member));
                return element;
            }

            createSliderItemElement(member) {
                const element = document.createElement('div');
                element.className = 'slider-item';
                
                element.innerHTML = `
                    <div class="team-member">
                        <div class="member-photo">
                            <img src="${member.photo}" alt="${member.name}" loading="lazy">
                        </div>
                        <div class="member-info">
                            <div class="member-name">${member.name}</div>
                            <div class="member-title">${member.title}</div>
                            <div class="arrow">→</div>
                        </div>
                    </div>
                `;

                element.querySelector('.team-member').addEventListener('click', () => this.openModal(member));
                return element;
            }

            createSliderDots() {
                const dotsContainer = document.getElementById('sliderDots');
                const totalSlides = Math.ceil(this.teamData.length / this.slidesPerView);
                
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'slider-dot';
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }

            updateSlidesPerView() {
                if (window.innerWidth < 576) {
                    this.slidesPerView = 1;
                } else if (window.innerWidth < 768) {
                    this.slidesPerView = 2;
                } else if (window.innerWidth < 992) {
                    this.slidesPerView = 3;
                } else {
                    this.slidesPerView = 4;
                }
            }

            updateSlider() {
                const slider = document.getElementById('teamSlider');
                const slideWidth = 100 / this.slidesPerView;
                const translateX = -this.currentSlide * slideWidth * this.slidesPerView;
                slider.style.transform = `translateX(${translateX}%)`;
                this.updateDots();
            }

            updateDots() {
                const dots = document.querySelectorAll('.slider-dot');
                const totalSlides = Math.ceil(this.teamData.length / this.slidesPerView);
                
                dots.forEach((dot, index) => {
                    if (index === this.currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            goToSlide(slideIndex) {
                const totalSlides = Math.ceil(this.teamData.length / this.slidesPerView);
                
                if (slideIndex < 0) {
                    this.currentSlide = totalSlides - 1;
                } else if (slideIndex >= totalSlides) {
                    this.currentSlide = 0;
                } else {
                    this.currentSlide = slideIndex;
                }
                
                this.updateSlider();
            }

            openModal(member) {
                document.getElementById('modalName').textContent = member.name;
                document.getElementById('modalTitle').textContent = member.title;
                document.getElementById('modalPhoto').querySelector('img').src = member.photo;
                document.getElementById('modalQuote').textContent = member.quote;
                document.getElementById('modalBio').textContent = member.bio;
                document.getElementById('modalEducation').textContent = member.education;
                document.getElementById('modalHobbies').textContent = member.hobbies;
                document.getElementById('modalFamily').textContent = member.family;
                
                document.getElementById('modalOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            closeModal() {
                document.getElementById('modalOverlay').classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            setupEventListeners() {
                // Slider navigation
                document.querySelector('.slider-arrow.prev').addEventListener('click', () => {
                    this.goToSlide(this.currentSlide - 1);
                });

                document.querySelector('.slider-arrow.next').addEventListener('click', () => {
                    this.goToSlide(this.currentSlide + 1);
                });

                // Modal close
                document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
                document.getElementById('modalOverlay').addEventListener('click', (e) => {
                    if (e.target === document.getElementById('modalOverlay')) {
                        this.closeModal();
                    }
                });

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeModal();
                    }
                });

                // Mobile menu toggle
                document.querySelector('.menu-toggle').addEventListener('click', () => {
                    const nav = document.querySelector('.navbar-center');
                    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
                });
            }

            setupResponsiveBehavior() {
                window.addEventListener('resize', () => {
                    this.updateSlidesPerView();
                    this.renderSlider();
                });
            }
        }

        // Initialize the website when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ChurchWebsite();
        });
    