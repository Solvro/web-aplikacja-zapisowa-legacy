const axios = require('axios');


const instance = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const newConfig = config;
  newConfig.headers.Authorization = token ? `Bearer ${token}` : '';
  return newConfig;
});

function requestTokenRefresh() {
  return instance.post('/token/refresh/', { refresh: localStorage.getItem('refresh') })
    .then(res => res.data.access);
}

instance.interceptors.response.use(undefined, (err) => {
  const { response } = err;
  const { config, status } = response;
  if (status === 401 && config && !config.retryReqGuard) {
    return requestTokenRefresh().then((token) => {
      config.retryReqGuard = true;
      localStorage.setItem('token', token);
      return instance(config);
    });
  }
  if (status === 500) {
    // Handle 500 from server when access token is empty
    const token = localStorage.getItem('token');
    if (!token) {
      // eslint-disable-next-line no-undef
      window.location.reload();
    }
  }
  return err;
});

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
}

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

  const response = await instance.post(
    '/organiser/event',
    formData,
    config,
  );
  if (response.status !== 201) {
    throw response.response.data.detail;
  }
  return response;
}

export async function removeParticipant(eventName, participantInfo) {
  try {
    const { Index } = participantInfo;
    const { children: index } = Index.props;
    const response = await instance.delete(`/organiser/${eventName}/student/${index}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function editParticipant(eventName, participantInfo) {

  try {
    const response = await instance.patch(`/organiser/${eventName}/student/${participantInfo.index}`, participantInfo);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
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

export async function getStatistics(eventName) {
  try {
    const response = await instance.get(`/organiser/${eventName}/statistics`);
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

export async function getParticipantsList(eventName) {
  try {
    const response = await instance.get(`/organiser/${eventName}/students_status/`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function updateEvent(eventName, data) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  // eslint-disable-next-line no-undef
  const formData = new FormData();

  Object.entries(data).forEach((arr) => {
    if (arr[1]) {
      formData.append(arr[0], arr[1]);
    }
  });

  try {
    const response = await instance.patch(
      `/organiser/event/${eventName}`,
      formData,
      config,
    );
    const statusOK = response && response.status === 200;
    return statusOK;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function sendMail(eventName, data) {
  try {
    const response = await instance.post(`/organiser/${eventName}/email/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function changeEventRegistrationStatus(data) {
  try {
    const response = await instance.post(`/organiser/${data.eventName}/activate/`, { is_active: data.is_active });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteEvent(eventName) {
  try {
    const response = await instance.delete(`/organiser/event/${eventName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
