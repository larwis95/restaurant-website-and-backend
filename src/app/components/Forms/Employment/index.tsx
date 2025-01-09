"use client";
import ComboBox from "./ComboBox";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const EmploymentForm = () => {
  const publicKey = "_FvnLE_owZ6NC5rlv";
  const serviceId = "service_9l8d7sf";
  const templateId = "template_7aaaqxo";

  const positions = [
    { value: "Front of House", label: "Front of House" },
    { value: "Back of House", label: "Back of House" },
    { value: "Line Cook", label: "Line Cook" },
    { value: "Delivery", label: "Delivery" },
  ];

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    about: "",
    id: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, position, about } = formState;

    if (!name || !email || !phone || !position || !about) {
      return toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
    }

    setIsPending(true);
    try {
      const updatedFormState = { ...formState, id: Date.now().toString() };
      const emailResponse = await emailjs.send(
        serviceId,
        templateId,
        updatedFormState,
        publicKey
      );

      if (emailResponse.status === 200) {
        setSubmitted(true);
        toast({
          title: "Success",
          description: "Application submitted successfully",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Application failed to submit",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <motion.h2
        className="text-3xl text-secondary font-bold p-4 text-nowrap"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 4 * 0.4,
        }}
      >
        Join Our Team
      </motion.h2>
      <form
        className="flex flex-col bg-slate-950 border items-center justify-start h-fit gap-4 xl:w-1/3 md:w-fit sm:w-fit p-4"
        onSubmit={handleSubmit}
      >
        {["name", "email", "phone"].map((field) => (
          <div
            key={field}
            className="flex flex-col items-start justify-start gap-2"
          >
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={
                field === "email" ? "email" : field === "phone" ? "tel" : "text"
              }
              className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600"
              placeholder={
                field === "phone" ? "123-456-7890" : `Enter your ${field}`
              }
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <ComboBox positions={positions} onChange={setFormState} />
        <label htmlFor="about">About</label>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <textarea
            name="about"
            className="overflow-y-hidden border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-full min-h-[200px]"
            placeholder="Tell us a bit about yourself, include any relevant experience or skills."
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="border-secondary hover:border-green-600 hover:text-green-600"
          disabled={isPending || submitted}
        >
          {isPending ? "Submitting..." : "Submit"}
          {submitted && "✔️"}
        </Button>
      </form>
    </>
  );
};

export default EmploymentForm;
