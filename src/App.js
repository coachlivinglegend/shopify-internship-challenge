import React, { useEffect, useState } from "react";
import "./App.css";
import MovieResult from "./components/MovieResult/MovieResult";

const App = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [nominatedMovies, setNominatedMovies] = useState([]);
    const [isNominatedMoviesFull, setIsNominatedMoviesFull] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
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

    const deleteNomination = (id) => {
      setNominatedMovies(nominatedMovies => nominatedMovies.filter(nomMovie => nomMovie.imdbID !== id ))
    };

    useEffect(() => {
        if (nominatedMovies.length === 5) {
            setIsNominatedMoviesFull(true);
        } else {
            setIsNominatedMoviesFull(false);
        }
    }, [nominatedMovies]);

    return (
        <div className="app__container">
            <main className="main">
                <section className="movie__results">
                    <div className="movie__search__container">
                        <input
                            placeholder="Search for a movie"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="movie__search"
                        ></input>
                    </div>
                    <div className="movie__list">
                        {searchResults.map(movie => (
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
                                        {movie.Title}
                                    </p>
                                    <p className="movie__list__item__year">
                                        {movie.Year}
                                    </p>
                                </div>
                                <button
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
                                    NOMINATE
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="nom__movies">
                    {nominatedMovies.map(nomMovie => {
                        return (
                            <div>
                              <div>
                                {nomMovie.Title} {nomMovie.Title}
                              </div>
                              <span onClick={() => deleteNomination(nomMovie.imdbID)}>REMOVE</span>
                            </div>
                        );
                    })}
                </section>
            </main>
        </div>
    );
};

export default App;
