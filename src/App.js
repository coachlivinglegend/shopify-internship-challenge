import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie/Movie";
import Nominee from "./components/Nominee/Nominee";

const App = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isNominatedMoviesFull, setIsNominatedMoviesFull] = useState(true);

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
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=8e7cd903&s=${query}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "False") {
                } else if (data.Response === "True") {
                    setSearchResults(data.Search);
                }
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

    const showNav = () => {
        document
            .querySelector("#mobileNom")
            .classList.remove("mobileNomination");
    };

    const hideNav = () => {
        document.querySelector("#mobileNom").classList.add("mobileNomination");
    };
    return (
        <>
            <div className="app__container">
                <div className="app__title">
                    <i class="fa fa-trophy" aria-hidden="true"></i> The
                    Shoppies: Movie awards for entrepreneurs
                </div>
                {nominatedMovies.length === 5 ? (
                    <div className="banner">
                        <p>
                            Welldone, you have successfully nominated 5 movies.
                        </p>
                    </div>
                ) : null}

                <main className="main">
                    <section className="movie__results">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>Movie Title</span>
                            <span className="mobile__icon"
                                onClick={showNav}
                                style={{ cursor: "pointer" }}
                            >
                              <i class="fa fa-bars" aria-hidden="true"></i>
                                {" "}
                                {nominatedMovies.length} / 5{" "}
                            </span>
                        </div>
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
                                    <Movie
                                        movie={movie}
                                        isNominatedMoviesFull={
                                            isNominatedMoviesFull
                                        }
                                        nominate={nominate}
                                        nominatedMovies={nominatedMovies}
                                    />
                                ))
                            )}
                        </div>
                    </section>
                    <section
                        id="mobileNom"
                        className="mobileNomination__show mobileNomination"
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                position: "relative",
                                marginBottom:"10px"
                            }}
                        >
                            <i
                                onClick={hideNav}
                                style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    cursor: "pointer",
                                }}
                                class="fa fa-times"
                                aria-hidden="true"
                            ></i>
                            <p>Nominated Movies</p>
                            <p>  </p>
                        </div>
                        <div className="nom__list">
                            <Nominee
                                nominees={nominatedMovies}
                                deleteNomination={deleteNomination}
                            />
                        </div>
                    </section>
                    <section className="nom__movies">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p>Nominated Movies</p>
                            <p>{nominatedMovies.length} / 5 </p>
                        </div>
                        <div className="nom__list">
                            <Nominee
                                nominees={nominatedMovies}
                                deleteNomination={deleteNomination}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default App;
