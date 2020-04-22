import React, { useState, useEffect, useCallback } from 'react';
import noImagePL from '../../images/no_image.svg';
import imageLoader from '../../images/loader.gif';

const MovieBox = (props) => {
    console.log("MOVE BOX");

    const { movie } = props;
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {

        return () => setLoaded(false);
    }, [movie]);

    const onLoad = useCallback(() => {setLoaded(true)}, [setLoaded]);

    const noPoster = movie.poster_path === "" || movie.poster_path === null || movie.poster_path === undefined;

    let imageUrl = "";
    if(noPoster){
        imageUrl = noImagePL;
    }else{
        imageUrl = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
    }

    return (
        <div className="movie-box">

            {noPoster ? (
                <img className="poster" src={noImagePL} alt="Sorry, no poster available" />
            ): (
                <React.Fragment>
                    {!isLoaded ? (
                        <img className='poster' src={imageLoader} alt="movie_poster" />
                    ) : null}
            
                    <img 
                        onLoad={onLoad} 
                        className="poster" 
                        src={imageUrl} 
                        style={!isLoaded ? { display: 'none' } : {} }
                        alt="movie_poster"
                    /> 
                </React.Fragment>
            )}

            <div className="movie-info">
                {noPoster ? (<h6>No poster available</h6>) : null}
                <h5 className="movie-title">{movie.title}</h5>
                <h5><i className="fas fa-star"></i>{movie.vote_average}</h5>

                {movie.release_date ? (
                    <h5>{movie.release_date.split("-").join().slice(0,4)}</h5>
                ) : (
                    <h5>Not yet released</h5>
                ) }
                
            </div>
        </div>
    )
};
export default MovieBox;