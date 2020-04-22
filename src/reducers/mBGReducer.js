import { GET_MOVIE_BY_GENRE, MOVIE_BY_GENRE_CLEAR, MOVIE_BY_GENRE_ERROR } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_BY_GENRE:
            return{
                ...state,
                loading: false,
                movies: action.payload,
            }

        case MOVIE_BY_GENRE_CLEAR:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case MOVIE_BY_GENRE_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
};