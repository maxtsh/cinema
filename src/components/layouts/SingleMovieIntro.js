import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import imageLoader from '../../images/loader.gif';
import noImagePL from '../../images/poster_placeholder.png';

import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video';
import { isNumber } from 'util';

const SingleMovieIntro = ({ movieVideos, movie }) => {
    const movieTagline = movie.tagline;;
    const imdbUrl = `//www.imdb.com/title/${movie.imdb_id}`;

    let webLink = "";
    if(movie.homepage === null || movie.homepage === undefined || movie.homepage === ""){
        webLink = "#";
    }else if(movie.homepage.split("")[4] === "s"){
        webLink = `//${movie.homepage.split("").splice(8).join("")}`;
    }else{
        webLink = `//${movie.homepage.split("").splice(7).join("")}`;
    }



    const noPoster = movie.poster_path === "" || movie.poster_path === null || movie.poster_path === undefined;
    let posterUrl = "";
    if(noPoster){
        posterUrl = noImagePL;
    }else{
        posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
    }




    const movieGenres = movie.genres.map((genre) => `${genre.name}, `);
    const [isOpen, setOpen] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        return () => setLoaded(false);
    }, []);

    const handleClick = useCallback(e => {
        e.preventDefault();
        setOpen(true);
    },[setOpen]);

    let movieScore = "";
    if(movie.vote_average === 0){
        movieScore = "Not yet released!"
    }else{
        movieScore = movie.vote_average;
    }

    let movieRuntime = "";
    if(movie.runtime === 0 || movie.runtime === null){
        movieRuntime = 0;
    }else{
        movieRuntime = movie.runtime;
    }
    
    let videoId = "";
    if(movieVideos.results[0] === undefined){
        videoId = null;
    }else{
        videoId =  movieVideos.results[0].key;
    }
       
    return (
        <div className="main-intro-wrapper ">
            {noPoster ? (
                <img className="blank-image"  src={noImagePL} alt="Sorry, no poster available" />
            ): (
                <React.Fragment>
                    {/* If the poster is not yet loaded, show the loader */}
                    {!isLoaded ? (
                        <div className="main-intro-poster-loader">
                            <img src={imageLoader} alt="loader" />
                        </div>
                    ) : null }

                    <div className="main-intro-poster">
                        <img 
                            onLoad={() => setLoaded(true)} 
                            src={posterUrl} 
                            style={!isLoaded ? { display: 'none' } : {}}
                            alt="movie_poster"
                        />
                    </div>
                </React.Fragment>
            )}

            <div className="main-intro-details">
                <h2>{movie.title}</h2>
                <p>{movieTagline}</p>
                <p>
                    {movieRuntime} min | {movieGenres} | {movie.release_date}
                </p>
                <div className="movie-score">
                    <StarRatings
                        rating={isNumber(movieScore) ? movieScore/2 : 0}
                        isSelectable="false"
                        numberOfStars={5}
                        name='rating'
                        starDimension="25px"
                        starEmptyColor="#fff"
                        starRatedColor="#f5c518"
                        starSpacing="2px"
                    />
                    {movieScore}
                    
                </div>
                <p>Status: {movie.status}</p>

                <Link className="website-link" target="_blank" to={webLink}>
                    <i className="fas fa-link"></i> Website
                </Link>

                <Link className="imdb-link" target="_blank" to={imdbUrl}>
                    <i className="fab fa-imdb"></i> IMDB
                </Link>

                <Link className="trailer-link" target="_blank" to="#" onClick={handleClick}>
                    <i className="fas fa-play"></i> Trailer
                </Link>
                <ModalVideo 
                    channel='youtube' 
                    isOpen={isOpen} 
                    videoId={videoId} onClose={() => setOpen(false)}
                />
            </div>
        </div>
    )
};
export default React.memo(SingleMovieIntro);