import navbarLinks, {NavbarLinkProps} from "../mock-data/navbar";
import NavbarLink from "./NavbarLink";

function Navbar() {
  const navLinks: NavbarLinkProps[] = navbarLinks;
  return (
    <header className="fixed left-0 z-[105] top-0 w-full bg-tertiary mx-auto py-8 font-semibold tracking-wider text-primary md:border-b border-b-secondary">
      <nav className="flex justify-between items-center mx-auto w-[85%]">
        {/* <h1 className="text-3xl">
          <Link to={navBarContent.heading.href}>
            {navBarContent.heading.title}
          </Link>
        </h1> */}

        <ul className="hidden md:flex items-center justify-center gap-12 text-lg">
          {navLinks?.map(({title, href}) => (
            <NavbarLink href={href} key={href} title={title} />
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
