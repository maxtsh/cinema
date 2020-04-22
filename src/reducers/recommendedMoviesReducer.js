import { GET_RECOMMENDED_MOVIES, RECOMMENDED_MOVIES_ERROR, CLEAR_RECOMMENDED_MOVIES } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_RECOMMENDED_MOVIES:
            return{
                ...state,
                loading: false,
                movies: action.payload
            }

        case CLEAR_RECOMMENDED_MOVIES:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case RECOMMENDED_MOVIES_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
}