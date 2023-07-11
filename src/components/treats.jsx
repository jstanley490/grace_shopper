import { useOutletContext } from "react-router-dom";

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
                <h2>{treat.type}</h2>
                <p>{treat.price}</p>
                <button>add to cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
