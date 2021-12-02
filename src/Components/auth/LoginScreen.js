import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { starProviderLogin, startLoginEmailPassword } from "../../actions/auth";
import validator from "validator";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [ValuesForm, handleInputChange] = useForm({
    // el form precargado
    email: "ariasv@gmail.com",
    password: "1234567",
  });

  const social = (param) => {
    console.log("click");
    dispatch(starProviderLogin(param));
  };

  const { email, password } = ValuesForm;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isValueForm()) {
      dispatch(startLoginEmailPassword(email, password));
      console.log(email, password, "que hace");
    }
  };
  const isValueForm = () => {
    if (email === "" || password === "") {
      let error = "";
      if (email === "") {
        error = "Usuario";
      }
      if (password === "") {
        error = `${error} Contraseña`;
      }
      Swal.fire("Login", `Por favor llene ${error}`, "info");
      return false;
    } else {
      if (validator.isEmail(email)) {
        return true;
      } else {
        Swal.fire("Login", `El correo debe de contener "@ .com"`, "info");
        return false;
      }
    }
  };
  return (
    < >
    <div className="animate__animated animate__pulse">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="text-center mt-3">
          <label className="text-center">Usuario</label>
          <input
            className="form-control"
            // type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center mt-3">
          <labe className="text-center">Contraseña</labe>
          <input
            className="form-control"
            type="text"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-3 pb-3 text-center">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
        <hr mt-3 />
        <section>
          <p className="text-center">Iniciar con Redes Social</p>

          <div className="btn-group">
            <div className="text-center mt-3">
              <img
                className="btn-social"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="botón google"
                onClick={() => social("google")}
              />
            </div>
            <div className="text-center mt-3">
              <img
                className="btn-facebook"
                src="https://www.seekpng.com/png/full/332-3327611_icono-de-facebook-facebook-icon.png"
                alt="botón facebook"
                onClick={() => social("facebook")}
              />
            </div>
          </div>
        </section>
        <div className="mt-3">
          <Link className="link" to="/auth/register">
            Crea una Cuenta
          </Link>
        </div>
      </form>
      </div>
    </>
  );
};
