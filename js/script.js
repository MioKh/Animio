const global = {
  currentPage: window.location.pathname,
};

async function displayPopularAnimes(){
  const { data } = await fetchApiData('top/anime');
  
  console.log(data);
  data.forEach((anime) =>{
    const div = document.createElement('div');
    div.classList.add('card');
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
        <small class="text-muted">Release: ${anime.aired.from.slice(0, 10)}</small>
      </p>
    </div>`
    document.querySelector('#popular-animes').appendChild(div);
  })
}

async function fetchApiData(endpoint){
  const API_URL = `https://api.jikan.moe/v4/`;

  const respone = await fetch(`${API_URL}${endpoint}`);
  const data = await respone.json();
  return data; 
}

function highlightActiveLink(){
 const links = document.querySelectorAll('.nav-link');
 links.forEach(link => {
    if(link.href === window.location.origin + global.currentPage){
        link.classList.add('active');
    }
 });
}
//initlaize app
function init() {
  switch (global.currentPage) {
    case "/":
    case "./index.html":
      displayPopularAnimes(); 
      break;
    case "manga":
      console.log("mangas");
      break;
    case "anime-details":
      console.log("anime-details");
      break;
    case "manga-details":
      console.log("manga-details");
      break;
    case "search":
      console.log('search');
      break;
  }

  highlightActiveLink();
}


document.addEventListener("DOMContentLoaded", init);
