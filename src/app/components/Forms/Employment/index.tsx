"use client";
import ComboBox from "./ComboBox";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { postMutationForApplication } from "@/lib/mutations";
import { toast } from "@/hooks/use-toast";
import { ApplicationResponse } from "@/lib/api.types";

interface FormState {
  name: string;
  email: string;
  phone: string;
  position: string;
  about: string;
  _id: string;
}

const EmploymentForm = () => {
  const production = process.env.NODE_ENV === "production";

  const keys = production
    ? {
        serviceId: "service_9l8d7sf",
        templateId: "template_7aaaqxo",
        publicKey: "_FvnLE_owZ6NC5rlv",
      }
    : {
        serviceId: "portfolio_contact",
        templateId: "template_ksu85kb",
        publicKey: "p4TYc78A-HIpcGYZU",
      };

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    position: "",
    about: "",
    _id: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["postApplication"],
    mutationFn: postMutationForApplication,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    },
    onSuccess: async (result) => {
      toast({
        title: "Success",
        description: "Application submitted successfully",
      });
      await sendEmail(result);
    },
  });

  const positions = [
    { value: "Front of House", label: "Front of House" },
    { value: "Back of House", label: "Back of House" },
    { value: "Line Cook", label: "Line Cook" },
    { value: "Delivery", label: "Delivery" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    mutate(formState);
  };

  const sendEmail = async (result: ApplicationResponse) => {
    if (!result) return;
    const { name, email, phone, position, about, _id } = result;
    try {
      const emailResponse = await emailjs.send(
        keys.serviceId,
        keys.templateId,
        {
          name,
          email,
          phone,
          position,
          about,
          id: _id,
        },
        keys.publicKey
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
    } catch {
      toast({
        title: "Error",
        description: "Application failed to submit",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const renderSubmitText = () => {
    if (isPending) return "Submitting...";
    if (submitted) return "Submitted";
    return "Submit";
  };

  return (
    <>
      <motion.h2
        className="text-3xl text-secondary font-bold p-4 text-nowrap"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
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
          {renderSubmitText()}
        </Button>
      </form>
    </>
  );
};

export default EmploymentForm;
