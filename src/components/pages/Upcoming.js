import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUpcoming } from '../../actions/index';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import MainMenu from '../layouts/MainMenu';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const Upcoming = (props) => {

    const { getUpcoming, upcoming } = props;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUpcoming(currentPage);

        // eslint-disable-next-line
    }, [currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    if(upcoming.upcoming === null){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    } else{

        const { results, total_results, total_pages } = upcoming.upcoming;

        return (
            <LazyLoad height={200} offset={200}>
                <MainMenu />
                <div className="page">
                    <div className="sidebar">
                        <Sidebar thePage={"upComing"} />
                    </div>
                    <div className="discover-container">
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
            </LazyLoad>
        ) 
    }

}

const mapStateToProps = (state) => ({
    upcoming: state.upcoming
});
export default connect(mapStateToProps, { getUpcoming })(Upcoming);
