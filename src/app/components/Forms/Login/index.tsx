import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import getErrorMessage from "@/lib/getErrorMessage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formState.username) {
        throw new Error("Username is required");
      }
      if (!formState.password) {
        throw new Error("Password is required");
      }
      const res = await signIn("credentials", {
        username: formState.username,
        password: formState.password,
        redirect: false,
      });
      if (!res) {
        throw new Error("Invalid credentials");
      }
      if (res.error) {
        throw new Error(res.error);
      }
      toast({
        title: "Success",
        description: `Welcome back, ${formState.username}`,
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleLoginFormSubmit}
      className="flex flex-col items-start justify-start h-fit gap-2 w-fit"
    >
      <label htmlFor="username">Username</label>
      <input
        name="username"
        type="text"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.username}
        onChange={(e) =>
          setFormState((state) => ({
            ...state,
            username: e.target.value,
          }))
        }
      />

      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        value={formState.password}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        onChange={(e) =>
          setFormState((state) => ({
            ...state,
            password: e.target.value,
          }))
        }
      />
      <Button
        type="submit"
        variant="outline"
        className="border-secondary hover:border-green-600 hover:text-green-600"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
