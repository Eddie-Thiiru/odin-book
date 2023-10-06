import { useParams } from "react-router-dom";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import Home from "./components/Homepage";
import "./App.css";

const App = () => {
  const { name } = useParams();

  return (
    <div className="App">
      {name === "login" ? <Login /> : name === "signup" ? <SignUp /> : <Home />}
    </div>
  );
};

export default App;
