import React, { FC } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import injectNavConfig, {
  InjectedNavConfigProps,
} from "../injectNavConfig/injectNavConfig";

type SideNavProps = InjectedNavConfigProps;

const SideNav: FC<SideNavProps> = ({ navConfig }) => {
  return (
    <Nav className="flex-column">
      {navConfig.map((item) => (
        <LinkContainer to={item.url}>
          <Nav.Link>{item.text}</Nav.Link>
        </LinkContainer>
      ))}
    </Nav>
  );
};

export default injectNavConfig(SideNav);
