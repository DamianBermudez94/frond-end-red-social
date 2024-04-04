import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PublicLayout } from "../layout/public/PublicLayout";
import { PrivateLayout } from "../layout/private/PrivateLayout";
import { Login } from "../user/Login";
import { Register } from "../user/Register";
import { Feed } from "../publication/Feed";
import { Logout } from "../user/Logout"
import { AuthProvider } from "../context/AuthProvider";
import { People } from "../user/People";
import { Config } from "../user/Config";
import { Following } from "../follow/Following";
import { Followers } from "../follow/Followers";
import { Profile } from "../user/Profile";
export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout></PublicLayout>}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>
          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="logout" element={<Logout/>} />
            <Route path="gente" element={<People/>} />
            <Route path="ajustes" element={<Config/>} />
            <Route path="siguiendo/:userId" element={<Following/>} />
            <Route path="seguidores/:userId" element={<Followers/>} />
            <Route path="perfil/:userId" element={<Profile/>} />
          </Route>
          <Route
            path="*"
            element={
              <>
                <h1>Error 404, pagina no encontrada</h1>
                <Link to="/">Volver al inicio</Link>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
