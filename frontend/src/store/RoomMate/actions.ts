import {createAsyncAction, createStandardAction} from "typesafe-actions";
import {RoomMate, RoomMateState, RoomMateType} from "./types";
import {fetchStudent} from "../api";
import {Dispatch} from "react-redux";

export const fetchRoomMate = createAsyncAction(
    RoomMateType.ADD_ROOM_MATE_REQUEST,
    RoomMateType.ADD_ROOM_MATE_SUCCESS,
    RoomMateType.ADD_ROOM_MATE_FAILURE
)<void, RoomMate, Error>();

export const removeRoomMate = createStandardAction(RoomMateType.REMOVE_ROOM_MATE)<string>();

export const initFetchRoomMate = (username: string) => {
    return async (dispatch: Dispatch<RoomMateState>) => {
        dispatch(fetchRoomMate.request());

        let roomMate: RoomMate;

        try {
            roomMate = await fetchStudent(username);
            if (roomMate) {
                dispatch(fetchRoomMate.success(roomMate))
            } else {
                dispatch(fetchRoomMate.failure(new Error("Student not found")));
            }
        } catch (error) {
            dispatch(fetchRoomMate.failure(error));
            return error;
        }
    }
};

