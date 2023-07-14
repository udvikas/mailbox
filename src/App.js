
import { Route, Routes } from "react-router-dom";
import Header from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
    </div>
  );
}

export default App;
