const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
});

export async function fetchStudent(username: string) {
    try {
        const token = await localStorage.getItem('token');
        const student = await instance.get(`/students/${username}`, {headers: {'Authorization': `Bearer ${token}`}});
        return await student.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        console.log('well done');
    }
}

export async function authorizeUser(username: string, password: string) {
    try {
        const token = await instance.post(`/token`, { username, password });
        return token.data.access;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export async function verifyUser(token: string) {
    try {
        const verification = await instance.post(`/token/verify`, { token });
        const isVerify = verification && verification.status === 200;
        return isVerify;
    } catch (error) {
        return false;
    }
}
