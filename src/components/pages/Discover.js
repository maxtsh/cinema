import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopulars, clearPopulars } from '../../actions/index';
import { Link } from 'react-router-dom';

import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const Discover = () => {
    const populars = useSelector(state => state.populars);
    const dispatch = useDispatch();

    console.log("DISCOVER RENDER");

    const [currentPage, setCurrentPage] = useState(1);

     useEffect( () => {
        getPopulars(dispatch, currentPage);

        return () => clearPopulars(dispatch);
    }, [dispatch, currentPage]);

    const changePage = useCallback((page) => {setCurrentPage(page)}, [setCurrentPage]);

    if(populars.movies === null || populars.loading === true){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
    const { results, total_results, total_pages } = populars.movies;
    return (
            <React.Fragment>
            <Header />
            <div className="page">
                <div className="sidebar">
                    <Sidebar thePage={"Popular"} />
                </div>
                <div className="discover-container">
                    <div className="home-page">
                    <h2 className="page-title">Popular Movies</h2>
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
}
export default Discover;