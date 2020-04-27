import { GET_MOVIE_SEARCH, CLEAR_MOVIE_SEARCH, MOVIE_SEARCH_ERROR} from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_SEARCH:
            return{
                ...state,
                loading: false,
                movies: action.payload
            }

        case CLEAR_MOVIE_SEARCH:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case MOVIE_SEARCH_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
};