"use client";

import { useState, FormEvent } from "react";

/**
 * Custom hook for WhatsApp contact form functionality
 * Handles form submission and opens WhatsApp with pre-filled message
 */

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
}

export function useWhatsAppContact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, phone, message } = formData;

    // Get WhatsApp number from environment variable
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919082229363";

    // Construct WhatsApp message
    const whatsappMessage = `Hello! I'm ${firstName} ${lastName}\nPhone: ${phone}\nMessage: ${message}`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Optional: Reset form after submission
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   phone: "",
    //   message: "",
    // });
  };

  return {
    formData,
    handleInputChange,
    handleWhatsAppSubmit,
  };
}




