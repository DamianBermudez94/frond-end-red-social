
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layout/public/PublicLayout";
import { PrivateLayout } from "../layout/private/PrivateLayout"
import { Login } from "../user/Login";
import { Register } from "../user/Register";
export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout></PublicLayout>}>
            <Route index element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="registro" element={<Register/>}/>
        </Route>
        <Route path="/social" element={<PrivateLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="registro" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
