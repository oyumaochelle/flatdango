let films = [];
// a function that fetches the movie details from the local server
function fetchfilms(){
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data =>{
            films = data;
            displayFilms(films);
        })
}
// a function that displays the fetched data from the local server conatining films
function displayFilms(films){
    const movies = document.getElementById("movies");
    films.forEach(film => {
        const listItem = document.createElement("li");
        listItem.textContent = film.name;
        movies.appendChild(listItem);
    })
}
// a function that details out the features of each movie from the above listing
function displayFilmDetails(filmId){
    fetch (`http://localhost:3000/films/${filmId}`)
        .then(response => response.json())
        .then(film => {
            const container = document.getElementById("movie-details");
            container.innerHTML =`
                <label for ="title">Title</label>
                <input type="text" id="title" title="title" value="${film.title}">
                <label for ="runtime">Runtime</label>
                <input type="number" id="runtime" name="runtime" value="${film.runtime}">
                <label for ="capacity">Capacity</label>
                <input type="number" id="capacity" title="capacity" value="${film.capacity}">
                <label for ="showtime">Showtime</label>
                <input type="time" id="showtime" title="showtime" value="${film.showtime}">
                <label for ="ticket_sold">Ticket-sold</label>
                <input type="number" id="ticket_sold" title="ticket_sold" value="${film.ticket_sold}">
                <label for ="description">Description</label>
                <input type="text" id="description" title="description" value="${film.description}">
                <label for ="poster">POster</label>
                <img src="${film.poster}" alt="${film.title}" id="poster">
            `;
        })
};
fetchfilms();
