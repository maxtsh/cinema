import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPerson } from '../../actions/index';
import LazyLoad from 'react-lazyload';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Loader from '../layouts/Loader';
import SinglePersonIntro from '../layouts/SinglePersonIntro';
import SinglePersonDetails from '../layouts/SinglePersonDetails';
import PersonMovies from '../layouts/PersonMovies';
import backGround from '../../images/backgrounds/person_background.jpg';

const Person = (props) => {
    const { getPerson, person } = props;
    const personId = props.match.params.id;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getPerson(personId);

        setTimeout(() => {
            setLoaded(true);
        }, 700);
        
        // eslint-disable-next-line
    }, [personId]);

    if(person.person === null || person.loading === true || !loaded){

        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )

    }else{
        const style = { backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.6) 3%, rgba(0,0,0,0.8) 50%), url(${backGround})`};

        return (
            <LazyLoad height={200} offset={200}>
                <div className="single-movie">
                    <div className="movie-header" style={style}>
                        <Header />
                    </div>
                    <section className="movie-intro">
                        <div className="container">
                            <SinglePersonIntro person={person.person} />
                        </div>
                    </section>
                    <section className="movie-main-details">
                        <div className="container">
                            
                            <SinglePersonDetails person={person.person} />

                            <h1>Related Movies: </h1>
                            <PersonMovies personId={personId} />
                            
                        </div>
                    </section>
                </div>
                <Footer />
            </LazyLoad>
        )
    }
}

const mapStateToProps = (state) => ({
    person: state.person,
});

export default connect(mapStateToProps, { getPerson })(Person);
