import { useState, orders, useEffect } from "react";

function OrderForm({addOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function checkSubmitButton() {
    if (name && ingredients.length) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const preparedOrder = {
      name: name,
      ingredients: ingredients
    }

    addOrder(preparedOrder);
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  function handleChange(e) {
    setName(e.target.value)
  }

  function addIngredient(e) {
    e.preventDefault()
    setIngredients([...ingredients, e.target.name])
  }

  useEffect(() => {
    checkSubmitButton()
  }, [ingredients, name])

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => {
          addIngredient(e)
        }}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => {
          handleChange(e)
        }}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button disabled={buttonDisabled} onClick={(e) => {
        handleSubmit(e)
       }}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
