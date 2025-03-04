import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



import AppRouter from "./AppRouter.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>   
      <NotificationProvider>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
