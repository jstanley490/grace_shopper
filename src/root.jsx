import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";

import { Toaster } from "react-hot-toast";

export default function Root() {
  const [token, setToken] = useState("");

  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Toaster position="bottom-center" />
      <Outlet context={{}} />
    </div>
  );
}
