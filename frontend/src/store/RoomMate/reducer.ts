import { Reducer } from 'redux'
import {RoomMate, RoomMateState, RoomMateType} from './types'

const reducer: Reducer<RoomMateState> = (state = {fetching: false, roomMates: [], status: ''}, action) => {
    switch (action.type) {
        case RoomMateType.ADD_ROOM_MATE_REQUEST: {
            return {...state, fetching: true, status: ''}
        }
        case RoomMateType.ADD_ROOM_MATE_SUCCESS: {
            return {...state, fetching: false, roomMates: state.roomMates.concat(action.payload), status: 'success'}
        }
        case RoomMateType.ADD_ROOM_MATE_FAILURE: {
            return {...state, fetching: false, error: action.payload.message, status: 'failure'}
        }
        case RoomMateType.REMOVE_ROOM_MATE: {
            return {...state, roomMates: state.roomMates.filter((roomMate: RoomMate) => roomMate.login !== action.payload)}
        }
        default:
            return state;
    }
};

export { reducer as roomMateReducer }
