export interface NavItem {
  label: string;
  href: string;
}

export const NAV: readonly NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Price List", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Visit", href: "/#visit" },
];
