import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { BASE_URL } from "../api/util";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  function showPassword() {
    var p = document.getElementById("showInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }
  async function handleRegister(e) {
    e.preventDefault();
    console.log(username, password, confirmation);

    if (password !== confirmation) {
      setError("Password Incorrect");
    }

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: username,
        password: password,
      },
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      setError(result.message);
      return;
    }

    setToken(result.token);
    localStorage.setItem("token", result.token);
    // navigate("/");
  }
  return (
    <div id="page" className="auth">
      <aside>
        <Link to={"/register"} className="account-link">
          Register
        </Link>
        <Link to={"/login"} className="account-link">
          Login
        </Link>
      </aside>
      <main id="main-register">
        <form onSubmit={handleRegister}>
          <input
            className="input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="username"
            type="username"
          />
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            type="password"
          />
          <input
            className="input"
            onChange={(e) => setConfirmation(e.target.value)}
            value={confirmation}
            placeholder="confirm password"
            type="confirmation"
          />
          <button type="submit" className="submit">
            Register
          </button>
          <p className="err-msg"> {error} </p>
          <span id="show-pass">
            <input onClick={showPassword} type="checkbox" />
            Show password
          </span>
        </form>
      </main>
    </div>
  );
}
