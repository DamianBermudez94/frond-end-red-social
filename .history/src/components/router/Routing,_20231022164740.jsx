import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../layout/public/PublicLayout";
import { Login } from "../user/Login";
export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout></PublicLayout>}>
            <Route index element={<Login/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
