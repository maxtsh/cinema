import React from 'react';

const SingleMovieDetails = (props) => {
    
    const { person } = props;
    const deathDay = person.deathday === null ? "" : (<li><i className="fas fa-cross"></i> Date of death: <span>{person.deathday}</span></li>);

    let biography = "";
    if(person.biography === "" || person.biography === null){
        biography = <h4 className="warning">Sorry, no biography available!</h4> ;
    }else{
        biography = person.biography.split(".").map((string, index) => {
            return <p key={index} > {string}. </p>;
        });
    }

    return (
        <div className="main-details-wrapper">
            <div className="overview">
                <h1>Biography:</h1>
                <div>{biography}</div>
            </div>
            <div className="details">
                <ul>
                    <li><i className="fas fa-id-card-alt"></i> Name: <span>{person.name}</span></li>
                    <li><i className="fas fa-birthday-cake"></i> Date of birth: <span>{person.birthday}</span></li>
                    {deathDay}
                    <li><i className="fas fa-star-half-alt"></i> Popularity: <span>{person.popularity}%</span> </li>
                    <li><i className="fas fa-globe-americas"></i> Born in: <span>{person.place_of_birth}</span></li>

                </ul>
            </div>
        </div>
    )
}
export default React.memo(SingleMovieDetails);