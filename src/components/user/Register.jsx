import { useState } from "react";
import { Global } from "../helpers/Global";
import { useForm } from "../hooks/useForm";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_saved");
  const loginUser = async (e) => {
    // Prevenir la actualizacion de la pantalla
    e.preventDefault();
    // Obtener los datos del formulario
    let newUser = form;
    console.log(newUser);
    // Guardar usuario del back end
    const request = await fetch(Global.url+"user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    });
    const data = await request.json();
    console.log(data);
    // Verificamos que los datos del formulario sean correctos
    if (data.status == "success") {
      setSaved(saved)
    } else {
      setSaved("error")
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts">
       {saved == "saved" ? <strong className="alert alert-success">El usuario se ha registrado correctamente</strong> : "" }
       {saved == "error" ? <strong className="alert alert-error">El usuario no se ha podido registrar</strong> : "" }
        <form action="" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos:</label>
            <input type="text" name="surname" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick:</label>
            <input type="text" name="nick" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electronico:</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
