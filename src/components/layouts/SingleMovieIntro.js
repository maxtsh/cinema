import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieVideos } from '../../actions/index';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video';
import Loader from './Loader';
import { isNumber } from 'util';
import imageLoader from '../../images/imageLoading.gif';

const SingleMovieIntro = (props) => {

    const { movie, getMovieVideos, movieVideos } = props;
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

    const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
    const movieGenres = movie.genres.map((genre) => `${genre.name}, `);
    const [isOpen, setOpen] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        getMovieVideos(movie.id);

        return () => setLoaded(false);
        // eslint-disable-next-line
    }, [movie.id]);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

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

    if( movieVideos.movieVideos === null || movieVideos.loading === true){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
        let videoId = "";
        if(movieVideos.movieVideos.results[0] === undefined){
            videoId = null;
        }else{
            videoId =  movieVideos.movieVideos.results[0].key;
        }
       
    return (
        <div className="movie-intro-main ">
            <div className="single-movie-poster">
                {!isLoaded ? (
                <img className='poster' src={imageLoader} alt="movie_poster" />
                ) : null}
                <img 
                onLoad={() => setLoaded(true)} 
                src={posterUrl} 
                style={!isLoaded ? { display: 'none' } : {}}
                alt="movie_poster"/>
            </div>
            <div className="single-movie-intro-details">
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
                    <p>
                        {movieScore}
                    </p>
                    
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
}

const mapStateToProps = (state) => ({
    movieVideos: state.movieVideos
});
export default connect(mapStateToProps, { getMovieVideos })(SingleMovieIntro);
