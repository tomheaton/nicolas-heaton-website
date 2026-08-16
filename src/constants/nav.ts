export interface NavItem {
  label: string;
  href: string;
}

export const NAV: readonly NavItem[] = [
  { label: "The Studio", href: "#studio" },
  { label: "Price List", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];
