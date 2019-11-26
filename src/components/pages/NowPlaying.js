import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNowPlaying } from '../../actions/index'; // Our Action is in the props
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import MainMenu from '../layouts/MainMenu';
import Sidebar from '../layouts/Sidebar';
import MovieBox from '../layouts/MovieBox';
import Pagination from '../layouts/Pagination';
import Loader from '../layouts/Loader';

const NowPlaying = (props) => {

    const { getNowPlaying, nowPlaying} = props; // We Must pull the action out of props
    const [currentPage, setCurrentPage] = useState(1);

     useEffect( () => {
        getNowPlaying(currentPage);

        // eslint-disable-next-line
    }, [currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    if(nowPlaying.nowPlaying === null){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    }else{
        const { results, total_results, total_pages } = nowPlaying.nowPlaying;

        return (
            <LazyLoad height={200} offset={200}>
                <MainMenu />
                <div className="page">
                    <div className="sidebar">
                        <Sidebar thePage={"nowPlaying"} />
                    </div>
                    <div className="discover-container">
                        <div className="home-page">
                        <h2 className="page-title">Now Playing Movies</h2>
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
    nowPlaying: state.nowPlaying
});
export default connect(mapStateToProps, { getNowPlaying })(NowPlaying);
