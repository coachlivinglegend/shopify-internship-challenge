import React, { useState } from 'react'
import'./MovieResult.css'

const MovieResult = ( props ) => {
    const [state, setstate] = useState('initialState')
    console.log(props)
    const { Title, Year, imdbID, Poster } = props
     return (
        <div className='movie__list__item'>
            <div className="movie__list__item__image__wrapper">
                <img src={Poster} alt={Title} className="movie__list__item__image"/>
            </div>
            <div className="movie__list__item__desc">
                <p className ="movie__list__item__name">{state}</p>
                <p className ="movie__list__item__year">{Year}</p>
            </div>
            <button>NOMINATE</button>
        </div>
    )
}

export default MovieResult
