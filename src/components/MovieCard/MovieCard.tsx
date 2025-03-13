import React from 'react';
import {Movie} from '../../api/movies.api';

interface MovieCardProps{
    movie:Movie;
    onClick?:()=>void;
}

const MovieCard: React.FC<MovieCardProps> = ({movie,onClick})=>{
    return(
        <div className="movie-card" onClick={onClick}>
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster"/>
            <h3 className='movie-title'>{movie.title}</h3>
            <p className='movie-year'>{movie.publishingYear}</p>
        </div>
    );
};
export default MovieCard;