import { useRef } from "react";
import classes from './Forgot.module.css';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailInput = useRef();
  const forgotPasswordHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcfCVS9eoZNwYwvxVC0yWjZw85gXntSYU",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailInput.current.value,
          }),
          headers: {
            "content-type": "application/json",
          },
        }  
      );    
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err);
    }
  };
  const backHandler = () =>{
    navigate("/");
  }
   
  return (
    <div className={classes.auth}>
      <form onSubmit={forgotPasswordHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInput} required />
        </div>
        <div className={classes.actions}>
          <button type="submit">Submit</button>
          <button type="submit" onClick={backHandler}>Back</button>

        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;