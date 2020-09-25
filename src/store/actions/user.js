import {
    USER_LOGGED_IN, 
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED,
} from './actionsTypes'
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyAHnXLRcUA5kSFG6pjxTyTeRnoDhpZz5_s'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () =>{
    return{
        type: USER_LOGGED_OUT,
    }
}

export const createUser = (user)=>{
    return dispatch=>{
        let flag = true
        dispatch(loadingUser())
        // axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`,{
        axios.post("/accounts/",{
            username: user.name,
            password: user.password,
            email: user.email,
            // returnSecureToken: true,
        }).catch(err=>{
                console.log(err); 
                flag=false; 
                return flag
            }).then(res=>{
                if(flag){
                    dispatch(userLogged(user))
                    dispatch(userLoaded())
                }
                else{
                    dispatch(logout())
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        console.log(user)
        let flag = true
        dispatch(loadingUser())
        // axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
        axios.post("/usuario_login/", {
            username: user.email,
            password: user.password,
            // returnSecureToken: true
        })
        .catch(err =>{
            console.log(err)
            flag = false
        })
        .then(res => {
            if(flag){
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
                console.log(res.data)
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
                user.name = user.email
                user.id = res.data.id
                console.log(user)
                dispatch(userLogged(user))
                dispatch(userLoaded())
            }
            else{
                dispatch(logout())
            }
        })
    }
}