import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createTreat, fetchTreats } from "../api/util";

export default function AddTreat(props) {
  const { setTreats } = props;
  const localToken = localStorage.getItem("token");
  const [newNameText, setNewNameText] = useState("");
  const [newDescriptionText, setNewDescriptionText] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStock, setNewStock] = useState(Number);
  const [newPrice, setNewPrice] = useState(Number);
  const [newPhoto, setNewPhoto] = useState("");
  return (
    <div className="addTreatBox" id="addTreatBox">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("hi");
          document.getElementById("addTreatBox").style.display = "none";
          const response1 = await createTreat(
            localToken,
            newNameText,
            newDescriptionText,
            newCategory,
            newStock,
            newPrice,
            newPhoto
          );
          document.getElementById("addTreatBox").style.display = "none";
          document.getElementById("addTreatBox").style.display = "none";
          setNewCategory("");
          setNewStock("");
          setNewNameText("");
          setNewDescriptionText("");
          setNewPhoto("");
          setNewPrice("");
          setNewStock("");
          console.log(
            newNameText,
            newDescriptionText,
            newCategory,
            newStock,
            newPrice
          );
          if (response1) {
            const pull = await fetchTreats();
            if (pull) {
              setTreats(pull);
            }
          }
        }}
      >
        <h1>Add Treat</h1>
        <label htmlFor="newName">Name: </label>
        <input
          onChange={(e) => setNewNameText(e.target.value)}
          type="text"
          value={newNameText}
        ></input>
        <label htmlFor="newGoal">Description: </label>
        <input
          onChange={(e) => setNewDescriptionText(e.target.value)}
          type="textarea"
          value={newDescriptionText}
        ></input>
        <label htmlFor="newCount">Category: </label>
        <input
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          value={newCategory}
        ></input>
        <label htmlFor="newCount">Photo (URL): </label>
        <input
          onChange={(e) => setNewPhoto(e.target.value)}
          type="text"
          value={newPhoto}
        ></input>
        <label htmlFor="newDuration">Stock: </label>
        <input
          onChange={(e) => setNewStock(e.target.value)}
          type="number"
          value={newStock}
        ></input>
        <label htmlFor="newDuration">Price: </label>
        <input
          onChange={(e) => setNewPrice(e.target.value)}
          type="money"
          value={newPrice}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
