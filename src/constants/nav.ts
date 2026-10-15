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

export const FOOTER_LINKS: readonly NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];
