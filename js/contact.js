  
        function openMap(address) {
            // Encode the address for URL safety
            const encodedAddress = encodeURIComponent(address);
            // Open in Yandex Maps (popular in Russia) or Google Maps as fallback
            const yandexUrl = `https://yandex.ru/maps/?text=${encodedAddress}`;
            const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            
            // Try to open Yandex Maps first, fallback to Google Maps
            window.open(yandexUrl, '_blank');
        }
        
        document.getElementById('showMoreButton').addEventListener('click', function() {
            const additionalLocations = document.getElementById('additionalLocations');
            const showMoreButton = document.getElementById('showMoreButton');
            
            if (additionalLocations.style.display === 'none') {
                additionalLocations.style.display = 'block';
                showMoreButton.textContent = 'Скрыть';
            } else {
                additionalLocations.style.display = 'none';
                showMoreButton.textContent = 'Показать ещё';
            }
        });
        
        // View buttons functionality
        document.getElementById('listView').addEventListener('click', function() {
            this.classList.add('active');
            document.getElementById('mapView').classList.remove('active');
        });
        
        document.getElementById('mapView').addEventListener('click', function() {
            this.classList.add('active');
            document.getElementById('listView').classList.remove('active');
            
            // When "На карте" is clicked, redirect to Yandex Maps with the Krasnodar address
            const krasnodarAddress = 'Краснодар, Московская улица 65а';
            const encodedAddress = encodeURIComponent(krasnodarAddress);
            const yandexUrl = `https://yandex.ru/maps/?text=${encodedAddress}`;
            window.open(yandexUrl, '_blank');
        });
    