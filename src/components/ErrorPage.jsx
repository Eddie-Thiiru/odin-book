import { useNavigate } from "react-router-dom";
import "../stylesheets/errorPage.css";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="errorPage">
      <img src="" alt="" />
      <h1>This Page Isn&rsquo;t Available</h1>
      <p>The link may be broken, or the page may have been removed.</p>
      <button type="button" className="errPageBtn" onClick={handleNavigate}>
        Back to home
      </button>
    </div>
  );
}
