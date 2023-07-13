import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/util";

export default function Cart() {
  const { user, setUser, cartItems, setCartItems, token, setToken } =
    useOutletContext();

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;

    // Iterate over the cart items and sum up their prices
    cartItems.forEach((item) => {
      const price = parseFloat(item.price.replace("$", ""));
      totalPrice += price;
    });

    return totalPrice.toFixed(2); // Return the total price with two decimal places
  };
  const totalPrice = calculateTotalPrice(cartItems);

  async function deleteCartItem(cartId) {
    const localToken = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        cartId,
      }),
    });
    const result = await response.json();
    console.log(result);
    location.reload();
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>loading</h2>
      </div>
    );
  }
  return (
    <div id="cart-page">
      <div id="products">
        <h2>Cart</h2>
        <div className="product-list">
          {cartItems.map((cartItem) => {
            console.log(cartItems);
            return (
              <div className="activity-post" key={cartItem.id}>
                <Link className="item-link" to={`/merch/${cartItem.id}`}>
                  <h1>{cartItem.name}</h1>
                </Link>
                <img className="cart-photo" src={cartItem.photo} alt="" />
                <h2>{cartItem.type}</h2>
                <p>Quantity: {cartItem.quantity}</p>
                <p className="treat-price">{cartItem.price}</p>
                <button
                  onClick={() => deleteCartItem(cartItem.id)}
                  className="remove-item">
                  Remove Item
                </button>
              </div>
            );
          })}
        </div>
        <h3>
          Total: $<span id="total-cost">{totalPrice}</span>
        </h3>
        <button id="checkout">Checkout</button>
      </div>
    </div>
  );
}
