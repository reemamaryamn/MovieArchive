// Function to load movies from JSON file
async function loadMovies(jsonFile, containerId) {
    try {
        const response = await fetch(jsonFile);
        const movies = await response.json();
        const container = document.getElementById(containerId);
        
        // Create movie cards
        movies.forEach((movie, index) => {
            const movieCard = createMovieCard(movie, index);
            container.appendChild(movieCard);
        });
        
        // Initialize scroll observer
        observeMovieCards();
        
    } catch (error) {
        console.error('Error loading movies:', error);
        document.getElementById(containerId).innerHTML = '<p style="color: #D4AF37; text-align: center; padding: 4rem; font-size: 1.5rem;">Error loading movies. Please check that the JSON file exists.</p>';
    }
}

// Function to create a movie card element
function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
        <div class="movie-content">
            <!-- Left Side: Movie Info -->
            <div class="movie-info">
                <div class="rating">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="rating-value">${movie.imdbRating}/10</span>
                </div>
                
                <h2>${movie.title}</h2>
                <p class="movie-year">${movie.year || '2025'}</p>
                
                <div class="genres">
                    ${movie.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
                </div>
                
                <p class="movie-review">${movie.review}</p>
            </div>
            
            <!-- Right Side: Movie Poster -->
            <div class="movie-poster">
                <div class="poster-wrapper">
                    <img src="${movie.image}" alt="${movie.title}" onerror="this.src='https://placehold.co/400x600/4A0E0E/F5E6D3?text=${encodeURIComponent(movie.title)}'">
                    <div class="poster-overlay"></div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Function to observe movie cards for scroll animations
function observeMovieCards() {
    const cards = document.querySelectorAll('.movie-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of card is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}