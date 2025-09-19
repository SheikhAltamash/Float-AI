import "./App.css";
import ChatPage from "./pages/Chatbot Page/ChatPage";
import Home from "./pages/Landing Page/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
import { getLocationData } from "./services/locationInfo";
import { useEffect } from "react";
import { saveToGoogleSheets } from "./services/sheetIntgration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  { path: "/chat", element: <ChatPage></ChatPage> },
  {
    path: "*", // Catch all unmatched routes
    element: <Home />, // Redirect to landing page for any unknown route
  },
]);

function App() {
  useEffect(() => {
     const collectUserData = async () => {
       try {
         const dataCollected = sessionStorage.getItem("dataCollected");

         if (!dataCollected) {
           const userData = await getLocationData();

           if (userData) {
             await saveToGoogleSheets(userData);
             sessionStorage.setItem("dataCollected", "true");
             console.log("User data collected and saved");
           }
         }
       } catch (error) {
         console.error("Error collecting user data:", error);
       }
     };

    collectUserData();
  }, []); // Always runs on refresh

  return <RouterProvider router={router} />;
}

export default App;
