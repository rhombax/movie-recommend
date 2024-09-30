// script.js

function updateRuntimeRange() {
  const runtimeMinSlider = document.getElementById('runtimeMinSlider');
  const runtimeMaxSlider = document.getElementById('runtimeMaxSlider');
  const runtimeMin = Number(runtimeMinSlider.value);
  const runtimeMax = Number(runtimeMaxSlider.value);

  // Prevent the sliders from crossing
  if (runtimeMin > runtimeMax - 1) {
    if (runtimeMinSlider === document.activeElement) {
      runtimeMaxSlider.value = runtimeMin + 1;
    } else {
      runtimeMinSlider.value = runtimeMax - 1;
    }
  }

  document.getElementById('runtimeValueMin').textContent = runtimeMinSlider.value;
  document.getElementById('runtimeValueMax').textContent = runtimeMaxSlider.value;
}

function updateYearRange() {
  const yearMinSlider = document.getElementById('yearMinSlider');
  const yearMaxSlider = document.getElementById('yearMaxSlider');
  const yearMin = Number(yearMinSlider.value);
  const yearMax = Number(yearMaxSlider.value);

  // Prevent the sliders from crossing
  if (yearMin > yearMax - 1) {
    if (yearMinSlider === document.activeElement) {
      yearMaxSlider.value = yearMin + 1;
    } else {
      yearMinSlider.value = yearMax - 1;
    }
  }

  document.getElementById('yearValueMin').textContent = yearMinSlider.value;
  document.getElementById('yearValueMax').textContent = yearMaxSlider.value;
}

async function getRecommendations() {
  const runtimeMin = document.getElementById('runtimeMinSlider').value;
  const runtimeMax = document.getElementById('runtimeMaxSlider').value;
  const yearMin = document.getElementById('yearMinSlider').value;
  const yearMax = document.getElementById('yearMaxSlider').value;
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
  updateRuntimeRange();
  updateYearRange();
};
