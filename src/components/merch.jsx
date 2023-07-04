import { useOutletContext } from "react-router-dom";

export default function Merch() {
  const { merch, setMerch } = useOutletContext();

  return (
    <div id="page">
      <div className="page-body">
        <h1>merch</h1>
        {merch.map((item) => {
          // console.log(item);
          return (
            <div className="post" key={item.id}>
              <h2>{item.type}</h2>
              <p>{item.color}</p>
              <p>{item.size}</p>
              <p>{item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
