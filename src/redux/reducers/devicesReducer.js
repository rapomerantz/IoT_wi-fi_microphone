import { combineReducers } from 'redux';

const devicesReducer = ( state = [], action ) => {
    switch(action.type) {
        case 'SET_DEVICES':
            console.log('in devicesReducer SET_DEVICES, payload:', action.payload);
            return action.payload
        default: 
            return state
    }
}

export default combineReducers ({
    devicesReducer,
})