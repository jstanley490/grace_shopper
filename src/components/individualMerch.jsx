import React, { useEffect } from "react";
import {
  useOutletContext,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { addToCart, removeFromCart, updateCart } from "../api/util";

export default function IndividualMerch() {
  const { merchId } = useParams();
  const { merch, setCartItems, fetchCart, cartItems } = useOutletContext();

  const product = merch.find((item) => item.id == merchId);
  // console.log(product);
  console.log(cartItems);

  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/merch");
    }
  }, [merch]);

  if (!product) {
    return <div id="page">Loading...</div>;
  }

  async function handleClick() {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      navigate("/login");
    } else {
      const response = await addToCart(product.id, "merch", 1);
      if (response) {
        const newCart = await fetchCart();
        if (newCart) {
          setCartItems(newCart);
        }
      }
    }
  }
  console.log(cartItems, "bro what");

  // cartItems.map((item) => {
  //   for (let key in item) {
  //     if (item.product_id === product.id && item)
  //   }
  // });

  for (let key in cartItems) {
    if (
      cartItems[key].product_id === product.id &&
      cartItems[key].type === "Shirt"
    ) {
      return (
        <div id="page">
          <h1>{product.type}</h1>
          <p>{product.price}</p>
          <p>{product.color}</p>
          <p>{product.size}</p>
          <span>
            <i
              onClick={async () => {
                cartItems[key].quantity++;
                const response = await updateCart(
                  cartItems[key].quantity,
                  cartItems[key].id
                );

                if (response) {
                  const newCart = await fetchCart();
                  if (newCart) {
                    //setCartItems(newCart);
                    document.getElementById(
                      `merchItem${product.id}`
                    ).innerText = `Quantity: ${cartItems[key].quantity}`;
                    localStorage.setItem("cart", JSON.stringify(newCart));
                  }
                }
              }}
              className="fa-solid fa-plus"
            ></i>
            <span id={`merchItem${product.id}`}>
              Quantity: {cartItems[key].quantity}
            </span>
            <i
              onClick={async () => {
                cartItems[key].quantity--;
                console.log(cartItems[key].quantity);
                if (cartItems[key].quantity === 0) {
                  const response = await removeFromCart(cartItems[key].id);
                  if (response) {
                    delete cartItems[key];
                    const newCart = await fetchCart();
                    if (newCart) {
                      setCartItems(newCart);
                    }
                  }
                }
                const response = await updateCart(
                  cartItems[key].quantity,
                  cartItems[key].id
                );

                if (response) {
                  const newCart = await fetchCart();
                  if (newCart) {
                    //setCartItems(newCart);
                    document.getElementById(
                      `cartItem${cartItems[key].id}`
                    ).innerText = cartItems[key].quantity;
                    localStorage.setItem("cart", JSON.stringify(newCart));
                  }
                }
              }}
              className="fa-solid fa-minus"
            ></i>
          </span>
        </div>
      );

    }
  }

  return (
    <div id="page">
      <h1>{product.type}</h1>
      <p>{product.price}</p>
      <p>{product.color}</p>
      <p>{product.size}</p>
      <span onClick={handleClick}>
        <i className="fa-solid fa-cart-plus add-cart"></i>
      </span>
    </div>
  );
}
