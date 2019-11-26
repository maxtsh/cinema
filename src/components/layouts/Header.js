import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <nav className="container">
                <img className='main-logo' src={require('../../images/tmdb-powered-dark.png')} alt="Logo"/>

                {/* <div className="toggle">
                    <label className="switch"><input type="checkbox" /><div></div>
                    </label>
                </div> */}

                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/discover/popular'>Discover</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
