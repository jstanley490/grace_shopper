import { Link } from "react-router-dom";

export default function Navbar({ token }) {
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
          src="../src/assets/logo.svg"
          alt="chocolate chip cookie with bite taken out of it"
          id="logo"></img>
        <sub>Munchiez</sub>
      </Link>
      <Link to="/cart" className="nav-link">
        Cart
      </Link>
      <Link to="/login" className="nav-link">
        Login
      </Link>
      {token ? (
        <Link to="/profile" id="profile" className="nav-link">
          Account
        </Link>
      ) : null}
    </div>
  );
}
