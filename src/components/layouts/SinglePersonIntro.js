import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageLoader from '../../images/imageLoading.gif';

const SinglePersonIntro = (props) => {
    const { person } = props;
    const imdbUrl = `//www.imdb.com/name/${person.imdb_id}`;
    const profileUrl = `https://image.tmdb.org/t/p/w780${person.profile_path}`;
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        return () => setLoaded(false);
    }, []);

    let webLink = "";
    if(person.homepage === null || person.homepage === undefined || person.homepage === ""){

        webLink = "#";

    }else if(person.homepage.split("")[4] === "s"){

        webLink = `//${person.homepage.split("").splice(8).join("")}`;
    }else{
        
        webLink = `//${person.homepage.split("").splice(7).join("")}`;
    }

    let gender = "";
    if(person.gender === 1 && person.known_for_department === "Acting"){
        gender = "Female Actress";
    }else if(person.gender === 2 && person.known_for_department === "Acting"){
        gender = "Male Actor";
    }else if(person.gender === 1){
        gender = "Female";
    }else if(person.gender === 2){
        gender = "Male"
    } else{
        gender = "Mixed Gender";
    }

    const deathDay = person.deathday === null ? "" : `Died on ${person.deathday}`;
    const deathStyle = person.deathday !== null ? {backgroundColor: 'red', padding: '0 0.4rem', borderRadius: "0.5rem"} : null;

    return (
        <div className="movie-intro-main col-md-12">
            <div className="single-movie-poster">
                {!isLoaded ? (
                    <img className='poster' src={imageLoader} alt="movie_poster" />
                ) : null}
                <img 
                    onLoad={() => setLoaded(true)} 
                    src={profileUrl} 
                    style={!isLoaded ? { display: 'none' } : {}}
                    alt=""
                    />
            </div>
            <div className="single-movie-intro-details">
                <h2>{person.name}</h2>
                <p>Career: {person.known_for_department}</p>
                <p>
                    {gender}
                </p>
                <p>Popularity: {person.popularity}%</p>
                <p style={deathStyle}>{deathDay}</p>

                <Link className="website-link" target="_blank" to={webLink}>
                    <i className="fas fa-link"></i> Website
                </Link>

                <Link className="imdb-link" target="_blank" to={imdbUrl}>
                    <i className="fab fa-imdb"></i> IMDB
                </Link>
            </div>
        </div>
    )
}

export default SinglePersonIntro;
