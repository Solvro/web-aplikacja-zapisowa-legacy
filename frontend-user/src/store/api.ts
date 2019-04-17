import {RoomMate} from "./RoomMate/types";

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
});

export async function fetchStudent(username: string, event: string) {
    try {
        const token = localStorage.getItem('token');
        const student = await instance.get(`/students/${event}/${username}/`, {headers: {'Authorization': `Bearer ${token}`}});
        return student.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        console.log('well done');
    }
}

export async function authorizeUser(username: string, password: string) {
    try {
        const result = await instance.post(`/token/`, { username, password });
        if (result)
            return result.data;
        else
            return "error";
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function verifyUser(token: string) {
    try {
        const verification = await instance.post(`/token/verify/`, { token });
        return verification && verification.status === 200;
    } catch (error) {
        return false;
    }
}

export const enrollStudentsInRoom = async (students: RoomMate[], roomNumber: number, eventName: string) => {
    try {
        const logins = students.map(student => student.login);
        const token = localStorage.getItem('token');
        return fetch(`http://localhost:8000/api/student/${eventName}/register/${roomNumber}/`, {
            method: 'post',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({logins})
        });
    } catch (error) {
        return error;
    }
};
