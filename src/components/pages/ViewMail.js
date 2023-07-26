import React from "react";
import {Button, Modal} from 'react-bootstrap';
import useHttp from "../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../Redux-Store/mail-slice";

const ViewMail = (props) => {
  const { sendRequest } = useHttp();
  const viewMail = useSelector((state) => state.mail.viewMail);

  const dispatch = useDispatch();
  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  };

  const deleteMailHandler = async () => {
    let url;
    if (props.type === "received") {
      url = `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${props.email}/${props.mail.id}.json`;
      dispatch(mailActions.deleteReceivedMail(props.mail.id));
    } else {
      url = `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${props.email}/${props.mail.id}.json`;
      dispatch(mailActions.deleteSentMail(props.mail.id ));
    }
    sendRequest({
      url: url,
      method: "DELETE",
    });
    dispatch(mailActions.mailHandler());
  };

  return (
    <Modal
      show={viewMail}
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
      <Modal.Body>
        {props.mail.body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteMailHandler}>Delete</Button>
        <Button onClick={viewMailHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
  
  );
};

export default ViewMail;
