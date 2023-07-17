import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchTreats, patchTreats } from "../api/util";

export default function EditBox(props) {
  const { editTreat, setTreats } = props;
  const localToken = localStorage.getItem("token");

  if (editTreat) {
    const [newNameText, setNewNameText] = useState(editTreat.name);
    const [newDescriptionText, setNewDescriptionText] = useState(
      editTreat.description
    );
    const [newCategory, setNewCategory] = useState(editTreat.category);
    const [newStock, setNewStock] = useState(editTreat.stock);
    const [newPrice, setNewPrice] = useState(editTreat.price);
    const [newPhoto, setNewPhoto] = useState(editTreat.photo);
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
            document.getElementById("editBox").style.display = "none";
            document.getElementById("editBox").style.display = "none";
            setNewCategory(editTreat.category);
            setNewStock(editTreat.stock);
            setNewNameText(editTreat.name);
            setNewDescriptionText(editTreat.description);
            setNewPhoto(editTreat.photo);
            setNewPrice(editTreat.price);
            setNewStock(editTreat.stock);
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
