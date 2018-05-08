import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* devicesSaga() {
    yield takeEvery ('FETCH_DEVICES', fetchDevicesSaga); 
    yield takeEvery ('ADD_DEVICE', addDeviceSaga); 
    yield takeEvery ('FETCH_SPL', fetchSplSaga);
    yield takeEvery ('DELETE_DEVICE', deleteDeviceSaga); 
    yield takeEvery ('EDIT_DEVICE', editDeviceSaga); 
    yield takeEvery ('ACTIVE_SWITCH', activateDeviceSaga); 
}


//sends GET request to server, recieves devices items and stores it in devicesResponse.data
function* fetchDevicesSaga(action) {
    console.log('in fetchDevicesSaga');
    try {
        const devicesResponse = yield call(axios.get, '/api/devices')
        //sends data to SET_DEVICES reducer
        yield put({
            type: 'SET_DEVICES', 
            payload: devicesResponse.data
        });
    } catch (error) {
        console.log('error in fetchDevicesSaga', error);           
    }
}

//send POST request to server
function* addDeviceSaga(action) {
    console.log('in addDeviceSaga');
    try {
        yield call (axios.post, '/api/devices', action.payload); 
        yield put ({type: 'FETCH_DEVICES'});  //<-- triggers GET in fetchDevicesSaga above to repopulate devices
    } catch (error) {
        console.log('error in addDeviceSaga', error);           
    }
}

function* activateDeviceSaga(action) {
    console.log('in activateDeviceSaga, payload:', action.payload);
    try {
        yield call (axios.put, `/api/devices/toggleActive`, action.payload)

    } catch (error) {
        console.log('error in activateDeviceSaga', error);           
    }
}




function* deleteDeviceSaga(action) {
    console.log('in deleteDeviceSaga, device id: ', action.payload);
        try {
            yield call (axios.delete, `/api/devices/${action.payload}`); 
            yield put ({type: 'FETCH_DEVICES'}) //<-- triggers GET in fetchDevicesSaga above to repopulate devices
        } catch (error) {
            console.log('error in deleteDeviceSaga', error); 
        }
}

function* editDeviceSaga(action) {
    console.log('in editDeviceSaga, payload:', action.payload);
    try {
        yield call (axios.put, `/api/devices`, action.payload)
        yield put ({type: 'FETCH_DEVICES'}) //<-- triggers GET in fetchDevicesSaga above to repopulate devices        
    } catch (error) {
        console.log('error in editDeviceSaga', error); 
    }
}








//THIS SHOULD PROBABLY HAVE ITS OWN SAGA IF I HAVE TIME
function* fetchSplSaga(action) {
    console.log('in fetchSplSaga', action.payload.selectedDevice);
    try {                                                           //action.payload is number of spl data to be returned
        const splResponse = yield call(axios.get, `/api/spl/?quantity=${action.payload.quantity}&device=${action.payload.selectedDevice}`) 
        yield put({
            type: 'SET_SPL',
            payload: splResponse.data
        });
    } catch (error) {
        console.log('error in fetchSpl Saga', error);
    }
}






export default devicesSaga; 