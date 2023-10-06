import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import FriendsPage from "./FriendsPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/:name",
      element: <App />,
    },
    {
      path: "/friends/:name",
      element: <FriendsPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
