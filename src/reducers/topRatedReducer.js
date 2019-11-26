import { GET_TOP_RATED, TOP_RATED_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    topRated: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){

        case GET_TOP_RATED:
            return{
                ...state,
                topRated: action.payload,
                loading: false
            }

        case SET_LOADING:
            return{
                ...state,
                loading: true
            }

        case TOP_RATED_ERROR:
            console.log(action.payload);
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}