import { GET_UPCOMING, UPCOMING_ERROR, GET_UPCOMING_CLEAR } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_UPCOMING:
            return{
                ...state,
                loading: false,
                movies: action.payload
            }

        case GET_UPCOMING_CLEAR:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case UPCOMING_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
};