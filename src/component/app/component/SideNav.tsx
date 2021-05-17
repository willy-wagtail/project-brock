import React, { FC } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import withNavConfig, { InjectedNavConfigProps } from "../hoc/withNavConfig";
import { NavItem, PageNotFoundItem } from "../model/NavConfig";

type SideNavProps = InjectedNavConfigProps;

const SideNav: FC<SideNavProps> = ({ navConfig }) => {
  return (
    <Nav className="flex-column">
      {navConfig
        .filter<NavItem>(
          (item: NavItem | PageNotFoundItem): item is NavItem =>
            item.url !== "/404"
        )
        .map((item) => (
          <LinkContainer to={item.url}>
            <Nav.Link>{item.text}</Nav.Link>
          </LinkContainer>
        ))}
    </Nav>
  );
};

export default withNavConfig(SideNav);
