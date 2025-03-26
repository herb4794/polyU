import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/home/Home";
import Panel from "./components/controler/Panel";


function App() {
  const [ownCard, setOwnCard] = useState<any[]>([])

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
    <Router>
      <Routes>
        <Route path="/" element={<Home ownCard={ownCard} />} />
        <Route path="/Panel" element={<Panel/> } />
      </Routes>
    </Router>

  );
}

export default App;
