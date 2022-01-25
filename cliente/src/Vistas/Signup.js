import React, { useState } from "react";
import Axios from "axios";
import Main from "../componentes/Main";

import imagenSignup from "../imagenes/signup.png";

export default function Signup({ signup }) {
  const [usuario, setUsuario] = useState({
    email: "",
    nombre: "",
    username: "",
    bio: "",
    password: "",
  });

  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }
  //  async:palabra asincrona se utilz para llamados al servidor
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      signup(usuario);
      // le enviamos al servidor el nuevo usuario y el servidor nos responde con un token para identificar al usuario mas adelante.
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Main center={true}>
      <div className="Signup">
        <img src={imagenSignup} alt="" className="Signup__img" />
        <div className="FormContainer">
          <h1 className="Form__titulo">Clontagram</h1>
          <p className="FormContainer__info">
            Registrate para que veas el clon de instagram
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={usuario.email}
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y apellido"
              className="Form__field"
              required
              minLength="3"
              maxLength="100"
              onChange={handleInputChange}
              value={usuario.nombre}
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="Form__field"
              required
              minLength="3"
              maxLength="30"
              onChange={handleInputChange}
              value={usuario.username}
            />
            <input
              type="text"
              name="bio"
              placeholder="Cuentanos de ti.."
              className="Form__field"
              required
              minLength="3"
              maxLength="150"
              onChange={handleInputChange}
              value={usuario.bio}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="Form__field"
              required
              minLength="3"
              maxLength="15"
              onChange={handleInputChange}
              value={usuario.password}
            />
            <button className="Form__submit" type="submit">
              Sing up
            </button>
            <p className="FormContainer__info">
              YA tienes cuenta?<a href="/signup ">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
}
