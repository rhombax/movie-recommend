// script.js

function updateDualRange(slider1, slider2, displayMin, displayMax, track) {
  const min = Math.min(slider1.value, slider2.value);
  const max = Math.max(slider1.value, slider2.value);
  displayMin.textContent = min;
  displayMax.textContent = max;

  // Ensure sliders do not cross over
  if (parseInt(slider1.value) > parseInt(slider2.value)) {
    if (slider1 === document.activeElement) {
      slider2.value = slider1.value;
    } else {
      slider1.value = slider2.value;
    }
  }

  // Update the track to show the selected range
  const percentMin = ((min - slider1.min) / (slider1.max - slider1.min)) * 100;
  const percentMax = ((max - slider1.min) / (slider1.max - slider1.min)) * 100;
  track.style.background = `linear-gradient(to right, #ddd ${percentMin}%, #007bff ${percentMin}%, #007bff ${percentMax}%, #ddd ${percentMax}%)`;
}

// Initialize runtime slider
const runtimeSlider1 = document.getElementById('runtimeSlider1');
const runtimeSlider2 = document.getElementById('runtimeSlider2');
const runtimeValueMin = document.getElementById('runtimeValueMin');
const runtimeValueMax = document.getElementById('runtimeValueMax');
const runtimeTrack = document.getElementById('runtimeTrack');

runtimeSlider1.addEventListener('input', function() {
  updateDualRange(runtimeSlider1, runtimeSlider2, runtimeValueMin, runtimeValueMax, runtimeTrack);
});
runtimeSlider2.addEventListener('input', function() {
  updateDualRange(runtimeSlider1, runtimeSlider2, runtimeValueMin, runtimeValueMax, runtimeTrack);
});

// Initialize year slider
const yearSlider1 = document.getElementById('yearSlider1');
const yearSlider2 = document.getElementById('yearSlider2');
const yearValueMin = document.getElementById('yearValueMin');
const yearValueMax = document.getElementById('yearValueMax');
const yearTrack = document.getElementById('yearTrack');

yearSlider1.addEventListener('input', function() {
  updateDualRange(yearSlider1, yearSlider2, yearValueMin, yearValueMax, yearTrack);
});
yearSlider2.addEventListener('input', function() {
  updateDualRange(yearSlider1, yearSlider2, yearValueMin, yearValueMax, yearTrack);
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
  updateDualRange(runtimeSlider1, runtimeSlider2, runtimeValueMin, runtimeValueMax, runtimeTrack);
  updateDualRange(yearSlider1, yearSlider2, yearValueMin, yearValueMax, yearTrack);
};
