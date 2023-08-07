import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])

  const addOrder = (newOrder) => {
    postOrder(newOrder)
      .then(jsonResponse => {
        console.log(jsonResponse)
        setOrders([...orders, jsonResponse])
      })
      .catch(error => {console.error(error)})
  }

  useEffect(() => {
    if (!orders.length) {
      getOrders()
        .then(data => {setOrders(data.orders)})
        .catch((err) => console.error("Error fetching:", err));
    }
  }, [orders]);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
