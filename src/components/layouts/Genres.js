import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getGenres, clearGenres } from '../../actions/index';

const Genres = ({ genrePage }) => {
    const genere = useSelector(state => state.genere);
    const dispatch = useDispatch();

    useEffect( () => {
        getGenres(dispatch);

        return () => clearGenres(dispatch);
    }, [dispatch]);

    if(genere.genres === null || genere.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <div className="genres">
            <ul>
                {genere.genres.genres.map( (genre) => (
                        <Link key={genre.id} to={`/genres/${genre.name}/${genre.id}`} >
                            <li className={genre.name === genrePage ? "current-link" : null} ><i className="fas fa-video"></i> {genre.name}</li>
                        </Link>
                ))}
            </ul>
        </div>
    )
};
export default React.memo(Genres);