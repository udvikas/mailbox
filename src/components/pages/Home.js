import React from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "react-bootstrap/Button";

import Stack from "react-bootstrap/Stack";
import "./Home.css";
import { authActions } from "../Redux-Store/AuthSlice";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("email");
  
  const composeHandler = () => {
    navigate("/compose")
  }

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  }
  return (
    <>
      <div className="mainProfile1">
        <span className="welcome1">Welcome to Your Mail Box !!!</span>
        <span className="email1">{getEmail}</span>
        <span className="log"><Button variant="info" onClick={logoutHandler}>Logout</Button></span>
      </div>
      <div className="mainContainer1">
      <Stack gap={3} direction="horizontal" className="stacks1">
            <div>
            <div className="p-2">
              <Button>Inbox</Button>
              <Button style={{marginLeft:'1rem'}}>Sent</Button>
            </div>
            </div>
            <div className="p-2">
              <Button onClick={composeHandler}>Compose</Button>
            </div>
          </Stack>
          
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>From</th>
          <th>Subject</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
        
      </div>
    </>
  );
};

export default Home;
