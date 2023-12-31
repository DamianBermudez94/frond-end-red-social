import { Link } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

export const Sidebar = () => {
  const { auth, counters } = useAuth();
  const { form, changed } = useForm();
  const [stored, setStored] = useState("not_stored");
  const savePublications = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    // Recoger los datos del furmulario
    let newPublications = form;
    newPublications.user = auth._id;
    // Peticion para guardar las publicaciones
    const request = await fetch(Global.url + "publication/save", {
      method: "POST",
      body: JSON.stringify(newPublications),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    // mostrar mensaje exito o error
    if (data.status == "success") {
      setStored("stored");
    } else {
      setStored("error");
    }
    // Subir imagen
    const fileInput = document.querySelector("#file");
    if (data.status == "success" && fileInput.files[0]) {
        const formData = new FormData();
        formData.append("file0",fileInput.files[0]);
        const uploadRequest = await fetch(Global.url + "publication/uploads"+ data.publication._id, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-type": "application/json",
              Authorization: token,
            },
          });
          const uploadData = await uploadRequest.json();
          console.log(uploadData);
    }

  };
  return (
    <>
      <aside className="layout__aside">
        <header className="aside__header">
          <h1 className="aside__title">Hola, {auth.name}</h1>
        </header>

        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
                {auth.image != "default.png" && (
                  <img
                    src={Global.url + "user/uploads/" + auth.image}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
                {auth.image == "default.png" && (
                  <img
                    src={avatar}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
              </div>

              <div className="general-info__container-names">
                <a href="#" className="container-names__name">
                  {auth.name}
                  {auth.surname}
                </a>
                <p className="container-names__nickname">{auth.nick}</p>
              </div>
            </div>

            <div className="profile-info__stats">
              <div className="stats__following">
                <Link to={"siguiendo/" + auth._id} className="following__link">
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">
                    {counters.following}
                  </span>
                </Link>
              </div>
              <div className="stats__following">
                <Link to={"seguidores/" + auth._id} className="following__link">
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">{counters.followed}</span>
                </Link>
              </div>

              <div className="stats__following">
                <Link to={"gente/"} className="following__link">
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">
                    {counters.publications}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="aside__container-form">
            {stored == "stored" ? (
              <strong className="alert alert-success">
                El usuario se ha logueado correctamente!!
              </strong>
            ) : (
              ""
            )}
            {stored == "error" ? (
              <strong className="alert alert-error">
                Error, no se ha podido publicar{" "}
              </strong>
            ) : (
              ""
            )}

            <form
              className="container-form__form-post"
              onSubmit={savePublications}
            >
              <div className="form-post__inputs">
                <label htmlFor="text" className="form-post__label">
                  ¿Que estas pesando hoy?
                </label>
                <textarea
                  name="text"
                  className="form-post__textarea"
                  onChange={changed}
                ></textarea>
              </div>

              <div className="form-post__inputs">
                <label htmlFor="image" className="form-post__label">
                  Sube tu foto
                </label>
                <input
                  type="file"
                  name="file0"
                  id="file"
                  className="form-post__image"
                />
              </div>

              <input
                type="submit"
                value="Enviar"
                className="form-post__btn-submit"
              />
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};
