import React, { useState, useEffect } from 'react';
import noImagePL from '../../images/no_image.png';
import imageLoader from '../../images/imageLoading.gif';

const MovieBox = (props) => {

    const { movie } = props;
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {

        return () => setLoaded(false);
        // eslint-disable-next-line
    }, []);

    let imageUrl = "";
    if(movie.poster_path === "" || movie.poster_path === null || movie.poster_path === undefined){
        imageUrl = noImagePL;
    }else{
        imageUrl = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
    }

    return (
        <div className="movie-box">
            {!isLoaded ? (
                <img className='poster' src={imageLoader} alt="movie_poster" />
            ) : null}
    
            <img 
            onLoad={() => setLoaded(true)} 
            className="poster" 
            src={imageUrl} 
            style={!isLoaded ? { display: 'none' } : {}}
            alt="movie_poster"/> 

           
            <div className="movie-info">
                <h5 className="movie-title">{movie.title}</h5>
                {/* <h5><i class="fas fa-star"></i>{movie.vote_average}</h5> */}
                <h5>{movie.release_date.split("-").join().slice(0,4)}</h5>
            </div>
        </div>
    )
}

export default MovieBox;
