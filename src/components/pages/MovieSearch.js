import React, {Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieSearch } from '../../actions/index'; // Our Action is in the props
import { Link } from 'react-router-dom';

import MainMenu from '../layouts/MainMenu';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const MovieSearch = (props) => {

    const { getMovieSearch, movieSearch } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [loaded, setloaded] = useState(false);
    const searchValue = props.match.params.movie;

    useEffect( () => {
        getMovieSearch(currentPage, searchValue);
        setloaded(false);

        setTimeout(() => {
            setloaded(true);
        }, 500);

        // eslint-disable-next-line
    }, [currentPage, searchValue]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    if(movieSearch.movieSearch === null || movieSearch.loading === true || !loaded){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }else{
        const { results, total_results, total_pages } = movieSearch.movieSearch;

        return (
            <Fragment>
                <MainMenu />
                <div className="page">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="discover-container">
                        <div className="home-page">
                        <h2 className="page-title">Search Keywords: {props.match.params.movie}</h2>
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
    movieSearch: state.movieSearch
});
export default connect(mapStateToProps, { getMovieSearch })(MovieSearch);
