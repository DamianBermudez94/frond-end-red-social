import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const PublicLayout = () => {
  return (
    <>
        {/**/}
        <Header/>
        {/* Contenido principal*/}
        <section className='layout_content'>
            <Outlet></Outlet>
        </section>
        {/*Barra lateral de navegación*/}
        <Sidebar></Sidebar>
    </>
  )
}
