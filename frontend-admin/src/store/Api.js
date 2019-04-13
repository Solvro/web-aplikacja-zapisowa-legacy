import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// głowy sobie nie dam uciąć czy dobry urlsc
const refreshAuthLogic = err => instance.post('/token/refresh/', { refresh: localStorage.getItem('refresh') })
  .then((res) => {
    console.log('refresh', res);
    localStorage.setItem('token', res.data.access);
    err.response.config.headers.Authorization = `Bearer ${res.data.access}`;
    console.log(err, 'err')
    return Promise.resolve();
  });

// , err => axios.post('/token/refresh/').then((res) => {
//   // Tego kawałka kodu też nie jestem pewien czy on dobrze działa
//   localStorage.setItem('token', res.data.token);
//   err.response.config.headers.Authentication = `Bearer ${res.data.token}`;
//   return Promise.resolve();
// })

createAuthRefreshInterceptor(instance, refreshAuthLogic);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const newConfig = config;
  newConfig.headers.Authorization = token ? `Bearer ${token}` : '';
  return newConfig;
});

export async function authorizeUser(username, password) {
  try {
    const token = await instance.post('/token/', { username, password });
    const refreshToken = token.data.refresh;
    localStorage.setItem('refresh', refreshToken);
    return token.data.access;
  } catch (error) {
    return false;
  }
}

export async function verifyUser(token) {
  try {
    const verification = await instance.post('/token/verify/', { token });
    const isVerify = verification && verification.status === 200;
    return isVerify;
  } catch (error) {
    console.log('wylogowuje');
    return false;
  }
}

export async function getAllEvents() {
  try {
    const response = await instance.get('/organiser/event');
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function createEvent(data) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  // eslint-disable-next-line no-undef
  const formData = new FormData();

  Object.entries(data).forEach((arr) => {
    formData.append(arr[0], arr[1]);
  });

  try {
    const response = await instance.post(
      '/organiser/event',
      formData,
      config,
    );
    const statusOK = response && response.status === 201;
    return statusOK;
  } catch (error) {
    return false;
  }
}

export async function getEventDetails(eventName) {
  try {
    const response = await instance.get(`/organiser/event/${eventName}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getRoomsList(eventName) {
  try {
    const response = await instance.get(`/organiser/event/${eventName}/rooms`);
    return response.data;
  } catch (error) {
    return null;
  }
}
