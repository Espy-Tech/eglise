// Navigation active state
    const links = document.querySelectorAll('.admin-nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Helpers for localStorage
    function loadArray(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.warn('Erreur de lecture localStorage pour', key, e);
            return [];
        }
    }

    function formatDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        const hh = String(d.getHours()).padStart(2, '0');
        const mi = String(d.getMinutes()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
    }

    // Render donations
    function renderDonations() {
        const tbody = document.getElementById('donationsTableBody');
        if (!tbody) return;

        const donations = loadArray('church_admin_donations');
        tbody.innerHTML = '';

        if (donations.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4">Aucun don enregistré dans ce navigateur pour le moment.</td>`;
            tbody.appendChild(row);
            return;
        }

        donations.slice(0, 20).forEach(d => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatDate(d.createdAt)}</td>
                <td>${d.purpose || ''}</td>
                <td>${d.amount ? d.amount + ' ₽' : ''}</td>
                <td>${d.citizenship || ''}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Render registrations (praNaN</button>
                    <button class="btn-icon"><i class="fas fa-external-link-alt"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Afficher déjà ce qui est en mémoire
    renderExtraPages();
    renderExtraEvents();
    renderExtraTeam();

    // Bouton "Ajouter une page"
    const addPageBtn = document.querySelector('#pages .admin-section-header .btn-secondary');
    if (addPageBtn) {
        addPageBtn.addEventListener('click', () => {
            const name = prompt('Nom de la page (par ex. "Jeunesse") :');
            if (!name) return;
            const url = prompt('URL du fichier (par ex. "Youth.html") :', name.toLowerCase().replace(/\s+/g, '-') + '.html');
            if (!url) return;

            const page = {
                name,
                url,
                status: 'Publiée',
                updatedAt: new Date().toISOString()
            };
            pushToStorageGeneric('church_admin_pages', page);

            // Mettre à jour l'affichage
            renderExtraPages();
        });
    }

    // Bouton "Ajouter un événement"
    const addEventBtn = document.querySelector('#events .admin-section-header .btn-secondary');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            const title = prompt('Titre de l'événement :');
            if (!title) return;
            const page = prompt('Page liée (par ex. "conferences.html") :', 'conferences.html') || '';

            const ev = {
                title,
                page,
                createdAt: new Date().toISOString()
            };
            pushToStorageGeneric('church_admin_events', ev);
            renderExtraEvents();
        });
    }

    // Bouton "Ajouter un serviteur"
    const addTeamBtn = document.querySelector('#team .admin-section-header .btn-secondary');
    if (addTeamBtn) {
        addTeamBtn.addEventListener('click', () => {
            const name = prompt('Nom du serviteur :');
            if (!name) return;
            const role = prompt('Rôle (par ex. "Responsable jeunesse") :') || '';
            const page = prompt('Page liée (par ex. "homeService.html") :', '') || '';

            const member = {
                name,
                role,
                page,
                createdAt: new Date().toISOString()
            };
            pushToStorageGeneric('church_admin_team', member);
            renderExtraTeam();
        });
    }


});
=======
document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state
    const links = document.querySelectorAll('.admin-sidebar-menu li');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = link.getAttribute('data-section');
            if (section) {
                e.preventDefault();
                showSection(section);
            }
        });
    });

    // Show section function
    function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.admin-section');
        sections.forEach(section => section.classList.remove('active'));

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active link
        links.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Load data on page load
    loadDashboardStats();
    loadVideos();
    loadEvents();
    loadPrayers();
    loadSubscriptions();

    // Video modal
    const videoModal = document.getElementById('videoModal');
    const addVideoBtn = document.getElementById('addVideoBtn');
    const cancelVideoBtn = document.getElementById('cancelVideoBtn');
    const videoForm = document.getElementById('videoForm');

    if (addVideoBtn) {
        addVideoBtn.addEventListener('click', () => {
            document.getElementById('videoModalTitle').textContent = 'Ajouter une vidéo';
            videoForm.reset();
            videoModal.style.display = 'block';
        });
    }

    if (cancelVideoBtn) {
        cancelVideoBtn.addEventListener('click', () => {
            videoModal.style.display = 'none';
        });
    }

    // Event modal
    const eventModal = document.getElementById('eventModal');
    const addEventBtn = document.getElementById('addEventBtn');
    const cancelEventBtn = document.getElementById('cancelEventBtn');
    const eventForm = document.getElementById('eventForm');

    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            document.getElementById('eventModalTitle').textContent = 'Ajouter un événement';
            eventForm.reset();
            eventModal.style.display = 'block';
        });
    }

    if (cancelEventBtn) {
        cancelEventBtn.addEventListener('click', () => {
            eventModal.style.display = 'none';
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
        }
        if (e.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });

    // Video form submission
    if (videoForm) {
        videoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(videoForm);

            try {
                const response = await fetch('../backend/save_video.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin' // Include session cookies
                });

                const result = await response.json();
                if (result.success) {
                    videoModal.style.display = 'none';
                    loadVideos();
                    loadDashboardStats();
                } else {
                    alert('Erreur: ' + result.error);
                }
            } catch (error) {
                alert('Erreur de connexion: ' + error.message);
            }
        });
    }

    // Event form submission
    if (eventForm) {
        eventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(eventForm);

            try {
                const response = await fetch('../backend/save_event.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                if (result.success) {
                    eventModal.style.display = 'none';
                    loadEvents();
                    loadDashboardStats();
                } else {
                    alert('Erreur: ' + result.error);
                }
            } catch (error) {
                alert('Erreur de connexion');
            }
        });
    }

    // Load functions
    async function loadDashboardStats() {
        try {
            const [videosRes, eventsRes, prayersRes, subsRes] = await Promise.all([
                fetch('../backend/get_videos.php'),
                fetch('../backend/get_events.php'),
                fetch('../backend/get_prayers.php'),
                fetch('../backend/get_subscriptions.php')
            ]);

            const videos = await videosRes.json();
            const events = await eventsRes.json();
            const prayers = await prayersRes.json();
            const subs = await subsRes.json();

            document.getElementById('videosCount').textContent = videos.length;
            document.getElementById('eventsCount').textContent = events.length;
            document.getElementById('prayersCount').textContent = prayers.length;
            document.getElementById('subscriptionsCount').textContent = subs.length;
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async function loadVideos() {
        try {
            const response = await fetch('../backend/get_videos.php');
            const videos = await response.json();
            const tbody = document.getElementById('videosTableBody');
            tbody.innerHTML = '';

            videos.forEach(video => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${video.title}</td>
                    <td>${video.description || ''}</td>
                    <td><a href="${video.url}" target="_blank">${video.url}</a></td>
                    <td>${new Date(video.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-icon" onclick="deleteVideo(${video.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error loading videos:', error);
        }
    }

    async function loadEvents() {
        try {
            const response = await fetch('../backend/get_events.php');
            const events = await response.json();
            const tbody = document.getElementById('eventsTableBody');
            tbody.innerHTML = '';

            events.forEach(event => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${event.title}</td>
                    <td>${event.location}</td>
                    <td>${new Date(event.date).toLocaleDateString()}</td>
                    <td>${event.time}</td>
                    <td>
                        <button class="btn-icon" onclick="deleteEvent(${event.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }

    async function loadPrayers() {
        try {
            const response = await fetch('../backend/get_prayers.php');
            const prayers = await response.json();
            const tbody = document.getElementById('prayersTableBody');
            tbody.innerHTML = '';

            prayers.forEach(prayer => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${prayer.name}</td>
                    <td>${prayer.email}</td>
                    <td>${prayer.message}</td>
                    <td>${new Date(prayer.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-icon" onclick="deletePrayer(${prayer.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error loading prayers:', error);
        }
    }

    async function loadSubscriptions() {
        try {
            const response = await fetch('../backend/get_subscriptions.php');
            const subs = await response.json();
            const tbody = document.getElementById('subscriptionsTableBody');
            tbody.innerHTML = '';

            subs.forEach(sub => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${sub.email}</td>
                    <td>${new Date(sub.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-icon" onclick="deleteSubscription(${sub.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error loading subscriptions:', error);
        }
    }

    // Global functions for delete buttons
    window.deleteVideo = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
            try {
                const response = await fetch(`../backend/delete_video.php?id=${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    loadVideos();
                    loadDashboardStats();
                }
            } catch (error) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    window.deleteEvent = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            try {
                const response = await fetch(`../backend/delete_event.php?id=${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    loadEvents();
                    loadDashboardStats();
                }
            } catch (error) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    window.deletePrayer = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette demande de prière ?')) {
            try {
                const response = await fetch(`../backend/delete_prayer.php?id=${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    loadPrayers();
                    loadDashboardStats();
                }
            } catch (error) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    window.deleteSubscription = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet abonnement ?')) {
            try {
                const response = await fetch(`../backend/delete_subscription.php?id=${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    loadSubscriptions();
                    loadDashboardStats();
                }
            } catch (error) {
                alert('Erreur lors de la suppression');
            }
        }
    };
});
