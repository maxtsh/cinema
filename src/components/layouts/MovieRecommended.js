import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../images/loader.gif';

import { useSelector, useDispatch } from 'react-redux';
import { getRecommendedMovies, clearRecommendedMovies } from '../../actions/index';

import MovieBox from './MovieBox';
import Pagination from './Pagination';

export const MovieRecommended = ({ movieId }) => {
    const recommendedMovies = useSelector(state => state.recommendedMovies);
    const dispatch = useDispatch();

    const recMovies = recommendedMovies.movies;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getRecommendedMovies(dispatch, movieId, currentPage);

        return () => clearRecommendedMovies(dispatch);
    }, [dispatch, movieId, currentPage]);

    const changePage = useCallback(page => setCurrentPage(page), [setCurrentPage]);

    if( recMovies === null || recMovies.loading){
        return (
            <div className="discover-container">
                <div style={{height: "100vh"}} >
                    <img src={Loader} alt=""/>
                </div>
            </div>
        )
    }

    const { results, total_results, total_pages } = recMovies;

    if(results.length === 0){
        return(
            <h4 className="warning">Sorry, no recommendations available!</h4> 
        )
    }
    
    return (
        <div className="discover-container recommended">
            <div className="home-page">
                <div  className="movies-list">
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
    )
};
export default React.memo(MovieRecommended);