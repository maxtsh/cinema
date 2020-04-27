import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Genres from './Genres';

const Siderbar = React.memo(({thePage, toggle, setToggle }) => {
    const [dropdown, setDropdown] = useState(false);
    
    const popularClass = thePage === "Popular" ? "main-categories current-link" : "main-categories";
    const topRatedClass = thePage === "topRated" ? "main-categories current-link" : "main-categories";
    const upComingClass = thePage === "upComing" ? "main-categories current-link" : "main-categories";
    const nowPlayingClass = thePage === "nowPlaying" ? "main-categories current-link" : "main-categories";

    const handleClick = useCallback(() => setDropdown(!dropdown), [dropdown]);

    return (
        <div className={ toggle ? "page-wrapper chiller-theme toggled" : "page-wrapper chiller-theme not-toggled"} >
            <Link id="show-sidebar" className="btn btn-sm btn-dark" to="#" onClick={() => setToggle(true)} >
                <i className="fas fa-arrow-alt-circle-right"></i>
            </Link>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <Link to="#">Cinema App</Link>
                        <div id="close-sidebar" onClick={() => setToggle(false)}>
                            <i className="fas fa-arrow-alt-circle-left"></i>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul>
                            <li className="sidebar-dropdown ">
                                <Link to="#">
                                    <span>Discover</span>
                                </Link>
                            </li>
                            <li>
                                <Link className={nowPlayingClass} to="/discover/now_playing">
                                    <i className="fas fa-clock"></i> Now Playing
                                </Link>
                            </li>

                            <li>
                                <Link className={popularClass} to="/discover/popular">
                                    <i className="fas fa-hand-holding-heart"></i> Popular
                                </Link>
                            </li>
           
                            <li>
                                <Link className={topRatedClass} to="/discover/top_rated">
                                    <i className="fas fa-star"></i> Top Rated
                                </Link>
                            </li>

                            <li>
                                <Link className={upComingClass} to="/discover/upcoming">
                                    <i className="fas fa-gift"></i> Upcoming
                                </Link>
                            </li>

                            <li className={dropdown ? "sidebar-dropdown active" : "sidebar-dropdown"}>
                                <Link onClick={handleClick} to="#">
                                    <span>Geners</span>
                                    <i className="fas fa-level-down-alt"></i>
                                </Link>
                                <div style={dropdown ? {display: "block"} : null} className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <Genres genrePage={thePage} />
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
});
export default Siderbar;