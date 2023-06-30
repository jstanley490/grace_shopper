import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { BASE_URL } from "./api/util";

import { Toaster } from "react-hot-toast";

export default function Root() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const result = await response.json();
        // console.log(result);
        if (result.id) {
          setUser(result);
        }
      }
    }
    fetchUser();
  }, [token]);

  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Toaster position="bottom-center" />
      <Outlet context={{ token, setToken }} />
    </div>
  );
}
