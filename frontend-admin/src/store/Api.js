const axios = require('axios');

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export async function authorizeUser(username, password) {
  try {
    const token = await instance.post('/token/', { username, password });
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
    return false;
  }
}

export async function getAllEvents() {
  try {
    const response = await instance.get(
      '/organiser/event',
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

async function createEvent(data) {
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

export function handleCreateTrip(formState) {
  return createEvent(formState);
}
