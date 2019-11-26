import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecommendedMovies } from '../../actions/index';
import MovieBox from './MovieBox';
import Pagination from './Pagination';
import Loader from './Loader';

export const MovieRecommended = (props) => {
    const { movieId, getRecommendedMovies, recommendedMovies } = props;
    const recMovies = recommendedMovies.recommendedMovies;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getRecommendedMovies(movieId, currentPage);

        // eslint-disable-next-line
    }, [movieId, currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    if( recMovies === null || recMovies === true){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    }

    const { results, total_results, total_pages } = recMovies;
    const style = { gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))" };

    if(results.length === 0){
        return(
            <h4>No Recommendation Available!</h4>
        )
    }else{
        return (
            <div className="discover-container">
                <div className="home-page">
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
}

const mapStateToProps = (state) => ({
    recommendedMovies: state.recommendedMovies
});
export default connect(mapStateToProps, { getRecommendedMovies })(MovieRecommended);
