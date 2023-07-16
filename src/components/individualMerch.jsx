import React, { useEffect } from "react";
import {
  useOutletContext,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { addToCart, fetchCart } from "../api/util";

export default function IndividualMerch() {
  const { merchId } = useParams();
  const { merch, setCartItems, cartItems } = useOutletContext();
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
      console.log(cartItems);
      // setCartItems(product);
      for (let key in cartItems) {
        if (cartItems[key].product_id === product.id) {
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
        }
      }
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
