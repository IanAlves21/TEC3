import {
    USER_LOGGED_IN, 
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED,
} from '../actions/actionsTypes'

const initialState = {
    name: null,
    email: null,
    id: null,
}

const reducer = (state = initialState, action) =>{
    // console.log("actions.payload --> ", action.payload)
    // if(action.type == USER_LOGGED_IN){
        // console.log("actions.payload --> ", action.payload)
    // }
    switch(action.type){
        case USER_LOGGED_IN:
            return{
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                user_id: action.payload.id,
            }
        case USER_LOGGED_OUT:
            return{
                ...state,
                name: null,
                email: null,
                id: null,
            }
        case LOADING_USER:
            return{
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading: false
            }
        default:
            return state
    }
} 

export default reducer