import React, { useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { 
    getMovie, 
    clearGetMovie, 
    getMovieCast, 
    clearMovieCast, 
    getMovieVideos, 
    clearMovieVideos } from '../../actions/index';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Loader from '../layouts/Loader';
import SingleMovieIntro from '../layouts/SingleMovieIntro';
import SingleMovieDetails from '../layouts/SingleMovieDetails';
import SingleMovieCastBox from '../layouts/SingleMovieCastBox';
import SingleMovieCrewBox from '../layouts/SingleMovieCrewBox';
import MovieRecommended from '../layouts/MovieRecommended';

const Movie = (props) => {
    console.log("MOVIE PAGE");
    const movie = useSelector(state => state.movie);
    const movieCast = useSelector(state => state.movieCast);
    const movieVideos = useSelector(state => state.movieVideos);
    const dispatch = useDispatch();

    const movieId = props.match.params.id;

    useEffect(() => {
        getMovie(dispatch, movieId);
        
        return () => clearGetMovie(dispatch);
    }, [dispatch, movieId]);

    useEffect(() => {
        getMovieCast(dispatch, movieId);

        return () => clearMovieCast(dispatch);
    }, [dispatch, movieId]);

    useEffect(() => {
        getMovieVideos(dispatch, movieId);

        return () => clearMovieVideos(dispatch);
    }, [dispatch, movieId]);

    if(movie.movie === null || movie.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    } 

    if(movieCast.members === null || movieCast.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }

    if(movieVideos.videos === null || movieVideos.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
    
    const style = { backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.6) 3%, rgba(0,0,0,0.8) 50%), url(https://image.tmdb.org/t/p/original/${movie.movie.backdrop_path})`};
    const director = movieCast.members.crew.filter( crew => crew.job === "Director");
    return (
        <>
            <Header />
            <div className="main-container">
                <div className="main-header" style={style}></div>
                <div className="container">

                    <div className="main-intro">
                        <SingleMovieIntro movieVideos={movieVideos.videos} movie={movie.movie} />
                    </div>

                    <div className="main-details">
                        <SingleMovieDetails director={director} movie={movie.movie} />
                        <SingleMovieCrewBox crew={movieCast.members.crew} />
                        <SingleMovieCastBox cast={movieCast.members.cast} />
                        <h2>Recommendations</h2>
                        <MovieRecommended movieId={movieId} />
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    )
};
export default Movie;