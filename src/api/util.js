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
    const result = await response.json();
    console.log(result);
    localStorage.setItem("cart", JSON.stringify(result));
  }
};
