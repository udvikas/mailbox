import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import "./Compose.css";
import {  useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import useHttp from "../hooks/use-http";
import { mailActions } from "../Redux-Store/mail-slice";

const Compose = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const sentMail = useSelector((state) => state.mail.sentMail)
  const senderMail = email?.replace("@", "").replace(".", "");
  const emailRef = useRef();
  const subjectRef = useRef();
  const mailBodyRef = useRef();
  const formRef = useRef();

  const mailSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if the emailRef.current is not null before accessing its value
    const enteredEmail = emailRef.current && emailRef.current.value;

    // Perform additional validation, if needed
    if (
      !enteredEmail ||
      !enteredEmail.includes("@") ||
      !enteredEmail.includes(".")
    ) {
      // Show an error message or handle the invalid email address
      console.log("Invalid email address");
      return;
    }

    const receiverMail = enteredEmail.replace("@", "").replace(".", "");
    const recevierMailData = {
      sender: email,
      subject: subjectRef.current.value,
      body: mailBodyRef.current.value,
      isRead: false,
    };

    const senderMailData = {
      sentTo: emailRef.current.value,
      subject: subjectRef.current.value,
      body: mailBodyRef.current.value,
    };
     try {
      // Send the first request to receive mail data
      const responseData = await sendRequest({
        url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${receiverMail}.json`,
        method: "POST",
        body: recevierMailData,
      });

      // After successful POST request, update the Inbox state with the new mail
      const composedMail = { id: responseData.name, ...recevierMailData };

      // Send the second request to store sent mail data
      await sendRequest({
        url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${senderMail}.json`,
        method: "POST",
        body: senderMailData,
      });

      // Update the sentMail state in the Redux store with the new mail
      dispatch(mailActions.updateSentMail({ mail: [composedMail, ...sentMail] }));

      // Reset the form after both requests are successful
      formRef.current.reset();
    } catch (error) {
      // Handle error if necessary
    }

    sendRequest({
      url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${receiverMail}.json`,
      method: "POST",
      body: recevierMailData,
    });
    sendRequest({
      url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${senderMail}.json`,
      method: "POST",
      body: senderMailData,
    })
   
   
    formRef.current.reset();
  };

  return (
    <>
      <div className="mainContainer">
        <div className="container1">
          <Form onSubmit={mailSubmitHandler} ref={formRef}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
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
                <Form.Control type="text" ref={subjectRef} />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="txtarea">
                <Form.Control as="textarea" rows={7} ref={mailBodyRef} />
              </div>
            </Form.Group>
  
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
