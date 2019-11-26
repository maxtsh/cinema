import React, { useEffect, useState} from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import { getMovie, getMovieCast } from '../../actions/index';


import SingleMovieIntro from '../layouts/SingleMovieIntro';
import SingleMovieDetails from '../layouts/SingleMovieDetails';
import SingleMovieCastBox from '../layouts/SingleMovieCastBox';
import MovieRecommended from '../layouts/MovieRecommended';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import SingleMovieCrewBox from '../layouts/SingleMovieCrewBox';
import Loader from '../layouts/Loader';

const Movie = (props) => {
    const { getMovie, getMovieCast, movie, movieCast } = props;
    const movieId = props.match.params.id;
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        getMovie(movieId);
        getMovieCast(movieId);
        setLoaded(false);

        const movieTimeOut = setTimeout(() => {
            setLoaded(true);
        }, 700);
        
        return () => clearTimeout(movieTimeOut);
        // eslint-disable-next-line
    }, [movieId]);


    if(movie.movie === null || movieCast.movieCast === null || !loaded){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    }
    // else{
        
        const style = { backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.6) 3%, rgba(0,0,0,0.8) 50%), url(https://image.tmdb.org/t/p/original/${movie.movie.backdrop_path})`};

        const director = movieCast.movieCast.crew.filter( crew => crew.job === "Director");

        return (
            <LazyLoad height={200} offset={200}>
                <div className="single-movie">
                    <div className="movie-header" style={style}>
                        <Header />
                    </div>
                    <section className="movie-intro">
                        <div className="container">
                            <SingleMovieIntro movie={movie.movie} />
                        </div>
                    </section>
                    <section className="movie-main-details">
                        <div className="container">
                            
                            <SingleMovieDetails director={director} movie={movie.movie} />

                            <h1>Crew: </h1>
                            <SingleMovieCrewBox crew={movieCast.movieCast.crew} />

                            <hr/>

                            <h1>Cast: </h1>
                            <SingleMovieCastBox cast={movieCast.movieCast.cast} />

                            <hr/>

                            <h1>Recommendation: </h1>
                            <MovieRecommended movieId={movieId} />
                        </div>
                    </section>
                </div>
                <Footer />
            </LazyLoad>
        )
    // }
};

const mapStateToProps = (state) => ({
    movie: state.movie,
    movieCast: state.movieCast
});
export default connect(mapStateToProps, { getMovie, getMovieCast })(Movie);
