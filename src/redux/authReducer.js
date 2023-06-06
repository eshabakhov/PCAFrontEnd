import store from "../index.js";

let initialState = {
    token: '',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            store.token = action.data.token
            return {
                ...state,
                token: action.data.token
            }
        default:
            return state;
    }
}