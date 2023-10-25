import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export const PublicLayout = () => {
  return (
    <>
        {/**/}
        <Header/>
        {/* Contenido principal*/}
        <section className='layout_content'>
            <Outlet></Outlet>
        </section>
    </>
  )
}
