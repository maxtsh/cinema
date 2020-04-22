import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import MainSlider from '../layouts/MainSlider';

import { getNowPlaying, clearNowPlaying, getMovieVideos, clearMovieVideos } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';

import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video';
import { isNumber } from 'util';

const Home = () => {
    const nowPlaying = useSelector(state => state.nowPlaying);
    const movieVideos = useSelector(state => state.movieVideos);
    const dispatch = useDispatch();

    const [isPlaying, setPlaying] = useState(true);
    const [index, setIndex] = useState(0);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        getNowPlaying(dispatch, 1);

        return () => clearNowPlaying(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if(nowPlaying.movies !== null || !nowPlaying.loading){
            getMovieVideos(dispatch, nowPlaying.movies.results[index].id);
        }
        
        return () => clearMovieVideos(dispatch);
    }, [dispatch, index, nowPlaying.loading, nowPlaying.movies]);

    useEffect(() => {
        const slide = () => {
            if(index < 19){
                setIndex(index + 1);
            }else{
                setIndex(0);
            }
        };

        if(isPlaying){
            const imageInterval = setInterval(slide, 7000);
            return () => clearInterval(imageInterval);
        }
    }, [index, isPlaying]);


    const handlePlay = useCallback((e) => {
        e.preventDefault();
        setPlaying(!isPlaying);

    }, [setPlaying, isPlaying]);

    const handleModal = useCallback(e => {
        e.preventDefault();
        setPlaying(false);
        setOpen(true);

    },[setOpen]);

    const handleModalClose = useCallback(() => {
        setOpen(false);
        setPlaying(true);
        
    }, [setOpen, setPlaying]);

    if(nowPlaying.movies === null || nowPlaying.loading){
        return null;
    }

    const { results } = nowPlaying.movies;

    let movieScore = "";
    if(results[index].vote_average === 0){
        movieScore = "Not yet released!"
    }else{
        movieScore = results[index].vote_average;
    }

    let backGrounds = [];
    results.map(movie => {
        return backGrounds.push(movie.backdrop_path);
    });

    let posters = [];
    results.map(movie => {
        return posters.push(movie.poster_path);
    });

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const month = months[results[index].release_date.split('-')[1].split('')[1]];
    const year = results[index].release_date.split('-')[0];
    const day = results[index].release_date.split('-')[2].split('')[1];
    const releaseDate = day + ' ' + month + ' ' + year;

    let videoId = "";
    if(!movieVideos.videos === null || !movieVideos.loading){
        if(movieVideos.videos.results[0] === undefined){
            videoId = null;
        }else{
            videoId =  movieVideos.videos.results[0].key;
        }
    }

    const style = {backgroundImage: `url(https://image.tmdb.org/t/p/original/${backGrounds[index]})`};

    return (
        <React.Fragment>
            <Header />
            <div style={style} className="home-container">
                <div className="container-fluid">
                    <div className="wrapper">
                        <div className="movie">
                            <div className="movie-info">
                                <h1 className="movie-info-title">{results[index].title}</h1>
                                <div className="movie-info-rating">
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
                                    <p className="movie-info-rating-text">{movieScore}</p>
                                </div>
                                <div className="movie-info-links">
                                    <Link 
                                        className="trailer-link" 
                                        target="_blank" 
                                        to="#"
                                        onClick={handleModal}
                                        >
                                        <i className="fas fa-play"></i> Trailer
                                    </Link>
                                    <Link className="details-link" target="_blank" to={`/movie/${results[index].id}`}>
                                        <i className="fab fa-imdb"></i>  Details
                                    </Link>
                                    <Link className="release-link" target="_blank" to={`/movie/${results[index].id}`}>
                                        <i className="fas fa-calendar-alt"></i> {releaseDate}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="slider-container">
                            <MainSlider 
                                posters={posters} 
                                index={index} 
                                setIndex={setIndex} 
                                isPlaying={isPlaying}
                                handlePlay={handlePlay}
                            />
                        </div>
                        <div className="credits">
                            <a href="https://github.com/maxtsh" target="_blank" rel="noopener noreferrer" >
                                <h6 className="credit-text">Developer: Maxtsh</h6>
                            </a>
                        </div>
                    </div>
                    <ModalVideo 
                        channel='youtube' 
                        isOpen={isOpen} 
                        videoId={videoId} 
                        onClose={handleModalClose}
                    />
                </div>
            </div>
        </React.Fragment>
    )
};
export default Home;