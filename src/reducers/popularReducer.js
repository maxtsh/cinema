import { GET_POPULARS, GET_POPULARS_ERROR, GET_POPULARS_CLEAR } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_POPULARS:
            return{
                ...state,
                loading: false,
                movies: action.payload,
            }

        case GET_POPULARS_CLEAR:
            return {
                ...state,
                loading: true,
                movies: null
            }

        case GET_POPULARS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
};