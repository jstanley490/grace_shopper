import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/util";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    if (result.error) {
      setError(result.message);
      console.error(result.message);
      return;
    }
    console.log(result);
    localStorage.setItem("token", result.token);
    setToken(result.token);
    navigate("/");
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
      <main id="main-login">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="username"
            className="input"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            type={"password"}
            id="showInput"
            className="input"
          ></input>
          <button type="submit" className="submit">
            Login
          </button>
          <p className="err-msg">{error}</p>
          <span id="show-pass">
            <input onClick={showPassword} type="checkbox" />
            Show password
          </span>
        </form>
      </main>
    </div>
  );
}
