import { GET_PERSON, PERSON_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    person: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){

        case GET_PERSON:
            return{
                ...state,
                person: action.payload,
                loading: false
            }

        case SET_LOADING:
            return{
                ...state,
                loading: true
            }

        case PERSON_ERROR:
            console.log(action.payload);
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}