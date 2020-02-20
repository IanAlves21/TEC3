import {
    DARK_MODE,
    LIGHT_MODE
} from './actionsTypes'

export const darkMode = () => {
    return {
        type: DARK_MODE,
    }
}

export const lightMode = () => {
    return {
        type: LIGHT_MODE,
    }
}

export const troca = (troca)=>{
    return dispatch =>{
        if(troca){
            dispatch(lightMode())
        }
        else{
            dispatch(darkMode())
        }
    }
}