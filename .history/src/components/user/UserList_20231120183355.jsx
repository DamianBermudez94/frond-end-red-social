/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";

import { Global } from "../helpers/Global";
import { useAuth } from "../hooks/useAuth";


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


  const { auth } = useAuth();
  console.log("Soy el auth",auth);
 console.log("Soy el user",users);
  const token = localStorage.getItem("token")
  console.log(token);
  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
    });
    const data = await request.json();
    console.log("soy la data follow",data);
    if (data.status == "success") {
      setFollowing([...following, userId]);
    }
  };
  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    console.log("soy la data unfollow",data);
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
      <div className="content__posts" >
        {users.map((user) => {
          console.log("hola",user._id);
          return(
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link to={"/social/perfil/"+ user._id} className="post__image-link">
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
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <Link to={"/social/perfil/"+user._id} className="user-info__name">
                      {user.name} {user.surname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link to={"/social/perfil/"+user._id} className="user-info__create-date">
                      {user.create__at}
                    </Link>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>
              {user._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(user._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => follow(user._id)}
                    >
                      seguir
                    </button>
                  )}
                  {following.includes(user._id) && (
                    <button
                      className="post__button"
                      onClick={() => unfollow(user._id)}
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