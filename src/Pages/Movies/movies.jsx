import React from 'react'
import './movies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Movies() {




function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let lastFetchedMovies = [];




function renderMovies(movies) {
  const movieWrapper = document.querySelector(".movies");
  if (!movieWrapper) {
    return;
  }
  if (Array.isArray(movies) && movies.length > 0) {
    const movieHTML = movies.map((movie) => {
        return `<div class="movie">
          <figure class="movie__wrapper">
            <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}">
          </figure>
          <div class="movie__info">
            <h2 class="movie__title">${movie.Title}</h2>
            <p class="movie__year">${movie.Year}</p>
          </div>
      </div>`;
    }).join('');
    movieWrapper.innerHTML = movieHTML;
  } else {
    movieWrapper.innerHTML = '<p>No movies found.</p>';
  }
}

React.useEffect(() => {
  const inputElement = document.querySelector(".searchInput");
  const formElement = document.querySelector(".search__bar");
  const resultsElement = document.querySelector(".movies");

  if (!inputElement || !formElement || !resultsElement) {
    return undefined;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    resultsElement.innerHTML = "";
    const inputValue = inputElement.value;
    const response = await fetch(
      `https://www.omdbapi.com/?s=${inputValue}&apikey=43083548`,
    );
    const data = await response.json();

    if (data.Response === "False" || !Array.isArray(data.Search)) {
      resultsElement.innerHTML = '<p>No movies found.</p>';
      lastFetchedMovies = [];
      return;
    }

    lastFetchedMovies = data.Search;
    renderMovies(lastFetchedMovies);
  }

  formElement.addEventListener("submit", handleSubmit);

  const searchValue = getQueryParam('search');
  if (searchValue) {
    inputElement.value = searchValue;
    handleSubmit({ preventDefault() {} });
  }

  return () => {
    formElement.removeEventListener("submit", handleSubmit);
  };
}, []);





function filterMovies(event) {
  if (!Array.isArray(lastFetchedMovies) || lastFetchedMovies.length === 0) {
    return;
  }
  let sortedMovies = [...lastFetchedMovies];
  if (event.target.value === "A-Z") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (event.target.value === "Z-A") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }
  renderMovies(sortedMovies);
}




  return (
    <div>
       <section id="landing">
            <div className="container">
                <div className="row">
                    <div className="movie__header">
                        <h2 className="section__title movie__header--title">Browse Movies</h2>
                        <div className="search__ways">
                        <form className="search__bar">
                            <input type="text" className="searchInput" placeholder="Search movies..." />
                            <button className="search__button" >
                                <FontAwesomeIcon className='fa-glass'  icon={faMagnifyingGlass} />
                            </button>
                        </form>
                        <select id="filter" defaultValue="" onChange={filterMovies}>
                          <option value="" disabled>Filter</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="movies">
            <div className="container">
                <div className="row">
                    <div className="movies">
                        <div className="movie" >
                          
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
  )
}
export default Movies;