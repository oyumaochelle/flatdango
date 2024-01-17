let moviesInfo = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            moviesInfo = data;
            displayMovieList(moviesInfo);
            displayMovieDetails(moviesInfo[0]);
        });
});

function displayMovieList(movies) {
    const flms = document.getElementById('films');
    flms.innerHTML = '';
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.addEventListener('click', () => displayMovieDetails(movie));
        flms.appendChild(li);
    });
}

function displayMovieDetails(movie) {
    const movieReels = document.getElementById('movieDetails');
    const availableTickets = movie.capacity - movie.tickets_sold;
    const buyButton = document.getElementById('buyButton');
    const soldOutMessage = document.getElementById('soldOutMessage');

    movieReels.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title}">
        <p>${movie.description}</p>
        <p>Runtime: ${movie.runtime} minutes</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: ${availableTickets}</p>
    `;

    movieReels.appendChild(buyButton);
    movieReels.appendChild(soldOutMessage);

    if (availableTickets > 0) {
        buyButton.disabled = false;
    } else {
        buyButton.disabled = true;
    }
}

function buyTicket(movie) {
    if ((movie.capacity - movie.tickets_sold) > 0) {
        movie.tickets_sold++;
        displayMovieDetails(movie);
    }
}