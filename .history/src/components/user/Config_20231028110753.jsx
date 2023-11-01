import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Global } from "../helpers/Global";
import avatar from "../../assets/img/user.png";
import { Serializeform } from "../helpers/Serializeform";
export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");
  const userConfig = async (e) => {
    // Prevenir la actualizacion de la pantalla
    e.preventDefault();
    // Obtener los datos del formulario
    let newDatauser = Serializeform(e.target)
    delete newDatauser.file0;
    // Actualizar datos en la base de datos

    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDatauser),
      headers: { "Content-type": "application/json", "Authorization": localStorage.getItem("token") },
    });

    // convertimos la respuesta para que siempre devuelva un objeto
    const data = request.json();
console.log(data);
    if (data.status == "succes") {
      delete data.user.password;
      setAuth(data.user)
      setSaved("saved")
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
        {saved == "saved" ? (
          <strong className="alert alert-success">
            El usuario se ha actualizado correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-error">
            El usuario no se ha actualizado, verificar los datos enviados
          </strong>
        ) : (
          ""
        )}
        <form className="config-form" onSubmit={userConfig}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos:</label>
            <input type="text" name="surname" defaultValue={auth.surname} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick:</label>
            <input type="text" name="nick" defaultValue={auth.nick} />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea name="bio" defaultValue={auth.bio} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electronico:</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="avatar">
              {auth.image != "default.png" && (
                <img
                  src={Global.url + "user/uploads/" + auth.image}
                  className="list-end__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "default.png" && (
                <img
                  src={avatar}
                  className="list-end__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <input type="file" name="file0" id="file0" />
          </div>
          <input type="submit" value="Guardar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
