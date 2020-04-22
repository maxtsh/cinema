import { GET_MOVIE, MOVIE_ERROR, GET_MOVIE_CLEAR } from '../actions/types';

const initialState = {
    movie: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE:
            return{
                ...state,
                loading: false,
                movie: action.payload,
            }

        case GET_MOVIE_CLEAR:
            return{
                ...state,
                loading: true,
                movie: null
            }

        case MOVIE_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
};