import { GET_GENRES, GENRES_ERROR, GET_GENRES_CLEAR } from '../actions/types';

const initialState = {
    genres: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_GENRES:
                return{
                    ...state,
                    loading: false,
                    genres: action.payload,
                }

        case GET_GENRES_CLEAR:
                return{
                    ...state,
                    loading: true,
                    genres: null
                }
    
        case GENRES_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
            
        default:
            return state;
    }
};