/* eslint-disable react/prop-types */
import avatar from "../../assets/img/user.png";

import { useAuth } from "../hooks/useAuth";
import { Global } from "../helpers/Global";
import ReactTimeAgo from 'react-time-ago';
export const PublicationList = ({
  publications,
  more,
  page,
  setPage,
  getPublications,
  setMore,
}) => {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const nexPage = () => {
    const next = page + 1;
    setPage(next);
    getPublications(next);
  };
  const deletePublications = async (publicationsId) => {
    const request = await fetch(
      Global.url + "publication/delete/" + publicationsId,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await request.json();
    console.log("soy la data",data);

    setPage(1);
    setMore(true);
    getPublications(1, true);
    if (data.page <= 1) {
      setMore(false);
    }
  };

  return (
    <div className="content_post">
      {publications.map((publication) => {
        return (
          <article className="content__posts" key={publications._id}>
            <div className="posts__post">
              <div className="post__container">
                <div className="post__image-user">
                  {publication.image != "default.png" && (
                    <img
                      src={
                        Global.url + "user/uploads/" + publications.user.image
                      }
                      className="container-avatar__img"
                      alt="Foto de perfil"
                    />
                  )}
                  {publications.image === "default.png" && (
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
                      {publications.user.name}
                      {publications.user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <ReactTimeAgo date={publications.create_at} locale="es-ES"/>
                    </a>
                  </div>

                  <h4 className="post__content">{publications.text}</h4>
                  {publications.file && (
                    <img
                      src={Global.url + "publication/media/" + publications.file}
                    />
                  )}
                </div>
              </div>
              {auth._id == publication.user._id && (
                <div className="post__buttons">
                  <button
                    onClick={() => deletePublications(publications._id)}
                    className="post__button"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
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
    </div>
  );
};
