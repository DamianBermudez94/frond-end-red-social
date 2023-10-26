import { Header } from './Header'
import { Outlet, Navigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import useAuth from '../../hooks/useAuth'
export const PrivateLayout = () => {
  const {auth} = useAuth()
  return (
    <>
        {/**/}
        <Header/>
        {/* Contenido principal*/}
        <section className='layout_content'>
        {!auth._id ?
            <Outlet/> :
            <Navigate to="/social" />
          }
        </section>
        {/*Barra lateral de navegación*/}
        <Sidebar></Sidebar>
    </>
  )
}
