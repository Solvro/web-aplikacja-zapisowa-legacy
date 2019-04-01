const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
});

export async function authorizeUser(username, password) {
  try {
    const token = await instance.post(`/token/`, { username, password });
    return token.data.access;
  } catch (error) {
    console.log("Error login: ", error)
    return false;
  }
}

export async function verifyUser(token) {
  try {
    const verification = await instance.post(`/token/verify/`, { token });
    const isVerify = verification && verification.status === 200;
    return isVerify;
  } catch (error) {
    return false;
  }
}
