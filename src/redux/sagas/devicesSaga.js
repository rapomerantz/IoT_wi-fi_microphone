import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* devicesSaga() {
    yield takeEvery ('FETCH_DEVICES', fetchDevicesSaga); 
    yield takeEvery ('ADD_DEVICE', addDeviceSaga); 
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
        yield put ({type: 'FETCH_DEVICES'});  //<-- triggers GET in fetchDevicesSaga above
    } catch (error) {
        console.log('error in addDeviceSaga', error);           
    }
}

export default devicesSaga; 