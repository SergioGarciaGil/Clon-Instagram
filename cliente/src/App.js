import React, { useState, useEffect } from "react";
import Nav from "./componentes/Nav";
import Axios from "axios";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptor,
} from "./Helpers/auth-helpers";
import Signup from "./Vistas/Signup";
import Login from "./Vistas/Login";

initAxiosInterceptor();
export default function App() {
  const [usuario, setUsuario] = useState(null); //No sabemos si hay un usuario autenticado
  const [cargardoUsuario, setCargardoUsuario] = useState(true);

  useEffect(() => {
    async function cargardoUsuario() {
      if (!getToken()) {
        setCargardoUsuario(false);
        return;
      }
      try {
        const { data: usuario } = await Axios.get("/api/usuarios/whoami");
      } catch (error) {
        console.log(error);
      }
    }
    cargardoUsuario();
  });
  async function login(email, password) {
    const { data } = await Axios.post("/api/usuarios/login", {
      email,
      password,
    }); //data usuario data Token
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
  return (
    <div className="ContenedorTemporal">
      <Nav />
      <Signup signup={signup} />
      {/* <Login login={login} /> */}
      <div>{JSON.stringify(usuario)}</div>
    </div>
  );
}
