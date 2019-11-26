import React, { useState, useEffect } from 'react';
import imageLoader from '../../images/imageLoading.gif';

const SingleMovieDetails = (props) => {
    
    const { movie, director } = props;
    const [isLoaded, setLoaded] = useState(false);

    const movieLang = movie.spoken_languages.map((lang) => ` ${lang.name}`);
    const movieCountries = movie.production_countries.map((pCountry) => pCountry.name);
    const movieCompanies = movie.production_companies.map((pCompany) => ` ${pCompany.name}`);

    useEffect(() => {

        return () => setLoaded(false);
        // eslint-disable-next-line
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

    let movieBudget = "";
    if(movie.budget === 0){
        movieBudget = "Unknown";
    }else{
        movieBudget = formatter.format(movie.budget);
    }

    let style = {};
    let posterUrl = "";
    if(movie.belongs_to_collection !== null) {
        style = { backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.belongs_to_collection.backdrop_path})`};
        posterUrl = `https://image.tmdb.org/t/p/original/${movie.belongs_to_collection.poster_path}`;
    }

    return (
        <div className="movie-details">
            <div className="overview col-lg-8">
                <h1>Story:</h1>
                <p>{movie.overview}</p>
                {movie.belongs_to_collection !== null ? (
                    <div className="belong-collection" style={style}>
                        <h3>From {movie.belongs_to_collection.name}</h3>

                        {!isLoaded ? (
                            <img className='poster' src={imageLoader} alt="movie_poster" />
                        ) : null}

                        <img 
                            onLoad={() => setLoaded(true)}
                            src={posterUrl} 
                            style={!isLoaded ? { display: 'none' } : {}}
                            alt="Poster"
                        />

                    </div>
                ): null}
            </div>
            <div className="details col-lg-4">
                <ul>
                    <li><i className="fas fa-video"></i> Director: <span>{director[0].name}</span></li>
                    <li><i className="fas fa-calendar-alt"></i> Release Date: <span>{movie.release_date}</span></li>
                    <li><i className="fas fa-star-half-alt"></i> IMDB Rate: <span>{movie.vote_average} by {movie.vote_count} votes</span> </li>
                    <li><i className="fas fa-globe-americas"></i> Country: <span>{" " + movieCountries}</span></li>
                    <li><i className="fas fa-building"></i> Company: <span>{" " + movieCompanies}</span></li>
                    <li><i className="fas fa-language"></i> Language: <span>{" " + movieLang}</span></li>
                    <li><i className="fas fa-hand-holding-usd"></i> Budget: <span>{" " + movieBudget}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default SingleMovieDetails;
