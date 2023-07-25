import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { mailActions } from "../Redux-Store/mail-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import ViewMail from "./ViewMail";

const Sent = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const { sentMail, changed } = useSelector((state) => state.mail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail?.replace("@", "").replace(".", "");
  console.log(email);

  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  };

  useEffect(() => {
    const transformData = (data) => {
      const newData = [];
      for (let key in data) {
        newData.push({ id: key, ...data[key] });
      }
      dispatch(mailActions.updateSentMail({ mail: newData }));
    };
    sendRequest(
      {
        url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${email}.json`,
      },
      transformData
    );
  }, [sendRequest,changed, dispatch, email]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Read</th>
          </tr>
        </thead>
        <tbody>
          {sentMail.map((mail) => (
            <tr key={mail.id}>
              <td>{mail.sentTo}</td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>
                <Button variant="success" onClick={viewMailHandler}>
                  View
                </Button>
              </td>
              <ViewMail mail={mail} email={email} type={"sent"}/>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Sent;
