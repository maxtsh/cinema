import { GET_MOVIE, MOVIE_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    movie: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE:
            return{
                ...state,
                movie: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            case MOVIE_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}