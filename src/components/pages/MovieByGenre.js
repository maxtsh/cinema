import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieByGenre } from '../../actions/index'; // Our Action is in the props
import { Link } from 'react-router-dom';

import MainMenu from '../layouts/MainMenu';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const MovieByGenre = (props) => {

    const { getMovieByGenre, movieByGenre } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSoryBy] = useState("popularity.desc");
    const [loaded, setloaded] = useState(false);
    const genreId = props.match.params.id;

    useEffect( () => {
        getMovieByGenre(currentPage, genreId, sortBy);
        setloaded(false);

        setTimeout(() => {
            setloaded(true);
        }, 500);

        // eslint-disable-next-line
    }, [currentPage, genreId, sortBy]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleChange = (e) => {
        setSoryBy(e.target.value);
    }

    if(movieByGenre.movieByGenre === null || movieByGenre.loading === true || !loaded){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }else{
        const { results, total_results, total_pages } = movieByGenre.movieByGenre;

        return (
            <Fragment>
                <MainMenu />
                <div className="page">
                    <div className="sidebar">
                        <Sidebar thePage={props.match.params.name} />
                    </div>
                    <div className="discover-container">
                        <div className="home-page">
                        <h2 className="page-title">Genre: {props.match.params.name}</h2>
                        <select onChange={handleChange}>
                            <option value="popularity.desc">Popularity</option>
                            <option value="revenue.desc">Revenue</option>
                            <option value="vote_average.desc">Vote Average</option>
                            <option value="release_date.desc">Release Date</option>
                        </select>
                            <div className="movies-list">
                                {results.map( (result) => (
                                    <Link 
                                        className="single-movie-link" 
                                        key={result.id} 
                                        to={`/movie/${result.id}`}
                                        >
                                        <MovieBox movie={result} />
                                    </Link>
                                ))}
                            </div>
                            <Pagination 
                                changePage={changePage} 
                                currentPage={currentPage}
                                moviesPerPage={20} 
                                totalMovies={total_results} 
                                totalPages={total_pages}
                                />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    movieByGenre: state.movieByGenre,
});
export default connect(mapStateToProps, { getMovieByGenre })(MovieByGenre);
