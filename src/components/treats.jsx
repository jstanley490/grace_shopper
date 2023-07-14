import { useOutletContext } from "react-router-dom";
import { addToCart, fetchCart, updateCart } from "../api/util";
import { useEffect } from "react";

export default function Treats() {
  const { treats, setCartItems, cartItems, fetchCart } = useOutletContext();
  const cart = localStorage.getItem("cart");
  useEffect(() => {
    Promise.all([fetchCart()]).then((values) => {
      setCartItems(values[0]);
    });
  }, []);
  return (
    <div id="page">
      <div id="treats-background">
        <h1>Treats</h1>
      </div>
      <div className="page-body">
        <div className="listings">
          {treats.map((treat) => {
            for (let key in cartItems) {
              if (cartItems[key].product_id === treat.id) {
                if (
                  cartItems[key].category === "cookie" ||
                  cartItems[key].category === "brownie"
                ) {
                  console.log(cartItems, "help");
                  console.log("tom cruise");
                  return (
                    <div className="post" key={treat.id}>
                      <img src={treat.photo} className="post-img"></img>
                      <span className="purchase-details">
                        <p>{treat.price}</p>
                        <p>Inventory: {treat.stock}</p>
                        <span>
                          <i
                            onClick={async () => {
                              cartItems[key].quantity++;
                              const response = await updateCart(
                                cartItems[key].quantity,
                                cartItems[key].id
                              );

                              if (response) {
                                const newCart = fetchCart();
                                if (newCart) {
                                  //setCartItems(newCart);
                                  document.getElementById(
                                    `cartItem${cartItems[key].id}`
                                  ).innerText = cartItems[key].quantity;
                                }
                              }
                            }}
                            className="fa-solid fa-plus"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </i>
                          <p id={`cartItem${cartItems[key].id}`}>
                            {cartItems[key].quantity}
                          </p>
                        </span>
                      </span>
                      <h2>{treat.name}</h2>
                      <p>{treat.description}</p>
                    </div>
                  );
                }
              }
            }
            // console.log(treat);
            return (
              <div className="post" key={treat.id}>
                <img src={treat.photo} className="post-img"></img>
                <span className="purchase-details">
                  <p>{treat.price}</p>
                  <p>Inventory: {treat.stock}</p>
                  <span
                    onClick={async () => {
                      const response = await addToCart(treat.id, "treat", 1);
                      if (response) {
                        const newCart = await fetchCart();
                        if (newCart) {
                          setCartItems(newCart);
                        }
                      }
                    }}
                  >
                    <i className="fa-solid fa-cart-plus add-cart"></i>
                  </span>
                </span>
                <h2>{treat.name}</h2>
                <p>{treat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
