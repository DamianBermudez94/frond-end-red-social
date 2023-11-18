import { useEffect, useState } from "react";

import { Global } from "../helpers/Global";

import UserList from "../user/UserList";
import { useParams } from "react-router-dom";
import { GetUserProfile } from "../helpers/GetUserProfile";

export const Followers = () => {
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
  const [userProfile, setUserProfile] = useState({})

  const params = useParams();
  // El componente se va actualizar solo una vez
  useEffect(() => {
    getUsers(1);
    GetUserProfile(params.userId, setUserProfile)
  }, []);

  const getUsers = async (nextPage = 1) => {
    setLoading(true);

    const userId = params.userId;
    // Petición para sacar los usuarios
    const request = await fetch(
      Global.url + "follow/followers/" + userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();

    // Recorrer y limpiar follows para qeudarme con followed
    let cleanUsers = [];
    data.followlist.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.user];
    });
    data.user = cleanUsers;

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

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Seguidores de {userProfile.name} {userProfile.surname}</h1>
      </header>
      <UserList
        users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        more={more}
        loading={loading}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
