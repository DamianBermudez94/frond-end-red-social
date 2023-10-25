import { Header } from "./components/layout/private/Header";
import { Routing } from "./components/router/Routing,";
function App() {
  return (
    <div className="layout">
      {/*Cargamos toda la configuracion de rutas*/}
      <Routing />
    </div>
  );
}

export default App;
