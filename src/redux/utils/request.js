import axios from 'axios';
import config from '../../config';

export default function request(endpoint, token, options, payload) {
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return axios(`${config.API_URI}/${endpoint}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    data: JSON.stringify(payload),
    ...options,
  })
  .then((response) => {
    const data = response.data;
    if (data.success) {
      return data;
    }

    throw new Error(data.message);
  });
}