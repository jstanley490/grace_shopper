import { useOutletContext } from "react-router-dom";

export default function Treats() {
  const { treats, setTreats } = useOutletContext();

  return (
    <div id="page">
      <div className="page-body">
        <h1>treats</h1>
        {treats.map((treat) => {
          // console.log(treat);
          return (
            <div className="post" key={treat.id}>
              <h2>{treat.type}</h2>
              <p>{treat.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
