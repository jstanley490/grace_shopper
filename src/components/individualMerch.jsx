import React, { useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

export default function IndividualMerch() {
  const { merchId } = useParams();
  const { merch } = useOutletContext();
  const post = merch.find((item) => item.id === merchId);
  console.log(merch);
  console.log(post);

  const navigate = useNavigate();

  useEffect(() => {
    if (!post) {
      navigate("/merch");
    }
  }, []);

  return (
    <div id="page">
      hello world
      {post.color} {post.type}
    </div>
  );
}
