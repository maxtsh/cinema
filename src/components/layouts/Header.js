import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/tmdb-powered-rectangle.png'

import { useSelector, useDispatch } from 'react-redux';
import { getGenres, clearGenres } from '../../actions/index';

const Header = () => {
    const genere = useSelector(state => state.genere);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState("");

    useEffect( () => {
        getGenres(dispatch);

        return () => clearGenres(dispatch);
    }, [dispatch]);

    const handleChange = useCallback((e) => {setSearchValue(e.target.value)}, [setSearchValue]);
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if(searchValue === "" || searchValue === null){
            setError({isError: true, msg: "Please Enter Something"});
        }else{
            setError({isError: false, msg: null});
            window.location = `/search/${searchValue}`;
        }
    }, [setError, searchValue]);


    if(genere.genres === null || genere.loading){
        return null;
    }
    const showError = error.isError;
    return (
        <header>
            <nav>
                <div className="hamburger" onClick={() => setOpen(!open)} >
                    {open ? (<i className="fas fa-times-circle"></i>) 
                        : 
                    (<i className="fas fa-bars"></i>)}
                </div>

                <ul className={open ? "nav-links open" : "nav-links"}>
                    <li className={open ? "nav-item fade" : "nav-item"}>
                        <img className="logo" src={Logo} alt="logo"/>
                    </li>
                    <li className={open ? "nav-item fade" : "nav-item"}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={open ? "nav-item fade" : "nav-item"}>
                        <Link to="/discover/now_playing">Now Playing</Link>
                    </li>
                    <li className={open ? "nav-item fade" : "nav-item"}>
                        <Link to="/discover/top_rated">Top Rated</Link>
                    </li>
                    <li className={open ? "nav-item fade" : "nav-item"}>
                        <Link to="/discover/popular">Popular</Link>
                    </li>
                    <li className={open ? "nav-item fade" : "nav-item"}>
                        <Link to="/discover/upcoming">Upcoming</Link>
                    </li>
                </ul>

                <div className="menu">

                <div className="left-menu">
                        <form className="search-form" onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                value={searchValue}
                                placeholder={ showError ? `${error.msg}` : "Search Movies..."} 
                                onChange={handleChange}
                                style={showError ? { border: "1px solid red"} : null}
                            />
                            <input type="submit" name="submit" id="submit" />
                            <label htmlFor="submit">
                                <i className="fas fa-search"></i>
                            </label>
                        </form>
                    </div>

                    <div className="right-menu">
                        <Link className="home-btn" to="/">Home</Link>
                        <div className="menu-discover">
                            <Link to="#" className="menu-btn">
                                Discover <i className="fas fa-caret-down"></i>
                            </Link>
                            <ul className="main-menu">
                                <li>
                                    <Link to="/discover/now_playing">
                                        <i className="fas fa-clock"></i>
                                        <h6>Now Playing</h6>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/discover/top_rated">
                                        <i className="fas fa-star"></i>
                                        <h6>Top Rated</h6>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/discover/popular">
                                        <i className="fas fa-hand-holding-heart"></i>
                                        <h6>Popular</h6>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/discover/upcoming">
                                        <i className="fas fa-gift"></i>
                                        <h6>Upcoming</h6>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="menu-genres">
                            <Link to="#" className="menu-btn">
                                Genres <i className="fas fa-caret-down"></i>
                            </Link>
                            <ul>
                                {genere.genres.genres.map((genre) => (
                                    <li key={genre.id}>
                                        <Link to={`/genres/${genre.name}/${genre.id}`}>
                                            <i className="fas fa-video"></i>
                                            <h6>{genre.name}</h6>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
        </header>
    )
}
export default Header;