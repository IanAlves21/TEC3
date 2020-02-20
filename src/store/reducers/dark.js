import {
    DARK_MODE,
    LIGHT_MODE,
} from '../actions/actionsTypes'

const initialState = {
    darkMode: true,
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case DARK_MODE:
            return{
                ...state,
                darkMode: true
            }
        case LIGHT_MODE:
            return{
                ...state,
                darkMode: false
            }
        default:
            return state
    }
} 

export default reducer