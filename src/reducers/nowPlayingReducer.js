import { GET_NOW_PLAYING, NOW_PLAYING_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    nowPlaying: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        
        case GET_NOW_PLAYING:
            return{
                ...state,
                nowPlaying: action.payload,
                loading: false
            }

            case SET_LOADING:
                    return{
                        ...state,
                        loading: true
                }

            case NOW_PLAYING_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default:
            return state;
    }
}