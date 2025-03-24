import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";

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
    <div className="min-h-screen dark:bg-neutral-900">
      <Header />

      <Profile information={ownCard} />

      <footer className="mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8" aria-labelledby="footer-heading">
        <div className="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
          <p className="text-sm/6 text-gray-600 max-md:text-center">
            ©
            <a href="">Create by Lawrence Cheng</a>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>

  );
}

export default App;
