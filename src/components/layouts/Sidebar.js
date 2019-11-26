import React from 'react';
import Genres from './Genres';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    const currentPage = props.thePage;
    const popularClass = currentPage === "Popular" ? "main-categories current-link" : "main-categories";
    const topRatedClass = currentPage === "topRated" ? "main-categories current-link" : "main-categories";
    const upComingClass = currentPage === "upComing" ? "main-categories current-link" : "main-categories";
    const nowPlayingClass = currentPage === "nowPlaying" ? "main-categories current-link" : "main-categories";

    return (
        <div className="sidebar-main">
            <h2><Link to="/"><i className="fas fa-couch"></i> Your Cenema</Link></h2>
            <div className="logo-container">
                <img className="logo" src={require('../../images/tmdb-powered.png')} alt="Logo"/>
            </div>
            <h3>Discover</h3>

            <Link className={nowPlayingClass} to="/discover/now_playing">
                <i className="fas fa-clock"></i> Now Playing
            </Link>

            <Link className={popularClass} to="/discover/popular">
                <i className="fas fa-hand-holding-heart"></i> Popular
            </Link>

            <Link className={topRatedClass} to="/discover/top_rated">
                <i className="fas fa-star"></i> Top Rated
            </Link>

            <Link className={upComingClass} to="/discover/upcoming">
                <i className="fas fa-gift"></i> Upcoming
            </Link>

            <h3>Geners</h3>
            <Genres genrePage={props.thePage} />
        </div>
    )
}

export default Sidebar;
