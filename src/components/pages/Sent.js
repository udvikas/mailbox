import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { mailActions } from "../Redux-Store/mail-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import ViewMail from "./ViewMail";

const Sent = () => {
  const { sendRequest,changed } = useHttp();
  const dispatch = useDispatch();
  const { sentMail } = useSelector((state) => state.mail);
  const viewMail = useSelector((state) => state.mail.viewSentMail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail?.replace("@", "").replace(".", "");
  console.log(email);

  const viewMailHandler = (mail) => {
    dispatch(mailActions.viewMailHandle({ id: mail.id }));
  };

  
  // useEffect(() => {
  //   const fetchSentMailData = async () => {
  //     try {
  //       const response = await sendRequest({
  //         url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${email}.json`,
  //       });

  //       const responseData = await response.json();
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const transformedData = Object.entries(responseData).map(([id, data]) => ({ id, ...data }));
  //       dispatch(mailActions.updateSentMail({ mail: transformedData }));
  //     } catch (error) {
  //       // Handle error here if necessary
  //     }
  //   };

  //   fetchSentMailData(); // Fetch data when the component mounts or 'changed' state updates
  // }, [sendRequest, email,changed]); // Include 'changed' as a dependency

  useEffect(() => {
    const transformData = (data) => {
      const newData = [];
      for (let key in data) {
        const mailItem = { id: key, ...data[key] }; // Set isRead to false by default
        newData.push(mailItem);
      }
      dispatch(mailActions.updateSentMail({ mail: newData }));
    };
    sendRequest(
      {
        url: `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/sent${email}.json`,
      },
      transformData
    );
  }, [sendRequest, changed, dispatch, email]);


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
            <tr key={mail.id} style={{ margin: "auto" }}>
              <td>{mail.sentTo}</td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>
                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {viewMail && (
        <ViewMail mailId={viewMail.id} email={email} type={"sent"} />
      )}
    </div>
  );
};

export default Sent;
