import { useLocation, useNavigate } from "react-router-dom";
import Brand from "../../assets/brand.svg";
import { authService } from "../../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout().then(() => navigate("login"));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
          <img src={Brand} alt="brand" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname.includes("company") ? "active" : ""
                }`}
                href="#"
                onClick={() => navigate("/company")}
              >
                Companies
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname.includes("product") ? "active" : ""
                }`}
                href="#"
                onClick={() => navigate("/product")}
              >
                Products
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
