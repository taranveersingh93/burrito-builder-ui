import React from "react";
import "./Orders.css";

const Orders = ({orders, removeOrder}) => {
  const orderEls = orders.map(order => {
    return (
      <div id={order.id} className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index+1}>{ingredient}</li>;
          })}
        </ul>
        <button onClick={() => {removeOrder(order.id)}}className="delete-order">Delete order</button>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
