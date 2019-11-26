import { GET_UPCOMING, UPCOMING_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    upcoming: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type){
        
        case GET_UPCOMING:
            return{
                ...state,
                upcoming: action.payload,
                loading: false
            }

            case SET_LOADING:
                    return{
                        ...state,
                        loading: true
                }

            case UPCOMING_ERROR:
                console.log(action.payload);
                return{
                    ...state,
                    error: action.payload
                }

        default:
            return state;
    }
}