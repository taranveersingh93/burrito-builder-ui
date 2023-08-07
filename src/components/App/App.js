import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])

  const addOrder = (newOrder) => {
    console.log(orders, "orders")

    console.log(newOrder, "new order")
    setOrders([...orders, newOrder])
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
        <OrderForm addOrder={addOrder} orders={orders}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
