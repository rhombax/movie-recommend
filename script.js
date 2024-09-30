// script.js

// Update displayed runtime values
function updateRuntimeValue() {
  const runtimeMin = document.getElementById('runtimeMin').value;
  const runtimeMax = document.getElementById('runtimeMax').value;
  document.getElementById('runtimeValueMin').textContent = runtimeMin;
  document.getElementById('runtimeValueMax').textContent = runtimeMax;
}

// Update displayed year values
function updateYearValue() {
  const yearMin = document.getElementById('yearMin').value;
  const yearMax = document.getElementById('yearMax').value;
  document.getElementById('yearValueMin').textContent = yearMin;
  document.getElementById('yearValueMax').textContent = yearMax;
}

async function getRecommendations() {
  const runtimeMin = document.getElementById('runtimeMin').value;
  const runtimeMax = document.getElementById('runtimeMax').value;
  const yearMin = document.getElementById('yearMin').value;
  const yearMax = document.getElementById('yearMax').value;
  const genre = document.getElementById('genre').value;

  const apiKey = '89b4c2ba13a0aade50098290bd5bf588'; // Your TMDb API key
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31&with_genres=${genre}&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}`;

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

// Initial call to display default slider values
window.onload = function() {
  updateRuntimeValue();
  updateYearValue();
};
