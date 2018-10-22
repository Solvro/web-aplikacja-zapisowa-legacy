import { combineReducers } from 'redux';
import {RoomMateState} from "./RoomMate/types";
import {roomMateReducer} from "./RoomMate/reducer";

export interface ApplicationState {
    roomMateState: RoomMateState
}

export const rootReducer = combineReducers<ApplicationState>({roomMateState: roomMateReducer});
