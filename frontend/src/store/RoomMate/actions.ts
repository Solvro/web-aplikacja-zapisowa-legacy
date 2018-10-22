import {createAsyncAction, createStandardAction} from "typesafe-actions";
import {RoomMate, RoomMateState, RoomMateType} from "./types";
import {Resource} from "../types";
import {Dispatch} from "react-redux";
import {findRoomMateByLogin} from "../../fake/UsersData";

export const fetchRoomMate = createAsyncAction(
    RoomMateType.ADD_ROOM_MATE_REQUEST,
    RoomMateType.ADD_ROOM_MATE_SUCCESS,
    RoomMateType.ADD_ROOM_MATE_FAILURE
)<void, Resource<RoomMate>, Resource<RoomMate>>();

export const removeRoomMate = createStandardAction(RoomMateType.REMOVE_ROOM_MATE)<string>();

// pozbędziemy się tego głupiego kolbaku jak będziemy robić prawdziwe rikłesty
function delay(t: number) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null), t)
    });
}

export const initFetchRoomMate = (login: string) => {
    return (dispatch: Dispatch<RoomMateState>) => {
        dispatch(fetchRoomMate.request());
        return delay(Math.random() * 500 + 500)
            .then(() => {
                const roomMate = findRoomMateByLogin(login);
                if (typeof roomMate !== 'undefined') {
                    dispatch(fetchRoomMate.success({data: roomMate, pending: false}))
                } else {
                    dispatch(fetchRoomMate.failure({data: undefined, pending: false, error: new Error('User has not been found')}))
                }
            })
            .catch((error) => {
                dispatch(fetchRoomMate.failure({data: undefined, pending: false, error}));
            });
    }
};

