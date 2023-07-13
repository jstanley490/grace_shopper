import { useOutletContext } from "react-router-dom";
// import { addToCart } from "../api/util";

export default function Treats() {
  const { treats } = useOutletContext();

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
                  <p>{treat.price}</p>
                  <p>Inventory: {treat.stock}</p>
                  <span onClick={() => addToCart(treat.id, "treats", 1)}>
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
