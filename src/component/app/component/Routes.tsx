import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import injectNavConfig, {
  InjectedNavConfigProps,
} from "../hoc/injectNavConfig";

type RoutesProps = InjectedNavConfigProps;

const Routes: FC<RoutesProps> = ({ navConfig }) => {
  return (
    <Switch>
      {navConfig.map((item) => (
        <Route path={item.url}>
          <p>{item.text}</p>
        </Route>
      ))}

      <Redirect path="*" to="/404" />
    </Switch>
  );
};

export default injectNavConfig(Routes);
