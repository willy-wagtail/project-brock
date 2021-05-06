import React, { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import AppHeader from "./component/AppHeader";
import Routes from "./component/Routes";
import SideNav from "./component/SideNav";

const App: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Container fluid className="h-100">
            <Row>
              <Col className="p-0">
                <AppHeader />
              </Col>
            </Row>

            <Row className="h-100">
              <Col md="2">
                <SideNav />
              </Col>

              <Col md="10">
                <Routes />
              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default App;
