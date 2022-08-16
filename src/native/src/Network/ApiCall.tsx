const axios = require('axios').default;
import URL from './URL';

export const PostApi = async (reqUrl: String, paramData: any) => {
  const res = await axios.post(`${URL.BASE_URL}${reqUrl}`, paramData, {
    headers: {
      Authorization: 'Bearer ' + 'sad',
      'Content-Type': 'application/json',
    },
  });

  return JSON.stringify(res.data);
};

export const PutApi = async (reqUrl: String, paramData: any) => {
  const res = await axios.put(`${URL.BASE_URL}${reqUrl}`, paramData, {
    headers: {
      Authorization: 'Bearer ' + 'sad',
      'Content-Type': 'application/json',
    },
  });

  return JSON.stringify(res.data);
};

export const GetApi = async (reqUrl: String, paramData: any) => {
  const res = await axios.get(`${URL.BASE_URL}${reqUrl}`, paramData, {
    headers: {
      Authorization: 'Bearer ' + 'sad',
    },
  });
  return JSON.stringify(res.data);
};

export const DeleteApi = async (reqUrl: String, paramData: any) => {
  const res = await axios.get(`${URL.BASE_URL}${reqUrl}`, paramData, {
    headers: {
      Authorization: 'Bearer ' + 'sad',
    },
  });
  return JSON.stringify(res.data);
};
