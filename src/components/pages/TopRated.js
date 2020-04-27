import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getTopRated, clearTopRated } from '../../actions/index';

import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const TopRated = () => {
    const topRated = useSelector(state => state.topRated);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);

    useEffect( () => {
        getTopRated(dispatch, currentPage);

        return () => clearTopRated(dispatch);
    }, [dispatch, currentPage]);

    const changePage = useCallback((page) => {setCurrentPage(page);}, [setCurrentPage]);
    const handleToggle = useCallback(() => setToggle(!toggle), [toggle, setToggle]);

    if(topRated.movies === null || topRated.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
    const { results, total_results } = topRated.movies;  
    return (
        <React.Fragment>
            <Header />
            <div className="page">
                <div className="sidebar">
                    <Sidebar toggle={toggle} setToggle={handleToggle} />
                </div>
                <div className={!toggle ? "discover-container" : "discover-container full"}>
                    <div className="home-page">
                    <h2 className="page-title">Top Rated Movies</h2>
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
                            />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default TopRated;