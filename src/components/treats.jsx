import { useOutletContext } from "react-router-dom";

export default function Treats() {
  const { treats } = useOutletContext();

  return (
    <div id="page">
      <div className="page-body">
        <h1>treats</h1>
        <div className="listings">
          {treats.map((treat) => {
            // console.log(treat);
            return (
              <div className="post" key={treat.id}>
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
