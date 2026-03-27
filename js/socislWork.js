    
        // Toggle service card content
        document.querySelectorAll('.toggle-btn').forEach(button => {
            button.addEventListener('click', function() {
                const serviceCard = this.closest('.service-card');
                const content = serviceCard.querySelector('.service-content');
                
                if (this.textContent === '−') {
                    this.textContent = '+';
                    content.style.display = 'none';
                } else {
                    this.textContent = '−';
                    content.style.display = 'block';
                }
            });
        });
        
        // Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.accordion-item');
                const content = accordionItem.querySelector('.accordion-content');
                const icon = this.querySelector('.accordion-icon');
                
                // Close all other items
                document.querySelectorAll('.accordion-item').forEach(item => {
                    if (item !== accordionItem) {
                        item.querySelector('.accordion-content').classList.remove('active');
                        item.querySelector('.accordion-icon').textContent = '+';
                    }
                });
                
                // Toggle current item
                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                    icon.textContent = '+';
                } else {
                    content.classList.add('active');
                    icon.textContent = '−';
                }
            });
        });
    