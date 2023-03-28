import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./component/provider/AuthContextProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* ログイン情報 */}
    <AuthContextProvider>
      <Container fluid>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Container>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
