    
        // Service details modal functionality
        const serviceModal = document.getElementById('serviceModal');
        const modalClose = document.getElementById('modalClose');
        const modalButton = document.getElementById('modalButton');
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalDescription = document.getElementById('modalDescription');
        const modalLocation = document.getElementById('modalLocation');
        const modalTime = document.getElementById('modalTime');
        
        function showServiceDetails(serviceType) {
            let title, description, location, time, imageUrl;
            
            switch(serviceType) {
                case 'armenian':
                    title = "Армянское богослужение";
                    description = "У нас есть прекрасная возможность для армянской общины собираться вместе и славить Бога на родном языке.";
                    location = "метро Алексеевская, ул. Павла Корчагина 2А";
                    time = "по воскресеньям в 14:00";
                    imageUrl = "https://placehold.co/800x400/1a3a5f/ffffff?text=Армянское+богослужение";
                    break;
                case 'spanish':
                    title = "Испанское богослужение";
                    description = "Somos una iglesia, un lugar para todos, y todos son bienvenidos a nuestros cultos. Aquí te sentirás como en casa.";
                    location = "metro Volgogradskiy Prospekt, Sosinskaya 43c8";
                    time = "los domingos a las 13:40";
                    imageUrl = "https://placehold.co/800x400/1a3a5f/ffffff?text=Испанское+богослужение";
                    break;
                case 'vietnamese':
                    title = "Вьетнамское богослужение";
                    description = "Chúng tôi - Hội Thánh là nơi dành cho mọi người và sẽ vui đón mỗi người ở các buổi nhóm thờ phượng Chúa.";
                    location = "метро Алексеевская, ул. Павла Корчагина 2А";
                    time = "chủ nhật 18:30, vào hàng tuần";
                    imageUrl = "https://placehold.co/800x400/1a3a5f/ffffff?text=Вьетнамское+богослужение";
                    break;
                default:
                    return;
            }
            
            // Update modal content
            modalTitle.textContent = title;
            modalImage.src = imageUrl;
            modalImage.alt = title;
            modalDescription.textContent = description;
            modalLocation.innerHTML = `<strong>Место:</strong> ${location}`;
            modalTime.innerHTML = `<strong>Время:</strong> ${time}`;
            
            // Show modal
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        modalClose.addEventListener('click', closeModal);
        modalButton.addEventListener('click', closeModal);
        
        // Close modal when clicking outside
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
                closeModal();
            }
        });
        
        function openEmail() {
            window.location.href = 'mailto:palabradevidamoscu@gmail.com';
        }
        
        // Make the email link work properly
        document.getElementById('emailLink').addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Animation on scroll
        function checkScroll() {
            const elements = document.querySelectorAll('.service-card, .contact-section');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.animationPlayState = 'running';
                }
            });
        }
        
        // Initial check and event listener
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
    