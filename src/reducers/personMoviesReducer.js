import { GET_PERSON_MOVIES, PERSON_MOVIES_ERROR, CLEAR_PERSON_MOVIES } from '../actions/types';

const initialState = {
    movies: null,
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PERSON_MOVIES:
            return{
                ...state,
                loading: false,
                movies: action.payload,
            }

        case CLEAR_PERSON_MOVIES:
            return{
                ...state,
                loading: true,
                movies: null
            }

        case PERSON_MOVIES_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        default: 
            return state;
    }
}