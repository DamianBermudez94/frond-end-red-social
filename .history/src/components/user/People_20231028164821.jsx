import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../helpers/Global";

export const People = () => {
 
  const [users, setUsers] = useState([]);
console.log(users);
  // El componente se va actualizar solo una vez
  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () => {
    // Petición para sacar los usuarios
    const request = await fetch(Global.url + "user/listado/1", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    console.log(data);
    if (data.users && data.status == "success") {
      setUsers(data.users);
      console.log(users);
    }
  };
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/uploads/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {user.create__at}
                    </a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>

              <div className="post__buttons">
                <a href="#" className="post__button post__button--green">
                  seguir
                </a>
                {/* <a href="#" className="post__button">
              Dejar de seguir
            </a>*/}
              </div>
            </article>
          );
        })}

        <div className="content__container-btn">
          <button className="content__btn-more-post">
            Ver mas publicaciones
          </button>
        </div>
      </div>
    </>
  );
};
