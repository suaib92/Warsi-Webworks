"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  subject: z.string(),
  budget: z.string(),
  message: z.string().min(10, "Please provide more details about your project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "Startup / SaaS",
      budget: "$1k - $5k",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
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

  return (
    <section className="bg-surface py-32 border-t border-border-section relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Contact Details */}
          <div className="flex flex-col justify-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-text-muted font-semibold tracking-[0.08em] uppercase text-[11px] mb-4"
            >
              Start A Project
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter mb-12"
            >
              Let's engineer <br /> your next unfair advantage.
            </motion.h2>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-card border border-border-subtle rounded-[12px] flex items-center justify-center group-hover:bg-card-hover group-hover:border-accent-light transition-all">
                  <Phone className="w-6 h-6 text-accent-light" />
                </div>
                <div>
                  <p className="text-text-muted text-[11px] uppercase tracking-[0.08em] mb-1 font-semibold">WhatsApp / Phone</p>
                  <a href="tel:7078719621" className="text-2xl font-bold text-text-primary group-hover:text-accent-light transition-colors">
                    +91 7078719621
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-card border border-border-subtle rounded-[12px] flex items-center justify-center group-hover:bg-card-hover group-hover:border-accent-light transition-all">
                  <MapPin className="w-6 h-6 text-accent-light" />
                </div>
                <div>
                  <p className="text-text-muted text-[11px] uppercase tracking-[0.08em] mb-1 font-semibold">HQ Location</p>
                  <p className="text-xl font-bold text-text-primary group-hover:text-accent-light transition-colors">
                    Moradabad, UP, India
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Premium Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border-subtle rounded-[12px] p-8 md:p-12 relative"
            suppressHydrationWarning
          >
            {isSuccess ? (
              <div className="absolute inset-0 bg-card rounded-[12px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-text-primary mb-4">Request Received</h3>
                <p className="text-text-body text-lg max-w-sm">
                  Thank you for reaching out. Our engineering team will review your requirements and contact you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                suppressHydrationWarning
              >
                {isError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-[8px] flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">Something went wrong. Please try again or email us directly.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
                  <div className="flex flex-col gap-2" suppressHydrationWarning>
                    <label className="text-[13px] font-medium text-text-muted">Full Name *</label>
                    <input {...register("name")} className={`bg-base border ${errors.name ? 'border-red-500' : 'border-border-subtle'} rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent-light transition-colors`} placeholder="John Doe" />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2" suppressHydrationWarning>
                    <label className="text-[13px] font-medium text-text-muted">Email Address *</label>
                    <input {...register("email")} className={`bg-base border ${errors.email ? 'border-red-500' : 'border-border-subtle'} rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent-light transition-colors`} placeholder="john@company.com" />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2" suppressHydrationWarning>
                  <label className="text-[13px] font-medium text-text-muted">Phone Number</label>
                  <input {...register("phoneNumber")} type="tel" inputMode="numeric" className="bg-base border border-border-subtle rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent-light transition-colors" placeholder="Your phone number" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
                  <div className="flex flex-col gap-2" suppressHydrationWarning>
                    <label className="text-[13px] font-medium text-text-muted">Business Type</label>
                    <select {...register("subject")} className="bg-base border border-border-subtle rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent-light transition-colors appearance-none">
                      <option value="Startup / SaaS">Startup / SaaS</option>
                      <option value="Ecommerce">Ecommerce</option>
                      <option value="Local Business">Local Business</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2" suppressHydrationWarning>
                    <label className="text-[13px] font-medium text-text-muted">Project Budget</label>
                    <select {...register("budget")} className="bg-base border border-border-subtle rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent-light transition-colors appearance-none">
                      <option value="$1k - $5k">$1k - $5k</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value="$10k - $25k">$10k - $25k</option>
                      <option value="$25k - $50k">$25k - $50k</option>
                      <option value="$50k+">$50k+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2" suppressHydrationWarning>
                  <label className="text-[13px] font-medium text-text-muted">Primary Goals & Timeline *</label>
                  <textarea {...register("message")} rows={4} className={`bg-base border ${errors.message ? 'border-red-500' : 'border-border-subtle'} rounded-[8px] px-4 py-3 text-text-primary focus:outline-none focus:border-accent-light transition-colors resize-none`} placeholder="Tell us what you're building and when you need it live..." />
                  {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 bg-accent hover:bg-accent-hover text-white font-bold text-[15px] py-4 rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 group border-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
