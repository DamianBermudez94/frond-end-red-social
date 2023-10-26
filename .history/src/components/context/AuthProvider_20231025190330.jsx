import React, { createContext, useEffect, useState } from 'react';
//* Contexto que sirve para poder compartir información entre componentes

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    // Retornamos el AuthContenxt,le pasamos el componente hijo que va a cargar y le pasamos los valores que queremos compartir Ejemplo: "Auth"
    useEffect(()=>{

    },[]);

    //Función que siver para autenticar al usuario

    const authUser = async ()=>{

    }

  return (
    <AuthContext.Provider value={{auth,setAuth}}>{children}</AuthContext.Provider>
  )
}

export default AuthContext;