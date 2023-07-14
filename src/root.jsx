import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { BASE_URL, fetchCart } from "./api/util";
=======
import { BASE_URL } from "./api/util";
>>>>>>> origin/Jason

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
<<<<<<< HEAD
    Promise.all([fetchCart()]).then((values) => {
      setCartItems(values[0]);
      localStorage.setItem("cart", JSON.stringify(values[0]));
    });
=======
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
>>>>>>> origin/Jason
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
<<<<<<< HEAD
        //console.log(cartItems);
=======
        // console.log(cartItems);
>>>>>>> origin/Jason
        setCartItems(cartItems);
      }
    }
    DeleteCartItem();
  }, [token]);

<<<<<<< HEAD
=======
  const addToCart = async (productId, type, quant) => {
    console.log(type);
    console.log(productId);
    console.log(quant);

    const localToken = localStorage.getItem("token");
    console.log(localToken);

    if (!localToken) {
      // push item to state
    } else {
      console.log("sending request");
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductType: { type },
          ProductId: { productId },
          quantity: { quant },
        }),
      });
      console.log("awaiting response");
      const result = await response.json();
      console.log(result);
    }
  };

>>>>>>> origin/Jason
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
<<<<<<< HEAD
          fetchCart,
=======
>>>>>>> origin/Jason
        }}
      />
    </div>
  );
}
