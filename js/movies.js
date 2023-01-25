var movieContainer = document.getElementById("movie-container");
var pagination = document.getElementById("pagination");
var db = firebase.firestore();

// Initialize variables for pagination
var currentPage = 1;
var moviesPerPage = 10;
var moviesPerRow = 5;

// Function to display movies
function displayMovies() {
  var startIndex = (currentPage - 1) * moviesPerPage;
  var endIndex = startIndex + moviesPerPage;

  // Get all movies from the database
  db.collection("movies")
    .get()
    .then(function (querySnapshot) {
      var movies = [];
      querySnapshot.forEach(function (doc) {
        movies.push(doc.data());
      });

      // Clear the movie container
      movieContainer.innerHTML = "";

      // Create a new row
      var movieRow = document.createElement("div");
      movieRow.classList.add("movie-row");
      movieContainer.appendChild(movieRow);

      // Loop through the movies and display them
      for (var i = startIndex; i < endIndex; i++) {
        if (movies[i]) {
          // create div for each movie
          var movieDiv = document.createElement("div");
          movieDiv.classList.add("movie-col");
        //   movieDiv.onclick.add('openMoviePage("${doc.id}')');

          // add movie poster
          var moviePoster = document.createElement("img");
          moviePoster.src =
            "https://image.tmdb.org/t/p/w185" + movies[i].poster;
          movieDiv.appendChild(moviePoster);

          // add movie title
          var movieTitle = document.createElement("h3");
          movieTitle.innerHTML = movies[i].title;
          movieDiv.appendChild(movieTitle);

          // add movie div to container
          movieRow.appendChild(movieDiv);

          // Check if the current row has reached the maximum number of movies per row
          if (movieRow.childElementCount === moviesPerRow) {
            // Create a new row
            movieRow = document.createElement("div");
            movieRow.classList.add("movie-row");
            movieContainer.appendChild(movieRow);
          }
        }
      }

      // Display pagination
      pagination.innerHTML = "";
      for (var i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
        var pageButton = document.createElement("button");
        pageButton.innerHTML = i;
        pageButton.classList.add("page-button");
        if (currentPage == i) {
          pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", function () {
          currentPage = parseInt(this.innerHTML);
          displayMovies();
        });
        pagination.appendChild(pageButton);
      }
    });
}

displayMovies();

function openMoviePage(movieId) {
    // redirect to movie page
    window.location.href = `movie.html?id=${movieId}`;
}
