import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from '../helpers/Global';
import { useAuth } from '../hooks/useAuth';
export const People = () => {
  const {auth} = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    getUsers()
  })

  const getUsers = async ()=>{
    // Petición para sacar los usuarios
    const request = await fetch(Global.url+"user/listado/1", {
      method: "GET",
      headers: { "Content-type": "application/json", "Authorization": localStorage.getItem("token")  },
    });

    const data = await request.json();

    if (data.users && data.status == "success") {
      setUsers(data.users)
    }
  }
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <div className="content__posts">
        {users.map((user)=>{
          return(
            <>
              <article className="posts__post">
          <div className="post__container">
            <div className="post__image-user">
              <a href="#" className="post__image-link">
              {auth.image != "default.png" && <img src={Global.url+"user/uploads/"+auth.image} className="container-avatar__img" alt="Foto de perfil"/>}
                {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>}
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
            <a href="#" className="post__button post__button--green">
              seguir
            </a> 
            {/* <a href="#" className="post__button">
              Dejar de seguir
            </a>*/}

          </div>
        </article>
            </>
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
