import Link from "next/link";
import Nav from "../Nav";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

const Header: React.FC = () => {
  const { get } = headers();
  const ua = get("user-agent");
  const parser = ua ? new UAParser(ua) : null;
  const isMobile = parser ? parser.getDevice().type === "mobile" : false;

  return (
    <header className="fixed top-0 w-screen p-2 z-[9999]">
      <div
        className={`grid grid-flow-col ${isMobile === false ? "place-content-start" : "place-content-between"} place-items-center gap-x-2`}
      >
        <Link
          href="/"
          className={`z-10 font-extrabold text-xl hover:text-secondary hover:scale-105 transition-all`}
        >
          Big Joe&apos;s
        </Link>
        <Nav isMobile={isMobile} />
      </div>
    </header>
  );
};

export default Header;
