import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../helpers/Global";
import { useAuth } from "../hooks/useAuth";
import UserList from "./UserList";

export const People = () => {
  const { auth } = useAuth();
  // Estado para ontener los usuarios
  const [users, setUsers] = useState([]);
  // Estado para obtener la cantidad de paginas
  const [page, setPage] = useState([1]);
  // Estado para obtener el valor del button
  const [more, setMore] = useState(true);
  // Estado para obtener el valor del button
  const [loading, setLoading] = useState(true);
  // Estado para obtener el valor de los usuarios que sigo y los que me siguen
  const [following, setFollowing] = useState([]);

  // El componente se va actualizar solo una vez
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {
    setLoading(true);
    // Petición para sacar los usuarios
    const request = await fetch(Global.url + "user/listado/" + nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.user && data.status == "success") {
      let newUsers = data.user;

      // comprobamos la posición de la page y le asignamos al array los nuevos valores
      if (users.length >= 1) {
        newUsers = [...users, ...data.user];
      }

      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);

      // Comprobamos la longitud del estado con en de la lista y si es igual, al estado le pasamos false
      if (users.length >= data.total) {
        setMore(false);
      }
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
    console.log(data);
    if (data.status == "success") {
      let filterFollowings = following.filter(
        (followingUserId) => userId !== followingUserId
      );
      setFollowing(filterFollowings);
    }
  };
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>
      <UserList users={users}
                setUsers={setUsers}
                following={following}
                setFollowing={setFollowing}
      />
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