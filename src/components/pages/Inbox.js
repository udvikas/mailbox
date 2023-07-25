import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import useHttp from "../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../Redux-Store/mail-slice";
import { Button } from "react-bootstrap";
import ViewMail from "./ViewMail";
// import { useSelector } from "react-redux";
// import { inboxActions } from "../Redux-Store/inbox-slice";

const Inbox = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const { receivedMail, changed } = useSelector((state) => state.mail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail?.replace("@", "").replace(".", "");
  console.log("receivedMail", receivedMail);

  const viewMailHandler = (mail) => {
    sendRequest({
      url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${email}/${mail.id}.json`,
      method: "PUT",
      body: { ...mail, isRead: true },
    });
    console.log("mailid", mail.id);
    dispatch(mailActions.viewMailHandle({ id: mail.id }));
  };
  useEffect(() => {
    const transformData = (data) => {
      const newData = [];
      for (let key in data) {
        newData.push({ id: key, ...data[key] });
      }
      dispatch(mailActions.updateReceivedMail({ mail: newData }));
    };
    sendRequest(
      {
        url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${email}.json`,
      },
      transformData
    );
  }, [sendRequest, changed, dispatch, email]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Read</th>
          </tr>
        </thead>
        <tbody>
          {receivedMail.map((mail) => (
            <tr key={mail.id}>
              <td>{mail.sender}</td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>
                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                  View
                </Button>
              </td>
              <ViewMail mail={mail} email={email} type={"recevied"} />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Inbox;
