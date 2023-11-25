import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { GetUserProfile } from "../helpers/GetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Global } from "../helpers/Global";

export const Profile = () => {
  // Estado para sacar el usuario
  const [users, setUser] = useState({});
  // Estado para devolver los contadores de seguidores,seguidos y publicaciones
  const [counters, setCounters] = useState({});
  // Estado para verificar seguidores/seguidos
  const [iFollow, setIfollow] = useState(false);
  const [publications, setPublications] = useState([]);
  // Estado para obtener el valor del button
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const params = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications(1);
  }, []);

  useEffect(() => {
    getDataUser();
    getCounters();
    getPublications(1);
  }, [params]);
  const token = localStorage.getItem("token");
  // función que me permite obtener la data pura del usuario
  // para poder setear estado de seguir/dejar de seguir
  const getDataUser = async () => {
    let dataUser = await GetUserProfile(params.userId, setUser);

    if (dataUser.following && dataUser.following._id) {
      setIfollow(true);
    }
  };
  const getCounters = async () => {
    const request = await fetch(Global.url + "user/count/" + params.userId, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    if (data.following) {
      setCounters(data);
    }
  };

  const getPublications = async (nextPage = 1) => {
    const request = await fetch(
      Global.url + "publication/publications/" + params.userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await request.json();
    console.log(data);
    if (data.status == "success") {
      let newPublications = data.listPublications;
      if (publications.length >= 1) {
        newPublications = [...publications, ...data.listPublications];
      }
      setPublications(newPublications);
      console.log(data);
    }
    // Comprobamos la longitud del estado con en de la lista y si es igual, al estado le pasamos false
    if (publications.length >= data.total - data.listPublications.length) {
      setMore(false);
    }
  };
  const nexPage = () => {
    const next = page + 1;
    setPage(next);
    getPublications(next);
  };

  return (
    <>
      <article className="layout__aside">
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
                {auth.image === "default.png" && (
                  <img
                    src={avatar}
                    className="container-avatar__img"
                    alt="Foto de perfil"
                  />
                )}
              </div>

              <div className="general-info__container-names">
                <h1 className="container-names__name">
                  {users.name}
                  {users.surname}
                </h1>
                <h2 className="container-names__nickname">{users.nick}</h2>
              </div>
              {users._id != auth._id &&
                (iFollow ? (
                  <button className="content__button post__button">
                    Dejar de seguir
                  </button>
                ) : (
                  <button className="content__button">seguir</button>
                ))}
            </div>

            <p className="container-names__nickname">{users.bio}</p>
            <div className="profile-info__stats">
              <div className="stats__following">
                <Link
                  to={"/social/siguiendo/" + users._id}
                  className="following__link"
                >
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">
                    {counters.following >= 1 ? counters.following : 0}
                  </span>
                </Link>
              </div>
              <div className="stats__following">
                <Link
                  to={"/social/seguidores/" + users._id}
                  className="following__link"
                >
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">
                    {counters.followed >= 1 ? counters.followed : 0}
                  </span>
                </Link>
              </div>

              <div className="stats__following">
                <Link
                  to={"/social/perfil/" + users._id}
                  className="following__link"
                >
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">
                    {counters.publications >= 1 ? counters.publications : 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {publications.map((publication) => {
        return (
          <article className="content__posts" key={publication._id}>
            <div className="posts__post">
              <div className="post__container">
                <div className="post__image-user">
                  {publication.image != "default.png" && (
                    <img
                      src={
                        Global.url + "user/uploads/" + publication.user.image
                      }
                      className="container-avatar__img"
                      alt="Foto de perfil"
                    />
                  )}
                  {publication.image === "default.png" && (
                    <img
                      src={avatar}
                      className="container-avatar__img"
                      alt="Foto de perfil"
                    />
                  )}
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {publication.user.name}
                      {publication.user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {publication.user.create_at}
                    </a>
                  </div>

                  <h4 className="post__content">{publication.text}</h4>
                </div>
              </div>
              {auth._id == publication.user._id && (
                <div className="post__buttons">
                  <a href="#" className="post__button">
                    <i className="fa-solid fa-trash-can"></i>
                  </a>
                </div>
              )}
            </div>
          </article>
        );
      })}
      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nexPage}>
            Ver mas publicaciones
          </button>
        </div>
      )}
    </>
  );
};
