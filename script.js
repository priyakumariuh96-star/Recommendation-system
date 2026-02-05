const movies = [
    { id: 1, title: "Interstellar", genre: ["Sci-Fi", "Drama"], rating: 8.7 },
    { id: 2, title: "The Dark Knight", genre: ["Action", "Crime"], rating: 9.0 },
    { id: 3, title: "Inception", genre: ["Sci-Fi", "Action"], rating: 8.8 },
    { id: 4, title: "The Godfather", genre: ["Crime", "Drama"], rating: 9.2 },
    { id: 5, title: "Pulp Fiction", genre: ["Crime", "Thriller"], rating: 8.9 },
    { id: 6, title: "The Matrix", genre: ["Sci-Fi", "Action"], rating: 8.7 },
    { id: 7, title: "Avatar", genre: ["Sci-Fi", "Adventure"], rating: 7.9 },
    { id: 8, title: "John Wick", genre: ["Action", "Thriller"], rating: 7.4 }
];

// Page Elements
const movieSelect = document.getElementById('movie-select');
const recommendBtn = document.getElementById('recommend-btn');
const movieGrid = document.getElementById('movie-grid');
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view-section');

// 1. Initialize Dropdown
movies.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.title;
    movieSelect.appendChild(opt);
});

// 2. Navigation Logic
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        
        // Update UI Tabs
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Switch Views
        views.forEach(v => v.style.display = 'none');
        document.getElementById(target).style.display = 'block';

        // Update Header Text
        document.getElementById('page-title').innerText = target === 'profile-view' ? 'Student Profile' : 'Personalized Recommendations';
    });
});

// 3. Recommendation Logic
recommendBtn.addEventListener('click', () => {
    const id = movieSelect.value;
    if (!id) return alert("Select a movie!");

    const selected = movies.find(m => m.id == id);
    const results = movies
        .filter(m => m.id != id)
        .map(m => {
            const matches = m.genre.filter(g => selected.genre.includes(g)).length;
            return { ...m, matchScore: Math.round((matches / selected.genre.length) * 100) };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 4);

    renderMovies(results);
});

function renderMovies(list) {
    movieGrid.innerHTML = '';
    list.forEach((m, i) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <div class="card-img"><i class="fas fa-film"></i></div>
            <div class="card-info">
                <span class="match-tag">${m.matchScore}% Match</span>
                <h3>${m.title}</h3>
                <p style="color:#fbbf24; margin-top:5px;">★ ${m.rating}</p>
            </div>
        `;
        movieGrid.appendChild(card);
    });
}