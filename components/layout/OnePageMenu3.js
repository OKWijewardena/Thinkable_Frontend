import Link from "next/link";

export default function Menu() {
  return (
    <ul className="main-menu__list">
      <li className="dropdown">
        <Link href="/">Home</Link>
        <ul>
          <li><Link href="/">Home One</Link></li>
          <li><Link href="/index-2">Home Two</Link></li>
          <li><Link href="/index-3">Home Three</Link></li>
          <li className="dropdown">
            <Link href="#">Header Styles</Link>
            <ul>
              <li><Link href="/">Header One</Link></li>
              <li><Link href="/index-2">Header Two</Link></li>
              <li><Link href="/index-3">Header Three</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link href="#">One Page Styles</Link>
            <ul>
              <li><Link href="/one-page-style-one">One Page Styles One</Link></li>
              <li><Link href="/one-page-style-two">One Page Styles Two</Link></li>
              <li><Link href="/one-page-style-three">One Page Styles Three</Link></li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="scrollToLink">
          <Link href="#services">Services</Link>
      </li>
      <li className="scrollToLink">
          <Link href="#event">Event</Link>
      </li>
      <li className="scrollToLink">
          <Link href="#team">Team</Link>
      </li>
      <li className="scrollToLink">
          <Link href="#pricing">Pricing</Link>
      </li>
      <li className="scrollToLink">
          <Link href="#blog">Blog</Link>
      </li>
     
    </ul>
  );
}
