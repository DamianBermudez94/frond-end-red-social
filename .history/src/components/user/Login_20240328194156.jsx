import { useState } from "react";
import { Global } from "../helpers/Global";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import "./styles.css"
export const Login = () => {
  const { form, changed } = useForm({});
  const [login, setLogin] = useState("not_saved");
  const { setAuth } = useAuth();

  const saveUser = async (e) => {
    // Prevenir la actualizacion de la pantalla
    e.preventDefault();
    // Obtener los datos del formulario
    let loginToUser = form;
    console.log(loginToUser);
    // Guardar usuario del back end
    console.log(Global.url);
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(loginToUser),
      headers: { "Content-Type": "application/json" },
    });
    const data = await request.json();
    console.log("soy la data", data);
    // Verificamos que los datos del formulario sean correctos
    if (data.status == "success") {
      // Guardar los datos para que percistan en el navegador

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLogin("login");

      // Seteamos los datos del AUTH
      setAuth(data.user);

      // Redireccion al entrar en true el login
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setLogin("error");
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
        {login == "login" ? (
          <strong className="alert alert-success">
            El usuario se ha logueado correctamente!!
          </strong>
        ) : (
          ""
        )}
        {login == "error" ? (
          <strong className="alert alert-error">
            El usuario no se ha podido registrar
          </strong>
        ) : (
          ""
        )}
        <form className="content-form__login" action="" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="email">Correo electronico:</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input type="submit" value="Ingresar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
