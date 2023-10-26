import { useState } from "react";
import { Global } from "../helpers/Global";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const { form, changed } = useForm({});
  const [login, setLogin] = useState("not_saved");


  const saveUser = async (e) => {
    // Prevenir la actualizacion de la pantalla
    e.preventDefault();
    // Obtener los datos del formulario
    let loginToUser = form;
    console.log(loginToUser);
    // Guardar usuario del back end
    const request = await fetch(Global.url+"user/login", {
      method: "POST",
      body: JSON.stringify(loginToUser),
      headers: { "Content-type": "application/json" },
    });
    const data = await request.json();
    console.log(data);
    // Verificamos que los datos del formulario sean correctos
    if (data.status == "success") {
      setLogin(login)
    } else {
      setLogin("error")
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
        {login == "login" ? <strong className="alert alert-success">El usuario se ha registrado correctamente</strong> : "" }
       {login == "error" ? <strong className="alert alert-error">El usuario no se ha podido registrar</strong> : "" }
        <form action="" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="email">Correo electronico:</label>
            <input type="email" name="email"  onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password"  onChange={changed} />
          </div>
          <input type="submit" value="Ingresar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
