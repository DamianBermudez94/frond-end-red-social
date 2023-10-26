import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PublicLayout } from "../layout/public/PublicLayout";
import { PrivateLayout } from "../layout/private/PrivateLayout";
import { Login } from "../user/Login";
import { Register } from "../user/Register";
import { Feed } from "../publication/Feed";
import { AuthProvider } from "../context/AuthProvider";
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
          </Route>
          <Route
            path="*"
            element={
              <>
                <h1>Error 404, pagina no encontrada</h1>
                <Link to="/">Volver al inicio</Link>
              </>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
