import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./stylesheets/App.css";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
