/* eslint-disable react/prop-types */
import avatar from "../../assets/img/user.png";

import { Global } from "../helpers/Global";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUsers"

const UserList = ({
  users,
  getUsers,
  following,
  setFollowing,
  loading,
  more,
  page,
  setPage,
}) => {
  if (Array.isArray( users)) {
    users.map(item => {
      // Tu lógica aquí
      console.log(item);
    });
  } else {
    console.error("La variable no es un array.");
  }
 const { user } = useUser();
 console.log("holaa",user);
  
  const { auth } = useAuth();
 

  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    if (data.status == "success") {
      setFollowing([...following, userId]);
    }
  };
  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    console.log("soy la data",data);
    if (data.status == "success") {
      let filterFollowings = following.filter(
        (followingUserId) => userId !== followingUserId
      );
      setFollowing(filterFollowings);
    }
  };
  const nextPage = () => {
    // Inicializamos la pagina en 1
    let next = page + 1;
    setPage(next);
    console.log(page);
    getUsers(next);
    console.log(following);
  };
  return (
    <>
      <div className="content__posts">
        {user.map((users) => {
          console.log("hola",user);
          return(
            <article className="posts__post" key={users._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/uploads/" + users.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {users.image == "default.png" && (
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
                      {users.name} {users.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {users.create__at}
                    </a>
                  </div>

                  <h4 className="post__content">{users.bio}</h4>
                </div>
              </div>
              {users._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(users._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => follow(users._id)}
                    >
                      seguir
                    </button>
                  )}
                  {following.includes(user._id) && (
                    <button
                      className="post__button"
                      onClick={() => unfollow(users._id)}
                    >
                      Dejar de seguir
                    </button>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
      {loading ? <div>Cargando......</div> : ""}
      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas personas
          </button>
        </div>
      )}
    </>
  );
};



export default UserList;