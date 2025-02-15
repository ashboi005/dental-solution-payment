"use client";

import { useState } from "react";

export default function ContactPage() {
  const backendUrl = "https://dentalsolutionsasr.pythonanywhere.com";
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const data = {
      name: formName,
      phone: formPhone,
      email: formEmail,
      address: formAddress,
    };

    try {
      const response = await fetch(`${backendUrl}/contact-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormName("");
        setFormPhone("");
        setFormEmail("");
        setFormAddress("");
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error submitting form. Please check your internet connection.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
            
            <input
              type="tel"
              placeholder="Phone Number"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
            
            <input
              type="email"
              placeholder="Email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
            
            <input
              type="text"
              placeholder="Address"
              value={formAddress}
              onChange={(e) => setFormAddress(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-white text-black p-4 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <div className="pt-4">
            <p className="text-lg">
              For immediate assistance, please use the contact information below:
            </p>
            <div className="mt-4 space-y-2">
              <p>📞 +91 9501028793 </p>
              <p>📧 dentalsolutionsamritsar@gmail.com</p>
              <p>🏢 Dental Solutions, GT Road, Putlighar, Putligarh, Amritsar - 143002 (Near Parkash Hospital, Guru Arjun Dev Nagar) </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}