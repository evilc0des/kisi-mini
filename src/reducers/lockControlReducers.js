import {LOCKED, UNLOCKING, UNLOCK_SUCCESS, UNLOCK_FAILURE} from '../constants/states'

export default function lockControlReducers(
    state = {
        locks: {},
        isFetching: false,
        didInvalidate: false
    },
    action
) {  
    let lockObj = {};
    switch (action.type) {
        case 'INVALIDATE_LOCKS':
            return Object.assign({}, state, { didInvalidate: true});
        case 'REQUEST_LOCKS':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_LOCKS':
            lockObj = {};
            for(const lock of action.results){
                lockObj[lock.id] = {
                    ...lock,
                    unlockState: LOCKED
                } 
            }
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                locks: lockObj,
                lastUpdated: action.receivedAt
            });

        case 'ATTEMPTING_UNLOCK':
            return Object.assign({}, state, {
                locks: {
                    ...state.locks,
                    [action.lockId] : {
                        ...state.locks[action.lockId],
                        unlockState : UNLOCKING 
                    }
                }
            });
        case 'UNLOCK_SUCCESS':
            return Object.assign({}, state, {
                locks: {
                    ...state.locks,
                    [action.lockId] : {
                        ...state.locks[action.lockId],
                        unlockState : UNLOCK_SUCCESS 
                    }
                }
            });
        case 'UNLOCK_FAILED':
            return Object.assign({}, state, {
                locks: {
                    ...state.locks,
                    [action.lockId] : {
                        ...state.locks[action.lockId],
                        unlockState : UNLOCK_FAILURE 
                    }
                }
            });
  
      default:
        return state;
    }
  }