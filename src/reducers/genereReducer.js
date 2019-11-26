import { GET_GENRES, SET_LOADING, GENRES_ERROR } from '../actions/types';

const initialState = {
    genres: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){

        case GET_GENRES:
                return{
                    ...state,
                    genres: action.payload,
                    loading: false
                }
    
        case SET_LOADING:
                return {
                    ...state,
                    loading: true
                }
    
        case GENRES_ERROR:
                    console.log(action.payload);
                    return{
                        ...state,
                        error: action.payload
                    }
        default:
            return state;
    }
}