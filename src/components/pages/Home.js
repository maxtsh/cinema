import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';

import back1 from '../../images/backgrounds/background1.jpg';
import back2 from '../../images/backgrounds/background2.jpg';
import back3 from '../../images/backgrounds/background3.jpg';
import back4 from '../../images/backgrounds/background4.jpg';
import back5 from '../../images/backgrounds/background5.jpg';
import back6 from '../../images/backgrounds/background6.jpg';
import back7 from '../../images/backgrounds/background7.jpg';

const Home = () => {
    const imageUrls = [back1, back2, back3, back4, back5, back6, back7];
    const [background, setBackground] = useState(back1);
    const [index, setIndex] = useState(0);
    const [isPlaying, setPlaying] = useState(true);
    const style = {backgroundImage: `url(${background})`};

    useEffect(() => {

        const slide = () => {
            if(index < imageUrls.length - 1){
                setIndex(index + 1);
            }else{
                setIndex(0);
            }
            setBackground(imageUrls[index]);
        }

        if(isPlaying){
        
            const imageInterval = setInterval(slide, 4000);

            return () => clearInterval(imageInterval); // We Must Clear Interval In Order To Prevent Multiople Intervals and Therefor Multiple Hook Updates To Happen After Each Render
        }

    }, [background, index, isPlaying, imageUrls]);

    console.log("REDNER");

    const handleClick = (e) => {
        e.preventDefault();
        setPlaying(!isPlaying);
    }

    return (
        <div style={style} className="home-container">
            <Header />
            <div className="welcome">
                <h1>THE MOVIE DATABASE</h1>
                <p>Search inside the world's largest Movie database</p>
                {imageUrls.map(imgUrl => {
                    return (
                        <Link 
                            key={imgUrl} 
                            to="#" 
                            onClick={() => setBackground(imgUrl)}
                            className={imgUrl === background ? "active" : null}
                            >
                            <i className="fas fa-circle"></i>
                        </Link>)
                })}
                <div className="play">
                    <Link to="#" onClick={handleClick}>
                        { isPlaying ?(<i className="fas fa-pause-circle"></i>) : (<i className="fas fa-play"></i>)}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;