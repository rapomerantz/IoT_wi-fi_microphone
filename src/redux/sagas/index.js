import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import devicesSaga from './devicesSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    devicesSaga(),
    // watchIncrementAsync()
  ]);
}
