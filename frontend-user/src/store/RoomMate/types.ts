export type RoomMate = {
    name: string;
    faculty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    login: string;
}

export interface RoomMateState {
    readonly fetching: boolean;
    readonly roomMates: RoomMate[];
    readonly status: string;
    readonly errors: ApplicationError[];
}

const addedYetERROR = (name: string) => `Student ${name} już znajduje się na liście`;
const notExistERROR = (username: string) => `Student o loginie ${username} nie istnieje`;
const emptyUsernameERROR = `Login użytkownika nie może być pusty`;

// export const maxSpaceExeededERROR = () TODO: wywalić error kiedy liczba osób w grupie jest większa niż pojemność największego pokoju

export const StudentErrors = {
    addedYet: addedYetERROR,
    notExist: notExistERROR,
    emptyUsername: emptyUsernameERROR,
};

export interface ApplicationError {
    message: string,
    id: number,
}

export const enum RoomMateType {
    ADD_ROOM_MATE_REQUEST = 'ADD_ROOM_MATE',
    ADD_ROOM_MATE_SUCCESS = 'ADD_ROOM_MATE_SUCCESS',
    ADD_ROOM_MATE_FAILURE = 'ADD_ROOM_MATE_FAILURE',
    REMOVE_ROOM_MATE = 'REMOVE_ROOM_MATE',
    ADD_ERROR = 'ADD_ERROR',
    REMOVE_ERROR = 'REMOVE_ERROR',
}
