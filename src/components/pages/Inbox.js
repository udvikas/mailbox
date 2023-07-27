import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import useHttp from "../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../Redux-Store/mail-slice";
import { Button } from "react-bootstrap";
import ViewMail from "./ViewMail";
// import { inboxActions } from "../Redux-Store/inbox-slice";

const Inbox = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const { receivedMail, viewReceivedMail} = useSelector((state) => state.mail);
  const senderMail = useSelector((state) => state.auth.email);
  // const viewMail = useSelector((state) => state.mail.viewReceivedMail);
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
    dispatch(mailActions.decrementNewMailCount()); // Dispatch the action to decrement new mail count
  };

  useEffect(() => {
    const transformData = (data) => {
      const newData = [];
      let newMailCount = 0;
      for (let key in data) {
        const mailItem = { id: key, ...data[key] };
        newData.push(mailItem);
        if (!mailItem.isRead) {
          newMailCount++; // Increment the new mail count for unread mails
        }
      }
      dispatch(mailActions.updateReceivedMail({ mail: newData }));
      dispatch(mailActions.resetNewMailCount()); // Reset the new mail count when Inbox component mounts
      dispatch(mailActions.incrementNewMailCount()); // Increment the new mail count for the newly received mails
    };
    sendRequest(
      {
        url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/rec${email}.json`,
      },
      transformData
    );
  }, [sendRequest, dispatch, email]);

 

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>From</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Read</th>
          </tr>
        </thead>
        <tbody>
          {receivedMail.map((mail) => (
            <tr key={mail.id}>
              <td style={{ fontSize: "40px", color: "blue" }}>
                {!mail.isRead && "."}
              </td>
              <td>{mail.sender}</td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>
                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                  View
                </Button>
               
              </td>
              {viewReceivedMail &&  <ViewMail mailId={viewReceivedMail.id} email={email} type={"received"} />}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Inbox;
