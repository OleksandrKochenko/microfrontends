export interface NavLink {
  name: string;
  href: string;
}

export const links: NavLink[] = [
  {
    name: "Requisitions",
    href: "/requisitions",
  },
  {
    name: "Vendors",
    href: "/vendors",
  },
];