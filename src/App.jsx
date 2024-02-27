import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage } from "./pages";
// import { NavBar } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
