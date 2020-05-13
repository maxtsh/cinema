import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getUpcoming, clearUpcoming } from '../../actions/index';

import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const Upcoming = () => {
    const  upcoming = useSelector(state => state.upcoming);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        getUpcoming(dispatch, currentPage);

        return () => clearUpcoming(dispatch);
    }, [dispatch, currentPage]);

    const changePage = useCallback((page) => {setCurrentPage(page)}, [setCurrentPage]);
    const handleToggle = useCallback(() => setToggle(!toggle), [toggle, setToggle]);

    if(upcoming.movies === null || upcoming.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
    const { results, total_results, total_pages } = upcoming.movies;
    return (
        <>
            <Header />
            <div className="page">
                <div className="sidebar">
                    <Sidebar thePage={"upComing"} toggle={toggle} setToggle={handleToggle} />
                </div>
                <div className={!toggle ? "discover-container" : "discover-container full"}>
                    <div className="home-page">
                    <h2 className="page-title">Upcoming Movies</h2>
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
        </>
    ) 
};
export default Upcoming;