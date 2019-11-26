import { GET_PERSON_MOVIES, PERSON_MOVIES_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    personMovies: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PERSON_MOVIES:
            return{
                ...state,
                personMovies: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

            case PERSON_MOVIES_ERROR:
                return{
                    ...state,
                    error: action.payload
                }

        default: 
            return state;
    }
}