// script.js

async function getRecommendations() {
  const runtime = document.getElementById('runtime').value;
  const year = document.getElementById('year').value;
  const genre = document.getElementById('genre').value;

  const apiKey = '89b4c2ba13a0aade50098290bd5bf588'; // Your TMDb API key
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=89b4c2ba13a0aade50098290bd5bf588&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&with_genres=${genre}&with_runtime.lte=${runtime}`;

  const response = await fetch(apiUrl);
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

// Update displayed runtime value
function updateRuntimeValue() {
  const runtime = document.getElementById('runtime').value;
  document.getElementById('runtimeValue').textContent = runtime;
}

// Update displayed year value
function updateYearValue() {
  const year = document.getElementById('year').value;
  document.getElementById('yearValue').textContent = year;
}

// Initial call to display default slider values
window.onload = function() {
  updateRuntimeValue();
  updateYearValue();
};
