import { GET_MOVIE_BY_GENRE, MOVIE_BY_GENRE_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    movieByGenre: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MOVIE_BY_GENRE:
            return{
                ...state,
                movieByGenre: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            case MOVIE_BY_GENRE_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}