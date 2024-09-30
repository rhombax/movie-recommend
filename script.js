// script.js

// Initialize runtime slider
const runtimeSlider = document.getElementById('runtimeSlider');
noUiSlider.create(runtimeSlider, {
  start: [60, 240],
  connect: true,
  range: {
    'min': 60,
    'max': 240
  },
  step: 1
});

runtimeSlider.noUiSlider.on('update', function(values, handle) {
  document.getElementById('runtimeValueMin').textContent = Math.round(values[0]);
  document.getElementById('runtimeValueMax').textContent = Math.round(values[1]);
});

// Initialize year slider
const yearSlider = document.getElementById('yearSlider');
noUiSlider.create(yearSlider, {
  start: [1900, 2023],
  connect: true,
  range: {
    'min': 1900,
    'max': 2023
  },
  step: 1
});

yearSlider.noUiSlider.on('update', function(values, handle) {
  document.getElementById('yearValueMin').textContent = Math.round(values[0]);
  document.getElementById('yearValueMax').textContent = Math.round(values[1]);
});

async function getRecommendations() {
  const runtimeValues = runtimeSlider.noUiSlider.get();
  const yearValues = yearSlider.noUiSlider.get();

  const runtimeMin = Math.round(runtimeValues[0]);
  const runtimeMax = Math.round(runtimeValues[1]);
  const yearMin = Math.round(yearValues[0]);
  const yearMax = Math.round(yearValues[1]);
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
