import React from 'react'

export const Header = () => {
  return (
    <header class="layout__navbar">

    <div class="navbar__header">
        <a href="#" class="navbar__title">NGSOCIAL</a>
    </div>

    <div class="navbar__container-lists">

        <ul class="container-lists__menu-list">
            <li class="menu-list__item">
                <a href="#" class="menu-list__link">
                    <i class="fa-solid fa-house"></i>
                    <span class="menu-list__title">Inicio</span>
                </a>
            </li>

            <li class="menu-list__item">
                <a href="#" class="menu-list__link">
                    <i class="fa-solid fa-list"></i>
                    <span class="menu-list__title">Timeline</span>
                </a>
            </li>

            <li class="menu-list__item">
                <a href="#" class="menu-list__link">
                    <i class="fa-solid fa-user"></i>
                    <span class="menu-list__title">Gente</span>
                </a>
            </li>

            <li class="menu-list__item">
                <a href="#" class="menu-list__link">
                    <i class="fa-regular fa-envelope"></i>
                    <span class="menu-list__title">Mensajes</span>
                </a>
            </li>
        </ul>

        <ul class="container-lists__list-end">
            <li class="list-end__item">
                <a href="#" class="list-end__link-image">
                    <img src="assets/img/user.png" class="list-end__img" alt="Imagen de perfil">
                </a>
            </li>
            <li class="list-end__item">
                <a href="#" class="list-end__link">
                    <span class="list-end__name">Victor</span>
                    <i class="fa-solid fa-caret-down"></i>
                </a>
            </li>
        </ul>

    </div>

</nav>
  )
}
