import { useCallback } from "react";

/**
 * useWhatsApp Hook
 * Handles WhatsApp contact form submission
 * Converts initWhatsAppContact() from new_index.html (lines 417-430)
 * 
 * @param phoneNumber - WhatsApp phone number (default: 919082229363)
 * @returns {object} WhatsApp helper functions
 */
export function useWhatsApp(phoneNumber: string = "919082229363") {
  /**
   * Send message via WhatsApp
   */
  const sendMessage = useCallback(
    (data: { name: string; email: string; message: string }) => {
      const whatsappMessage = `Hello! I'm ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
    },
    [phoneNumber]
  );

  /**
   * Send message from form data
   */
  const sendFromForm = useCallback(
    (formData: FormData) => {
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;

      sendMessage({
        name: `${firstName} ${lastName}`.trim(),
        email,
        message,
      });
    },
    [sendMessage]
  );

  return {
    sendMessage,
    sendFromForm,
  };
}







