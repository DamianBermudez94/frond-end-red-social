import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { GetUserProfile } from "../helpers/GetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Global } from "../helpers/Global";
import { PublicationList } from "../publication/PublicationList";

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
    getPublications(1, true);
  }, []);

  useEffect(() => {
    getDataUser();
    getCounters();
    setMore(true);
    getPublications(1, true);
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

  const getPublications = async (nextPage = 1, newProfile = false) => {
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

    if (data.status == "success") {
      let newPublications = data.listPublications;
      // Comprobamos que no haya nuevos perfiles y que haya publicaciones
      // para agregar nuevas publicaciones
      if (!newProfile && publications.length >= 1) {
        newPublications = [...publications, ...data.listPublications];
      }
      // Receteamos las publicaciones cuando se detecta um nuevo perfil
      // y agregamos nuevas publicaciones de ese perfil
      if (newProfile) {
        newPublications = data.listPublications;
        setMore(true);
        setPage(1);
      }
      setPublications(newPublications);
      // Comprobamos la longitud del estado con en de la lista y si es igual, al estado le pasamos false
      if (
        !newProfile &&
        publications.length >= data.total - data.listPublications.length
      ) {
        setMore(false);
      }
      if (data.page <= 1) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <headers className="layout__aside">
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
      </headers>
      <PublicationList
        publications={publications}
        setPublications={setPublications}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
        getPublications={getPublications}
      />
    </>
  );
};
