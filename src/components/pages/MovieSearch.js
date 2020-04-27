import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieSearch, clearMovieSearch } from '../../actions/index';
import { Link } from 'react-router-dom';

import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const MovieSearch = (props) => {
    const movieSearch = useSelector(state => state.movieSearch);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);
    const searchValue = props.match.params.movie;

    useEffect( () => {
        getMovieSearch(dispatch, currentPage, searchValue);

        return () => clearMovieSearch(dispatch);
    }, [dispatch, currentPage, searchValue]);

    const changePage = useCallback((page) => setCurrentPage(page), [setCurrentPage]);
    const handleToggle = useCallback(() => setToggle(!toggle), [toggle, setToggle]);

    if(movieSearch.movies === null || movieSearch.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }

    const { results, total_results, total_pages } = movieSearch.movies;

    return (
        <React.Fragment>
            <Header />
            <div className="page">
                <div className="sidebar">
                    <Sidebar toggle={toggle} setToggle={handleToggle} />
                </div>
                <div className={!toggle ? "discover-container" : "discover-container full"}>
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
        </React.Fragment>
    )
};
export default MovieSearch;
