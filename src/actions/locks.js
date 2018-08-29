import Kisi from "kisi-client"
import { LOCKED, UNLOCK_FAILURE } from "../constants/states";

const kisiClient = new Kisi();

kisiClient.setLoginSecret("94c2056abb993b570517f2d3a89c9b5a");


function attemptUnlock(lockId) {
    return {
        type: 'ATTEMPTING_UNLOCK',
        lockId: lockId
    }
}

function setUnlockSuccess(result, lockId) {
    return {
        type: 'UNLOCK_SUCCESS',
        lockId: lockId,
        results : { ...result },
        receivedAt: Date.now()
    }
}

function setUnlockFailed(error, lockId) {
    return {
        type: 'UNLOCK_FAILED',
        lockId: lockId,
        results: { ...error },
        receivedAt: Date.now()
    }
}

export function unlockById(lockId) {
    return (dispatch, getState) => {
        if(getState().lockControls.locks[lockId].unlockState == LOCKED || getState().lockControls.locks[lockId].unlockState == UNLOCK_FAILURE){
            dispatch(attemptUnlock(lockId));
        }
        return kisiClient.post(`/locks/${lockId}/unlock`, {})
        .then(result => dispatch(setUnlockSuccess(result, lockId)))
        .catch(error => {
            //console.log(error); 
            return dispatch(setUnlockFailed(error, lockId))
        })
    }
}


export function fetchLocksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchLocks(getState())) {
            //console.log("again");
            return dispatch(fetchLocks());
        }   
    }
}


function fetchLocks() {
    return dispatch => {
        dispatch(requestLocks());
        return kisiClient.get(`locks`)
            .then(json => {
                //console.log(json);
                dispatch(receiveLocks(json))
            })
    }
}

function shouldFetchLocks(state) {
    const lockState = state.lockControls;
    //console.log(lockState.locks);
    if (!lockState.locks || (Object.keys(lockState.locks).length === 0 && lockState.locks.constructor === Object)) {
        return true;
    } else if (lockState.isFetching) {
        return false;
    } else {
        return lockState.didInvalidate;
    }
}

function requestLocks() {
    return {
        type: 'REQUEST_LOCKS'
    }
}

function receiveLocks(json) {
    return {
        type: 'RECEIVE_LOCKS',
        results: [ ...json.data ], 
        receivedAt: Date.now()
    }
}