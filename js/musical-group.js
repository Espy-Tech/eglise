
    // Code d'accès
    const ACCESS_CODE = "jean";
    
    // Éléments de connexion
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const mainHeader = document.getElementById('mainHeader');
    const mainSections = document.querySelectorAll('.luxury-section, .luxury-hero, .luxury-footer');

    // Vérifier la connexion au chargement
    function checkAuth() {
        const isAuthenticated = localStorage.getItem('harmonieAuth') === 'true';
        console.log('Auth check:', isAuthenticated);
        
        if (isAuthenticated) {
            showMainContent();
        } else {
            showLoginScreen();
        }
    }

    // Afficher l'écran de connexion
    function showLoginScreen() {
        console.log('Showing login screen');
        loginScreen.style.display = 'flex';
        if (mainHeader) mainHeader.style.display = 'none';
        
        mainSections.forEach(section => {
            if (section) section.style.display = 'none';
        });
    }

    // Afficher le contenu principal
    function showMainContent() {
        console.log('Showing main content');
        loginScreen.style.display = 'none';
        if (mainHeader) mainHeader.style.display = 'block';
        
        mainSections.forEach(section => {
            if (section) {
                section.style.display = 'block';
                if (section.classList.contains('luxury-hero')) {
                    section.style.display = 'flex';
                }
            }
        });
        
        // Initialiser l'application après l'authentification
        initApp();
    }

    // Gérer la connexion
    function handleLogin(event) {
        event.preventDefault();
        const password = passwordInput.value;
        console.log('Password entered:', password);
        
        if (password === ACCESS_CODE) {
            console.log('Access granted');
            localStorage.setItem('harmonieAuth', 'true');
            showMainContent();
        } else {
            console.log('Access denied');
            loginError.style.display = 'block';
            passwordInput.value = '';
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        }
    }

    // Données de démonstration
    let musicLibrary = [
        { id: 1, title: "Песнь Мира", artist: "Небесная Гармония", duration: 42 },
        { id: 2, title: "Утренняя Хвала", artist: "Небесная Гармония", duration: 128 },
        { id: 3, title: "Гимн Радости", artist: "Небесная Гармония", duration: 95 }
    ];

    let videoLibrary = [
        { id: 1, title: "Пасхальная месса 2023", description: "Полное празднование пасхальной мессы с нашим хором", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: 2, title: "Рождественский концерт", description: "Отрывки нашего рождественского концерта в соборе", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ];

    let serviceSongs = [
        { id: 1, title: "Kyrie Eleison", artist: "Православный хор Парижа", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: 2, title: "Agni Parthene", artist: "Монастырь Симонос Петрас", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ];

    const carouselSlides = [
        {
            image: "/public/images/img4.jpg",
            title: "Концерт Хвалы",
            description: "Особое празднование дня священной музыки"
        },
        {
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            title: "Репетиция Хора",
            description: "Подготовка к воскресной мессе"
        },
        {
            image: "/public/images/image.png",
            title: "Репетиция Хора",
            description:"Подготовка к воскресной мессе"
        }
    ];

    // Éléments DOM
    const trackList = document.getElementById('trackList');
    const addMusicBtn = document.getElementById('addMusicBtn');
    const musicModalOverlay = document.getElementById('musicModalOverlay');
    const closeMusicModal = document.getElementById('closeMusicModal');
    const cancelMusicBtn = document.getElementById('cancelMusicBtn');
    const saveMusicBtn = document.getElementById('saveMusicBtn');
    const addMusicForm = document.getElementById('addMusicForm');
    
    const videosGrid = document.getElementById('videosGrid');
    const addVideoBtn = document.getElementById('addVideoBtn');
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const cancelVideoBtn = document.getElementById('cancelVideoBtn');
    const saveVideoBtn = document.getElementById('saveVideoBtn');
    const addVideoForm = document.getElementById('addVideoForm');
    
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');

    // Éléments pour les chants de service
    const serviceSongsList = document.getElementById('serviceSongsList');
    const addServiceSongBtn = document.getElementById('addServiceSongBtn');
    const serviceSongModalOverlay = document.getElementById('serviceSongModalOverlay');
    const closeServiceSongModal = document.getElementById('closeServiceSongModal');
    const cancelServiceSongBtn = document.getElementById('cancelServiceSongBtn');
    const saveServiceSongBtn = document.getElementById('saveServiceSongBtn');
    const addServiceSongForm = document.getElementById('addServiceSongForm');
    const serviceSongVideo = document.getElementById('serviceSongVideo');
    const serviceSongTitleDisplay = document.getElementById('serviceSongTitleDisplay');
    const serviceSongArtistDisplay = document.getElementById('serviceSongArtistDisplay');

    // Variables du lecteur
    let currentTrackIndex = 0;
    let isPlaying = false;
    let progressInterval;

    // Variables pour les chants de service
    let currentServiceSongIndex = 0;

    // Initialisation de l'application
    function initApp() {
        initCarousel();
        renderTrackList();
        renderVideos();
        renderServiceSongs();
        loadTrack(0);
        
        // Événements pour la musique
        addMusicBtn.addEventListener('click', () => openModal(musicModalOverlay));
        closeMusicModal.addEventListener('click', () => closeModal(musicModalOverlay));
        cancelMusicBtn.addEventListener('click', () => closeModal(musicModalOverlay));
        saveMusicBtn.addEventListener('click', saveMusic);
        
        // Événements pour les vidéos
        addVideoBtn.addEventListener('click', () => openModal(videoModalOverlay));
        closeVideoModal.addEventListener('click', () => closeModal(videoModalOverlay));
        cancelVideoBtn.addEventListener('click', () => closeModal(videoModalOverlay));
        saveVideoBtn.addEventListener('click', saveVideo);
        
        // Événements pour les chants de service
        addServiceSongBtn.addEventListener('click', () => openModal(serviceSongModalOverlay));
        closeServiceSongModal.addEventListener('click', () => closeModal(serviceSongModalOverlay));
        cancelServiceSongBtn.addEventListener('click', () => closeModal(serviceSongModalOverlay));
        saveServiceSongBtn.addEventListener('click', saveServiceSong);
        
        // Événements du lecteur
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevTrack);
        nextBtn.addEventListener('click', nextTrack);
        progressBar.addEventListener('click', setProgress);
        volumeSlider.addEventListener('input', setVolume);
        
        // Navigation fluide
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

        // Animation au scroll pour le header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 42, 58, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, var(--dark-blue) 0%, #2c3e50 100%)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Initialisation du carousel
    function initCarousel() {
        const carousel = document.getElementById('carousel');
        const carouselDots = document.getElementById('carouselDots');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        
        let currentSlide = 0;
        
        // Créer les slides
        carouselSlides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="carousel-image">
                <div class="carousel-caption">
                    <h3>${slide.title}</h3>
                    <p>${slide.description}</p>
                </div>
            `;
            carousel.appendChild(slideElement);
            
            // Créer les points
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : carouselSlides.length - 1;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide < carouselSlides.length - 1 ? currentSlide + 1 : 0;
            updateCarousel();
        });
        
        // Défilement automatique
        setInterval(() => {
            currentSlide = currentSlide < carouselSlides.length - 1 ? currentSlide + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    // Rendu de la liste des pistes
    function renderTrackList() {
        trackList.innerHTML = '';
        
        musicLibrary.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = `track-item ${index === currentTrackIndex ? 'active' : ''}`;
            li.innerHTML = `
                <div class="track-number">${index + 1}</div>
                <div class="track-info">
                    <div class="list-track-title">${track.title}</div>
                    <div class="list-track-artist">${track.artist}</div>
                </div>
                <div class="track-duration">${formatTime(track.duration)}</div>
                <button class="delete-track" data-id="${track.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            li.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-track')) {
                    loadTrack(index);
                    playTrack();
                }
            });
            
            const deleteBtn = li.querySelector('.delete-track');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTrack(track.id);
            });
            
            trackList.appendChild(li);
        });
    }

    // Rendu des vidéos
    function renderVideos() {
        videosGrid.innerHTML = '';
        
        videoLibrary.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="${video.title}">
                    <i class="fab fa-youtube"></i>
                    <button class="delete-video" data-id="${video.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                    <a href="${video.url}" target="_blank" class="watch-btn">Смотреть</a>
                </div>
            `;
            
            const deleteBtn = videoCard.querySelector('.delete-video');
            deleteBtn.addEventListener('click', () => {
                deleteVideo(video.id);
            });
            
            videosGrid.appendChild(videoCard);
        });
    }

    // Rendu des chants de service
    function renderServiceSongs() {
        serviceSongsList.innerHTML = '';
        
        serviceSongs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = `service-song-item ${index === currentServiceSongIndex ? 'active' : ''}`;
            songItem.innerHTML = `
                <div class="service-song-number">${index + 1}</div>
                <div class="service-song-info">
                    <div class="service-song-title">${song.title}</div>
                    <div class="service-song-artist">${song.artist}</div>
                </div>
                <button class="delete-service-song" data-id="${song.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            songItem.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-service-song')) {
                    loadServiceSong(index);
                }
            });
            
            const deleteBtn = songItem.querySelector('.delete-service-song');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteServiceSong(song.id);
            });
            
            serviceSongsList.appendChild(songItem);
        });
    }

    // Charger une piste
    function loadTrack(index) {
        currentTrackIndex = index;
        const track = musicLibrary[index];
        
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        durationEl.textContent = formatTime(track.duration);
        currentTimeEl.textContent = '00:00';
        progress.style.width = '0%';
        
        renderTrackList();
    }

    // Charger un chant de service
    function loadServiceSong(index) {
        currentServiceSongIndex = index;
        const song = serviceSongs[index];
        
        serviceSongVideo.innerHTML = `<iframe src="${song.url}" allowfullscreen></iframe>`;
        serviceSongTitleDisplay.textContent = song.title;
        serviceSongArtistDisplay.textContent = song.artist;
        
        renderServiceSongs();
    }

    // Supprimer une piste
    function deleteTrack(trackId) {
        if (confirm('Вы уверены, что хотите удалить эту музыку?')) {
            const trackIndex = musicLibrary.findIndex(track => track.id === trackId);
            if (trackIndex !== -1) {
                musicLibrary.splice(trackIndex, 1);
                renderTrackList();
                if (musicLibrary.length > 0) {
                    loadTrack(Math.min(currentTrackIndex, musicLibrary.length - 1));
                }
            }
        }
    }

    // Supprimer une vidéo
    function deleteVideo(videoId) {
        if (confirm('Вы уверены, что хотите удалить это видео?')) {
            const videoIndex = videoLibrary.findIndex(video => video.id === videoId);
            if (videoIndex !== -1) {
                videoLibrary.splice(videoIndex, 1);
                renderVideos();
            }
        }
    }

    // Supprimer un chant de service
    function deleteServiceSong(songId) {
        if (confirm('Вы уверены, что хотите удалить эту песню служения?')) {
            const songIndex = serviceSongs.findIndex(song => song.id === songId);
            if (songIndex !== -1) {
                serviceSongs.splice(songIndex, 1);
                renderServiceSongs();
                if (serviceSongs.length > 0) {
                    loadServiceSong(Math.min(currentServiceSongIndex, serviceSongs.length - 1));
                }
            }
        }
    }

    // Jouer la piste
    function playTrack() {
        if (musicLibrary.length === 0) return;
        
        isPlaying = true;
        playIcon.className = 'fas fa-pause';
        
        let currentTime = 0;
        const duration = musicLibrary[currentTrackIndex].duration;
        
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (currentTime >= duration) {
                clearInterval(progressInterval);
                nextTrack();
                return;
            }
            
            currentTime++;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
        }, 1000);
    }

    // Mettre en pause
    function pauseTrack() {
        isPlaying = false;
        playIcon.className = 'fas fa-play';
        clearInterval(progressInterval);
    }

    // Basculer lecture/pause
    function togglePlay() {
        if (musicLibrary.length === 0) return;
        
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    // Piste précédente
    function prevTrack() {
        if (musicLibrary.length === 0) return;
        
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = musicLibrary.length - 1;
        }
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Piste suivante
    function nextTrack() {
        if (musicLibrary.length === 0) return;
        
        currentTrackIndex++;
        if (currentTrackIndex >= musicLibrary.length) {
            currentTrackIndex = 0;
        }
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Définir la progression
    function setProgress(e) {
        if (musicLibrary.length === 0) return;
        
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = musicLibrary[currentTrackIndex].duration;
        
        const newTime = (clickX / width) * duration;
        currentTimeEl.textContent = formatTime(newTime);
        
        const progressPercent = (newTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }

    // Définir le volume
    function setVolume() {
        // Simulation de volume
        console.log('Volume set to:', volumeSlider.value);
    }

    // Formater le temps
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Ouvrir un modal
    function openModal(modal) {
        modal.classList.add('active');
    }

    // Fermer un modal
    function closeModal(modal) {
        modal.classList.remove('active');
        if (modal === musicModalOverlay) {
            addMusicForm.reset();
        } else if (modal === videoModalOverlay) {
            addVideoForm.reset();
        } else if (modal === serviceSongModalOverlay) {
            addServiceSongForm.reset();
        }
    }

    // Sauvegarder une nouvelle musique
    function saveMusic() {
        const title = document.getElementById('trackTitle').value;
        const artist = document.getElementById('trackArtist').value;
        const duration = parseInt(document.getElementById('trackDuration').value);
        
        if (!title || !artist || !duration) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        
        const newTrack = {
            id: musicLibrary.length > 0 ? Math.max(...musicLibrary.map(t => t.id)) + 1 : 1,
            title,
            artist,
            duration
        };
        
        musicLibrary.push(newTrack);
        renderTrackList();
        closeModal(musicModalOverlay);
    }

    // Sauvegarder une nouvelle vidéo
    function saveVideo() {
        const title = document.getElementById('videoTitle').value;
        const description = document.getElementById('videoDescription').value;
        const url = document.getElementById('videoUrl').value;
        
        if (!title || !url) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        
        const embedUrl = url.replace('watch?v=', 'embed/');
        
        const newVideo = {
            id: videoLibrary.length > 0 ? Math.max(...videoLibrary.map(v => v.id)) + 1 : 1,
            title,
            description,
            url: embedUrl
        };
        
        videoLibrary.push(newVideo);
        renderVideos();
        closeModal(videoModalOverlay);
    }

    // Sauvegarder un nouveau chant de service
    function saveServiceSong() {
        const title = document.getElementById('serviceSongTitle').value;
        const artist = document.getElementById('serviceSongArtist').value;
        const url = document.getElementById('serviceSongUrl').value;
        
        if (!title || !artist || !url) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        
        const embedUrl = url.replace('watch?v=', 'embed/');
        
        const newServiceSong = {
            id: serviceSongs.length > 0 ? Math.max(...serviceSongs.map(s => s.id)) + 1 : 1,
            title,
            artist,
            url: embedUrl
        };
        
        serviceSongs.push(newServiceSong);
        renderServiceSongs();
        closeModal(serviceSongModalOverlay);
    }

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, checking auth...');
        
        // Forcer l'affichage de l'écran de connexion au chargement
        showLoginScreen();
        
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        } else {
            console.error('Login form not found!');
        }
    });

    // Gestion des erreurs
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
    });
