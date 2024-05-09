export interface NavbarLinkProps {
    title: string;
    href: string;
  }
  
  const navbarLinks: NavbarLinkProps[] = [
    { title: "Home", href: "/dashboard" },
    { title: "Shop", href: "/shop" },
  ];
  
  export default navbarLinks;
  