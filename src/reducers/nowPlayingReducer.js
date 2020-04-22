import { GET_NOW_PLAYING, NOW_PLAYING_ERROR, GET_NOW_PLAYING_CLEAR } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_NOW_PLAYING:
            return{
                ...state,
                loading: false,
                movies: action.payload,
            }

        case GET_NOW_PLAYING_CLEAR:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case NOW_PLAYING_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
};