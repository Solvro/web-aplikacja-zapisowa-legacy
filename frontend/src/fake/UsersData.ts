import {RoomMate} from "../store/RoomMate/types";

export const loggedUser = {
    name: "Michał Treter",
    faculty: 11,
};

export const userGroup: RoomMate[] = [
    {
        name: "Honorata Poturaj",
        faculty: 10,
        login: 'HO1PJ0'
    },
    {
        name: "Adrian Mucha",
        faculty: 11,
        login: 'AD1MA1'
    },
    {
        name: "Maciej Hajduk",
        faculty: 11,
        login: 'MA1HK1',
    },
    {
        name: "Piotr Szostak",
        faculty: 3,
        login: 'PI0SK3',
    },
];

export const findRoomMateByLogin = (login: string): RoomMate | undefined => {
    return userGroup.find((roomMate: RoomMate) => {
        return roomMate.login === login;
    });
};