import { GET_MOVIE_VIDEOS, MOVIE_VIDEOS_ERROR, CLEAR_MOVIE_VIDEOS } from '../actions/types';

const initialState = {
    videos: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_VIDEOS:
            return{
                ...state,
                loading: false,
                videos: action.payload
            }
        case CLEAR_MOVIE_VIDEOS:
            return{
                ...state,
                loading: true,
                vidoes: null
            }
        case MOVIE_VIDEOS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
};