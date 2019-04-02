const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
});

export async function authorizeUser(username, password) {
  try {
    const token = await instance.post('/token/', { username, password });
    return token.data.access;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
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
  const config = {
    headers: {
      Authorization: 'Basic dGVzdF9vcmc6dGVzdDEyMzQ=',
    },
  };
  try {
    const response = await instance.get(
      '/organiser/event',
      config,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createEvent(data) {
  const config = {
    headers: {
      Authorization: 'Basic dGVzdF9vcmc6dGVzdDEyMzQ=',
      'Content-Type': 'multipart/form-data',
    },
  };
  // eslint-disable-next-line no-undef
  const formData = new FormData();

  console.log('BEFORE', data);

  // Object.keys(data).forEach((key) => {
  //   if (data[key] instanceof Date) {
  //     const formatted = data[key].toISOString().slice(0, 10);
  //     // eslint-disable-next-line no-param-reassign
  //     data[key] = formatted;
  //   }
  // });

  Object.entries(data).forEach((arr) => {
    formData.append(arr[0], arr[1]);
  });

  console.log('AFTER', data);

  try {
    const response = await instance.post(
      '/organiser/event',
      formData,
      config,
    );
    const statusOK = response && response.status === 201;
    return statusOK;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function handleCreateTrip(formState) {
  console.log(`Creating event ${formState.name}...`);
  const response = await createEvent(formState);
  if (response) {
    console.log(`Success creating event: ${formState.name}`);
  } else {
    console.error(`Could not create event ${formState.name}`)
  }
}
