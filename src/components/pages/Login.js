import React, { useState, useRef } from "react";
import { Col, Button, Row, Card, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setPasswordMatchError(false);
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
          console.log("successfully signedin!");
          localStorage.setItem("idToken", data.idToken);
          navigate("/home");
          resetFields();
        })
        .catch((err) => console.log("err", err.message));
      setLoginError(
        "Authentication failed. Please check your email and password."
      );
    } else {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;

      if (enteredPassword !== enteredConfirmPassword) {
        setPasswordMatchError(true);
        return;
      }

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoDzEaj33vD6OOA1qXKih6QtigxI8MsXU";
      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
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
          console.log(data);
          console.log("successfully Signedup!");
          resetFields();
          navigate("/");
        })
        .catch((err) => console.log("err", err.message));
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
                      {passwordMatchError && (
                        <Alert variant="danger">
                          Password and confirm password do not match.
                        </Alert>
                      )}
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
                      {loginError && (
                        <Alert variant="danger">{loginError}</Alert>
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
