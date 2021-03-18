import * as actionsTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state) => {
    return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        loading: false
    })
}

const authLogOut = (state) => {
    return updateObject(state, { token: null, userId: null })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject( state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.AUTH_START: return authStart(state)
        case actionsTypes.AUTH_SUCCESS: return authSuccess(state,action)
        case actionsTypes.AUTH_FAIL: return authFail(state, action)
        case actionsTypes.AUTH_LOGOUT: return authLogOut(state)
        case actionsTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action)
        default:
            return state
    }
}

export default reducer