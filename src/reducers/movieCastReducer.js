import { GET_MOVIE_CAST, MOVIE_CAST_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    movieCast: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_CAST:
            return{
                ...state,
                movieCast: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            case MOVIE_CAST_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}