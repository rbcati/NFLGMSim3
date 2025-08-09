// src/main.jsx (router)
import PlayerProfile from "./pages/PlayerProfile.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/trade", element: <TradeCenter /> },
      { path: "/teams", element: <Teams /> },
      { path: "/players", element: <Players /> },
      { path: "/players/:id", element: <PlayerProfile /> }, // <-- new
    ],
  },
]);
