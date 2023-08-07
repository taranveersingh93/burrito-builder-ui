const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
};

const postOrder = (order) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json"
    }
  })
  .then(response => response.json())
}

const deleteOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: "DELETE",
  })
  .then(response => response.status)
}

export {
  getOrders,
  postOrder,
  deleteOrder
}