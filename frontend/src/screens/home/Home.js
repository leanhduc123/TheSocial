import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  OverlayTrigger,
  Popover,
  ListGroup,
} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { AuthUserCtx } from "../../context/authUser";
import { NewsFeed } from "../NewsFeed/NewsFeed";
import { Me } from "../me/Me";
import { Chat } from "../message/Chat";

const defaultImg =
  "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg";

export const Home = () => {
  const fetchMeApiData = useAuth();
  const { authUser } = useContext(AuthUserCtx);

  if (fetchMeApiData.loading) {
    return <div>Authenticating ...</div>;
  }

  if (fetchMeApiData.error) {
    return <Redirect to="/auth/login" />;
  }

  if (!authUser) {
    return null;
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            The Social
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/auth/login">
                Search
              </Nav.Link>
              <Nav.Link as={Link} to="/message">
                Message
              </Nav.Link>
            </Nav>
            <OverlayTrigger
              placement="bottom"
              trigger="click"
              overlay={
                <Popover>
                  <Popover.Title as="h3">Menu</Popover.Title>
                  <Popover.Content>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Link to="/me">Update Profile</Link>
                      </ListGroup.Item>
                      <ListGroup.Item onClick={() => {}}>
                        Log out
                      </ListGroup.Item>
                    </ListGroup>
                  </Popover.Content>
                </Popover>
              }
            >
              <div>
                <img
                  src={authUser.photoURL || defaultImg}
                  alt=""
                  className="border rounded-circle mr-2"
                  style={{ width: 30 }}
                />
                <span>{authUser.username}</span>
              </div>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/profile/:username" />
        <Route path="/search" />
        <Route path="/message" component={Chat} />
        <Route path="/me" component={Me} />
        <Route path="/" component={NewsFeed} />
      </Switch>
    </div>
  );
};
