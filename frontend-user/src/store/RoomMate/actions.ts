import {createAsyncAction, createStandardAction} from "typesafe-actions";
import {RoomMate, RoomMateState, RoomMateType, StudentErrors} from "./types";
import {fetchStudent} from "../api";
import {Dispatch} from "react-redux";

export const fetchRoomMate = createAsyncAction(
    RoomMateType.ADD_ROOM_MATE_REQUEST,
    RoomMateType.ADD_ROOM_MATE_SUCCESS,
    RoomMateType.ADD_ROOM_MATE_FAILURE
)<void, RoomMate, String>();

export const removeRoomMate = createStandardAction(RoomMateType.REMOVE_ROOM_MATE)<string>();

export const removeError = createStandardAction(RoomMateType.REMOVE_ERROR)<number>();

export const signIn = createStandardAction(RoomMateType.SIGN_IN)<RoomMate>();

export const initFetchRoomMate = (username: string) => {
    return async (dispatch: Dispatch<RoomMateState>) => {
        dispatch(fetchRoomMate.request());

        let roomMate: RoomMate;

        try {
            roomMate = await fetchStudent(username);
            const {name, faculty} = roomMate;
            if (roomMate) {
                dispatch(fetchRoomMate.success({name, faculty, login: username}))
            } else {
                dispatch(fetchRoomMate.failure(StudentErrors.notExist(username)));
            }
        } catch (error) {
            console.log(error);
            const errorMessage = username ? StudentErrors.notExist(username) : StudentErrors.emptyUsername;
            dispatch(fetchRoomMate.failure(errorMessage));
            return error;
        }
    }
};

