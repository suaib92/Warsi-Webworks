"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const simpleContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please provide more details about your project"),
});

type SimpleContactFormValues = z.infer<typeof simpleContactSchema>;

export default function SimpleContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimpleContactFormValues>({
    resolver: zodResolver(simpleContactSchema),
  });

  const onSubmit = async (data: SimpleContactFormValues) => {
    setIsSubmitting(true);
    setIsError(false);
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      const response = await fetch("https://getform.io/f/d579fca6-d64a-410b-a822-2499be89c786", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-border-subtle rounded-[12px] p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent</h3>
        <p className="text-text-body">
          Thanks for reaching out! We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border-subtle rounded-[12px] p-8">
      <h3 className="text-xl font-bold text-text-primary mb-6">Send a Message</h3>
      
      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-[8px] flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm">Something went wrong. Please try again.</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="name">Name</label>
          <input 
            {...register("name")} 
            id="name" 
            className={`w-full bg-surface border ${errors.name ? 'border-red-500' : 'border-border-subtle'} rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent`} 
            placeholder="Your name" 
          />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="email">Email</label>
          <input 
            {...register("email")} 
            id="email" 
            className={`w-full bg-surface border ${errors.email ? 'border-red-500' : 'border-border-subtle'} rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent`} 
            placeholder="your@email.com" 
          />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="message">Message</label>
          <textarea 
            {...register("message")} 
            id="message" 
            rows={4} 
            className={`w-full bg-surface border ${errors.message ? 'border-red-500' : 'border-border-subtle'} rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent resize-none`} 
            placeholder="Tell us about your project..."
          />
          {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-[8px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <Send className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
}
