// script.js

function updateDualRange(slider1, slider2, displayMin, displayMax) {
  const min = Math.min(slider1.value, slider2.value);
  const max = Math.max(slider1.value, slider2.value);
  displayMin.textContent = min;
  displayMax.textContent = max;

  // Prevent sliders from crossing over each other
  if (slider1.value > slider2.value) {
    slider1.value = max;
    slider2.value = min;
  }
}

// Initialize runtime slider
const runtimeSlider1 = document.getElementById('runtimeSlider1');
const runtimeSlider2 = document.getElementById('runtimeSlider2');
const runtimeValueMin = document.getElementById('runtimeValueMin');
const runtimeValueMax = document.getElementById('runtimeValueMax');
runtimeSlider1.addEventListener('input', function() {
  updateDualRange(runtimeSlider1, runtimeSlider2, runtimeValueMin, runtimeValueMax);
});
runtimeSlider2.addEventListener('input', function() {
  updateDualRange(runtimeSlider1, runtimeSlider2, runtimeValueMin, runtimeValueMax);
});

// Initialize year slider
const yearSlider1 = document.getElementById('yearSlider1');
const yearSlider2 = document.getElementById('yearSlider2');
const yearValueMin = document.getElementById('yearValueMin');
const yearValueMax = document.getElementById('yearValueMax');
yearSlider1.addEventListener('input', function() {
  updateDualRange(yearSlider1, yearSlider2, yearValueMin, yearValueMax);
});
yearSlider2.addEventListener('input', function() {
  updateDualRange(yearSlider1, yearSlider2, yearValueMin, yearValueMax);
});

async function getRecommendations() {
  const runtimeMin = Math.min(runtimeSlider1.value, runtimeSlider2.value);
  const runtimeMax = Math.max(runtimeSlider1.value, runtimeSlider2.value);
  const yearMin = Math.min(yearSlider1.value, yearSlider2.value);
  const yearMax = Math.max(yearSlider1.value, yearSlider2.value);
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
  updateDualRange(runtimeSlider1, runtimeSlider2, runtimeValueMin, runtimeValueMax);
  updateDualRange(yearSlider1, yearSlider2, yearValueMin, yearValueMax);
};
