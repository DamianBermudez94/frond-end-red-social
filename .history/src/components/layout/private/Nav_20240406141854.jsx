import { NavLink, Link } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import { useAuth } from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
export const Nav = () => {
  const { auth } = useAuth();
  
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/social" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/feed" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/gente" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Gente</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-regular fa-envelope"></i>
            <span className="menu-list__title">Mensajes</span>
          </a>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <Link to={"perfil/" + auth._id} className="list-end__link-image">
            {auth.image != "default.png" && (
              <img
                src={Global.url + "user/uploads/" + auth.image}
                className="list-end__img"
                alt="Foto de perfil"
              />
            )}
            {auth.image == "default.png" && (
              <img
                src={avatar}
                className="list-end__img"
                alt="Foto de perfil"
              />
            )}
          </Link>
        </li>
        <li className="list-end__item">
          <Link to={"perfil/" + auth._id} className="list-end__link">
            <span className="list-end__name">{auth.nick}</span>
            <i className="fa-solid fa-caret-down"></i>
          </Link>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/ajustes" className="list-end__link">
            <span className="list-end__name">Ajustes</span>
            <i className="fa-solid fa-gear"></i>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/logout" className="list-end__link">
            <span className="list-end__name">Cerrar Sección</span>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
