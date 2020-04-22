import React, { useState } from 'react';
import { Link } from  'react-router-dom';

const Pagination = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [pageSection, setPageSection] = useState([0,10]);
    const { moviesPerPage, totalMovies, changePage, totalPages, currentPage } = props;

    const pageNumbers = [];
    for( let i = 1; i <= Math.ceil( totalMovies / moviesPerPage); i++ ){
        pageNumbers.push(i);
    }

    const pageSections = [];
    for( let x = 0, y = 10 ; y <= Math.ceil( totalMovies / moviesPerPage ) ; x = x + 10, y = y + 10 ){
        pageSections.push([x, y]);
    }

    const pageIterator = (array) => {
       let nextIndex = currentIndex; 
       return{
           next: function() {
               setCurrentIndex(nextIndex = nextIndex + 1);
               return nextIndex < array.length ?
               { value: array[nextIndex++], done: false } :
               { done: true }
           },
           previous: function() {
               setCurrentIndex(nextIndex = nextIndex - 1);
               return nextIndex >= 0 ?
               { value: array[nextIndex--], done: false} :
               { done: true }
           }
       }
    }

    const handleClick = (e) => {
        e.preventDefault();
        changePage(parseInt(e.target.innerHTML));
    }

    const handleNextClick = (e) => {
        e.preventDefault();
        const pages = pageIterator(pageSections);
        let currentPageSection = pages.next().value;
        setPageSection(currentPageSection);
    }

    const handlePreviousClick = (e) => {
        e.preventDefault();
        const pages = pageIterator(pageSections);
        let currentPageSection = pages.previous().value;
        setPageSection(currentPageSection);
    }

    let endOfResults = null;
    if(totalPages === 1 || totalPages === 2){
        endOfResults = 0; // In case of only single page results
    }else{
        endOfResults = Math.abs(Math.floor(totalPages/10) - 1);
    }

    return (
        <nav>
            <h5 className="page-number text-center mb-3">Current Page: {currentPage}</h5>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentIndex === 0 ? "disabled" : null}`}>
                    <Link to="!#" className="page-link" onClick={handlePreviousClick}>Previous</Link>
                </li>
                {pageNumbers.slice(pageSection[0], pageSection[1]).map( number => (
                    <li key={number} className="page-item">
                        <Link 
                            to="!#" 
                            className="page-link" 
                            onClick={handleClick} >
                            {number}
                        </Link>
                    </li>
                ))}
                <li className={`page-item ${currentIndex === endOfResults ? "disabled" : null}`}>
                    <Link to="!#" className="page-link" onClick={handleNextClick}>Next</Link>
                </li>
            </ul>
        </nav>
    )
}

export default React.memo(Pagination);
