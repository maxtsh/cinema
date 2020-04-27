import React, { useState, useEffect } from 'react';
import imageLoader from '../../images/loader.gif';
import noImagePL from '../../images/poster_placeholder.png';

const SingleMovieDetails = (props) => {
    const { movie, director } = props;
    const [isLoaded, setLoaded] = useState(false);

    const movieLang = movie.spoken_languages.map((lang) => ` ${lang.name}`);
    const movieCountries = movie.production_countries.map((pCountry) => pCountry.name);
    const movieCompanies = movie.production_companies.map((pCompany) => ` ${pCompany.name}`);
    const movieGenres = movie.genres.map((genre) => `${genre.name}, `);

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
    let noPoster = "";
    if(movie.belongs_to_collection !== null) {

        noPoster = movie.belongs_to_collection.poster_path === "" || movie.belongs_to_collection.poster_path === null || movie.belongs_to_collection.poster_path === undefined;

        style = { backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.belongs_to_collection.backdrop_path})`};
        posterUrl = `https://image.tmdb.org/t/p/original/${movie.belongs_to_collection.poster_path}`;
    }
    console.log(movie.overview);
    return (

        <div className="main-details-wrapper">
            <h2>Story</h2>
            <div className="overview">
                {movie.overview === "" ? 
                (<h3 className="warning">No story available!</h3>) : 
                (<p>{movie.overview}</p>)}
                {movie.belongs_to_collection !== null ? (
                    <div className="belong-collection" style={style}>
                        <h3>From {movie.belongs_to_collection.name}</h3>
                        {noPoster ? (
                                <img className="blank-image"  src={noImagePL} alt="Sorry, no poster available" />
                            ): (
                                <React.Fragment>
                                    {/* If the poster is not yet loaded, show the loader */}
                                    {!isLoaded ? (
                                            <div className="belong-collection-poster-loader">
                                                <img src={imageLoader} alt="loader" />
                                            </div>
                                        ) : null }

                                        <img 
                                            onLoad={() => setLoaded(true)}
                                            src={posterUrl} 
                                            style={!isLoaded ? { display: 'none' } : {}}
                                            alt="Poster"
                                        />
                                </React.Fragment>
                            )}
                        {noPoster ? (<h6>No collection poster available</h6>) : null}
                    </div>
                ): null}
            </div>
            <h2>Details</h2>
            <div className="details">
                <ul>
                    <li>
                        <i className="fas fa-video"></i> Director: <span>{director.length !== 0 ? director[0].name : "Unkown"}</span>
                    </li>
                    <li>
                        <i className="fas fa-calendar-alt"></i> Release Date: <span>{movie.release_date}</span>
                    </li>
                    <li>
                        <i className="fas fa-star-half-alt"></i> IMDB Rate: <span>{movie.vote_average} by {movie.vote_count} votes</span>
                    </li>
                    <li>
                        <i className="fas fa-globe-americas"></i> Country: <span>{" " + movieCountries}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <i className="fas fa-building"></i> Company: <span>{" " + movieCompanies}</span>
                    </li>
                    <li>
                        <i className="fas fa-language"></i> Language: <span>{" " + movieLang}</span>
                    </li>
                    <li>
                        <i className="fas fa-hand-holding-usd"></i> Budget: <span>{" " + movieBudget}</span>
                    </li>
                    <li>
                        <i className="fas fa-film"></i> Genres: <span>{ movieGenres}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default React.memo(SingleMovieDetails);
