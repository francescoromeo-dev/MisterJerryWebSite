        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scrolling per i link di navigazione
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

        // Filtri funzionali
        const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
        const productCards = document.querySelectorAll('.product-card');
        const resultsCount = document.getElementById('count');
        const noResults = document.getElementById('no-results');
        const productsGrid = document.getElementById('products-grid');
        const clearFiltersBtn = document.querySelector('.clear-filters');
        const sortSelect = document.querySelector('.sort-select');

        // Funzione per filtrare i prodotti
        function filterProducts() {
            const selectedCategories = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
                .map(cb => cb.value);
            
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const season = card.getAttribute('data-season');
                
                let shouldShow = true;
                
                if (selectedCategories.length > 0) {
                    const categoryMatch = selectedCategories.some(selected => 
                        selected === category || selected === season
                    );
                    shouldShow = categoryMatch;
                }
                
                if (shouldShow) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Aggiorna contatore
            resultsCount.textContent = visibleCount;
            
            // Mostra/nascondi messaggio "nessun risultato"
            if (visibleCount === 0) {
                noResults.classList.remove('hidden');
                productsGrid.style.display = 'none';
            } else {
                noResults.classList.add('hidden');
                productsGrid.style.display = 'grid';
            }
        }

        // Funzione per ordinare i prodotti
        function sortProducts(sortBy) {
            const grid = document.getElementById('products-grid');
            const cards = Array.from(grid.querySelectorAll('.product-card:not(.hidden)'));
            
            cards.sort((a, b) => {
                switch(sortBy) {
                    case 'name':
                        const titleA = a.querySelector('.product-title').textContent;
                        const titleB = b.querySelector('.product-title').textContent;
                        return titleA.localeCompare(titleB);
                    
                    case 'category':
                        const categoryA = a.getAttribute('data-category');
                        const categoryB = b.getAttribute('data-category');
                        return categoryA.localeCompare(categoryB);
                    
                    case 'season':
                        const seasonA = a.getAttribute('data-season');
                        const seasonB = b.getAttribute('data-season');
                        return seasonA.localeCompare(seasonB);
                    
                    default:
                        return 0;
                }
            });
            
            // Rimuovi tutti i prodotti dalla griglia
            cards.forEach(card => card.remove());
            
            // Riapplica i prodotti ordinati
            cards.forEach(card => grid.appendChild(card));
        }

        // Event listeners per i filtri
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterProducts);
        });

        // Event listener per il pulsante "Cancella Filtri"
        clearFiltersBtn.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            filterProducts();
            sortSelect.value = 'default';
        });

        // Event listener per l'ordinamento
        sortSelect.addEventListener('change', function() {
            if (this.value !== 'default') {
                sortProducts(this.value);
            }
        });

        // Animazione di entrata per le card
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, observerOptions);

        productCards.forEach(card => {
            observer.observe(card);
        });

        // Inizializza il contatore
        resultsCount.textContent = productCards.length;