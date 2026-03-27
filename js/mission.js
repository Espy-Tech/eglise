    
        // Donation options selection
        document.querySelectorAll('.donation-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.donation-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                document.querySelector('.custom-amount').value = this.getAttribute('data-amount');
            });
        });

        // Custom amount input
        document.querySelector('.custom-amount').addEventListener('input', function() {
            if (this.value) {
                document.querySelectorAll('.donation-option').forEach(opt => {
                    opt.classList.remove('active');
                });
            }
        });

        // Show payment screen
        function showPaymentScreen() {
            const amount = document.querySelector('.custom-amount').value || 
                          document.querySelector('.donation-option.active').getAttribute('data-amount');
            
            document.getElementById('amountDisplay').textContent = amount;
            document.getElementById('paymentScreen').style.display = 'flex';
        }

        // Close payment screen
        function closePaymentScreen() {
            document.getElementById('paymentScreen').style.display = 'none';
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Toggle project details - FONCTION AJOUTÉE
        function toggleProjectDetails(button) {
            const projectCard = button.closest('.project-card');
            const details = projectCard.querySelector('.project-details');
            
            // Fermer tous les autres détails
            document.querySelectorAll('.project-details').forEach(detail => {
                if (detail !== details) {
                    detail.classList.remove('active');
                }
            });
            
            // Basculer l'état actuel
            details.classList.toggle('active');
        }

        // Fermer les détails en cliquant à l'extérieur
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.project-card') && !event.target.classList.contains('project-status')) {
                document.querySelectorAll('.project-details').forEach(detail => {
                    detail.classList.remove('active');
                });
            }
        });
    