import avatar from "../../assets/img/user.png";

export const Profile = () => {
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button className="content__button">Mostrar nuevas</button>
      </header>
      <aside className="layout__aside">

<header className="aside__header">
    <h1 className="aside__title">Hola, Victor</h1>
</header>

<div className="aside__container">

    <div className="aside__profile-info">

        <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
                <img src="assets/img/user.png" className="container-avatar__img" alt="Foto de perfil"/>
            </div>

            <div className="general-info__container-names">
                <a href="#" className="container-names__name">Victor Robles</a>
                <p className="container-names__nickname">VictorWeb</p>
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


    <div className="aside__container-form">

        <form className="container-form__form-post">

            <div className="form-post__inputs">
                <label htmlFor="post" className="form-post__label">¿Que estas pesando hoy?</label>
                <textarea name="post" className="form-post__textarea"></textarea>
            </div>

            <div className="form-post__inputs">
                <label htmlFor="image" className="form-post__label">Sube tu foto</label>
                <input type="file" name="image" className="form-post__image"/>
            </div>

            <input type="submit" value="Enviar" className="form-post__btn-submit" />

        </form>

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
