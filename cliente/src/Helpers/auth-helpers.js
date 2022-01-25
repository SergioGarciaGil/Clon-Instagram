import Axios from "axios";

const TOKEN_KEY = " CLONTAGRAN_TOKEN";

// funcion para guardar token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token); //setItem recibee el kit y el valor
}
// funcion para leer el token para

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
// Funcion eliminar el token para

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}
//enviar el token a cada llamada en rutas privadas porque el servidor no sabe a quien se esta haciendo la llamada

//axios es una libreria y interceptor es una funcionalidad de axios para interceptar la llamadas para poder agregar la informacion
export function initAxiosInterceptor() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken(); //leemos el token que ya lo tenemos
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  });
  //si el llamado es éxitoso  deja pasar la respuesta y se guarda en data o de lo contrario se va a error
  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    //error 401= error de tipo de autentificacion
    function (error) {
      //si el error existe enviamos borramos el token y enviamos al usuario a windon.location y redireccionamos a "./login"
      if (error.response.status === 401) {
        deleteToken();
        window.location = "./login";
        //si el error no es 401 retornamos una promesa con el error.
      } else {
        return Promise.reject(error);
      }
    }
  );
}
