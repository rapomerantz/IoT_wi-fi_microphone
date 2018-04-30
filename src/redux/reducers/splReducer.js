import { combineReducers } from 'redux';


const splReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_SPL':
            return action.payload
        default: 
            return state
    }
}

export default combineReducers ({
    splReducer
})