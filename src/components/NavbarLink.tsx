import {Link} from "react-router-dom";

interface NavbarLinkProps {
  href: string;
  title: string;
  onClick?: () => void;
}

function NavbarLink({href, title, onClick}: NavbarLinkProps) {
  return (
    <li
      key={href}
      onClick={onClick}
      className=" dark:hover:text-tertiary hover:text-quaternary transition-colors dark:text-secondary text-primary max-md:hover:text-tertiary max-md:text-secondary  pb-1 h-8 font-medium  "
    >
      <Link to={href} className="">
        {title}
      </Link>
    </li>
  );
}

export default NavbarLink;
