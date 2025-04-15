import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/home/Home";
import Panel from "./components/controler/Panel";
import { ContextObj } from "./store/Context";
import Errors from "./components/404/Error";
import Cart from "./components/cart/Cart";
import Header from "./components/header/Header";
import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons, PayPalButtonsComponentProps, OnApproveBraintreeData, OnApproveBraintreeActions } from "@paypal/react-paypal-js";
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

  const [ownCard, setOwnCard] = useState<any[]>([])
  const [addCart, setAddCart] = useState<any[]>([])
  const [readering, setReadering] = useState<boolean>(false)
  const context = useContext(ContextObj)
  const { loginStatus, setOrderArr } = context

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("https://api.jsonbin.io/v3/b/67e162f68960c979a5777892", {
        headers: {
          "X-Master-Key": "$2a$10$P78y9TJRZKTjIDAlQJoBJedgZMHJmscHtQqViqKeVPSCagIf4KiaC",
          "X-Access-Key": "$2a$10$vhCa1wiFc/NWNbd.ajRBPOerrhu3pz7ZKEusffMuQYnU33Krp4CZW",
          "Content-Type": "application/json",
          "method": "GET"
        }
      })

      try {
        if (response.ok) {
          const data = await response.json()
          setOwnCard(data.record.self)
        } else {
          throw new Error("Error fetching data")
        }
      } catch (error: any) {
        console.log("Error fetching data", error)
      }
    }

    fetchData()

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
