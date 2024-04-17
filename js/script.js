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
        src="${anime.images.jpg.large_image_url}"
        alt="${anime.title}"
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

async function fetchApiData(endpoint) {
  const API_URL = `https://api.jikan.moe/v4/`;

  const respone = await fetch(`${API_URL}${endpoint}`);
  const data = await respone.json();
  return data;
}

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.href === window.location.origin + global.currentPage) {
      link.classList.add("active");
    }
  });
}

//initlaize app
function init() {
  if (/^\/(Animio\/)?(index\.html)?$/.test(path)) {
    displayPopularAnimes();
  } else if (path === "manga" || /^\/Animio\/manga(\/)?$/.test(path)) {
    console.log("mangas");
  } else if (path === "anime-details" || /^\/Animio\/anime-details(\/)?$/.test(path)) {
    console.log("anime-details");
  } else if (path === "manga-details" || /^\/Animio\/manga-details(\/)?$/.test(path)) {
    console.log("manga-details");
  } else if (path === "search" || /^\/Animio\/search(\/)?$/.test(path)) {
    console.log("search");
  }  // pls work

  // AAA DAMN IT so i have been trying to fix this for a while and the fix is to add more cases cause github adds a whole new root file ? like if i run this localy it will work , but like the way i am using routing it changes in github cause for example index.html or just / becomes /Animio/index.html or /Animio/ , and i believe its same for all other pages

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
