import {RoomMate} from "./RoomMate/types";

declare var process : {
    env: {
      NODE_ENV: string,
      REACT_APP_API_URL_PROD: string,
      REACT_APP_API_URL_DEV: string
    }
  }

const axios = require('axios');
export const APIurl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;

const instance = axios.create({
    baseURL: `http://${APIurl}/api/`,
    timeout: 1000,
});

instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    const newConfig = config;
    newConfig.headers.Authorization = token ? `Bearer ${token}` : '';
    return newConfig;
});

function requestTokenRefresh() {
    return instance.post('/token/refresh/', { refresh: localStorage.getItem('refresh') })
        .then((res: any) => res.data.access);
}

instance.interceptors.response.use(undefined, (err: any) => {
    const { response } = err;
    const { config, status } = response;
    if (status === 401 && config && !config.retryReqGuard) {
        return requestTokenRefresh().then((token: string) => {
            config.retryReqGuard = true;
            localStorage.setItem('token', token);
            return instance(config);
        });
    }
    if (status === 500) {
        // Handle 500 from server when access token is empty
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.reload();
        }
    }
    return err;
});

export async function fetchStudent(username: string, event: string) {
    try {
        const token = localStorage.getItem('token');
        const student = await instance.get(`/students/${event}/${username}/`, {headers: {'Authorization': `Bearer ${token}`}});
        return student.data;
    } catch (error) {
        console.log(`Error: ${error}`);
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
        return await instance.post(`/student/${eventName}/register/${roomNumber}/`, {logins});
    } catch (error) {
        return error;
    }
};

export const enrollStudentAlone = async (eventName: string) => {
    try {
        return await instance.post(`/student/${eventName}/register/`);
    } catch (error) {
        return error;
    }
};
