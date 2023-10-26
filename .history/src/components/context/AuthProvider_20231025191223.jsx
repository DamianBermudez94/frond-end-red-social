import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";
//* Contexto que sirve para poder compartir información entre componentes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // Retornamos el AuthContenxt,le pasamos el componente hijo que va a cargar y le pasamos los valores que queremos compartir Ejemplo: "Auth"
  useEffect(() => {
    authUser();
  }, []);

  //Función que siver para autenticar al usuario

  const authUser = async () => {
    // Sacar datos del usuario identificado del localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // Comprobar si tengo el token y el user
    if (!token || !user) {
      return false;
    }
    // Transformar los datos a un objeto de javascript
    const userId = JSON.parse(user.id);
    // Petición ajax al backend que compruebe el token y
    // que me devuleva todos los datos del usuario

    const request = await fetch(Global.url + "user/profile" + userId, {
      method: "GET",

      headers: { "Content-type": "application/json", "Authorization": token },
    });

    // Setear el estado auth
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
