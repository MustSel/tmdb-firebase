import React from "react";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthProvider>
        <Navbar />
        <AppRouter />
        <ToastContainer/>
      </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
