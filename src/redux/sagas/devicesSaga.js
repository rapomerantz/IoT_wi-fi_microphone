import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* devicesSaga() {
    yield takeEvery ('FETCH_DEVICES', fetchDevicesSaga); 
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

export default devicesSaga; 