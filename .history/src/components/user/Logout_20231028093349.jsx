import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

export const Logout = () => {
    const navigate = useNavigate();
    const {setAuth, setCounters} = useAuth();
    useEffect(()=>{
        // Vaciamos todos los datos del localStorage
        localStorage.clear()
        // Setear estados globales a vacio

        setAuth({});
        setCounters({});

        //Navigate ( redirección ) a Login
        navigate("/login")
        
    })
  return (
    <h1>Cerrando sesión</h1>
  )
}
