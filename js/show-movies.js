// get all movies from firestore
db.collection("movies")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var movie = doc.data();
      // display movie in homepage
      document.getElementById("movie-container").innerHTML += `
                
                <span class=" pl-5 text-center movie-info">
                    <div>
                        <img width="200" src="https://image.tmdb.org/t/p/w185${
                          movie.poster
                        }" onclick="openMoviePage('${
        doc.id
      }')"  class="movie-poster row shadow bg-body-tertiary rounded" alt="${
        doc.data().title
      }">
                        <div class="movie-details">
                            <h4 class="poster">${doc.data().title}</h4>
                        </div>
                    </div>
                </span>
        `;
    });
  });
