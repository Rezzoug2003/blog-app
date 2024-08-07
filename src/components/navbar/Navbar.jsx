import Link from "next/link";
import Links from "./links/Links";
import style from "./navbar.module.css";
import { auth } from "@/lib/auth";
const Navbar = async () => {
  const session = await auth();

  return (
    <div className={style.container}>
      <Link href={"/"}>
        <div>logo</div>
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
