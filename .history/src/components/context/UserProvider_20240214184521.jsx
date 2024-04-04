/* eslint-disable react/prop-types */
import  { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";
//* Contexto que sirve para poder compartir información entre componentes

const UserContext = createContext();

export const UserProvider = ({ children }) => {
   // Estado para ontener los usuarios
   const [user, setUsers] = useState([]);
  
   // Estado para obtener el valor de los usuarios que sigo y los que me siguen
   const [following, setFollowing] = useState([]);
   // Estado para obtener la cantidad de paginas
   const [page, setPage] = useState([1]);
   // Estado para obtener el valor del button
   const [more, setMore] = useState(true);
   // Estado para obtener el valor del button
   const [loading, setLoading] = useState(true);
 
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
        'Accept': 'application/json',
         "Content-Type": "application/json",
         "Authorization": localStorage.getItem("token"),
       },
     });
 
     const data = await request.json();
     console.log("Hola, soy la data",data);
     if (data.user && data.status == "success") {
       let newUsers = data.user;
 
       // comprobamos la posición de la page y le asignamos al array los nuevos valores
       if (user.length >= 1) {
         newUsers = [...user, ...data.user];
       }
 
       setUsers(newUsers);
       setFollowing(data.user_following);
       setLoading(false);
 
       // Comprobamos la longitud del estado con en de la lista y si es igual, al estado le pasamos false
       if (user.length >= data.total) {
         setMore(false);
       }
     }
   };
   
  return (
    <UserContext.Provider value={{ user, setFollowing, setLoading, setMore, setPage, following, page, more, loading  }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
