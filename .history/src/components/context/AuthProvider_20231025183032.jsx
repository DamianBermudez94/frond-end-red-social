import React, { createContext, useEffect, useState } from 'react'
//* Contexto que sirve para poder compartir información entre componentes

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  return (
    <div>AuthProvider</div>
  )
}
