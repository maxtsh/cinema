import { GET_TOP_RATED, TOP_RATED_ERROR, GET_TOP_RATED_CLEAR } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_TOP_RATED:
            return{
                ...state,
                loading: false,
                movies: action.payload
            }

        case GET_TOP_RATED_CLEAR:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case TOP_RATED_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
};