import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getGenres } from '../../actions/index';
import { Link } from 'react-router-dom';

const MainMenu = (props) => {

    const { getGenres, genere } = props;
    const { genres } = genere;
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState("");

    useEffect( () => {

        getGenres();

        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(searchValue === "" || searchValue === null){
            setError({isError: true, msg: "Must Not Be Empty!"});
        }else{
            setError({isError: false, msg: null});
            window.location = `/search/${searchValue}`;
        }
        
    }

    if(genres === null){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <h1>Loading...</h1>
            </div>
        )
    }else{

        const showError = error.isError;

        return (
            <nav>
                <div className="dropdown">
                    <button><Link className="home-menu" to="/">Home</Link></button>
                    <div className="discover-menu">
                        <button>Discover <i className="fas fa-caret-down"></i></button>
                        <ul>
                            <li><i className="fas fa-clock"></i><Link to="/discover/now_playing"> Now Playing</Link></li>
                            <li><i className="fas fa-star"></i><Link to="/discover/top_rated"> Top Rated</Link></li>
                            <li><i className="fas fa-hand-holding-heart"></i><Link to="/discover/popular">Popular</Link></li>
                            <li><i className="fas fa-gift"></i> <Link to="/discover/upcoming">Upcoming</Link></li>
                        </ul>
                    </div>
                    <div className="genres-menu">
                        <button>Genres <i className="fas fa-caret-down"></i></button>
                        <ul>
                            {genres.genres.map( (genre) => (
                                <Link key={genre.id} to={`/genres/${genre.name}/${genre.id}`}>
                                    <i className="fas fa-video"></i> <li>{genre.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={searchValue}
                            placeholder={ showError ? `${error.msg}` : "Search Movies..."} 
                            onChange={handleChange}
                            style={showError ? { border: "1px solid red"} : null}
                            />
                            <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    genere: state.genere,
});

export default connect(mapStateToProps, { getGenres })(MainMenu);
