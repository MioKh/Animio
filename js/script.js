const global = {
  currentPage: window.location.pathname,
};

function highlightActiveLink(){
 const links = document.querySelectorAll('.nav-link');
 links.forEach(link => {
    if(link.getAttribute('href') === global.currentPage){
        link.classList.add('active');
    }
 });
}

//initlaize app
function init() {
  switch (global.currentPage) {
    case "/":
    case '/index.html':
      console.log("home");
      break;
    case "/manga.html":
      console.log("mangas");
      break;
    case "/anime-details.html":
      console.log("anime-details");
      break;
    case "/manga-details.html":
      console.log("manga-details");
      break;
    case "/search.html":
      console.log('search');
      break;
  }
  highlightActiveLink();
}


document.addEventListener("DOMContentLoaded", init);
