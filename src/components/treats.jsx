import { useOutletContext } from "react-router-dom";
import { addToCart, fetchCart } from "../api/util";
import { useEffect } from "react";

export default function Treats() {
  const { treats, setCartItems, cartItems, fetchCart } = useOutletContext();

  useEffect(() => {
    Promise.all([]);
  });

  return (
    <div id="page">
      <div id="treats-background">
        <h1>Treats</h1>
      </div>
      <div className="page-body">
        <div className="listings">
          {treats.map((treat) => {
            // console.log(treat);
            return (
              <div className="post" key={treat.id}>
                <img src={treat.photo} className="post-img"></img>
                <span className="purchase-details">
                  <h5>
                    <p>{treat.price}</p>
                  </h5>
                  <h5>
                    <p>Inventory: {treat.stock}</p>
                  </h5>
                  <span onClick={() => addToCart(treat.id, "treats", 1)}>
                    <i className="fa-solid fa-cart-plus add-cart"></i>
                  </span>
                </span>
                <u>
                  <i>
                    <h1>{treat.name}</h1>
                  </i>
                </u>
                <h5>
                  <p>{treat.description}</p>
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
