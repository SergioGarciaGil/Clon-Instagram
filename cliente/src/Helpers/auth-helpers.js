import Axios from "axios";

const TOKEN_KEY = " CLONTAGRAN_TOKEN";

// funcion para guardar token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// funcion para leer el token para

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
// Funcion eliminar el token para

export function deleteToken() {
  localStorage.removeToken(TOKEN_KEY);
}
// funcion para poder inteceptar las llamadas
export function initAxiosInterceptor() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  });
  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = "./login";
      } else {
        return Promise.reject(error);
      }
    }
  );
}
