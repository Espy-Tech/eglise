   
        // Gallery slider functionality
        const gallerySlider = document.getElementById('gallerySlider');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotIndicators = document.getElementById('dotIndicators');
        const showMorePhotosBtn = document.getElementById('showMorePhotos');
        const telegramButton = document.getElementById('telegramButton');
        
        let currentIndex = 0;
        const totalSlides = gallerySlider.children.length;
        
        // Initialize dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => goToSlide(i));
            dotIndicators.appendChild(dot);
        }
        
        // Update active dot
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentIndex = index;
            gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        // Auto-play (optional)
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Show more photos button
        showMorePhotosBtn.addEventListener('click', () => {
            // Create a modal or expand the gallery
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            modal.style.padding = '20px';
            modal.style.boxSizing = 'border-box';
            
            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = 'white';
            modalContent.style.borderRadius = '10px';
            modalContent.style.padding = '20px';
            modalContent.style.maxWidth = '90%';
            modalContent.style.maxHeight = '90%';
            modalContent.style.overflowY = 'auto';
            modalContent.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            
            const modalTitle = document.createElement('h2');
            modalTitle.textContent = 'Фотографии для детей';
            modalTitle.style.marginBottom = '20px';
            modalTitle.style.color = '#333';
            modalTitle.style.textAlign = 'center';
            
            const photoGrid = document.createElement('div');
            photoGrid.style.display = 'grid';
            photoGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            photoGrid.style.gap = '15px';
            photoGrid.style.marginTop = '20px';
            
            // Add more photos to the modal
            const morePhotos = [
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+1',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+2',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+3',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+4',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+5',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+6',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+7',
                'https://placehold.co/300x200/1a1a2e/ffffff?text=Дети+играют+8'
            ];
            
            morePhotos.forEach(photoUrl => {
                const photoItem = document.createElement('div');
                photoItem.style.borderRadius = '8px';
                photoItem.style.overflow = 'hidden';
                photoItem.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                photoItem.style.cursor = 'pointer';
                
                const img = document.createElement('img');
                img.src = photoUrl;
                img.alt = 'Фотография для детей';
                img.style.width = '100%';
                img.style.height = '200px';
                img.style.objectFit = 'cover';
                img.style.transition = 'transform 0.3s';
                
                photoItem.appendChild(img);
                
                photoItem.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.05)';
                });
                
                photoItem.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });
                
                photoGrid.appendChild(photoItem);
            });
            
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Закрыть';
            closeButton.style.marginTop = '20px';
            closeButton.style.padding = '10px 20px';
            closeButton.style.backgroundColor = '#ffcc00';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '5px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.transition = 'background-color 0.3s';
            
            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.backgroundColor = '#ffbb00';
            });
            
            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.backgroundColor = '#ffcc00';
            });
            
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(photoGrid);
            modalContent.appendChild(closeButton);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        });
        
        // Telegram button functionality
        telegramButton.addEventListener('click', () => {
            const phoneNumber = '+79964755983';
            const telegramUrl = `https://t.me/${phoneNumber.replace('+', '')}`;
            
            // Try to open in Telegram app first
            window.open(`tg://resolve?phone=${phoneNumber}`, '_blank');
            
            // Fallback to web version after a short delay
            setTimeout(() => {
                window.open(telegramUrl, '_blank');
            }, 1000);
        });
        
        // Event toggle function
        function toggleEvent(element) {
            const content = element.querySelector('.event-content');
            const icon = element.querySelector('.toggle-icon');
            
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                icon.textContent = '—';
            } else {
                content.classList.add('show');
                icon.textContent = '+';
            }
        }
        
        // Accordion toggle function
        function toggleAccordion(element) {
            const content = element.querySelector('.accordion-content');
            const icon = element.querySelector('.plus-icon');
            
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                icon.textContent = '+';
            } else {
                content.classList.add('show');
                icon.textContent = '−';
            }
        }
    