export type RoomMate = {
    name: string;
    faculty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    login: string;
    index: string;
    sex: "M" | "F";
    event: string;
}

export interface RoomMateState {
    readonly fetching: boolean;
    readonly roomMates: RoomMate[];
    readonly status: string;
    readonly errors: ApplicationError[];
    readonly user?: RoomMate;
}

const addedYetERROR = (name: string) => `Student ${name} już znajduje się na liście`;
const notExistERROR = (username: string) => `Student o loginie ${username} nie istnieje`;
const emptyUsernameERROR = `Login użytkownika nie może być pusty`;
const signInFailedERROR = `Błędny login lub hasło`;

export const StudentErrors = {
    addedYet: addedYetERROR,
    notExist: notExistERROR,
    emptyUsername: emptyUsernameERROR,
    signInFailed: signInFailedERROR,
};

export interface ApplicationError {
    message: string,
    id: number,
}

export const enum RoomMateType {
    CLEAR_ERRORS = 'CLEAR_ERRORS',
    SIGN_OUT = 'SIGN_OUT',
    ADD_ROOM_MATE_REQUEST = 'ADD_ROOM_MATE',
    ADD_ROOM_MATE_SUCCESS = 'ADD_ROOM_MATE_SUCCESS',
    ADD_ROOM_MATE_FAILURE = 'ADD_ROOM_MATE_FAILURE',
    SIGN_IN = 'SIGN_IN',
    REMOVE_ROOM_MATE = 'REMOVE_ROOM_MATE',
    ADD_ERROR = 'ADD_ERROR',
    REMOVE_ERROR = 'REMOVE_ERROR',
}
