import { useNavigate, useOutletContext } from "react-router-dom";
import { addToCart, fetchCart, removeFromCart, updateCart } from "../api/util";
import { useEffect } from "react";
import AdminTreats from "./adminTreats";

export default function Treats() {
  const { treats, setCartItems, cartItems, fetchCart } = useOutletContext();
  const navigate = useNavigate();
  // useEffect(() => {
  //   Promise.all([fetchCart()]).then((values) => {
  //     setCartItems(values[0]);
  //   });
  // }, []);
  // console.log(cartItems);
  if (!cartItems || cartItems === undefined) {
    setCartItems({ true: "ay" });
  }
  if (localStorage.getItem("user_role") === "1") {
    console.log("hi");
    return <AdminTreats />;
  } else {
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
                                  const newCart = await fetchCart();
                                  if (newCart) {
                                    //setCartItems(newCart);
                                    document.getElementById(
                                      `cartItem${cartItems[key].id}`
                                    ).innerText = cartItems[key].quantity;
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify(newCart)
                                    );
                                  }
                                }
                              }}
                              className="fa-solid fa-plus"></i>
                            <i
                              onClick={async () => {
                                cartItems[key].quantity--;
                                console.log(cartItems[key].quantity);
                                if (cartItems[key].quantity === 0) {
                                  const response = await removeFromCart(
                                    cartItems[key].id
                                  );
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
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify(newCart)
                                    );
                                  }
                                }
                              }}
                              className="fa-solid fa-minus"></i>

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
                        console.log(response);
                        if (!response) {
                          navigate("../login");
                        }
                        if (response) {
                          const newCart = await fetchCart();
                          if (newCart) {
                            setCartItems(newCart);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(newCart)
                            );
                          }
                        }
                      }}>
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
}
