import React from "react";
import "./Movie.css";
import noImage from '../../assets/noimage.jpg'

const Movie = ({ movie , isNominatedMoviesFull , nominatedMovies , nominate } ) => {
    return (
        <div className="movie__list__item">
            <div className="movie__list__item__image__wrapper">
                <img
                    src={movie.Poster === "N/A" ? noImage : movie.Poster}
                    alt={movie.Title}
                    className="movie__list__item__image"
                />
            </div>
            <div className="movie__list__item__desc">
                <span className="movie__list__item__name">
                    {movie.Title}
                </span>
                <span className="movie__list__item__year">
                    Released: {movie.Year}
                </span>
            </div>
            <button
                className={`nominate__button ${nominatedMovies.some(nominatedMovie => nominatedMovie.imdbID === movie.imdbID) ? 'greenCheck' : ''}`}
                disabled={
                    isNominatedMoviesFull ||
                    nominatedMovies.some(
                        nominatedMovie => nominatedMovie.imdbID === movie.imdbID
                    )
                }
                onClick={() => nominate(movie)}
            >
                {nominatedMovies.some(
                    nominatedMovie => nominatedMovie.imdbID === movie.imdbID
                )
                    ? <span>NOMINATED <i class="fa fa-check-circle-o" aria-hidden="true"></i></span>
                    : (isNominatedMoviesFull ? "LIMIT REACHED" : "NOMINATE")
                    }
            </button>
        </div>
    );
};

export default Movie;
