import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRooter from "./PrivateRooter";
import MovieDetail from "../pages/MovieDetail";

const AppRouter = () => {
  return <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/details/:id" element={<PrivateRooter/>}>
        <Route path="" element={<MovieDetail/>}/>
      </Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />

    </Routes>
  

  
};

export default AppRouter;
