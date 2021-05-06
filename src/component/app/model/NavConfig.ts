export type NavItem = {
  readonly url: string;
  readonly text: string;
};

export type NavConfig = NavItem[];

export const NAV_CONFIG: NavConfig = [
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
