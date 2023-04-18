const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const TRANSLATE_API_KEY = "AIzaSyDo--8YB2B00Zpf26g0NhWjjY6v4n3-s1c";

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

async function showMovies(movies) {
  main.innerHTML = "";

  for (const movie of movies) {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    // Traducir la descripción general
    const translatedOverview = await translateText(overview, "en", "es");

    movieEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Descripción general</h3>
        ${translatedOverview}
      </div>`;
    main.appendChild(movieEl);
  }
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    ("red");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

async function translateText(text, sourceLang, targetLang) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    }),
  });

  const data = await response.json();

  return data.data.translations[0].translatedText;
}
