import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';


const SingleMovieCrewBox = (props) => {
    const { crew } = props;
    const [toggleValue, setToggleValue] = useToggle(false);
    const baseAvatar = `https://image.tmdb.org/t/p/w342/`;

    let show;
    if(toggleValue){
        show = 30;
    }else{
        show = 5;
    }

    const handleClick = (e) => {
        e.preventDefault();
        setToggleValue(!toggleValue);
    }


    const crewBtnText = toggleValue ? "Show less" : "Show more";

    return (
        <Fragment>
            <div className="movie-cast-list">
                {crew.filter(crew => crew.profile_path !== null).slice(0, show).map(singleCrew => (
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
            <button onClick={handleClick} >{crewBtnText}</button>
        </Fragment>
    )
}

export default SingleMovieCrewBox;
