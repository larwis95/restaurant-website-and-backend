import Link from "next/link";
import Nav from "../Nav";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/auth";

const Header: React.FC = async () => {
  const { get } = headers();
  const ua = get("user-agent");
  const parser = ua ? new UAParser(ua) : null;
  const isMobile = parser ? parser.getDevice().type === "mobile" : false;
  const status = await getServerSession(authOptions);
  console.log(status);

  return (
    <header className="sticky top-0 w-screen p-2 z-[9999] bg-background">
      <div
        className={`flex justify-between items-center w-full max-w-7xl mx-auto`}
      >
        <Link
          href="/"
          className={`z-10 font-extrabold text-3xl hover:text-secondary hover:scale-105 transition-all`}
        >
          Big Joe&apos;s
        </Link>
        <Nav isMobile={isMobile} status={status} />
      </div>
    </header>
  );
};

export default Header;
