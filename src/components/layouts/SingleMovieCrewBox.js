import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../images/avatars/avatar.png';

const SingleMovieCrewBox = (props) => {
    const { crew } = props;
    const [amount, setAmount] = useState({avatar: 10, nAvatar: 5});
    const baseAvatar = `https://image.tmdb.org/t/p/w342/`;

    return (
        <React.Fragment>
            <h2>Crew</h2>
            <div className="movie-cast-list">
                {crew.filter(crew => crew.profile_path).slice(0, amount.avatar).map(singleCrew => (
                    <div key={singleCrew.credit_id} className="movie-cast">
                        <Link className="person-link" to={`/person/${singleCrew.id}`}>
                            <img className="poster" src={`${baseAvatar}${singleCrew.profile_path}`} alt="cast_avatar"/>
                            <div className="movie-cast-details">
                                <h5>{singleCrew.name} As {singleCrew.job}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
                {crew.filter(crew => !crew.profile_path).slice(0, amount.nAvatar).map(singleCrew => (
                    <div key={singleCrew.credit_id} className="movie-cast">
                        <Link className="person-link" to={`/person/${singleCrew.id}`}>
                            <img className="poster"src={Avatar} alt="cast_avatar"/>
                            <div className="movie-cast-details">
                                <h5>{singleCrew.name} As {singleCrew.job}</h5>
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
export default React.memo(SingleMovieCrewBox);