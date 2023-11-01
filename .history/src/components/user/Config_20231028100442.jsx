import { useState } from "react";
import { Global } from "../helpers/Global";

export const Config = () => {
  
  const [saved, setSaved] = useState("not_saved");
  const userConfig = async (e) => {
    // Prevenir la actualizacion de la pantalla
    e.preventDefault();
    // Obtener los datos del formulario
    let newUser = form;
    
    // Guardar usuario del back end
    const request = await fetch(Global.url+"user/update" , {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    });
    const data = await request.json();
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
        <h1 className="content__title">Ajustes</h1>
      </header>
      <div className="content__posts">
       {saved == "saved" ? <strong className="alert alert-success">El usuario se ha registrado correctamente</strong> : "" }
       {saved == "error" ? <strong className="alert alert-error">El usuario no se ha podido registrar</strong> : "" }
        <form className="config-form" onSubmit={userConfig}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" name="name"  />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos:</label>
            <input type="text" name="surname"  />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick:</label>
            <input type="text" name="nick"  />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electronico:</label>
            <input type="email" name="email"  />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password"  />
          </div>
          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
           <div className="avatar">

           </div>
           <input type="file" name="file0"  id="file0"/>
          </div>
          <input type="submit" value="Guardar" className="btn btn-success" />
        </form>
      </div>
    </>
  )
}
