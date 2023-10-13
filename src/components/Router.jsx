import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import FriendsPage from "./FriendsPage";
import Profile from "./ProfilePage";
import Home from "./Homepage";
import Login from "./LoginPage";
import SignUp from "./SignUpPage";
import ErrorPage from "./ErrorPage";
import Anonymous from "./Anonymous";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "friends", element: <FriendsPage /> },
        { path: "friends/:name", element: <FriendsPage /> },
        { path: "profile", element: <Profile /> },
        { path: "profile/:name", element: <Profile /> },
        {
          element: <Anonymous />,
          children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <SignUp /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
