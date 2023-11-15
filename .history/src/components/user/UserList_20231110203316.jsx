/* eslint-disable react/prop-types */
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
  if (typeof users === 'object' && Array.isArray(users)) {
    users.map(user => {
      // Tu lógica aquí
      console.log(user);
    });
  } else {
    console.error("La variable no es un array.");
  }
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
        {users.map((user) => {
          console.log("hola",users,user);
         
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