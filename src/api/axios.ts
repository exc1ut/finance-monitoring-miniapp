import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

// get telegram web app user id
const token = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;

function authRequestInterceptor(config: AxiosRequestConfig) {
  const defaultCompany = localStorage.getItem('default-company');

  if (token) {
    //@ts-ignore
    config.headers.Authorization = `${token}`;
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
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);
