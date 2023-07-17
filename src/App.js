
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Compose from "./components/pages/Compose";
// import { useSelector } from "react-redux";

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/compose" element={<Compose/>}/>
          <Route path="*" element={<Navigate replace to ='/'/>}/>
        </Routes>
    </div>
  );
}

export default App;
