import React, { useState } from 'react';
import Header from '../layouts/Header';
import NotFoundSvg from '../../images/notfound.svg';

const NotFound = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location = `/search/${searchValue}`;
    };

    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="not-found-svg">
                    <img src={NotFoundSvg} alt="not_found!"/>
                    <h1 className="not-found-text">404 Not Found</h1>
                </div>
                <div className="not-found-tools">
                    <h4 className="warning">Sorry, you were looking for something that does not exist. Please use search tool to find something else.</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="input-wrap">
                            <input 
                                type="text" 
                                name="text" 
                                required
                                value={searchValue}
                                onChange={handleChange}
                                />
                            <label htmlFor="email">
                                <span className="content">Search for something...</span>
                            </label>
                        </div>
                        <input type="submit" value="Find" />
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
export default NotFound;