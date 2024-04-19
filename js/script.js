console.log("Hello this is a test to see if the js is even running");

const global = {
  currentPage: window.location.pathname,
};

const path = global.currentPage;

async function displayPopularAnimes() {
  const { data } = await fetchApiData("top/anime");
  console.log(data);
  data.forEach((anime) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="anime-details.html?id=${anime.mal_id}">
      <img 
      src="${anime.images?.jpg?.large_image_url || "images/no-image.jpg"}" 
      class="card-img-top" 
      alt="${anime.title || "No Image Available"}" 
    />
    </a>
    <div class="card-body">
      <h5 class="card-title">${anime.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${anime.aired.from.slice(
          0,
          10
        )}</small>
      </p>
    </div>`;
    document.querySelector("#popular-animes").appendChild(div);
  });
}

async function displayPopularMangas() {
  const { data } = await fetchApiData("top/manga");

  console.log(data);
  data.forEach((manga) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="manga-details.html?id=${manga.mal_id}">
      <img 
        src="${manga.images?.jpg?.large_image_url || "images/no-image.jpg"}" 
        class="card-img-top" 
        alt="${manga.title || "No Image Available"}" 
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">${manga.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${manga.published.from.slice(
          0,
          10
        )}</small>
      </p>
    </div>`;
    document.querySelector("#popular-mangas").appendChild(div);
  });
}

async function displayAnimeDetails() {
  const animeId = window.location.search.split("=")[1];
  const { data } = await fetchApiData(`anime/${animeId}/full`);
  console.log(data);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
  <div>
      <img 
        src="${data.images?.jpg?.large_image_url || "images/no-image.jpg"}" 
        class="card-img-top" 
        alt="${data.title || "No Image Available"}" 
      />
  </div>
  <div>
      <h2>${data.title}</h2>
      <h3>${
        data.title_english ||
        data.titles.english ||
        data.titles.synonym ||
        data.title
      }</h3>
      <p>
          <i class="fas fa-star text-primary"></i>
          ${data.score}/10
      </p>
      <p class="text-muted">Release Date: ${data.aired.from.slice(0, 10)}</p>
      <p>
          ${data.synopsis}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
          ${data.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        data.external[0].name != "Official Site"
          ? data.url
          : data.external[0].url
      }" target="_blank" class="btn">Visit Anime Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Anime Info</h2>
  <ul>
      <li><span class="text-secondary">Episodes:</span> ${
        data.episodes
      } episode</li>
      <li><span class="text-secondary">Rating:</span> ${data.rating}</li>
      <li><span class="text-secondary">Duration:</span> ${data.duration}</li>
      <li><span class="text-secondary">Status:</span> ${data.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${data.producers
    .map((producer) => producer.name)
    .join(" | ")}</div>
</div>`;

  document.querySelector("#Anime-details").appendChild(div);
}
// test function for displaying backdrop images in anime details
/* async function displayAnimeImages(){
   const animeId = window.location.search.split("=")[1];
   const { data } = await fetchApiData(`anime/${animeId}/pictures`);
   const images = data.filter(picture => picture.jpg.large_image_url);
   const randomImage = images[Math.floor(Math.random() * images.length)];
   const div = document.createElement("div");
   const imageContainer = document.createElement("div");
   imageContainer.classList.add("image-container");
   const img = document.createElement("img");
   img.src = randomImage.jpg.large_image_url;
   imageContainer.appendChild(img);
   div.appendChild(imageContainer);
   document.querySelector("#Anime-details").appendChild(div);
*/

async function displayMangaDetails() {
  const mangaId = window.location.search.split("=")[1];
  const { data } = await fetchApiData(`manga/${mangaId}/full`);
  console.log(data);
  console.log(data.images.jpg.large_image_url);
  const div = document.createElement("div");
  div.innerHTML = ` <div class="details-top">
  <div>
    <img
      src="${data.images?.jpg?.large_image_url || "images/no-image.jpg"}"
      class="card-img-top"
      alt="${data.title || "No Image Available"}"
    />
  </div>
  <div>
    <h2>${data.title}</h2>
    <h3>${
      data.title_english ||
      data.titles.english ||
      data.titles.synonym ||
      data.title
    }</h3>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${data.score} / 10
    </p>
    <p class="text-muted">Release Date: ${data.published.from.slice(0, 10)}</p>
    <p>
      ${data.synopsis}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${data.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      data.external[0].name != "Official Site" ? data.url : data.external[0].url
    }" target="_blank" class="btn">Visit Anime Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Manga Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Volumes:</span> ${
      data.volumes ? data.volumes : "N/A"
    }</li>
    <li>
      <span class="text-secondary">Number Of Chapters:</span> ${
        data.chapters ? data.chapters : "N/A"
      }
    </li>
    <li><span class="text-secondary">Status:</span> ${data.status}</li>
  </ul>
  <h4>Author</h4>
  <div class="list-group">${data.authors[0].name}</div>
</div>`;

  document.querySelector("#manga-details").appendChild(div);
}

// display slider
async function displaySlider() {
  const { data } = await fetchApiData("recommendations/anime");
  console.log(data);
  data.forEach((anime) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
    <a href="movie-details.html?id=${anime.mal_id}">
      <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${anime.score} / 10
    </h4>
    `;

    // document.querySelector(".swiper-wrapper").appendChild(div);
    // (WIP) today maybe ?
  });
}

// gets the base api link ( then we concatenate with the endpoint )
async function fetchApiData(endpoint) {
  const API_URL = `https://api.jikan.moe/v4/`;
  showSpinner();
  const respone = await fetch(`${API_URL}${endpoint}`);
  const data = await respone.json();
  hideSpinner();
  return data;
}

//show spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
// hide the spinner
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.href === window.location.origin + global.currentPage) {
      link.classList.add("active");
    }
  });
}

//a simple router function
function init() {
  if (/^\/(Animio\/)?(index\.html)?$/.test(path)) {
    displayPopularAnimes();
    displaySlider();
  } else if (/^\/(Animio\/)?manga\.html(\/)?$/.test(path)) {
    displayPopularMangas();
  } else if (/^\/(Animio\/)?anime-details\.html(\/)?$/.test(path)) {
    displayAnimeDetails();
    // displayAnimeImages();
  } else if (/^\/(Animio\/)?manga-details\.html(\/)?$/.test(path)) {
    displayMangaDetails();
    console.log("manga-details");
  } else if (/^\/(Animio\/)?search\.html(\/)?$/.test(path)) {
    console.log("search");
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
