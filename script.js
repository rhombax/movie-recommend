// script.js
async function getRecommendations() {
  const runtime = document.getElementById('runtime').value;
  const year = document.getElementById('year').value;
  const genre = document.getElementById('genre').value;

  // Example API call to TMDb (replace 'YOUR_API_KEY' with a real key)
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_runtime.lte=${runtime}&primary_release_year=${year}&with_genres=${genre}`);
  const data = await response.json();
  
  displayRecommendations(data.results);
}

function displayRecommendations(movies) {
  const recommendationsDiv = document.getElementById('recommendations');
  recommendationsDiv.innerHTML = '';
  
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `<h3>${movie.title}</h3><p>${movie.overview}</p>`;
    recommendationsDiv.appendChild(movieElement);
  });
}
