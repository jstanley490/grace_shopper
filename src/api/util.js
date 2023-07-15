import { useNavigate } from "react-router-dom";

export const BASE_URL = "http://localhost:3000/api";

export const addToCart = async (productId, type, quant) => {
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
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        productType: type,
        productId: productId,
        quantity: quant,
      }),
    });
    console.log("awaiting response");
    const result = await response.json();
    localStorage.setItem("cart", JSON.stringify(result));
    return result;
  }
};

export async function fetchCart() {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });
    const cartItems = await response.json();
    return cartItems;
  }
}

export async function updateCart(quantity, cartId) {
  const localToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        quantity: quantity,
        cartId: cartId,
      }),
    });
    console.log(response);
    return response;
  } catch (error) {}
}

export async function checkout() {
  const localToken = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });
    return response;
  } catch (error) {}
}

export async function removeFromCart(cartId) {
  const localToken = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        cartId: cartId,
      }),
    });
    return response;
  } catch (error) {}
}

export async function getUsers() {
  const localToken = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/users/accounts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {}
}
