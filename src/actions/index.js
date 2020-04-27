import axios from 'axios';
import * as TYPES from './types';

// BASE SETTINGS
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "cc25769ebc0d413cd50cc747c2148567";
const LANG = "language=en-US";
const ADULT = "include_adult=false";

// Populars =======================================================================
export const getPopulars = async (dispatch, currentPage) => {
    try{
        const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&${LANG}&sort_by=popularity.desc&${ADULT}&include_video=false&page=${currentPage}`;

        const response = await axios.get(url);

        dispatch({
            type: TYPES.GET_POPULARS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: TYPES.GET_POPULARS_ERROR,
            payload: error.response
        });
    }
};
export const clearPopulars = (dispatch) => {
    dispatch({
        type: TYPES.GET_POPULARS_CLEAR
    });
};
// ==========================================================================================


// Geners ===================================================================================
export const getGenres = async (dispatch) => {
    try{
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
export const clearGenres = (dispatch) => {
    dispatch({
        type: TYPES.GET_GENRES_CLEAR
    });
};
// ==============================================================================================


// Top Rated =======================================================================================
export const getTopRated = async (dispatch, currentPage) => {
    try{
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
export const clearTopRated = (dispatch) => {
    dispatch({
        type: TYPES.GET_TOP_RATED_CLEAR
    });
};
//==============================================================================================


// Upcoming ==================================================================================
export const getUpcoming = async (dispatch, currentPage) => {
    try{
        const url = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&${LANG}&page=${currentPage}`;
        const response = await axios.get(url);

        dispatch({
            type: TYPES.GET_UPCOMING,
            payload: response.data
        });
    }catch (error) {
        dispatch({
            type: TYPES.UPCOMING_ERROR,
            payload: error
        });
    }
};
export const clearUpcoming = (dispatch) => {
    dispatch({
        type: TYPES.GET_UPCOMING_CLEAR
    });
};
//  =================================================================================


// NOW Playing ==========================================================================
export const getNowPlaying = async (dispatch, currentPage) => {
    try{
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
// Clearing Now playing movies
export const clearNowPlaying = (dispatch) => {
    dispatch({
        type: TYPES.GET_NOW_PLAYING_CLEAR
    });
};
// =============================================================================================


// Movie By Genres ==========================================================================
export const getMovieByGenre = async (dispatch, currentPage, genreId, sortBy) => {
    try{
        const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&${LANG}&sort_by=${sortBy}&with_genres=${genreId}&${ADULT}&include_video=false&page=${currentPage}`

        const response = await axios.get(url);

        dispatch({
            type: TYPES.GET_MOVIE_BY_GENRE,
            payload: response.data
        });

    }catch(error){
        dispatch({
            type: TYPES.MOVIE_BY_GENRE_ERROR,
            payload: error.response
        });
    }
};

export const clearMovieByGenre = (dispatch) => {
    dispatch({
        type: TYPES.MOVIE_BY_GENRE_CLEAR
    });
};
// =============================================================================================


// MOVIE =======================================================================================
export const getMovie = async (dispatch, movieId) => {
    try{
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
export const clearGetMovie = (dispatch) => {
    dispatch({
        type: TYPES.GET_MOVIE_CLEAR
    });
};
// ===============================================================================================


// MOVIE CAST ============================================================================================
export const getMovieCast = async (dispatch, movieId) => {
    try{
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
};
export const clearMovieCast = (dispatch) => {
    dispatch({
        type: TYPES.CLEAR_MOVIE_CAST
    })
};
//  ==============================================================================================

export const getMovieSearch = async (dispatch, page, searchValue) => {
    try{
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
};
export const clearMovieSearch = (dispatch) => {
    dispatch({
        type: TYPES.CLEAR_MOVIE_SEARCH
    });
};

// Movie Trailers ============================================================================================
export const getMovieVideos = async (dispatch, movieId) => {
    try{
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
export const clearMovieVideos = (dispatch) => {
    dispatch({
        type: TYPES.CLEAR_MOVIE_VIDEOS
    });
};
// ==============================================================================================


// Person ==============================================================================================
export const getPerson = async (dispatch, personId) => {
    try{
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
};
export const clearGetPerson = (dispatch) => {
    dispatch({
        type: TYPES.GET_PERSON_CLEAR
    });
};
// =====================================================================================================

// Recommended Movies =================================================================================
export const getRecommendedMovies = async (dispatch, movieId, page) => {
    try{
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
export const clearRecommendedMovies = (dispatch) => {
    dispatch({
        type: TYPES.CLEAR_RECOMMENDED_MOVIES
    });
};
//=====================================================================================================


// Movies For Single Person =======================================================================
export const getPersonMovies = async (dispatch, currentPage, personId) => { 
    try{
        const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&${LANG}&sort_by=popularity.desc&${ADULT}&include_video=false&page=${currentPage}&with_cast=${personId}`;

        const response = await axios.get(url);

        dispatch({
            type: TYPES.GET_PERSON_MOVIES,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: TYPES.PERSON_MOVIES_ERROR,
            payload: error.response
        });
    }
};
export const clearPersonMovies = (dispatch) => {
    dispatch({
        type: TYPES.CLEAR_PERSON_MOVIES
    });
};
// ==================================================================================================