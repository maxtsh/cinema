import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';

const SingleMovieCastBox = (props) => {
    const { cast } = props;
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

    const castBtnText = toggleValue ? "Show less" : "Show more";

    return (
            <Fragment>
            <div className="movie-cast-list">
                {cast.filter(cast => cast.profile_path !== null).slice(0, show).map(singleCast => (
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
            <button onClick={handleClick} >{castBtnText}</button>
        </Fragment>
    )
}

export default SingleMovieCastBox;
