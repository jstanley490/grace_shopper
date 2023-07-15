import { useNavigate, useOutletContext } from "react-router-dom";
import {
  addToCart,
  deleteTreat,
  fetchCart,
  fetchTreats,
  removeFromCart,
  updateCart,
} from "../api/util";
import { useEffect, useState } from "react";
import EditBox from "./editBox";

export default function AdminTreats() {
  const { treats, setCartItems, cartItems, fetchCart, setTreats } =
    useOutletContext();
  const navigate = useNavigate();
  const [editTreat, setEditTreat] = useState({});
  console.log(cartItems);
  if (!cartItems || cartItems === undefined) {
    setCartItems({ true: "ay" });
  }
  return (
    <div id="page">
      <div id="treats-background">
        <h1>Treats</h1>
      </div>
      <div className="page-body">
        <div className="listings">
          <EditBox editTreat={editTreat} setTreats={setTreats} />
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
                      <i
                        onClick={async (e) => {
                          console.log("tom cruise");
                          e.preventDefault();
                          const response = await deleteTreat(treat.id);
                          if (response) {
                            const newTreats = await fetchTreats();
                            if (newTreats) {
                              setTreats(newTreats);
                            }
                          }
                        }}
                        className="fa-solid fa-x deleteTreat"
                      ></i>
                      <i
                        onClick={async (e) => {
                          console.log("tom cruise");
                          e.preventDefault();
                          setEditTreat(treat);
                          document.getElementById("editBox").style.display =
                            "flex";
                        }}
                        className="fa-solid fa-pencil editTreat"
                      ></i>

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
                            className="fa-solid fa-plus"
                          ></i>
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
                            className="fa-solid fa-minus"
                          ></i>
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
                <i
                  onClick={async (e) => {
                    console.log("tom cruise");
                    e.preventDefault();
                    const response = await deleteTreat(treat.id);
                    if (response) {
                      const newTreats = await fetchTreats();
                      if (newTreats) {
                        setTreats(newTreats);
                      }
                    }
                  }}
                  className="fa-solid fa-x deleteTreat"
                ></i>
                <i
                  onClick={async (e) => {
                    console.log("tom cruise");
                    e.preventDefault();
                    setEditTreat(treat);
                    if (editTreat) {
                      document.getElementById("editBox").style.display = "flex";
                    }
                  }}
                  className="fa-solid fa-pencil editTreat"
                ></i>

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
                          localStorage.setItem("cart", JSON.stringify(newCart));
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
          <div className="addTreat post">
            <i onClick={(e) => {
              e.preventDefault();
              
            }} className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
