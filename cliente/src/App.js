import React, { useState, useEffect } from "react";

import Nav from "./componentes/Nav";
import Loading from "./componentes/Loading";
import Axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptor,
} from "./Helpers/auth-helpers";
import Signup from "./Vistas/Signup";
import Login from "./Vistas/Login";
import Main from "./componentes/Main";

initAxiosInterceptor();
export default function App() {
  const [usuario, setUsuario] = useState(null); //No sabemos si hay un usuario autenticado
  const [cargardoUsuario, setCargardoUsuario] = useState(true);

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargardoUsuario(false);
        return;
      }
      try {
        const { data: usuario } = await Axios.get("/api/usuarios/whoami");
        setUsuario(usuario);
        setCargardoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario();
  }, []);

  async function login(email, password) {
    const { data } = await Axios.post("/api/usuarios/login", {
      email,
      password,
    }); //podemos cerrar la pagina y el usuario queda guardado, con setToken
    setUsuario(data.usuario);
    setToken(data.token);
  }
  async function signup(usuario) {
    const { data } = await Axios.post("/api/usuarios/signup", usuario); //data usuario data Token
    setUsuario(data.usuario);
    setToken(data.token);
  }

  function logout() {
    setUsuario(null);
    deleteToken();
  }

  if (cargardoUsuario) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  return (
    <div className="contenedor temporal">
      <Nav />
      <Signup signup={signup} />
      <Login login={login} />
      <div>{JSON.stringify(usuario)}</div>
    </div>
  );
}
function LogoutRoutes({ login, signup }) {
  return (
    <BrowserRouter>
      <Route
        Path="/login/"
        render={(props) => <Login {...props} login={login} />}
      />
      <Route
      // render={(props) => <Signup {...props} signup={signup} />}
      // default
      />
    </BrowserRouter>
  );
}
