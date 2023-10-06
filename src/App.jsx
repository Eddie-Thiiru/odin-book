import { useParams } from "react-router-dom";
import Login from "./components/LoginPage";
import "./App.css";
import SignUp from "./components/SignUpPage";

function App() {
  const { name } = useParams();

  return (
    <div className="App">
      {name === "login" ? <Login /> : name === "signup" && <SignUp />}
    </div>
  );
}

export default App;
