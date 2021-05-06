import React, { FC } from "react";
import { Navbar } from "react-bootstrap";

const AppHeader: FC = () => {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Navbar.Brand href="#">Products</Navbar.Brand>
    </Navbar>
  );
};

export default AppHeader;
