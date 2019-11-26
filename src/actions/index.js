import axios from 'axios';
import * as TYPES from './types';

// BASE SETTINGS
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "cc25769ebc0d413cd50cc747c2148567";
const LANG = "language=en-US";
const ADULT = "include_adult=false";

// Get Populars
export const getLogs = (currentPage) => async (dispatch) => { // Higher Order Function Method
    try{
        setLoading();

        const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&${LANG}&sort_by=popularity.desc&${ADULT}&include_video=false&page=${currentPage}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_LOGS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: TYPES.LOGS_ERROR,
            payload: error.response.statusText
        });
    }
};

// Get Geners
export const getGenres = () => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&${LANG}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_GENRES,
            payload: response.data
        });

    } catch(error) {
        dispatch({
            type: TYPES.GENRES_ERROR,
            payload: error
        });
    }
};

// Get Top Rated
export const getTopRated = (currentPage) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/top_rated?api_key=${API_KEY}&${LANG}&page=${currentPage}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_TOP_RATED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: TYPES.TOP_RATED_ERROR,
            payload: error
        });
    }
};

// Get Upcoming
export const getUpcoming = (currentPage) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&${LANG}&page=${currentPage}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_UPCOMING,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: TYPES.UPCOMING_ERROR,
            payload: error
        });
    }
};

// Get NOW Playing
export const getNowPlaying = (currentPage) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&${LANG}&page=${currentPage}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_NOW_PLAYING,
            payload: response.data
        });
    } catch (error){
        dispatch({
            type: TYPES.NOW_PLAYING_ERROR,
            payload: error
        });
    }
};

export const getMovieByGenre = (currentPage, genreId, sortBy) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&${LANG}&sort_by=${sortBy}&with_genres=${genreId}&${ADULT}&include_video=false&page=${currentPage}`

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_MOVIE_BY_GENRE,
            payload: response.data
        });

    } catch(error){
        dispatch({
            type: TYPES.MOVIE_BY_GENRE_ERROR,
            payload: error
        });
    }
};

export const getMovie = (movieId) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&${LANG}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_MOVIE,
            payload: response.data
        });

    } catch(error) {
        dispatch({
            type: TYPES.MOVIE_ERROR,
            payload: error
        });
    }
};

export const getMovieCast = (movieId) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_MOVIE_CAST,
            payload: response.data
        });

    } catch(error){
        dispatch({
            type: TYPES.MOVIE_CAST_ERROR,
            payload: error
        });
    }
}

export const getMovieSearch = (page, searchValue) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}search/movie?api_key=${API_KEY}&${LANG}&page=${page}&${ADULT}&query=${searchValue}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_MOVIE_SEARCH,
            payload: response.data
        });
        
    } catch(error) {
        dispatch({
            type: TYPES.MOVIE_SEARCH_ERROR,
            payload: error
        });
    }
}

export const getMovieVideos = (movieId) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}&${LANG}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_MOVIE_VIDEOS,
            payload: response.data
        });

    } catch(error){
        dispatch({
            type: TYPES.MOVIE_VIDEOS_ERROR,
            payload: error
        });
    }
}


export const getPerson = (personId) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}person/${personId}?api_key=${API_KEY}&${LANG}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_PERSON,
            payload: response.data
        });

    } catch(error){
        dispatch({
            type: TYPES.PERSON_ERROR,
            payload: error
        });
    }
}


export const getRecommendedMovies = (movieId, page) => async (dispatch) => {
    try{
        setLoading();

        const url = `${BASE_URL}movie/${movieId}/recommendations?api_key=${API_KEY}&${LANG}&page=${page}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_RECOMMENDED_MOVIES,
            payload: response.data
        });

    } catch(error){
        dispatch({
            type: TYPES.RECOMMENDED_MOVIES_ERROR,
            payload: error
        });
    }
}

export const getPersonMovies = (currentPage, personId) => async (dispatch) => { 
    try{
        setLoading();

        const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&${LANG}&sort_by=popularity.desc&${ADULT}&include_video=false&page=${currentPage}&with_cast=${personId}`;

        const response = await axios.get(url);
        dispatch({
            type: TYPES.GET_PERSON_MOVIES,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: TYPES.PERSON_MOVIES_ERROR,
            payload: error.response.statusText
        });
    }
};



// Set Loading to TRUE
export const setLoading = () => {
    return {
        type: TYPES.SET_LOADING
    };
};
