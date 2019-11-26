import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/index'; // Our Action is in the props
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import MainMenu from '../layouts/MainMenu';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const Discover = (props) => {

    const { getLogs, log } = props; // We Must pull the action out of props
    const [currentPage, setCurrentPage] = useState(1);
    const [loaded, setLoaded] = useState(false);

     useEffect( () => {
        getLogs(currentPage);
        setLoaded(false);

        setTimeout(() => {
            setLoaded(true);
        }, 500)
        // eslint-disable-next-line
    }, [currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    if(log.logs === null || log.loading === true || !loaded){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    }

    const { results, total_results, total_pages } = log.logs;

    return (
        <LazyLoad height={200} offset={200}>
            <MainMenu />
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
        </LazyLoad>
    )

}

const mapStateToProps = (state) => ({
    log: state.log
});
export default connect(mapStateToProps, { getLogs })(Discover);
