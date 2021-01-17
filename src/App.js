import React, { useEffect, useState } from "react";
import "./App.css";
import MovieResult from "./components/MovieResult/MovieResult";
import FlipMove from "react-flip-move";

const App = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isNominatedMoviesFull, setIsNominatedMoviesFull] = useState(true);
    const [error, setError] = useState(false);

    const nominationStore = JSON.parse(
        localStorage.getItem("shoppiesNomination")
    );
    const [nominatedMovies, setNominatedMovies] = useState(
        nominationStore || []
    );

    useEffect(() => {
        localStorage.setItem(
            "shoppiesNomination",
            JSON.stringify(nominatedMovies)
        );
    }, [nominatedMovies]);

    useEffect(() => {
        if (query.length === 0) {
            setSearchResults([]);
        }
        if (query.length < 2) return;
        setError(false);
        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=8e7cd903&s=${query}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "False") {
                    setError(true);
                } else if (data.Response === "True") {
                    setSearchResults(data.Search);
                }
                console.log(data);
            });
    }, [query]);

    const nominate = newMovie => {
        setNominatedMovies(movies => {
            return [...movies, newMovie];
        });
    };

    const deleteNomination = id => {
        setNominatedMovies(nominatedMovies =>
            nominatedMovies.filter(nomMovie => nomMovie.imdbID !== id)
        );
    };

    useEffect(() => {
        if (nominatedMovies.length === 5) {
            setIsNominatedMoviesFull(true);
        } else {
            setIsNominatedMoviesFull(false);
        }
    }, [nominatedMovies]);

    return (
        <>
            {nominatedMovies.length === 5 ? (
                <div className="banner">
                    <p>
                        Welldone, you have successfully nominated 5 movies,{" "}
                        <br /> Let's hope they win.
                    </p>
                </div>
            ) : null}
            <div className="app__container">
                <div className="app__title">
                    The Shoppies: Movie awards for entrepreneurs
                </div>
                <main className="main">
                    <section className="movie__results">
                        <span>Movie Title</span>
                        <div className="movie__search__container">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input
                                placeholder="Search for a movie"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="movie__search"
                            ></input>
                        </div>
                        <div className="movie__list">
                            {!searchResults.length ? (
                                <p>
                                    Results would be more accurate if you search
                                    the official name of the movie.
                                </p>
                            ) : (
                                searchResults.map(movie => (
                                    <div className="movie__list__item">
                                        <div className="movie__list__item__image__wrapper">
                                            <img
                                                src={movie.Poster}
                                                alt={movie.Title}
                                                className="movie__list__item__image"
                                            />
                                        </div>
                                        <div className="movie__list__item__desc">
                                            <p className="movie__list__item__name">
                                                {movie.Title}, {movie.Year}.
                                            </p>
                                        </div>
                                        <button
                                            className="nominate__button"
                                            disabled={
                                                isNominatedMoviesFull ||
                                                nominatedMovies.some(
                                                    nominatedMovie =>
                                                        nominatedMovie.imdbID ===
                                                        movie.imdbID
                                                )
                                            }
                                            onClick={() => nominate(movie)}
                                        >
                                            {nominatedMovies.some(
                                                nominatedMovie =>
                                                    nominatedMovie.imdbID ===
                                                    movie.imdbID
                                            )
                                                ? "NOMINATED"
                                                : "NOMINATE"}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                    <section className="nom__movies">
                        <p>Nominated Movies</p>
                        <div className="nom__list">
                            <FlipMove duration={300} easing="ease-out">
                                {nominatedMovies.map(nomMovie => {
                                    return (
                                        <div
                                            key={nomMovie.imdbID}
                                            className="nom__movie__item"
                                        >
                                            <div className="nom__movie__item__image__wrapper">
                                                <img
                                                    className="nom__movie__item__image"
                                                    alt={nomMovie.Title}
                                                    src={nomMovie.Poster}
                                                />
                                            </div>
                                            <div>
                                                <div className="nom__movie__item__details">
                                                    {nomMovie.Title},{" "}
                                                    {nomMovie.Year}.
                                                </div>
                                            </div>
                                            <span
                                                className="remove__movie"
                                                onClick={() =>
                                                    deleteNomination(
                                                        nomMovie.imdbID
                                                    )
                                                }
                                            >
                                                REMOVE
                                            </span>
                                        </div>
                                    );
                                })}
                            </FlipMove>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default App;
