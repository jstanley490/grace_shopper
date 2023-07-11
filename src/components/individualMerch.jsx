import React, { useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

export default function IndividualMerch() {
  const { merchId } = useParams();
  const { merch } = useOutletContext();
  const product = merch.find((item) => item.id == merchId);
  console.log(product);

  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/merch");
    }
  }, [merch]);

  if (!product) {
    return <div id="page">Loading...</div>;
  }

  return (
    <div id="page">
      <h1>{product.type}</h1>
      <p>{product.price}</p>
      <p>{product.color}</p>
      <p>{product.size}</p>
      <button>add to cart</button>
    </div>
  );
}
