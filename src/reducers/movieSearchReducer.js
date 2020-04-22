import { GET_MOVIE_SEARCH, MOVIE_SEARCH_ERROR} from '../actions/types';

const initialState = {
    movieSearch: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_SEARCH:
            return{
                ...state,
                movieSearch: action.payload,
                loading: false
            }

            case MOVIE_SEARCH_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}