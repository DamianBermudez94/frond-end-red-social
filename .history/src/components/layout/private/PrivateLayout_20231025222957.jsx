import { Header } from './Header';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import useAuth from '../../hooks/useAuth';


export const PrivateLayout = () => {
  const {auth} = useAuth()
  if (loading) {
    <span class="loader"></span>

  } else {
    return (
      <>
          {/**/}
          <Header/>
          {/* Contenido principal*/}
          <section className='layout_content'>
          {auth._id ?
              <Outlet/> :
              <Navigate to="/login" />
            }
          </section>
          {/*Barra lateral de navegación*/}
          <Sidebar></Sidebar>
      </>
    )
  }
 
}
