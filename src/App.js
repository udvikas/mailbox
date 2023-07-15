
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Header from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="*" element={<Navigate replace to ='/'/>}/>
        </Routes>
    </div>
  );
}

export default App;
