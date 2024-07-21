import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./components/Signup.jsx";
import Landing from "./components/Landing.jsx";
import Login from "./components/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <HomePage />,
    children: [
      {
        path: "/home",
        element: "content",
      },
      { 
        path: "/profile",
        element: <App />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
