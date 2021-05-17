import React, { FC } from "react";
import { NavConfig, NAV_CONFIG } from "../model/NavConfig";

export type InjectedNavConfigProps = {
  navConfig: NavConfig;
};

const withNavConfig = <P extends object>(
  Component: FC<P & InjectedNavConfigProps>
): FC<P> => (props: P) => {
  return <Component {...props} navConfig={NAV_CONFIG} />;
};

export default withNavConfig;
