import {Reducer} from 'redux'
import {RoomMate, RoomMateState, RoomMateType, StudentErrors} from './types'

const reducer: Reducer<RoomMateState> = (state = {
    user: undefined,
    fetching: false,
    roomMates: [],
    status: '',
    errors: []
}, action) => {
    switch (action.type) {
        case RoomMateType.ADD_ROOM_MATE_REQUEST: {
            return {...state, fetching: true, status: ''}
        }
        case RoomMateType.ADD_ROOM_MATE_SUCCESS: {
            if (!state.roomMates.map(rm => rm.login).includes(action.payload.login)) {
                return {...state, fetching: false, roomMates: [...state.roomMates, action.payload], status: 'success'}
            }
            else {
                return {
                    ...state,
                    fetching: false,
                    errors: [
                        ...state.errors,
                        {
                            id: newErrorId(state), message: StudentErrors.addedYet(action.payload.name)
                        }
                    ]
                }
            }
        }
        case RoomMateType.ADD_ROOM_MATE_FAILURE: {
            return {
                ...state, fetching: false, status: 'failure',
                errors: [
                    ...state.errors,
                    {
                        id: newErrorId(state), message: action.payload
                    }
                ]
            }
        }
        case RoomMateType.REMOVE_ROOM_MATE: {
            return {
                ...state,
                roomMates: state.roomMates.filter((roomMate: RoomMate) => roomMate.login !== action.payload)
            }
        }
        case RoomMateType.REMOVE_ERROR: {
            return {...state, errors: state.errors.filter(error => error.id !== action.payload)}
        }
        case RoomMateType.SIGN_IN: {
            return {...state, user: action.payload}
        }
        case RoomMateType.ADD_ERROR: {
            return {
                ...state,
                errors: [
                    ...state.errors,
                    {
                        id: newErrorId(state),
                        message: action.payload
                    }]
            }
        }
        default:
            return state;
    }
};

const newErrorId = (state: RoomMateState) => {
    return Math.max(...state.errors.map(e => e.id)) + 1 | 0;
};

export {reducer as roomMateReducer}
