import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/tmdb-powered-rectangle.png';

const Footer = () => {
    const time = new Date();
    return (
        <React.Fragment>
            <div className="footer">
                <div className="footer-main">
                    <div className="footer-follows">
                        <h4>Follow</h4>
                        <ul>
                            <li>
                                <a href="https://instagram.com/maxtsh" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram-square"></i>
                                </a> 
                            </li>
                            <li>
                                <a href="https://github.com/maxtsh" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github-square"></i>
                                </a> 
                            </li>
                            <li>
                                <a href="https://twitter.com/realmaxtsh" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter-square"></i>
                                </a> 
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/max-tat-shahdoost-1b36bb130/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a> 
                            </li>
                            <li>
                                <a href="https://www.facebook.com/realmaxtsh" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-square"></i>
                                </a> 
                            </li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/discover/now_playing">Now Playing</Link></li>
                            <li><Link to="/discover/top_rated">Top Rated</Link></li>
                            <li><Link to="/discover/popular">Popular</Link></li>
                            <li><Link to="/discover/upcoming">Upcoming</Link></li>
                        </ul>
                    </div>
                    <div className="footer-contacts">
                        <h4>Contact</h4>
                        <Link to="#">tatshahdoost@gmail.com</Link>
                    </div>
                    <div className="footer-credits">
                        <h4>Credits</h4>
                        <img src={Logo} alt="tmdb"/>
                        <p>Powered by: <a href="https://www.themoviedb.org/">TMDB</a></p>
                    </div>
                </div>
                <hr/>
                <div className="footer-scrum">
                    <h3>Cinema App</h3>
                    <p>All Rights Reserved By MaxTsh 2019-{time.getFullYear()}</p>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Footer;