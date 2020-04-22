import { GET_MOVIE_CAST, CLEAR_MOVIE_CAST, MOVIE_CAST_ERROR} from '../actions/types';

const initialState = {
    members: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_CAST:
            return{
                ...state,
                loading: false,
                members: action.payload,
            }
            
        case CLEAR_MOVIE_CAST:
            return{
                ...state,
                loading: true,
                members: null
            }

        case MOVIE_CAST_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
};