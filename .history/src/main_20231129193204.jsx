import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//* Importar assets (recursos: hojas de estilo, imagenes, fuentes)
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css";
import "./assets/css/normalize.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

// Cargar configuracion para formatear fechas
import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es.json';
TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es)
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
