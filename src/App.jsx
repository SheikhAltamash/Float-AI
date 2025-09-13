import "./App.css";
import ChatPage from "./pages/Chatbot Page/ChatPage";
import Home from "./pages/Landing Page/Home";
import { createBrowserRouter,RouterProvider } from "react-router";

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
  return <RouterProvider router={router}/>
}

export default App;
