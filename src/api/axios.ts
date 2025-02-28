import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

declare global {
  interface Window {
    Telegram: any;
  }
}

const token = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

function authRequestInterceptor(config: AxiosRequestConfig) {
  const defaultCompany = localStorage.getItem('default-company');

  if (token) {
    //@ts-ignore
    config.headers.Authorization = token;
  }

  if (defaultCompany) {
    config.params = config.params ?? {};

    config.params.company = defaultCompany;
  }

  //@ts-ignore
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: 'https://expensebot.set.uz/',
});

axios.interceptors.request.use(authRequestInterceptor as any);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
