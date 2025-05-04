import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/home/Home";
import Panel from "./components/controler/Panel";
import { ContextObj } from "./store/Context";
import Errors from "./components/404/Error";
import Cart from "./components/cart/Cart";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThankYou from "./components/thankyou/ThankYou";
import OrderHistory from "./components/orderHistory/OrderHistory";
function App() {

  const initialOptions = {
    "clientId": "AWUc0wnWe79TBqEdTIO9C6bTNMKO_mCmEdj0sukO1R7b96wzgUujeZ_Y1sRVI806G1bbPJIrx21njmSx",
    currency: "HKD",
    intent: "capture"
  } 

  const context = useContext(ContextObj)
  const { loginStatus, setOrderArr } = context

  useEffect(() => {
  }, [])

  return (
    <PayPalScriptProvider options={initialOptions}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home setOrderArr={setOrderArr} />} />
          {loginStatus ?
            <Route path="/panel" element={<Panel />} /> :
            null
          }
          <Route path="*" element={<Errors />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/order" element={<OrderHistory />} />
        </Routes>
      </Router>

    </PayPalScriptProvider>

  );
}

export default App;
