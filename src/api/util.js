export const BASE_URL = "https://graceshopperdatabase.onrender.com/api";

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
    console.log(response, "this is response");
    const result = await response.json();
    console.log(result, "why bro");
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
