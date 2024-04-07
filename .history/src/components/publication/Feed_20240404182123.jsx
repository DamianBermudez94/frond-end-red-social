
import { useEffect, useState } from "react";


import { useAuth } from "../hooks/useAuth";
import { Global } from "../helpers/Global";
import { PublicationList } from "../publication/PublicationList";
export const Feed = () => {
  // Estado para verificar seguidores/seguidos

  const [publications, setPublications] = useState([]);
  // Estado para obtener el valor del button
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);

  const { auth } = useAuth();

  useEffect(() => {
    getPublications(1, true);
  }, []);

  const token = localStorage.getItem("token");

  const getPublications = async (nextPage = 1) => {
    const request = await fetch(Global.url + "publication/feed/"+auth.id + nextPage, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token,
      },
    });

    const data = await request.json();
    console.log(data);
    if (data.status == "success") {
      let newPublications = data.publications;
      // Comprobamos que no haya nuevos perfiles y que haya publicaciones
      // para agregar
      if (publications.length >= 1) {
        newPublications = [...publications, ...data.publications];
      }
      // Receteamos las publicaciones cuando se detecta un nuevo perfil
      // y agregamos nuevas publicaciones de ese perfil

      setPublications(newPublications);
      // Comprobamos la longitud del estado con en de la lista y si es igual, al estado le pasamos false
      if (publications.length >= data.total - data.publications.length) {
        setMore(false);
      }
      if (data.page <= 1) {
        setMore(false);
      }
    }
  };
  return (
    <>
      <header className="content__header">
        <h1 className="content_title">Timeline</h1>
        <button className="content__btn-more-post">Mostrar nuevas</button>
      </header>
      <PublicationList
        publications={publications}
        getPublications={getPublications}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
      />
    </>
  );
};
