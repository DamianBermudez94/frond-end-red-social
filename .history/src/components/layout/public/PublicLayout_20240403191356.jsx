
import { useAuth } from "../../hooks/useAuth"
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicLayout = () => {
  const {auth} = useAuth();
  console.log("soy el id del usuario",auth.id);
  return (
    <>
        {/**/}
        <Header/>
        {/* Contenido principal*/}
        <section className='layout_content'>
          {!auth.id ?
            <Outlet/> :
            <Navigate to="/social" />
          }
        </section>
    </>
  )
}
