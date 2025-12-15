import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataCacheProvider } from "./context/DataCacheContext.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <DataCacheProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </DataCacheProvider>
  </AuthProvider>
);
