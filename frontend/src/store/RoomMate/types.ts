export type RoomMate = {
    name: string;
    faculty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    login: string;
}

export interface RoomMateState {
    readonly fetching: boolean;
    readonly roomMates: RoomMate[];
    readonly status: string;
}

export const enum RoomMateType {
    ADD_ROOM_MATE_REQUEST = 'ADD_ROOM_MATE',
    ADD_ROOM_MATE_SUCCESS = 'ADD_ROOM_MATE_SUCCESS',
    ADD_ROOM_MATE_FAILURE = 'ADD_ROOM_MATE_FAILURE',
    REMOVE_ROOM_MATE = 'REMOVE_ROOM_MATE'
}