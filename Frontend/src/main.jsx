import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
// import "./index.css"
import ContextProvider from "./components/context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

let router = createBrowserRouter([
     {
       element:<ContextProvider/>,
       children:[
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/userprofile/:id",
          element: <Profile />,
        },
       ]
     }
    ]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
