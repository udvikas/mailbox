import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./components/Redux-Store/AuthSlice";
import Home from "./components/pages/Home";

function App() {
  const { isAuthenticated, token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("email", email);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (savedToken && savedEmail) {
      dispatch(authActions.login({ token: savedToken, email: savedEmail }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  }, [token, email, isAuthenticated]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login/> : <Navigate to="/home"/>} />
        <Route path="/home" element={isAuthenticated ? <Home/> : <Navigate to="/"/>}/>  
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
