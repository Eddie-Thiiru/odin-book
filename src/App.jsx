import { useParams } from "react-router-dom";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import Home from "./components/Homepage";
import "./App.css";
import FriendsPage from "./components/FriendsPage";
import Profile from "./components/ProfilePage";

const App = () => {
  const { name } = useParams();

  return (
    <div className="App">
      {name === "login" ? (
        <Login />
      ) : name === "signup" ? (
        <SignUp />
      ) : name === "friends" ? (
        <FriendsPage />
      ) : name === "profile" ? (
        <Profile />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
