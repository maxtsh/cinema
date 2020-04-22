import React from 'react';
import { Link } from 'react-router-dom';

const SingleMovieCrewBox = (props) => {
    const { crew } = props;
    const baseAvatar = `https://image.tmdb.org/t/p/w342/`;

    return (
        <React.Fragment>
            <h2>Crew</h2>
            <div className="movie-cast-list">
                {crew.filter(crew => crew.profile_path !== null).map(singleCrew => (
                    <div key={singleCrew.credit_id} className="movie-cast">
                        <Link className="person-link" to={`/person/${singleCrew.id}`}>
                            <img className="poster"src={`${baseAvatar}${singleCrew.profile_path}`} alt="cast_avatar"/>
                            <div className="movie-cast-details">
                                <h5>{singleCrew.name} As {singleCrew.job}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}
export default React.memo(SingleMovieCrewBox);