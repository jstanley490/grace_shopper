import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { patchTreats } from "../api/util";

export default function EditBox(props) {
  const { editTreat } = props;
  const localToken = localStorage.getItem("token");
  const [newNameText, setNewNameText] = useState("");
  const [newDescriptionText, setNewDescriptionText] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [newPrice, setNewPrice] = useState(Number);
  const [newCategory, setNewCategory] = useState("");
  const [newStock, setNewStock] = useState(Number);
  if (editTreat) {
    return (
      <div className="editBox" id="editBox">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("hi");
            document.getElementById("editBox").style.display = "none";
            const response1 = await patchTreats(
              editTreat.id,
              localToken,
              newNameText,
              newDescriptionText,
              newCategory,
              newStock,
              newPrice,
              newPhoto
            );
            if (response1) {
              document.getElementById("editBox").style.display = "none";
              document.getElementById("editBox").style.display = "none";
              setNewCategory(0);
              setNewStock(0);
              setNewNameText("");
              setNewDescriptionText("");
              setNewPhoto("");
              setNewPrice(Number);
              setNewStock(Number);
              setNewCategory("");
            }
          }}
          className="newRoutineForm"
        >
          <h1>Edit Treat</h1>
          <label htmlFor="newName">Name: </label>
          <input
            onChange={(e) => setNewNameText(e.target.value)}
            type="text"
            defaultValue={editTreat.name}
          ></input>
          <label htmlFor="newGoal">Description: </label>
          <input
            onChange={(e) => setNewDescriptionText(e.target.value)}
            type="textarea"
            defaultValue={editTreat.description}
          ></input>
          <label htmlFor="newCount">Category: </label>
          <input
            onChange={(e) => setNewCategory(e.target.value)}
            type="text"
            defaultValue={editTreat.category}
          ></input>
          <label htmlFor="newCount">Photo (URL): </label>
          <input
            onChange={(e) => setNewPhoto(e.target.value)}
            type="text"
            defaultValue={editTreat.photo}
          ></input>
          <label htmlFor="newDuration">Stock: </label>
          <input
            onChange={(e) => setNewStock(e.target.value)}
            type="number"
            defaultValue={editTreat.stock}
          ></input>
          <label htmlFor="newDuration">Price: </label>
          <input
            onChange={(e) => setNewPrice(e.target.value)}
            type="money"
            defaultValue={editTreat.price}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
