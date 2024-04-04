import { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";
//* Contexto que sirve para poder compartir información entre componentes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);
  // Retornamos el AuthContenxt,le pasamos el componente hijo que va a cargar y le pasamos los valores que queremos compartir Ejemplo: "Auth"
  useEffect(() => {
    authUser();
  }, []);

  //Función que siver para autenticar al usuario

  const authUser = async () => {
    // Sacar datos del usuario identificado del localStorage
    const token = localStorage.getItem("token");
    console.log(token);
    const user = localStorage.getItem("user");
    console.log(user);
    // Comprobar si tengo el token y el user
    if (!token || !user) {
      setLoading(false);
      return false;
    }

    // Transformar los datos a un objeto de javascript
    const userObj = JSON.parse(user);
    console.log(userObj);
    // Sacamos el id del usuario
    const userId = userObj.id;
    // Petición ajax al backend que compruebe el token y
    // que me devuleva todos los datos del usuario
    console.log("Soy el user",userObj,"y este es mi id",userId);
    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const data = await request.json();

    console.log("Soy la data del perfil del usuario",data.user);
    // Setear el estado auth
    setAuth(data.user);

    // Peticióon ajax para obtener los seguidores, siguiendo y publicaciones

    const requestCounters = await fetch(Global.url + "user/count/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const dataCounters = await requestCounters.json();

    // Setear el estado auth
    setCounters(dataCounters);

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, counters, setCounters, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
