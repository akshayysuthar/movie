// Initialize Firestore
const firestore = firebase.firestore();

// Get the search input field and button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Listen for click on search button
searchButton.addEventListener("click", function () {
  // Get the search input value
  const searchValue = searchInput.value;

  // Get the collection you want to search
  const collection = firestore.collection("movies");

  // Search for documents where the "name" field equals the search value
  collection
    .where("name", "==", searchValue)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // Display the results on the webpage
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML += "<p>" + doc.data().name + "</p>";
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});
