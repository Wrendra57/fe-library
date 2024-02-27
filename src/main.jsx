import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/css/index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
