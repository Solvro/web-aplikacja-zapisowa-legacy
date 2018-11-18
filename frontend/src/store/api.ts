const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
});

export async function fetchStudent(username: string) {
    try {
        const student = await instance.get(`/students/${username}`);
        return await student.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        console.log('well done');
    }
}
