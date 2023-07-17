import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import Form from "react-bootstrap/Form";
import "./Compose.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import { authActions } from "../Redux-Store/AuthSlice";

const Compose = () => {
  const [editorState, setEditorState] = useState(null);
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const getEmail = localStorage.getItem("email");


  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const emailRef = useRef();
  const subRef = useRef();
  const textRef = useRef();
  const email = localStorage.getItem("email");
  const newEmail = email ? email.replace(/[@.]/g, "") : "";
  const resetFields = () => {
    emailRef.current.value = "";
    subRef.current.value = "";
    textRef.current.value = "";
  };
  const mailSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredSub = subRef.current.value;
    const enteredText = textRef.current.value;

    let url = `https://shopping-app-814b1-default-rtdb.firebaseio.com/${newEmail}mail.json`;
    axios
      .post(url, {
        email: enteredEmail,
        sub: enteredSub,
        text: enteredText,
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
        resetFields();
      })
      .catch((err) => console.log("err", err.message));
  };

  const backpageHandler = () => {
    navigate("/home");
  }
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  }
  return (
    <>
     <div className="mainProfile">
        <span className="welcome">Welcome to Your Mail Box !!!</span>
        <span className="email1">{getEmail}</span>
        <span className="log1"><Button variant="info" onClick={logoutHandler}>Logout</Button></span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "-1rem",
          marginTop: "1rem",
          marginRight: "2rem",
        }}
      >
        <Button onClick={backpageHandler}>Back to Home Page</Button>
      </div>
      <div className="mainContainer">
        <div className="container1">
          <Form onSubmit={mailSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Form.Label>
                  <span className="Space">
                    <b>To</b>
                  </span>{" "}
                </Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Form.Label>
                  <span className="Space1">
                    <b>Subject</b>
                  </span>
                </Form.Label>
                <Form.Control type="text" ref={subRef} />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="txtarea">
                <Form.Control as="textarea" rows={5} ref={textRef} />
              </div>
            </Form.Group>
            <div className="editors">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <Button variant="primary" type="submit" className="btnSend">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Compose;
