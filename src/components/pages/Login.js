import React, { useState, useRef } from "react";
import { Col, Button, Row, Card, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Redux-Store/AuthSlice";
import useHttp from "../hooks/use-http";

export default function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const sendRequest = useHttp().sendRequest;
  const isLoggedIn = useSelector((state) => state.auth.haveAccount);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSignupHandler = () => {
    dispatch(authActions.haveAccount());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConPassword = isLoggedIn
      ? null
      : confirmPasswordInputRef.current.value;

    if (!isLoggedIn) {
      // Handle Sign Up
      if (enteredPassword !== enteredConPassword) {
        setPasswordMatchError(true);
        return;
      } else {
        setPasswordMatchError(false);
      }
    }

    if (!isLoggedIn) {
      sendRequest({
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk",
        method: "POST",
        body: {
          email: enteredEmail,
          password: enteredPassword,
          conPassword: enteredConPassword,
          returnSecureToken: true,
        },
      });
      alert("Your Account Has Been Sucessfully Created You Can Now Login");

      if (!enteredEmail || !enteredPassword) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    } else {
      const saveLoginData = (data) => {
        dispatch(
          authActions.login({ token: data.idToken, email: enteredEmail })
        );
      };

      sendRequest(
        {
          url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk",
          method: "POST",
          body: {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          },
        },
        saveLoginData
      );
    }
    console.log('successfully signed up');
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (!isLoggedIn) {
      confirmPasswordInputRef.current.value = ""; // Reset confirmPasswordInputRef only when signing up
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgot");
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
                  {isLoggedIn ? "Login" : "Sign Up"}
                </h2>
                <div className="mb-1">
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <label className="text-center">Email address</label>
                      <Form.Control type="email" ref={emailInputRef} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                      <label>Password</label>
                      <Form.Control
                        type="password"
                        ref={passwordInputRef}
                        required
                      />
                    </Form.Group>
                    {!isLoggedIn && (
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <label> Confirm Password</label>
                        <Form.Control
                          type="password"
                          ref={confirmPasswordInputRef}
                          required
                        />
                      </Form.Group>
                    )}
                    {passwordMatchError && (
                      <Alert variant="danger">Credentials do not match.</Alert>
                    )}
                    <div
                      className="d-grid"
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    >
                      {isLoggedIn && (
                        <p onClick={handleForgotPassword}>
                          <strong>Forgot Password?</strong>
                        </p>
                      )}
                    </div>
                    <div className="d-grid">
                      <Button variant="secondary" type="submit">
                        {isLoggedIn ? "Login" : "Create Account"}
                      </Button>
                    </div>
                    <br />
                  </Form>

                  <div className="mt-3">
                    {isLoggedIn ? (
                      <h6 className="mb-0  text-center">
                        Don't have an account?? <hr />
                        <Button
                          variant="info"
                          type="submit"
                          onClick={loginSignupHandler}
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
                          onClick={loginSignupHandler}
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
