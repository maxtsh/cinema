import { GET_RECOMMENDED_MOVIES, SET_LOADING, RECOMMENDED_MOVIES_ERROR } from '../actions/types';

const initialState = {
    recommendedMovies: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){

        case GET_RECOMMENDED_MOVIES:
            return{
                ...state,
                recommendedMovies: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            case RECOMMENDED_MOVIES_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}