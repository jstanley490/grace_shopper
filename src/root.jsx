import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { BASE_URL } from "./api/util";

import { Toaster } from "react-hot-toast";

export default function Root() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [treats, setTreats] = useState([]);
  const [merch, setMerch] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

  useEffect(() => {
    async function getTreats() {
      const response = await fetch(`${BASE_URL}/treats`);
      const treats = await response.json();
      // console.log(treats);
      setTreats(treats);
    }
    getTreats();
  }, []);

  useEffect(() => {
    async function getMerch() {
      const response = await fetch(`${BASE_URL}/merch`);
      const merch = await response.json();
      // console.log(merch);
      setMerch(merch);
    }
    getMerch();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const cartItems = await response.json();
        // console.log(cartItems);
        setCartItems(cartItems);
      }
    }
    fetchCart();
  }, [token]);

  useEffect(() => {
    async function DeleteCartItem() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const cartItems = await response.json();
        // console.log(cartItems);
        setCartItems(cartItems);
      }
    }
    DeleteCartItem();
  }, [token]);

  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Toaster position="bottom-center" />
      <Outlet
        context={{
          token,
          setToken,
          treats,
          setTreats,
          merch,
          setMerch,
          cartItems,
          setCartItems,
        }}
      />
    </div>
  );
}
