import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../helpers/Global";

export const People = () => {
  // Estado para ontener los usuarios
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState([1]);
  // El componente se va actualizar solo una vez
  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async (nextPage) => {
    // Petición para sacar los usuarios
    const request = await fetch(Global.url + "user/listado/"+ nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    });

    const data = await request.json();
   
    if (data.user && data.status == "success") {
      let newUsers = data.user;

      // comprobamos la posición de la page y le asignamos al array los nuevos valores
      if (users.length >= 1) {
        newUsers=[...users,...data.user]
      }
      setUsers(newUsers);
    
    }
  };

  const nextPage = ()=>{

    // Inicializamos la pagina en 1
    let next = page + 1;
    setPage(next);
    console.log(page);
    getUsers(next)

  }
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
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas publicaciones
          </button>
        </div>
      </div>
    </>
  );
};
