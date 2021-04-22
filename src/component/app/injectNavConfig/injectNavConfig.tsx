import React, { FC } from "react";

export type NavItem = {
  readonly url: string;
  readonly text: string;
};

export type NavConfig = NavItem[];

export type InjectedNavConfigProps = {
  navConfig: NavConfig;
};

const CONFIG: NavConfig = [
  {
    url: "/productA",
    text: "Product A",
  },
  {
    url: "/productB",
    text: "Product B",
  },
  {
    url: "/productC",
    text: "Product C",
  },
  {
    url: "/productD",
    text: "Product D",
  },
  {
    url: "/productE",
    text: "Product E",
  },
];

const injectNavConfig = <P extends object>(Component: FC<P & InjectedNavConfigProps>): FC<P> => (props: P) => {
  return <Component {...props} navConfig={CONFIG} />;
};

export default injectNavConfig;
