import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { GetUserProfile } from "../helpers/GetUserProfile";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Global } from "../helpers/Global";


export const Profile = () => {
  const [user, setUser] = useState({});
  const params = useParams();
  const {auth} = useAuth()
  useEffect(() => {
    GetUserProfile(params.userId, setUser);
  });
  return (
    <>
      <aside className="layout__aside">
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
                <h1 className="container-names__name">
                  {user.name}
                  {user.surname}
                </h1>
                <button className="content__button">seguir</button>
              </div>
              <div>
              <h2 className="container-names__nickname">{user.nick}</h2>
              <p className="container-names__nickname">{user.bio}</p>
              </div>
              
              
            </div>
           
            <div className="profile-info__stats">
              <div className="stats__following">
                <a href="#" className="following__link">
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">10</span>
                </a>
              </div>
              <div className="stats__following">
                <a href="#" className="following__link">
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">13</span>
                </a>
              </div>

              <div className="stats__following">
                <a href="#" className="following__link">
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">17</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <article className="content__posts">
        <div className="posts__post">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img
                  src={avatar}
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">
                  Victor Robles
                </a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">
                  Hace 1 hora
                </a>
              </div>

              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>
          </div>

          <div className="post__buttons">
            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>
          </div>
        </div>
      </article>

      <div className="content__container-btn">
        <button className="content__btn-more-post">
          Ver mas publicaciones
        </button>
      </div>
    </>
  );
};
