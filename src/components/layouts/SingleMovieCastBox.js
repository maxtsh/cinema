import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../images/avatars/avatar.png';

const SingleMovieCastBox = (props) => {
    const { cast } = props;
    const [amount, setAmount] = useState({avatar: 10, nAvatar: 5});
    const baseAvatar = `https://image.tmdb.org/t/p/w342/`;
    return (
        <React.Fragment>
            <h2>Cast</h2>
            <div className="movie-cast-list">
                {cast.filter(cast => cast.profile_path).slice(0, amount.avatar).map(singleCast => (
                    <div key={singleCast.cast_id} className="movie-cast">
                        <Link className="person-link" to={`/person/${singleCast.id}`} >
                            <img className="poster" src={`${baseAvatar}${singleCast.profile_path}`} alt="cast_avatar" />
                            <div className="movie-cast-details">
                                <h5>{singleCast.name} As {singleCast.character}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
                {cast.filter(cast => !cast.profile_path).slice(0, amount.nAvatar).map(singleCast => (
                    <div key={singleCast.cast_id} className="movie-cast">
                        <Link className="person-link" to={`/person/${singleCast.id}`} >
                            <img className="poster" src={Avatar} alt="cast_avatar" />
                            <div className="movie-cast-details">
                                <h5>{singleCast.name} As {singleCast.character}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {amount.avatar === 10 ? (
                <button onClick={() => setAmount({avatar: 30, nAvatar: 20})}>More...</button>
            ) : (
                <button onClick={() => setAmount({avatar: 10, nAvatar: 5})}>Less...</button>
            )}
        </React.Fragment>
    )
};
export default React.memo(SingleMovieCastBox);