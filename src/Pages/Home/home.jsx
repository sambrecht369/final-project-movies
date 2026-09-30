import React from 'react'
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import movietime from '../../assets/movietime.jpg'
import { useNavigate } from 'react-router-dom';




function Home() {
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchTerm = new FormData(event.currentTarget).get('searchInput')?.trim();
    if (searchTerm) {
      navigate(`/Movies?search=${encodeURIComponent(searchTerm)}`);
    }
  }

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
      <section id="landing" className="home">
        <div className="container">
            <div className="row">
              <div className="home__container">
                <div className="movie__header--home">
                    <h2 className="section__title--home">USA's most popular movie platform</h2>
                    <p className="section__para--home">Discover the latest movies and TV shows available for streaming.</p>
                    <form className="home__search__bar" onSubmit={handleSearchSubmit}>
                        <input type="text" name="searchInput" className="searchInput home__search__input" placeholder="Search by movie titles..." />
                        <div className="search__button__wrapper">
                            <button className="home__search__button" type="submit">
                                <FontAwesomeIcon className='fa-glass'  icon={faMagnifyingGlass} />
                            </button>
                            <div className="loading loading--open" >
                              <FontAwesomeIcon className='fa-spinner' icon={faSpinner} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="image__wrapper">
                    <img className="home__img" src={movietime} alt="" />
                </div>
                </div>
            </div>
        </div>
    </section>


    </div>
  )
}
export default Home;