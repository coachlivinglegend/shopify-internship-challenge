import React from "react";
import "./Nominee.css";
import FlipMove from "react-flip-move";
import noImage from '../../assets/noimage.jpg'


const Nominee = ({ nominees, deleteNomination }) => {
    const forFlip = nominees.map(nominee => {
        return(
            <div key={nominee.imdbID} className="nom__movie__item">
                <div className="nom__movie__item__image__wrapper">
                    <img
                        className="nom__movie__item__image"
                        alt={nominee.Title}
                        src={nominee.Poster === "N/A" ? noImage : nominee.Poster}
                    />
                </div>
                <div className="nom__movie__item__details">
                    <div className="nom__movie__item__title">
                        {nominee.Title}
                    </div>
                    <div className="nom__movie__item__year">
                        Released in {nominee.Year}
                    </div>
                </div>
                <span
                    className="remove__movie"
                    onClick={() => deleteNomination(nominee.imdbID)}
                >
                    REMOVE
                </span>
            </div>
        )
    })
    return (
        <FlipMove duration={350} easing="ease-in-out">
            {forFlip}           
        </FlipMove>

    );
};

export default Nominee;
