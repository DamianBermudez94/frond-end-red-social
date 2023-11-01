import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

export const Logout = () => {
    const Navigate = useNavigate();
    const {setAuth, setCounters} = useAuth();
    useEffect(()=>{
        // Vaciamos todos los datos del localStorage
        localStorage.clear()
    })
  return (
    <h1>Cerrando sesión</h1>
  )
}
