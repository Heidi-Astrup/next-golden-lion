"use client";

import Link from "next/link";
import { use, useState } from "react";
import Overlay from "./Overlay";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbtns">
      <NavLink
        className={({ isActive }) =>
          isActive ? "navcircle active" : "navcircle"
        }
        to="/"
      ></NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navcircle active" : "navcircle"
        }
        to="/kalender"
      ></NavLink>
      <button className="navcircle" onClick={toggleOverlay}></button>

      <Overlay isOpen={isOpen} onClose={toggleOverlay} />
    </nav>
  );
}
