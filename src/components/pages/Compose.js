import React, { useRef } from "react";
// import { Editor } from "react-draft-wysiwyg";
import Form from "react-bootstrap/Form";
import "./Compose.css";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
// import { EditorState } from "draft-js";
// import { convertToHTML } from "draft-convert";
// import { inboxActions } from "../Redux-Store/inbox-slice";
import useHttp from "../hooks/use-http";

const Compose = () => {
  const { sendRequest } = useHttp();
  const email = useSelector((state) => state.auth.email);
  const senderMail = email?.replace("@", "").replace(".", "");
  // const dispatch = useDispatch()
  const emailRef = useRef();
  const subjectRef = useRef();
  const mailBodyRef = useRef();

  // const sendToEmailInputRef = useRef();
  // const subInputRef = useRef();
  const formRef = useRef();

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

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

    sendRequest({
      url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${receiverMail}.json`,
      method: "POST",
      body: recevierMailData,
    });
    sendRequest({
      url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${senderMail}.json`,
      method: "POST",
      body: senderMailData,
    });
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
            {/* <div className="editors">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
              />
            </div> */}
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
