import React, { useState, useRef } from "react";
import { Col, Button, Row, Card, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux-Store/AuthSlice";
import store from "../Redux-Store/store";

export default function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState(true);
  const [showError, setShowError] = useState("");
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    // setPasswordMatchError(false);
  };

  const resetFields = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
  };
  const submitHandler = (e) => {
    e.preventDefault();

    let url;
    if (isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      if(!enteredEmail || !enteredPassword) {
        setPasswordMatchError(false)
      }else {
        setPasswordMatchError(true)
      }

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoDzEaj33vD6OOA1qXKih6QtigxI8MsXU";
      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
      
          } else {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          }
        })
        .then((data) => {
          navigate("/home");
          console.log("successfully signedin!");
          dispatch(authActions.login({
            token:data.idToken,
            email:data.email
          }))
          console.log('state', store.getState());
          resetFields();
        }).catch((err) => console.log("err", err.message));
    } else {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;

      if (enteredPassword !== enteredConfirmPassword) {
        setPasswordMatchError(false);
        return;
      } else {
        setPasswordMatchError(true);
      }

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoDzEaj33vD6OOA1qXKih6QtigxI8MsXU";
        setSignupInProgress(true);
        setSignupSuccess("");
        setShowError("");
      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
          returnSecureToken: true,
        })
        .then((res) => {
          if (res.status === 200 && !isLogin) {
            setSignupSuccess("Signup Successful, you may login");
            setShowError("");
            return res.data;
          } else {
            // setShowError(data.error.message)
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);

          }
        })
        .then((data) => {
          dispatch(authActions.login({
            token:data.idToken,
            email:data.email
          }))
          console.log('state', store.getState());
          console.log("successfully Signedup!");
          resetFields();
          if(isLogin) {
          navigate("/");
          }
        })
        .catch((err) => console.log("err", err.message))
        .finally(() => {
          setSignupInProgress(false)
        })
    }
  };

  return (
    <div style={{ marginTop: "-2rem" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-info"></div>
          <Card className="shadow px-4">
            <Card.Body>
              <div className="mb-1 mt-md-4">
                <h2 className="fw-bold mb-1 text-center text-uppercase ">
                  {isLogin ? "Login" : "Sign Up"}
                </h2>
                <div className="mb-1">
                  {!isLogin ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-1" controlId="formBasicEmail">
                        <label className="text-center">Email address</label>
                        <Form.Control
                          type="email"
                          ref={emailInputRef}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-1"
                        controlId="formBasicPassword1"
                      >
                        <label>Password</label>
                        <Form.Control
                          type="password"
                          ref={passwordInputRef}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-1"
                        controlId="formBasicPassword2"
                      >
                        <label>Confirm Password</label>
                        <Form.Control
                          type="password"
                          ref={confirmPasswordInputRef}
                          required
                        />
                      </Form.Group>
                      {!passwordMatchError && (
                        <Alert variant="danger">
                          Password and confirm password do not match.
                        </Alert>
                      )}
                      {showError && <p style={{ color: "red" }}>{showError}</p>}
                      {signupInProgress && <p>Sending Request...</p>}
                      {signupSuccess && <p style={{ color: "green" }}>{signupSuccess}</p>}
                      <div className="d-grid">
                        <Button variant="secondary" type="submit">
                          {isLogin ? "Login" : "Create Account"}
                        </Button>
                      </div>
                      <br />
                    </Form>
                  ) : (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <label className="text-center">Email address</label>
                        <Form.Control
                          type="email"
                          ref={emailInputRef}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword1"
                      >
                        <label>Password</label>
                        <Form.Control
                          type="password"
                          ref={passwordInputRef}
                          required
                        />
                      </Form.Group>
                      {!passwordMatchError && (
                        <Alert variant="danger">
                          Credentials do not match.
                        </Alert>
                      )}
                      <div className="d-grid">
                        <Button variant="secondary" type="submit">
                          {isLogin ? "Login" : "Create Account"}
                        </Button>
                      </div>
                      <br />
                    </Form>
                  )}
                  <div className="mt-3">
                    {isLogin ? (
                      <h6 className="mb-0  text-center">
                        Don't have an account?? <hr />
                        <Button
                          variant="info"
                          type="submit"
                          onClick={switchAuthModeHandler}
                        >
                          Signup
                        </Button>
                      </h6>
                    ) : (
                      <h6 className="mb-0  text-center">
                        Already have an account?? <hr />
                        <Button
                          variant="info"
                          type="submit"
                          onClick={switchAuthModeHandler}
                        >
                          Login
                        </Button>
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
