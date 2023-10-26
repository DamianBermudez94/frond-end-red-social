import React, { createContext, useEffect, useState } from 'react';
//* Contexto que sirve para poder compartir información entre componentes

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [compartida, setCompartida] = useState("Compartido en todos los componentes");
    // Retornamos el AuthContenxt,le pasamos el componente hijo que va a cargar y le pasamos los valores que queremos compartir Ejemplo: "Compartir"
  return (
    <AuthContext.Provider value={{compartida}}>{children}</AuthContext.Provider>
  )
}

export default AuthContext