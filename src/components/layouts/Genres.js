import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGenres } from '../../actions/index';
import { Link } from 'react-router-dom';

const Genres = (props) => {

    const { getGenres, genere, genrePage } = props;
    const { genres } = genere;

    useEffect( () => {

        getGenres();

        // eslint-disable-next-line
    }, []);

    if(genres === null){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <h1>Loading...</h1>
            </div>
        )
    }else{
        return (
            <div className="genres">
                <ul>
                    {genres.genres.map( (genre) => (
                            <Link key={genre.id} to={`/genres/${genre.name}/${genre.id}`} >
                                <li className={genre.name === genrePage ? "current-link" : null} ><i className="fas fa-video"></i> {genre.name}</li>
                            </Link>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    genere: state.genere
});

export default connect(mapStateToProps, { getGenres })(Genres);