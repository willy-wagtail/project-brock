import { Component, FC } from "react";
import Placeholder from "../component/Placeholder";

export type NavItem = {
  readonly url: Exclude<string, "/404">;
  readonly text: string;
  readonly component: FC;
};

export type PageNotFoundItem = {
  readonly url: "/404";
  readonly component: FC;
};

export type NavConfig = (NavItem | PageNotFoundItem)[];

export const NAV_CONFIG: NavConfig = [
  {
    url: "/productA",
    text: "Product A",
    component: Placeholder,
  },
  {
    url: "/productB",
    text: "Product B",
    component: Placeholder,
  },
  {
    url: "/productC",
    text: "Product C",
    component: Placeholder,
  },
  {
    url: "/productD",
    text: "Product D",
    component: Placeholder,
  },
  {
    url: "/productE",
    text: "Product E",
    component: Placeholder,
  },
  {
    url: "/404",
    component: Placeholder,
  },
];
