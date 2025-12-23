import Router from "./config/router";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@/assets/css/base.css";
import { HeroUIProvider } from "@heroui/react";
import Message from "@/components/message";

const router = createBrowserRouter(Router);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  //<App />
  <HeroUIProvider>
    <Message />
    <RouterProvider router={router} />
  </HeroUIProvider>

  // </React.StrictMode>,
);
