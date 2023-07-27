import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from "react-bootstrap/Button";
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { authActions } from "../Redux-Store/AuthSlice";
import Compose from "./Compose";
import Inbox from "./Inbox";
import Sent from "./Sent";
import { mailActions } from "../Redux-Store/mail-slice";
import useHttp from "../hooks/use-http";

const Home = () => {
  const {changed} = useHttp();
  const auth = useSelector((state) => state.auth);
  const { newMailCount } = useSelector((state) => state.mail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changed) {
      // Fetch the updated "Sent" data
      Sent.fetchSentMailData();
    }
  }, [changed]);
  const logoutHandler = () => {
      dispatch(authActions.logout())
      dispatch(mailActions.updateReceivedMail({mail: []}))
      dispatch(mailActions.updateSentMail({mail: []}))
     }

  return (
    <>
      <div className="mainProfile1">
        <span className="welcome1">Welcome to Your Mail Box !!!</span>
        <span className="email1"> {auth.email}</span>
        <span className="log">
          <Button variant="info" onClick={logoutHandler}>
            Logout
          </Button>
        </span>
      </div>
      <div className="compose">

      </div>
      <div style={{marginTop:'1rem', marginLeft:'1rem'}}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Compose</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Inbox {newMailCount > 0 && <span style={{color:'red', fontWeight:'bold'}}>({newMailCount})</span>} </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Sent </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><Compose/></Tab.Pane>
            <Tab.Pane eventKey="second"><Inbox/></Tab.Pane>
            <Tab.Pane eventKey="third"><Sent/></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </>
  );
};

export default Home;
