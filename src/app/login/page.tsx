"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/Forms/Login";
import Section from "../components/Section";

const Login: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);
  return (
    <div className="w-full h-fit flex flex-col items-center pt-24 p-4 overflow-x-hidden">
      <Section className="flex flex-col w-fit p-6 border border-border rounded-sm h-fit bg-slate-900">
        <LoginForm />
      </Section>
    </div>
  );
};

export default Login;
