import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Navbar({ token }) {
  function handleLogout() {
    console.log("logging out");
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }

  return (
    <div id="navbar">
      <Link to="/treats" className="nav-link">
        Treats
      </Link>
      <Link to="/merch" className="nav-link">
        Merch
      </Link>
      <Link to="/" id="nav-logo">
        <img
          src={Logo}
          alt="chocolate chip cookie with bite taken out of it"
          id="logo"
        ></img>
        <sub>Munchiez</sub>
      </Link>
      <Link to="/cart" className="nav-link">
        Cart
      </Link>
      {token ? (
        <Link to="/profile" className="nav-link">
          Account
        </Link>
      ) : (
        <Link to="/login" className="nav-link">
          Account
        </Link>
      )}
      {token ? (
        <Link onClick={handleLogout} to={"/"} className="nav-link">
          Logout
        </Link>
      ) : null}
    </div>
  );
}
