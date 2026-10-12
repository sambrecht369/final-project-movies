import React from 'react'
import './movie.css'
import { useSearchParams } from 'react-router-dom'


function Movie() {

  const [searchParams] = useSearchParams();
  const imdbID = searchParams.get('imdbID');
  const [movie, setMovie] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!imdbID) {
      setError('Choose a movie from the movie list to view its details.');
      return undefined;
    }

    let isCurrentRequest = true;
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=43083548`,
        );
        const data = await response.json();
        if (!isCurrentRequest) return;
        if (data.Response === 'False') {
          setError(data.Error || 'Movie details could not be found.');
          return;
        }
        setMovie(data);
      } catch {
        if (isCurrentRequest) {
          setError('Unable to load movie details. Please try again.');
        }
      }
    }

    fetchMovie();
    return () => {
      isCurrentRequest = false;
    };
  }, [imdbID]);

  if (error) {
    return <main className="movie-page"><p>{error}</p></main>;
  }

  if (!movie) {
    return <main className="movie-page"><p>Loading movie...</p></main>;
  }







  return (
    <div className='movie-page'>
      <div className="container">
        <div className="row">
          <div className="movie-page-wrapper">
            <div className="movie-sides">
              <div className="left-side">
                <div className="movie-img">
                  {movie.Poster !== 'N/A' && <img className="movie__img" src={movie.Poster} alt={`${movie.Title} poster`} />}
                </div>
                <div className="movie-title">
                  <h2 className="movie__title">{movie.Title}</h2>
                </div>
              </div>
              <div className="right-side">
                <div className="movie-info">
                  <div className="movie-year">
                    <p className="movie__year">Released: {movie.Released}</p>
                  </div>
                  <div className="movie-runtime">
                    <p className="movie__runtime">Runtime: {movie.Runtime}</p>
                  </div>
                  <div className="movie-genre">
                    <p className="movie__genre">Genre: {movie.Genre}</p>
                  </div>
                  <div className="movie-box-office">
                    <p className="movie__box-office">Box Office: {movie.BoxOffice}</p>
                  </div>
                  <div className="movie-actors">
                    <p className="movie__actors">Cast: {movie.Actors}</p>
                  </div>
                  <div className="movie-director">
                    <p className="movie__director">Director: {movie.Director}</p>
                  </div>
                  <div className="movie-rating">
                    <p className="movie__rating">IMDb rating: {movie.imdbRating}</p>
                  </div>
                </div>
                <div className="movie-plot">
                  <p className="movie__plot">{movie.Plot}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie;