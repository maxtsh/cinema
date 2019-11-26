import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPersonMovies } from '../../actions/index';
import MovieBox from './MovieBox';
import Pagination from './Pagination';
import Loader from './Loader';

export const PersonMovies = (props) => {
    const { personId, getPersonMovies, personMovies } = props;
    const persMovies = personMovies.personMovies;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getPersonMovies(currentPage, personId);

        // eslint-disable-next-line
    }, [personId, currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    if( persMovies === null || persMovies === true){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    }

    const { results, total_results, total_pages } = persMovies;
    const style = { gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))" };
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

const mapStateToProps = (state) => ({
    personMovies: state.personMovies
});
export default connect(mapStateToProps, { getPersonMovies })(PersonMovies);
