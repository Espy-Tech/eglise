// Professional JavaScript Implementation

class ChurchWebsite {
  constructor() {
    this.currentSlide = 0;
    this.currentMonth = new Date().getMonth();
    this.selectedDate = null;

    this.videos = [];

    // Locations avec toutes les églises de l'image et leurs sites web
    this.locations = [
      {
        name: "Краснодар",
        address: "Краснодар, Московская улица 65А",
        coordinates: [45.054, 38.9985],
        phone: "+7 (861) 234-56-78",
        pastor: "Пастор Сергей Иванов",
        schedule: "Воскресенье: 10:00, 13:00\nСреда: 19:00 (Молитвенное служение)",
        email: "krasnodar@slovo-zhizni.ru",
        website: "https://krasnodar.slovo-zhizni.ru",
        additional: "Парковка available, Доступ для людей с ограниченными возможностями"
      },
      {
        name: "Адлер",
        address: "Адлер, ул. Ленина 15",
        coordinates: [43.429, 39.924],
        phone: "+7 (862) 111-22-33",
        pastor: "Пастор Александр Петров",
        schedule: "Воскресенье: 11:00",
        email: "adler@slovo-zhizni.ru",
        website: "https://adler.slovo-zhizni.ru",
        additional: "Парковка available, Доступ для людей с ограниченными возможностями"
      },
      {
        name: "Анапа",
        address: "Анапа, ул. Крымская 25",
        coordinates: [44.894, 37.323],
        phone: "+7 (861) 333-44-55",
        pastor: "Пастор Мария Сидорова",
        schedule: "Воскресенье: 10:30",
        email: "anapa@slovo-zhizni.ru",
        website: "https://anapa.slovo-zhizni.ru",
        members: "members 100"
      },
      {
        name: "Астрахань",
        address: "Астрахань, ул. Советская 40",
        coordinates: [46.348, 48.035],
        phone: "+7 (851) 222-33-44",
        pastor: "Пастор Дмитрий Козлов",
        schedule: "Воскреснье: 10:00, 12:00",
        email: "astrakhan@slovo-zhizni.ru",
        website: "https://astrakhan.slovo-zhizni.ru"
      },
      {
        name: "Волгоград",
        address: "Волгоград, пр. Ленина 75",
        coordinates: [48.708, 44.513],
        phone: "+7 (844) 444-55-66",
        pastor: "Пастор Ольга Николаева",
        schedule: "Воскресенье: 11:00",
        email: "volgograd@slovo-zhizni.ru",
        website: "https://volgograd.slovo-zhizni.ru"
      },
      {
        name: "Волжский",
        address: "Волжский, ул. Мира 18",
        coordinates: [48.786, 44.757],
        phone: "+7 (844) 555-66-77",
        pastor: "Пастор Иван Смирнов",
        schedule: "Воскресенье: 10:30",
        email: "volzhsky@slovo-zhizni.ru",
        website: "https://volzhsky.slovo-zhizni.ru"
      },
      {
        name: "Геленджик",
        address: "Геленджик, ул. Курортная 30",
        coordinates: [44.561, 38.076],
        phone: "+7 (861) 666-77-88",
        pastor: "Пастор Елена КузнецовdQw4w9WgXcQа",
        schedule: "Воскресенье: 11:00",
        email: "gelendzhik@slovo-zhizni.ru",
        website: "https://gelendzhik.slovo-zhizni.ru"
      },
      {
        name: "Евпатория",
        address: "Евпатория, ул. Революции 12",
        coordinates: [45.191, 33.368],
        phone: "+7 (365) 777-88-99",
        pastor: "Пастор Виктор Орлов",
        schedule: "Воскресенье: 10:00",
        email: "evpatoria@slovo-zhizni.ru",
        website: "https://evpatoria.slovo-zhizni.ru"
      },
      {
        name: "Керчь",
        address: "Керчь, ул. Кирова 45",
        coordinates: [45.357, 36.468],
        phone: "+7 (365) 888-99-00",
        pastor: "Пастор Анна Васнецова",
        schedule: "Воскресенье: 11:30",
        email: "kerch@slovo-zhizni.ru",
        website: "https://kerch.slovo-zhizni.ru"
      },
      {
        name: "Лазаревское",
        address: "Лазаревское, ул. Победы 8",
        coordinates: [43.905, 39.332],
        phone: "+7 (862) 999-00-11",
        pastor: "Пастор Павел Белов",
        schedule: "Воскресенье: 10:00",
        email: "lazarevskoe@slovo-zhizni.ru",
        website: "https://lazarevskoe.slovo-zhizni.ru"
      },
      {
        name: "Мариуполь",
        address: "Мариуполь, ул. Греческая 22",
        coordinates: [47.096, 37.548],
        phone: "+7 (629) 111-22-33",
        pastor: "Пастор Татьяна Морозова",
        schedule: "Воскресенье: 11:00",
        email: "mariupol@slovo-zhizni.ru",
        website: "https://mariupol.slovo-zhizni.ru"
      },
      {
        name: "Новороссийск",
        address: "Новороссийск, ул. Набережная 15",
        coordinates: [44.724, 37.768],
        phone: "+7 (861) 222-33-44",
        pastor: "Пастор Алексей Попов",
        schedule: "Воскресенье: 10:00, 18:00 (прославление)",
        email: "novorossiysk@slovo-zhizni.ru",
        website: "https://novorossiysk.slovo-zhizni.ru"
      },
      {
        name: "Пятигорск",
        address: "Пятигорск,  улица кузнечная 26 ",
        coordinates: [44.042, 43.058],
        phone: "89097733384 ",
        pastor: "Пастор Маляров Михаил ",
        schedule: "Воскресенье: 11:30",
        email: "pyatigorsk@slovo-zhizni.ru",
        website: "https://vk.com/kkpyatigorsk"
      },
      {
        name: "Ростов-на-Дону",
        address: "Ростов-на-Дону, ул. Большая Садовая 100",
        coordinates: [47.222, 39.720],
        phone: "8-918-561-8528",
        pastor: "Пастор Наталья Романова",
        schedule: "Воскресенье: 10:00, 13:00",
        email: "rostov@slovo-zhizni.ru",
        website: "https://vk.com/cstone_rnd"
      },
      {
        name: "Севастополь Северный",
        address: "Севастополь, ул. Героев Сталинграда 25",
        coordinates: [44.617, 33.525],
        phone: "8-918-561-8528 ",
        pastor: "Пастор Михаил Семенов",
        schedule: "Воскресенье: 10:30",
        email: "sevastopol-north@slovo-zhizni.ru",
        website: "https://sevastopol-north.slovo-zhizni.ru"
      },
      {
        name: "Севастополь",
        address: "улица Фильченкова 2б",
        coordinates: [44.495, 33.536],
        phone: "+7 (869) 666-77-88",
        pastor: "Пастор Екатерина Волкова",
        schedule: "субботу 18:00.",
        email: "sevastopol-south@slovo-zhizni.ru",
        website: "http://cerkovkrim.ru/",
        contact: "https://m.vk.com/kksev"
      },
      {
        name: "Симферополь",
        address: "Симферополь, ул. Киевская 75",
        coordinates: [44.952, 34.102],
        phone: "+7 (365) 777-88-99",
        pastor: "Пастор Андрей Медведев",
        schedule: "Воскресенье: 11:00, 13:00",
        email: "simferopol@slovo-zhizni.ru",
        website: "https://simferopol.slovo-zhizni.ru"
      },
      {
        name: "Сочи",
        address: "Сочи, Адлерский район, ул. Мира, 21б",
        coordinates: [43.585, 39.723],
        phone: "+7(923)353-59-88",
        pastor: "Пастор Разживин Анатолий Александрович",
        schedule: "Воскресенье: 17:00",
        website: "https://vk.com/adlerkk"
      },
      {
        name: "Ставрополь",
        address: "Ставрополь, Краснофлотская д. 88",
        coordinates: [45.043, 41.973],
        phone: " +7 996 631 85-45 ",
        pastor: "Пастор Дранов Максим Андреевич",
        schedule: "Воскресенье: 11:00",
        email: "https://vk.com/kk_church_stav",
        website: "https://vk.com/kk_church_stav"
      },
      {
        name: "Сухум",
        address: "Сухум, ул. Лакоба 30",
        coordinates: [43.001, 41.023],
        phone: "+7 (840) 111-22-33",
        pastor: "Пастор Галина Захарова",
        schedule: "Воскресенье: 11:00",
        email: "suhum@slovo-zhizni.ru",
        website: "https://suhum.slovo-zhizni.ru"
      },
      {
        name: "Мариуполь Левый берег ",
        address: " Ул Межевая 62 ",
        coordinates: [55.8012, 37.6356],
        phone: " +79496354009 ",
        pastor: "Карлов Николай Николаевич ",
        schedule: " Воскресенье 12 ч  ",
        email: "moscow@slovo-zhizni.ru",
        website: "https://t.me/Team_Nehemiah",
       
      },
      {
        name: "Москва (Волгоградский проспект)",
        address: "Москва, Сосинская 43с8",
        coordinates: [55.7041, 37.7123],
        phone: "+7 (495) 234-56-78",
        pastor: "Пастор Михаил Котлан",
        schedule: "Воскресенье: 11:00, 13:40",
        email: "volgograd@slovo-zhizni.ru",
        website: "https://moscow-volgogradsky.slovo-zhizni.ru",
        metro: "Волгоградский проспект",
      }
    ];

    this.events = [];

    this.months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    this.daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    this.currentVideoCategory = "all";
    this.map = null;
    this.objectManager = null;

    this.init();
  }

  // À MODIFIER : Lignes 145-150
  async loadVideos() {
    try {
      // On appelle le fichier PHP que nous avons créé
      const response = await fetch('get_all_videos.php');
      this.videos = await response.json();
      console.log("Vidéos chargées :", this.videos);
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos:", error);
      this.videos = [];
    }
  }

  async loadEvents() {
    try {
      const response = await fetch('backend/get_events.php');
      const data = await response.json();
      this.events = data.map(event => ({
        time: event.time,
        title: event.title,
        location: event.location,
        date: event.date
      }));
    } catch (error) {
      console.error('Error loading events:', error);
      this.events = [];
    }
  }

  extractVideoId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  }

  // ... Toutes les autres méthodes restent exactement les mêmes ...
  init() {
    this.initializeHeroCarousel();
    this.initializeCarousel();
    this.initializeLocations();
    this.initializeSearch();
    this.initializeMobileMenu();
    this.initializeMap();
    this.initializeLanguageSwitcher();
  }

  
// Hero slider functionality (top main slider)
initializeHeroCarousel() {
  const track = document.getElementById("hero-track");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");

  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll(".hero-slide"));
  if (!slides.length) return;

  let currentIndex = 0;

  const goToSlide = (index) => {
    if (!slides.length) return;

    const total = slides.length;
    // boucle infinie
    const targetIndex = (index + total) % total;
    const targetSlide = slides[targetIndex];

    // Décalage basé sur la position réelle du slide
    const offset = targetSlide.offsetLeft;
    track.style.transform = `translateX(${-offset}px)`;

    currentIndex = targetIndex;
  };

  // Navigation boutons
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    goToSlide(currentIndex + 1);
  });

  // Swipe tactile pour mobile
  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    if (!e.touches || !e.touches.length) return;
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    if (!e.changedTouches || !e.changedTouches.length) {
      isDragging = false;
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    const swipeThreshold = 50; // px
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        // swipe vers la gauche => slide suivant
        goToSlide(currentIndex + 1);
      } else {
        // swipe vers la droite => slide précédent
        goToSlide(currentIndex - 1);
      }
    }

    isDragging = false;
  }, { passive: true });

  // Ré-aligner le slider au redimensionnement (orientation change)
  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });

  // Positionner correctement au chargement
  goToSlide(0);
}

// Carousel functionality
  initializeCarousel() {
    const carouselContainer = document.getElementById("carousel-container");
    if (!carouselContainer) return;

    const totalSlides = document.querySelectorAll(".carousel-item").length;
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");

    const updateCarousel = () => {
      carouselContainer.style.transform = `translateX(-${
        this.currentSlide * 100
      }%)`;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentSlide = (this.currentSlide + 1) % totalSlides;
        updateCarousel();
      });
    }

    // Auto-advance carousel
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 5000);
  }

  // Events functionality
  initializeEvents() {
    const monthSpans = document.querySelectorAll(".month");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    const calendarDays = document.getElementById("calendar-days");
    const currentEventTime = document.getElementById("current-event-time");
    const currentEventDescription = document.getElementById(
      "current-event-description"
    );
    const eventList = document.getElementById("event-list");

    if (!calendarDays) return;

    // Set current month as active
    if (monthSpans[this.currentMonth]) {
      monthSpans[this.currentMonth].classList.add("active");
    }

    // Month navigation
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener("click", () => {
        this.currentMonth = (this.currentMonth - 1 + 12) % 12;
        this.updateCalendar();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener("click", () => {
        this.currentMonth = (this.currentMonth + 1) % 12;
        this.updateCalendar();
      });
    }

    // Month selection
    monthSpans.forEach((span, index) => {
      span.addEventListener("click", () => {
        monthSpans.forEach((s) => s.classList.remove("active"));
        span.classList.add("active");
        this.currentMonth = index;
        this.updateCalendar();
      });
    });

    // Initialize calendar
    this.updateCalendar();

    // Update event display
    const updateEventDisplay = () => {
      const currentEventDate = document.getElementById("current-event-date");
      if (
        this.events.length > 0 &&
        currentEventDate &&
        currentEventTime &&
        currentEventDescription
      ) {
        // Filter for upcoming events and events from the last 2 days
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const twoDaysAgoString = twoDaysAgo.toISOString().split('T')[0];
        const upcomingEvents = this.events.filter(event => event.date >= twoDaysAgoString);

        if (upcomingEvents.length > 0) {
          const event = upcomingEvents[0];
          let formattedDate = '';
          if (event.date) {
            const dateObj = new Date(event.date);
            if (!isNaN(dateObj.getTime())) {
              formattedDate = dateObj.toLocaleDateString('fr-FR');
            } else {
              formattedDate = 'Date invalide';
            }
          } else {
            formattedDate = 'Date non disponible';
          }
          currentEventDate.textContent = formattedDate;
          currentEventTime.textContent = event.time;
          currentEventDescription.textContent = event.title;
        } else {
          currentEventDate.textContent = "Aucun événement";
          currentEventTime.textContent = "à venir";
          currentEventDescription.textContent = "Aucun événement prévu prochainement";
        }

        // Clear and populate event list
        if (eventList) {
          console.log('Populating event list with', this.events.length, 'events');
          eventList.innerHTML = "";
          this.events.forEach((evt, index) => {
            console.log('Processing event', index, ':', evt);
            let formattedDate = '';
            if (evt.date) {
              const dateObj = new Date(evt.date);
              if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('fr-FR');
              } else {
                formattedDate = 'Date invalide';
              }
            } else {
              formattedDate = 'Date non disponible';
            }
            console.log('Formatted date for event', index, ':', formattedDate);
            const eventItem = document.createElement("div");
            eventItem.className = "event-item";
            eventItem.innerHTML = `
              <div class="event-time">${evt.time}</div>
              <div class="event-details">
                <div class="event-date">${formattedDate}</div>
                <div class="event-title">${evt.title}</div>
                <div class="event-location">${evt.location}</div>
              </div>
            `;
            eventList.appendChild(eventItem);
          });
          console.log('Event list HTML:', eventList.innerHTML);
        } else {
          console.log('Event list element not found');
        }
      }
    };

    updateEventDisplay();
  }

  updateEventsForSelectedDate(day, month, year) {
    const selectedDate = new Date(year, month, day);
    const selectedDateString = selectedDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Filter events for the selected date
    const eventsForDate = this.events.filter(event => event.date === selectedDateString);

    // Update the current event display
    const currentEventTime = document.getElementById("current-event-time");
    const currentEventDescription = document.getElementById("current-event-description");
    const eventList = document.getElementById("event-list");

    if (eventsForDate.length > 0) {
      // Show the first event of the day
      const event = eventsForDate[0];
      if (currentEventTime) {
        currentEventTime.textContent = `${new Date(event.date).toLocaleDateString('fr-FR')} ${event.time}`;
      }
      if (currentEventDescription) {
        currentEventDescription.textContent = event.title;
      }

      // Update event list with all events for the selected date
      if (eventList) {
        eventList.innerHTML = "";
        eventsForDate.forEach((evt) => {
          let formattedDate = '';
          if (evt.date) {
            const dateObj = new Date(evt.date);
            if (!isNaN(dateObj.getTime())) {
              formattedDate = dateObj.toLocaleDateString('fr-FR');
            } else {
              formattedDate = 'Date invalide';
            }
          } else {
            formattedDate = 'Date non disponible';
          }
          const eventItem = document.createElement("div");
          eventItem.className = "event-item";
          eventItem.innerHTML = `
            <div class="event-time">${evt.time}</div>
            <div class="event-details">
              <div class="event-date">${formattedDate}</div>
              <div class="event-title">${evt.title}</div>
              <div class="event-location">${evt.location}</div>
            </div>
          `;
          eventList.appendChild(eventItem);
        });
      }
    } else {
      // No events for this date
      if (currentEventTime) {
        currentEventTime.textContent = "Aucun événement";
      }
      if (currentEventDescription) {
        currentEventDescription.textContent = `Aucun événement prévu pour le ${day}/${month + 1}/${year}`;
      }
      if (eventList) {
        eventList.innerHTML = "<p style='text-align: center; padding: 20px; color: #666;'>Aucun événement pour cette date</p>";
      }
    }
  }

  updateCalendar() {
    const calendarDays = document.getElementById("calendar-days");
    const monthSpans = document.querySelectorAll(".month");

    if (!calendarDays) return;

    // Update active month
    monthSpans.forEach((span, index) => {
      span.classList.toggle("active", index === this.currentMonth);
    });

    // Generate calendar days
    const year = new Date().getFullYear();
    const firstDay = new Date(year, this.currentMonth, 1);
    const lastDay = new Date(year, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() || 7; // Sunday is 0, we want it as 7

    calendarDays.innerHTML = "";

    // Add empty cells for days before the first day of the month
    for (let i = 1; i < startingDayOfWeek; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.className = "day empty";
      calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "day";
      dayElement.innerHTML = `
                <span class="date">${day}</span>
                <span class="day-of-week">${
                  this.daysOfWeek[(startingDayOfWeek + day - 2) % 7]
                }</span>
            `;

      // Mark past days
      if (
        this.currentMonth < currentMonth ||
        (this.currentMonth === currentMonth && day < currentDay)
      ) {
        dayElement.classList.add("past");
      }

      // Mark today
      if (this.currentMonth === currentMonth && day === currentDay) {
        dayElement.classList.add("active");
        this.selectedDate = day;
      }

      dayElement.addEventListener("click", () => {
        document
          .querySelectorAll(".day")
          .forEach((d) => d.classList.remove("active"));
        dayElement.classList.add("active");
        this.selectedDate = day;
        this.updateEventsForSelectedDate(day, this.currentMonth, year);
      });

      calendarDays.appendChild(dayElement);
    }
  }

  // Videos functionality
  // Dans votre classe ChurchWebsite dans index.js
  initializeVideos() {
    const viewAllBtn = document.getElementById('view-all-btn');
    const modal = document.getElementById('all-videos-modal');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // CIBLE PRÉCISE : On cherche la croix à l'intérieur de la modal spécifique
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;

    if (viewAllBtn && modal) {
        viewAllBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Bloque le scroll arrière
            this.renderFilteredVideos('all');
        });
    }

    // GESTION DE LA FERMETURE
    if (closeBtn) {
        closeBtn.onclick = () => { // Utilisation de .onclick pour éviter les doublons d'écouteurs
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Libère le scroll
        };
    }

    // FERMETURE EN CLIQUANT À L'EXTÉRIEUR
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // FILTRAGE
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            this.renderFilteredVideos(category);
        });
    });
}

renderFilteredVideos(category) {
  const container = document.getElementById('all-videos-content');
  container.innerHTML = ''; // On vide le contenu actuel

  // On filtre le tableau this.videos (chargé via loadVideos())
  const filtered = category === 'all' 
      ? this.videos 
      : this.videos.filter(v => v.category === category);

  if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align:center; color:white;">Aucune vidéo dans cette catégorie.</p>';
      return;
  }

  filtered.forEach(video => {
      const card = `
          <div class="video-card">
              <div class="video-container">
                  <iframe src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
              </div>
              <h3>${video.title}</h3>
          </div>
      `;
      container.innerHTML += card;
  });
}

  // Locations functionality
  initializeLocations() {
    const locationList = document.getElementById("location-list");
    const allLocationsBtn = document.getElementById("all-locations-btn");
    const locationSearch = document.getElementById("location-search");
    const locationSearchBtn = document.getElementById("location-search-btn");

    if (!locationList) return;

    // Populate locations
    this.updateLocationList(this.locations);

    // Show all locations
    if (allLocationsBtn) {
      allLocationsBtn.addEventListener("click", () => {
        this.updateLocationList(this.locations);
      });
    }

    // Location search
    const performLocationSearch = () => {
      const query = locationSearch.value.toLowerCase();
      if (query.length < 2) {
        this.updateLocationList(this.locations);
        return;
      }

      const filteredLocations = this.locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query) ||
          loc.address.toLowerCase().includes(query) ||
          loc.pastor.toLowerCase().includes(query)
      );

      this.updateLocationList(filteredLocations);

      // Centrer la carte sur les résultats si possible
      if (filteredLocations.length > 0 && this.map) {
        this.map.setBounds(this.objectManager.getBounds(), {
          checkZoomRange: true,
        });
      }
    };

    if (locationSearch) {
      locationSearch.addEventListener("input", performLocationSearch);
    }

    if (locationSearchBtn) {
      locationSearchBtn.addEventListener("click", performLocationSearch);
    }
  }

  updateLocationList(locations) {
    const locationList = document.getElementById("location-list");
    if (!locationList) return;

    locationList.innerHTML = "";

    if (locations.length === 0) {
      locationList.innerHTML =
        '<p style="text-align:center;padding:20px;color:#666;">Адреса не найдены</p>';
      return;
    }

    locations.forEach((location, index) => {
      const locationItem = document.createElement("div");
      locationItem.className = "location-item";
      locationItem.innerHTML = `
                <h4>${location.name}</h4>
                <p>${location.address}</p>
                <p style="font-size:14px;color:#666;margin:5px 0;">${location.phone}</p>
                <div class="location-actions">
                    <button class="show-on-map" data-index="${index}" title="Показать на карте">📍</button>
                    <button class="location-btn" onclick="churchWebsite.showDirections(${location.coordinates[0]}, ${location.coordinates[1]})" title="Маршрут">🚗</button>
                    <button class="location-btn" onclick="churchWebsite.callPhone('${location.phone}')" title="Позвонить">📞</button>
                    ${location.email ? `<button class="location-btn" onclick="churchWebsite.sendEmail('${location.email}')" title="Написать">📧</button>` : ""}
                    ${location.website ? `<button class="location-btn" onclick="churchWebsite.visitWebsite('${location.website}')" title="Посетить сайт">🌐</button>` : ""}
                </div>
            `;

      // Gérer le clic sur le bouton "show-on-map"
      const showOnMapBtn = locationItem.querySelector(".show-on-map");
      showOnMapBtn.addEventListener("click", () => {
        this.centerMapOnLocation(location);
        this.showLocationDetails(location);
      });

      locationList.appendChild(locationItem);
    });
  }

  // Map initialization avec Yandex Maps
  initializeMap() {
    const mapContainer = document.getElementById("yandex-map");
    if (!mapContainer) return;

    // Vérifier si l'API Yandex Maps est disponible
    if (typeof ymaps === "undefined") {
      console.warn(
        "Yandex Maps API non chargée, affichage de la carte de secours"
      );
      this.showFallbackMap();
      return;
    }

    // Initialiser Yandex Maps
    ymaps.ready(() => {
      this.initYandexMap();
    });
  }

  initYandexMap() {
    try {
      // Créer la carte centrée sur Krasnodar pour mettre en avant l'adresse Московская улица 65А
      this.map = new ymaps.Map("yandex-map", {
        center: [45.054, 38.9985], // Krasnodar coordinates (Московская улица 65А)
        zoom: 12,
        controls: ["zoomControl", "fullscreenControl"],
      });

      // Créer le gestionnaire d'objets pour les marqueurs
      this.objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true,
      });

      // Configurer les styles des clusters
      this.objectManager.clusters.options.set(
        "preset",
        "islands#invertedVioletClusterIcons"
      );
      this.objectManager.objects.options.set("preset", "islands#redChurchIcon");

      // Ajouter les emplacements comme objets
      const objects = this.locations.map((location, index) => ({
        id: index,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: location.coordinates,
        },
        properties: {
          balloonContent: this.getBalloonContent(location),
          clusterCaption: location.name,
          hintContent: location.name,
        },
      }));

      this.objectManager.add(objects);
      this.map.geoObjects.add(this.objectManager);

      // Gérer les clics sur les objets
      this.objectManager.objects.events.add("click", (e) => {
        const objectId = e.get("objectId");
        const location = this.locations[objectId];
        this.showLocationDetails(location);
      });

      // Ajuster la vue pour montrer tous les marqueurs
      if (this.locations.length > 0) {
        this.map.setBounds(this.objectManager.getBounds(), {
          checkZoomRange: true,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de Yandex Maps:", error);
      this.showFallbackMap();
    }
  }

  getBalloonContent(location) {
    return `
            <div class="map-balloon">
                <h3 style="margin: 0 0 10px 0; color: #1a1a1a;">${location.name}</h3>
                <p style="margin: 5px 0;"><strong>📌 Адрес:</strong> ${location.address}</p>
                <p style="margin: 5px 0;"><strong>📞 Телефон:</strong> ${location.phone}</p>
                <p style="margin: 5px 0;"><strong>👨‍💼 Пастор:</strong> ${location.pastor}</p>
                <p style="margin: 5px 0;"><strong>🕐 Расписание:</strong> ${location.schedule}</p>
                ${location.email ? `<p style="margin: 5px 0;"><strong>📧 Email:</strong> ${location.email}</p>` : ""}
                ${location.metro ? `<p style="margin: 5px 0;"><strong>🚇 Метро:</strong> ${location.metro}</p>` : ""}
                ${location.website ? `<p style="margin: 5px 0;"><strong>🌐 Сайт:</strong> <a href="${location.website}" target="_blank" style="color: #2563eb;">${location.website}</a></p>` : ""}
                ${location.additional ? `<p style="margin: 5px 0;"><strong>ℹ️ Дополнительно:</strong> ${location.additional}</p>` : ""}
                <div style="margin-top: 10px; display: flex; gap: 5px; flex-wrap: wrap;">
                    <button onclick="churchWebsite.showDirections(${location.coordinates[0]}, ${location.coordinates[1]})" 
                            style="padding: 8px 16px; background: #FFD700; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        🚗 Маршрут
                    </button>
                    ${location.website ? `
                    <button onclick="churchWebsite.visitWebsite('${location.website}')" 
                            style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        🌐 Сайт
                    </button>
                    ` : ""}
                </div>
            </div>
        `;
  }

  showLocationDetails(location) {
    const locationList = document.getElementById("location-list");
    if (locationList) {
      locationList.innerHTML = `
                <div class="location-details">
                    <h4>${location.name}</h4>
                    <p><strong>📌 Адрес:</strong> ${location.address}</p>
                    <p><strong>📞 Телефон:</strong> ${location.phone}</p>
                    <p><strong>👨‍💼 Пастор:</strong> ${location.pastor}</p>
                    <p><strong>🕐 Расписание:</strong> ${location.schedule}</p>
                    ${location.email ? `<p><strong>📧 Email:</strong> ${location.email}</p>` : ""}
                    ${location.metro ? `<p><strong>🚇 Метро:</strong> ${location.metro}</p>` : ""}
                    ${location.website ? `<p><strong>🌐 Сайт:</strong> <a href="${location.website}" target="_blank" style="color: #2563eb;">${location.website}</a></p>` : ""}
                    ${location.additional ? `<p><strong>ℹ️ Дополнительно:</strong> ${location.additional}</p>` : ""}
                    <div class="location-actions">
                        <button class="location-btn" onclick="churchWebsite.showDirections(${location.coordinates[0]}, ${location.coordinates[1]})">
                            🚗 Маршрут
                        </button>
                        <button class="location-btn" onclick="churchWebsite.callPhone('${location.phone}')">
                            📞 Позвонить
                        </button>
                        ${location.email ? `
                        <button class="location-btn" onclick="churchWebsite.sendEmail('${location.email}')">
                            📧 Написать
                        </button>
                        ` : ""}
                        ${location.website ? `
                        <button class="location-btn" onclick="churchWebsite.visitWebsite('${location.website}')">
                            🌐 Сайт
                        </button>
                        ` : ""}
                    </div>
                </div>
            `;
    }
  }

  centerMapOnLocation(location) {
    if (this.map) {
      this.map.setCenter(location.coordinates, 16);

      // Ouvrir le ballon si possible
      const objectId = this.locations.findIndex(
        (loc) => loc.name === location.name
      );
      if (objectId !== -1) {
        this.objectManager.objects.balloon.open(objectId);
      }
    }
  }

  showDirections(lat, lon) {
    // Ouvrir Yandex Navigator ou afficher le panneau de routage
    const url = `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
    window.open(url, "_blank");
  }

  callPhone(phone) {
    // Nettoyer le numéro pour l'appel
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    window.location.href = `tel:${cleanPhone}`;
  }

  sendEmail(email) {
    window.location.href = `mailto:${email}`;
  }

  visitWebsite(website) {
    window.open(website, "_blank");
  }

  showFallbackMap() {
    const mapContainer = document.getElementById("yandex-map");
    if (!mapContainer) return;

    mapContainer.innerHTML = `
            <div class="map-placeholder">
                <div class="map-placeholder-content">
                    <h3>Карта церквей "Слово Жизни"</h3>
                    <div class="location-cards">
                        ${this.locations
                          .map(
                            (loc) => `
                            <div class="location-card">
                                <h4>${loc.name}</h4>
                                <p>${loc.address}</p>
                                <p>${loc.phone}</p>
                                ${loc.website ? `<p><a href="${loc.website}" target="_blank" style="color: #2563eb;">🌐 ${loc.website}</a></p>` : ""}
                                <div class="coordinates">
                                    Координаты: ${loc.coordinates[0].toFixed(4)}, ${loc.coordinates[1].toFixed(4)}
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    <div class="map-info">
                        <p>Для интерактивной карты требуется подключение к интернету и API ключ Yandex Maps.</p>
                        <p><a href="https://developer.tech.yandex.ru/services/" target="_blank">
                            Получить API ключ
                        </a></p>
                    </div>
                </div>
            </div>
        `;
  }

  // Search functionality
initializeSearch() {
  const siteSearch = document.getElementById("site-search");
  const siteSearchBtn = document.getElementById("site-search-btn");
  const searchResults = document.getElementById("search-results");

  if (!siteSearch || !searchResults) return;

  const allSearchableContent = [
    ...this.events.map((e) => e.title),
    ...this.events.map((e) => e.location),
    ...this.videos.map((v) => v.title),
    ...this.locations.map((l) => l.name),
    ...this.locations.map((l) => l.address),
    ...this.locations.map((l) => l.website).filter(Boolean),
    "История церкви",
    "Основы нашей Веры",
    "Детское служение",
    "Подростковое служение",
    "Женское служение",
    "Команда пасторов",
    "Молитвенная поддержка",
    "Пожертвовать",
    "Контакты",
    "Главная страница",
    "Расписание богослужений",
    "Домашние группы",
    "Альфа-курс",
    "Служение молодежи",
    "Накорми голодного",
    "Наше видение",
    "Национальные служения"
  ];

  // Привязка ключевых фраз к конкретным страницам
  const navigationMap = [
    { match: "история", url: "history.html" },
    { match: "история церкви", url: "history.html" },
    { match: "основы нашей веры", url: "Faith.html" },
    { match: "основы веры", url: "Faith.html" },
    { match: "детское служение", url: "For-kids.html" },
    { match: "подростковое служение", url: "Teens.html" },
    { match: "женское служение", url: "women.html" },
    { match: "пастор", url: "Pastoral-teams.html" },
    { match: "команда пасторов", url: "Pastoral-teams.html" },
    { match: "домашние группы", url: "homeService.html" },
    { match: "альфа-курс", url: "alphaCourse.html" },
    { match: "старшее поколение", url: "Older-generation.html" },
    { match: "служение молодежи", url: "Teens.html" },
    { match: "накорми голодного", url: "feedHungry.html" },
    { match: "богослужения", url: "service.html" },
    { match: "расписание", url: "service.html" },
    { match: "контакты", url: "contact.html" },
    { match: "пожертвовать", url: "donate.html" },
    { match: "жертва", url: "donate.html" },
    { match: "главная", url: "index.html" },
    { match: "главная страница", url: "index.html" },
    { match: "видение", url: "Vision.html" },
    { match: "национальные", url: "National.html" },
    { match: "молитвенная поддержка", url: "prayerRequest.html" },
    { match: "молитва", url: "prayerRequest.html" }
  ];

  const performSiteSearch = () => {
    const query = siteSearch.value.toLowerCase();

    if (query.length < 2) {
      searchResults.classList.remove("active");
      return;
    }

    const results = allSearchableContent
      .filter((text) => text.toLowerCase().includes(query))
      .slice(0, 10);

    searchResults.innerHTML = "";

    if (results.length > 0) {
      results.forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.className = "search-result-item";
        resultItem.textContent = result;
        resultItem.addEventListener("click", () => {
          const resultLower = result.toLowerCase();
          // Пытаемся найти подходящую страницу
          const target = navigationMap.find((item) =>
            resultLower.includes(item.match)
          );

          siteSearch.value = "";
          searchResults.classList.remove("active");

          if (target) {
            window.location.href = target.url;
          } else {
            // Запасной вариант — просто оставить результат без перехода
            console.log(`Результат: ${result}`);
          }
        });
        searchResults.appendChild(resultItem);
      });
      searchResults.classList.add("active");
    } else {
      searchResults.classList.remove("active");
    }
  };

  siteSearch.addEventListener("input", performSiteSearch);

  if (siteSearchBtn) {
    siteSearchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      performSiteSearch();
    });
  }

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      searchResults.classList.remove("active");
    }
  });
}

  // Mobile menu functionality
  initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarCenter = document.querySelector('.navbar-center');

    if (menuToggle && navbarCenter) {
      menuToggle.addEventListener('click', () => {
        navbarCenter.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });

      // Close menu when clicking on a link
      const navLinks = navbarCenter.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navbarCenter.classList.remove('active');
          menuToggle.classList.remove('active');
        });
      });
    }
  }

  // Language switcher
  initializeLanguageSwitcher() {
    const langLinks = document.querySelectorAll(".lang-link");

    langLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove active class from all links
        langLinks.forEach((l) => l.classList.remove("active"));

        // Add active class to clicked link
        link.classList.add("active");

        // Get selected language
        const lang = link.getAttribute("data-lang");

        // Here you would typically implement language switching logic
        console.log("Language changed to:", lang);

        // For demo purposes, show an alert
        if (lang === "en") {
          alert("English version coming soon!");
        }
      });
    });
  }
}

// Initialiser le site
let churchWebsite;
document.addEventListener("DOMContentLoaded", async () => {
  churchWebsite = new ChurchWebsite();
  await churchWebsite.loadVideos();
  await churchWebsite.loadEvents();
  churchWebsite.initializeEvents();
  churchWebsite.initializeVideos();
});
