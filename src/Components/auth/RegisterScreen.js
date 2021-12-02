import React from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setError, uiRemoveError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [ValuesForm, handleInputChange] = useForm({
    //Formulario Precargado
    name: "Vilgana",
    email: "ariasv@gmail.com",
    password: "1234567",
    password2: "1234567",
  });

  const { name, email, password, password2 } = ValuesForm;
  const handleRegistro = (e) => {
    e.preventDefault();

    if (isValueForm()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
      dispatch(uiRemoveError("Correcto"));
    }
  };
  const isValueForm = () => {
    //console.log(name.trim().length);
    if (name === "" || email === "" || password === "") {
      let obligatorios = " ";
      if (name.trim() < 3) {
        obligatorios = "nombre";
      }
      if (email === "") {
        obligatorios = `${obligatorios} email `;
      }
      if (password === "") {
        obligatorios = `${obligatorios} Contraseña `;
      }
      dispatch(
        setError(
          Swal.fire("info", `Obligatorio insertar = ${obligatorios}`, "info")
        )
      );

      return false;
    } else {
      if (name.trim().length > 4) {
        if (password === password2) {
          return true;
        } else {
          dispatch(
            setError(Swal.fire("Info", "La contraseña no coincide", "info"))
          );
        }
      } else {
        dispatch(
          setError(
            Swal.fire(
              "Info",
              "El campo  Nombre debe de tener al menos 5 caracteres",
              "info"
            )
          )
        );

        return false;
      }
    }
  };
  return (
    <>
      <div className="animate__animated animate__pulse">
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleRegistro}>
          <div className="text-center mt-3">
            <labe className="text-center">Nombre</labe>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center mt-3">
            <label className="text-center">Usuario</label>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="text-center mt-3">
            <labe className="text-center">Password</labe>
            <input
              className="form-control"
              type="text"
              placeholder="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center mt-3">
            <labe className="text-center">Confirmación</labe>
            <input
              className="form-control"
              type="text"
              placeholder="password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-3 pb-3 text-center">
            <button className="btn btn-primary" type="submit">
              Registrarse
            </button>
          </div>
          <hr mt-3 />
          <div className="mt-3">
            <Link className="link" to="/auth/login">
              ¿Ya te Registraste?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

