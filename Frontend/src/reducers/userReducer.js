import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    CLEAR_ERROR_MESSAGES
} from "../constants/userConstant";


//Reducer for managing authenticated related state
export const authReducer = (
    state = {
        user: {}, 
        loading: false, 
        isAuthenticated: false, 
        data: {}
    }, 
action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST: // short hand property of switch case
        case LOAD_USER_REQUEST: 
            return {
                loading: true,
                isAuthenticated: false
            };
        
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload   //update the user data
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case USER_LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERROR_MESSAGES:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    };
};

//Reducer for managing user related state
export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR_MESSAGES:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    };
};

//Reducer for managing forgot password related state
export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR_MESSAGES:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    };
};
