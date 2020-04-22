import React from 'react';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MainSlider = ({ posters, setIndex, index, handlePlay, isPlaying }) => {
        const next = () => {
        if(index < 19){
            setIndex(index + 1);
        }else{
            setIndex(0);
        }
    };

    const prev = () => {
        if(index > 0){
            setIndex(index - 1);
        }else{
            setIndex(19);
        }
    };

    let settings = {
        initialSlide: 0,
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        swipeToSlide: true,
        speed: 2000,
        slidesToShow: 8,
        slidesToScroll: 4,
        // variableWidth: true,
        // adaptiveHeight: true,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
    
        responsive: [
            {
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
                infinite: true,
            }
            },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                infinite: true,
            }
            },
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
            }
      ]
    };


    return (
    <div className="slider-wrapper">
        <div className="slide-tools">
            <div className="prev">
                <Link to="#" onClick={prev} >
                    <i className="fas fa-arrow-alt-circle-left"></i>
                </Link>
            </div>
            <div className="play">
                <Link to="#" onClick={handlePlay} >
                    { isPlaying ? 
                    (<i className="fas fa-pause-circle"></i>) : 
                    (<i className="fas fa-play"></i>) }
                </Link>
            </div>
            <div className="next">
                <Link to="#" onClick={next} >
                    <i className="fas fa-arrow-alt-circle-right"></i>
                </Link>
            </div>
        </div>

        <div className="slider">
            <Slider {...settings}>
                {posters.map((poster, i)=>(
                    <Link 
                        key={i} 
                        to="#" 
                        onClick={() => setIndex(i)}
                    >
                        {/* <i className="fas fa-circle"></i> */}
                        <img 
                            src={`https://image.tmdb.org/t/p/w500/${poster}`}
                            alt=""
                        />
                    </Link>     
                ))}
            </Slider>
        </div>
    </div>
    )
};
export default MainSlider;