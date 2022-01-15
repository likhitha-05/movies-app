
const API_Key = 'api_key=35fb0668bca6f4005ffa75a1a2836883';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_Key;
const SEARCH_URL = BASE_URL + '/search/movie?' + API_Key;
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

getmovies(API_URL);

function getmovies(url){

  fetch(url).then(res => res.json()).then(data =>{
    console.log(data.results);
    showmovies(data.results);

  })
}

function showmovies(data){
  main.innerHTML='';

  data.forEach(movie => {
    const {title, poster_path, vote_average, overview}=movie;
    const movieE1=document.createElement('div');
    movieE1.classList.add('movie');
    movieE1.innerHTML=`
      <img src="${IMG_URL+poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="rating">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
      `
      main.appendChild(movieE1);
  })
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();

  const searchTerm=search.value;

  if(searchTerm){
    getmovies(SEARCH_URL+'&query='+searchTerm);
  }
  else{
    getmovies(API_URL);
  }
})
