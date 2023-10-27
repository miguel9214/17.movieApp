const API_URL =
  "https://api.mercadolibre.com/items/MCO926126955";
const IMG_PATH = "https://http2.mlstatic.com/D_782361-MCO70444888881_072023-I.jpg";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const TRANSLATE_API_KEY = "AIzaSyDo--8YB2B00Zpf26g0NhWjjY6v4n3-s1c";

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");


console.log('ESTA ES LA API',API_URL);

getMovies(API_URL);


async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data);

  console.log(data)
}

async function showMovies(movies) {
  main.innerHTML = "";

  
  for (const movie in movies) {
    const { id, title, category_id, price,site_id } = movie;
    movies.site_id;
    console.log(movies.id);


    console.log(movie);

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    // Traducir la descripción general
    // const translatedOverview = await translateText(title, "en", "es");

    movieEl.innerHTML = `<img src="${IMG_PATH + movies.site_id }" alt="${movies.id}">
      <div class="movie-info">
        <h3>${movies.seller_id}</h3>
        <span class="${getClassByRate(title)}">${movies.title}</span>
      </div>
      <div class="overview">
        <h3>Descripción general</h3>
        ${movies.price}
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

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const searchTerm = search.value;

//   if (searchTerm && searchTerm !== "") {
//     getMovies(SEARCH_API + searchTerm);

//     search.value = "";
//   } else {
//     window.location.reload();
//   }
// });

// async function translateText(text, sourceLang, targetLang) {
//   const url = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       q: text,
//       source: sourceLang,
//       target: targetLang,
//       format: "text",
//     }),
//   });

//   const data = await response.json();

//   return data.data.translations[0].translatedText;
// }
