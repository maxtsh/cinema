import { GET_MOVIE_VIDEOS, MOVIE_VIDEOS_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    movieVideos: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_VIDEOS:
            return{
                ...state,
                movieVideos: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            case MOVIE_VIDEOS_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}