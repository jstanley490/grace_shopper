import { Link, useOutletContext } from "react-router-dom";

export default function Merch() {
  const { merch } = useOutletContext();

  return (
    <div id="page">
      <div id="merch-background">
        <h1>merch</h1>
      </div>
      <div className="page-body">
        <div className="listings">
          {merch.map((item) => {
            // console.log(item);
            return (
              <Link to={`/merch/${item.id}`} className="post" key={item.id}>
                <h2>{item.type}</h2>
                <p>{item.color}</p>
                <p>{item.size}</p>
                <p>{item.price}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
