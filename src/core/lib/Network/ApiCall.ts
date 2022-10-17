import URL from "./URL";
import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://d224-180-211-112-179.in.ngrok.io/admin/",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: ``,
    "Access-Control-Allow-Origin": "*",
  },
});

axiosApi.interceptors.request.use(function (config: any) {
  config.headers.Authorization;
  return config;
});

export const GraphPost = async (query: any, variables: any) => {
  const { data, request } = await axios.post(
    `${URL.BASE_URL}`,
    {
      query: query,
      variables: variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return JSON.stringify(data);
};

export const PostApi = async (reqUrl: String, paramData: any) => {
  const res = await axiosApi.post(`${URL.BASE_URL}`, {
    headers: {
      Authorization: "Bearer " + "sad",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return JSON.stringify(res.data);
};

export const getRequest = async (endpoint: any, parameter = {}) => {
  try {
    const { data, request } = await axiosApi.get(`${URL.BASE_URL}${endpoint}`, {
      params: parameter,
    });
    return data;
  } catch (e) {
    return false;
  }
};

export const postRequest = async (endpoint: any, body: any) => {
  try {
    const { data, request } = await axiosApi.post(`${endpoint}`, body);
    return data;
  } catch (e) {
    return false;
  }
};

export const postRequestGraphQL = async (query: any, body: any) => {
  const data = await axios.post(
    URL.BASE_URL,
    {
      query: query,
      variables: body,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("res ::::::", JSON.stringify(data.data.data));
  return data.data.data;
};

export const postRequestGraphQLAuth = async (
  query: any,
  body: any,
  token: string
) => {
  const data = await axios.post(
    URL.BASE_URL,
    {
      query: query,
      variables: body,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("res ::::::", JSON.stringify(data.data.data));
  return data.data.data;
};

