"use client";
import { useState } from "react";
import style from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
const links = [
  {
    title: "HomePage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];
function Links({ session }) {
  const [open, setopen] = useState(false);
  console.log(session?.user?.admin);
  const admin = true;
  return (
    <div className={style.container}>
      <div className={style.links}>
        {links.map((link) => {
          return <NavLink item={link} key={link.path} />;
        })}
        {session?.user ? (
          <>
            {session?.user?.isAdmin && (
              <NavLink item={{ title: "admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button type="submit" className={style.logout}>
                logout
              </button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "login", path: "/login" }} />
        )}
      </div>
      <Image
        className={style.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setopen(!open)}
      />
      {open && (
        <div className={style.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Links;
