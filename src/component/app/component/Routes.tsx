import React, { createElement, FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import withNavConfig, { InjectedNavConfigProps } from "../hoc/withNavConfig";
import { NavItem, PageNotFoundItem } from "../model/NavConfig";

type RoutesProps = InjectedNavConfigProps;

const Routes: FC<RoutesProps> = ({ navConfig }) => {
  return (
    <Switch>
      {navConfig.map((item) => (
        <Route path={item.url}>{createElement(item.component)}</Route>
      ))}

      <Redirect path="*" to="/404" />
    </Switch>
  );
};

export default withNavConfig(Routes);
