import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL, getUsers } from "../api/util";
import { useEffect, useState } from "react";

export default function Accounts() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(2);
  const localToken = localStorage.getItem("token");
  const [accounts, setAccounts] = useState([]);

  function showPassword() {
    var p = document.getElementById("showInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }
  const createAdmin = async (
    username,
    password,
    firstName,
    lastName,
    email,
    isAdmin
  ) => {
    console.log(username, password, firstName, lastName, email, isAdmin);
    try {
      const response = await fetch(`${BASE_URL}/users/createadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          email,
          role_id: isAdmin,
        }),
      });
      const result = response.json();
      console.log(result);
    } catch (error) {}
  };

  useEffect(() => {
    Promise.all([getUsers()]).then((values) => {
      setAccounts(values[0]);
    });
  }, []);
  console.log(accounts);
  const userRole = localStorage.getItem("user_role");
  console.log(typeof userRole);
  if (userRole === "1") {
    return (
      <div id="accountBox">
        <div className="auth">
          <aside>
            <h1 style={{ color: "black" }}>Create User</h1>
          </aside>
          <main id="main-register">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createAdmin(
                  username,
                  password,
                  firstName,
                  lastName,
                  email,
                  isAdmin
                );
              }}
            >
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
        <div id="usersBox">
          <div>
            {accounts.map((account) => {
              return (
                <>
                  <h1>
                    {account.first_name} {account.last_name}
                  </h1>
                  <div>
                    ID: {account.id}
                    <div>Email: {account.email}</div>
                    <div>Address: {account.address}</div>
                    <div>Role: {account.role_id}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <h1>
      <div id="page">Welcome to your account!</div>
    </h1>
  );
}
