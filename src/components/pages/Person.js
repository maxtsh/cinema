import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getPerson, clearGetPerson } from '../../actions/index';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Loader from '../layouts/Loader';
import SinglePersonIntro from '../layouts/SinglePersonIntro';
import SinglePersonDetails from '../layouts/SinglePersonDetails';
import PersonMovies from '../layouts/PersonMovies';
import backGround from '../../images/backgrounds/person_background.jpg';

const Person = (props) => {
    const person = useSelector(state => state.person);
    const dispatch = useDispatch();
    const personId = props.match.params.id;

    useEffect(() => {
        getPerson(dispatch, personId);
        
        return () => clearGetPerson(dispatch);
    }, [dispatch, personId]);
    

    if(person.person === null || person.loading){
        return(
            <div style={{ textAlign: "center" }} className="container">
                <Loader />
            </div>
        )
    }
    
    const style = { 
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.6) 3%, rgba(0,0,0,0.8) 50%), url(${backGround})`
    };
    
    return (
        <React.Fragment>
            <Header />
            <div className="main-container">
                <div className="main-header" style={style}></div>
                <div className="container">

                    <div className="main-intro">
                        <SinglePersonIntro person={person.person} />
                    </div>

                    <div className="main-details">
                        <SinglePersonDetails person={person.person} />
                        <h2>Related Movies: </h2>
                        <PersonMovies personId={personId} />
                    </div>

                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
};
export default Person;