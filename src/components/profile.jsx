import { Link } from "react-router-dom";
import { handleRegister } from "../api/util";
import { useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(2);

  function showPassword() {
    var p = document.getElementById("showInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }

  const userRole = localStorage.getItem("user_role");
  console.log(typeof userRole);
  if (userRole === "1") {
    return (
      <div id="login-page">
        <div className="auth">
          <aside>
            <h1 to={"/register"} style={{ color: "black" }}>
              Create User
            </h1>
          </aside>
          <main id="main-register">
            <form onSubmit={handleRegister}>
              <input
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="first name"
                type="text"
              />
              <input
                className="input"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="last name"
                type="text"
              />
              <input
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="email address"
                type="email"
              />
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
                id="showInput"
              />
              <input
                className="input"
                onChange={(e) => setConfirmation(e.target.value)}
                value={confirmation}
                placeholder="confirm password"
                type="confirmation"
              />
              <span id="show-pass">
                <input onClick={showPassword} type="checkbox" />
                Show password
              </span>
              <span id="show-pass">
                <input onClick={() => setIsAdmin(1)} type="checkbox" />
                Make admin
              </span>
              <button type="submit" className="submit">
                Create
              </button>

              <p className="err-msg"> {error} </p>
            </form>
          </main>
        </div>{" "}
      </div>
    );
  }
  return (
    <h1>
      <div id="page">Welcome to your account!</div>
    </h1>
  );
}
