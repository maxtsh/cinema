import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getMovieByGenre, clearMovieByGenre } from '../../actions/index';

import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const MovieByGenre = (props) => {
    const movieByGenre = useSelector(state => state.movieByGenre);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [toggle, setToggle] = useState(true);

    const genreId = props.match.params.id;

    useEffect( () => {
        getMovieByGenre(dispatch, currentPage, genreId, sortBy);

        return () => clearMovieByGenre(dispatch);
    }, [dispatch, currentPage, genreId, sortBy]);

    const changePage = useCallback((page) => setCurrentPage(page), [setCurrentPage]);
    const handleChange = useCallback(e => setSortBy(e.target.value), [setSortBy]);
    const handleToggle = useCallback(() => setToggle(!toggle), [toggle, setToggle]);

    if(movieByGenre.movies === null || movieByGenre.loading === true){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
    const { results, total_results, total_pages } = movieByGenre.movies;
    return (
        <>
            <Header />
            <div className="page">
                <div className="sidebar">
                    <Sidebar thePage={props.match.params.name} toggle={toggle} setToggle={handleToggle} />
                </div>
                <div className={!toggle ? "discover-container" : "discover-container full"}>
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
        </>
    )
};
export default MovieByGenre;