import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getPersonMovies, clearPersonMovies } from '../../actions/index';

import MovieBox from './MovieBox';
import Pagination from './Pagination';

export const PersonMovies = ({ personId }) => {
    const personMovies = useSelector(state => state.personMovies);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getPersonMovies(dispatch, currentPage, personId);

        return () => clearPersonMovies(dispatch);
        // eslint-disable-next-line
    }, [dispatch, personId, currentPage]);

    const changePage = useCallback(page => setCurrentPage(page), [setCurrentPage]);

    if(personMovies.movies === null || personMovies.loading){
        return null;
    }

    const { results, total_results, total_pages } = personMovies.movies;

    console.log(results.length);

    const style = { gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))" };

    if(results.length === 0){
        return(
            <h4 className="warning">Sorry, no related movies available!</h4> 
        )
    }

    return (
        <div className="discover-container">
            <div className="home-page">
            <h2>Related Movies: </h2>
                <div style={style} className="movies-list">
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
}
export default React.memo(PersonMovies);