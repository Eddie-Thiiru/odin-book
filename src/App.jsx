import { useParams } from "react-router-dom";
import Login from "./components/LoginPage";
import "./App.css";

function App() {
  const { name } = useParams();

  return <div className="App">{name === "login" && <Login />}</div>;
}

export default App;
