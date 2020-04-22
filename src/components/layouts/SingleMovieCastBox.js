import React from 'react';
import { Link } from 'react-router-dom';

const SingleMovieCastBox = (props) => {
    const { cast } = props;
    const baseAvatar = `https://image.tmdb.org/t/p/w342/`;

    return (
        <React.Fragment>
            <h2>Cast</h2>
            <div className="movie-cast-list">
                {cast.filter(cast => cast.profile_path !== null).map(singleCast => (
                <div key={singleCast.cast_id} className="movie-cast">
                    <Link className="person-link" to={`/person/${singleCast.id}`} >
                        <img className="poster" src={`${baseAvatar}${singleCast.profile_path}`} alt="cast_avatar" />
                        <div className="movie-cast-details">
                            <h5>{singleCast.name} As {singleCast.character}</h5>
                        </div>
                    </Link>
                </div>
                ))}
            </div>
        </React.Fragment>
    )
}
export default React.memo(SingleMovieCastBox);