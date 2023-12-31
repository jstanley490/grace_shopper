import { Link, useOutletContext } from "react-router-dom";

export default function Merch() {
  const { merch } = useOutletContext();

  return (
    <div id="page">
      <div id="merch-background">
        <h1>Merchandise</h1>
      </div>
      <div className="page-body">
        <div className="listings">
          {merch.map((item) => {
            // console.log(item);
            return (
              <Link to={`/merch/${item.id}`} className="post" key={item.id}>
                <img className="post-img" src="images/merch-logo.jpg" />
                <h2>{item.type}</h2>
                <p>
                  Color: <u>{item.color}</u>
                </p>
                <p>
                  Size: <u>{item.size}</u>
                </p>
                <p>
                  Price: <u>{item.price}</u>
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
