"use client";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
    subMenuKey: "",
  });

  const handleToggle = (key, subMenuKey = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({
        status: false,
        key: "",
        subMenuKey: "",
      });
    } else {
      setIsActive({
        status: true,
        key,
        subMenuKey,
      });
    }
  };
  return (
    <>
      {/*End Mobile Menu */}
      <div className="mobile-nav__wrapper">
        <div
          className="mobile-nav__overlay mobile-nav__toggler"
          onClick={handleMobileMenu}
        />
        {/* /.mobile-nav__overlay */}
        <div className="mobile-nav__content">
          <span
            className="mobile-nav__close mobile-nav__toggler"
            onClick={handleMobileMenu}
          >
            <i className="fa fa-times" />
          </span>
          <div className="logo-box">
            <Link href="/" aria-label="logo image">
            <img src="/assets/images/resources/logo-1.png" width="150" alt="Logo" />
            </Link>
          </div>
          {/* /.logo-box */}
          <div className="mobile-nav__container">
          <ul className="main-menu__list">
  <li className={isActive.key == 1 ? "dropdown current" : "dropdown"}>
    <Link href="/index-2" onClick={handleMobileMenu}>
      Home{" "}
    </Link>
  </li>

  <li className={isActive.key == 2 ? "dropdown current" : "dropdown"}>
    <Link href="/event" onClick={handleMobileMenu}>
      Browser Events
    </Link>
  </li>

  <li className={isActive.key == 3 ? "dropdown current" : "dropdown"}>
    <Link href="/host" onClick={handleMobileMenu}>
      Host Events
    </Link>
  </li>

  <li className={isActive.key == 4 ? "dropdown current" : "dropdown"}>
    <Link href="/subscription" onClick={handleMobileMenu}>
      Subscription
    </Link>
  </li>

  <li>
    <Link href="/contact" onClick={handleMobileMenu}>
      Contact
    </Link>
  </li>

  <li className={isActive.key == 5 ? "dropdown current" : "dropdown"}>
    <Link href="/profile" onClick={handleMobileMenu}>
      Profile
    </Link>
  </li>
  
</ul>
          </div>
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope" />
              <a href="mailto:needhelp@packageName__.com">
                needhelp@eventflow.com
              </a>
            </li>
            <li>
              <i className="fa fa-phone-alt" />
              <a href="tel:666-888-0000">666 888 0000</a>
            </li>
          </ul>
          {/* /.mobile-nav__contact */}
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <a href="#" className="fab fa-twitter" />
              <a href="#" className="fab fa-facebook-square" />
              <a href="#" className="fab fa-pinterest-p" />
              <a href="#" className="fab fa-instagram" />
            </div>
            {/* /.mobile-nav__social */}
          </div>
          {/* /.mobile-nav__top */}
        </div>
        {/* /.mobile-nav__content */}
      </div>

      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
};
export default MobileMenu;
