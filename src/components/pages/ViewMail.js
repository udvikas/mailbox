import React from "react";
import { Button, Modal } from "react-bootstrap";
import useHttp from "../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../Redux-Store/mail-slice";

const ViewMail = (props) => {
  const { sendRequest } = useHttp();
  const viewMail = useSelector((state) =>
    props.type === "sent"
      ? state.mail.viewSentMail
      : state.mail.viewReceivedMail
  );
  const dispatch = useDispatch();
  const viewMailHandler = () => {
    dispatch(mailActions.viewMailHandle({ id: null }));
  };

  const deleteMailHandler = async () => {
    if (viewMail) {
      let url;
      if (props.type === "received") {
        url = `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${props.email}/${viewMail.id}.json`;
        dispatch(mailActions.deleteReceivedMail({ id: viewMail.id }));
      } else {
        url = `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${props.email}/${viewMail.id}.json`;
        dispatch(mailActions.deleteSentMail({ id: viewMail.id }));
      }
      // sendRequest({
      //   url: url,
      //   method: "DELETE",
      // });
      // // dispatch(mailActions.mailHandler());
      // viewMailHandler();
      try {
        await sendRequest({
          url: url,
          method: "DELETE",
        });
        // If the delete operation is successful, reset the viewMail state
        viewMailHandler();
      } catch (error) {
        // Handle error if necessary
      } 
    }
  };

  return (
    <Modal
      show={viewMail !== null}
      onHide={viewMailHandler}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{viewMail && viewMail.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteMailHandler}>
          Delete
        </Button>
        <Button onClick={viewMailHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewMail;
