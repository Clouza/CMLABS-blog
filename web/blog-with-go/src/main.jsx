import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import Login from "./views/Login.jsx";
import Paper from "./views/Paper.jsx";
import Blog from "./views/Blog.jsx";
import NotFound from "./views/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login", // login to set a cookie? 🍪
    element: <Login />
  },
  {
    path: "/blog/:slug", // get record by slug
    element: <Blog />
  },
  {
    path: "/paper", // create a record
    element: <Paper />
  },
  {
    path: "/paper/:slug", // create a record
    element: <Paper />
  },
  {
    path: "/*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
