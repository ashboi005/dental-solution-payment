"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";

const backendUrl = "http://localhost:8000";

const courseModules = [
  {
    title: "Introduction to Basal Implantology",
    description:
      "Understand the fundamental concepts, benefits, and applications of basal implants in modern dentistry.",
  },
  {
    title: "Anatomy & Physiology of the Basal Bone",
    description:
      "Explore the unique structure and biomechanical properties of the basal bone essential for implant stability.",
  },
  {
    title: "Patient Assessment & Case Selection",
    description:
      "Learn how to identify suitable candidates and develop personalized treatment plans for long-term success.",
  },
  {
    title: "Surgical Techniques & Protocols",
    description:
      "Master precision techniques for basal implant placement, ensuring optimal outcomes with minimal invasiveness.",
  },
  {
    title: "Immediate Loading & Prosthetic Rehabilitation",
    description:
      "Discover the science behind immediate loading and how to design durable, functional prosthetics.",
  },
  {
    title: "Postoperative Care & Complication Management",
    description:
      "Develop a deep understanding of postoperative care strategies and learn how to handle potential complications effectively.",
  },
];

const courseImages = [
  { src: "/images/course1.png", alt: "Basal Implant Before and After" },
  { src: "/images/course2.webp", alt: "Patient X-Ray" },
  { src: "/images/course3.webp", alt: "Various Types of Basal Implants" },
];

export default function Home() {
  // State to control the offer modal (shown on initial load)
  const targetDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const [showOfferModal, setShowOfferModal] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    const data = { name: formName, phone: formPhone, email: formEmail };

    try {
      const response = await fetch(`${backendUrl}/submit_form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormName("");
        setFormPhone("");
        setFormEmail("");
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error submitting form. Please check your internet connection.");
      console.error("Submission error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 relative">
      {/* Offer Modal Popup (shown on page load) */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-blue-700 p-8 rounded-lg relative text-center max-w-md w-full mx-4">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-2 right-2 text-white font-bold text-xl"
              aria-label="Close Special Offer"
            >
              ×
            </button>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold md:text-4xl"
            >
              Special Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-lg font-semibold md:text-xl"
            >
              Boost your <span className="text-green-500">income</span> and expand your expertise for just
            </motion.p>
            <div className="mb-4">
              {/* Original Price with strikethrough */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-red-500 line-through md:text-2xl"
              >
                ₹1999
              </motion.div>
              {/* Discounted Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl font-bold text-yellow-400 md:text-5xl"
              >
                ₹999
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Button with flowing border */}
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-xy rounded-md opacity-75 group-hover:opacity-100 transition-all duration-500" />
                <Button
                  onClick={() => {
                    setShowOfferModal(false);
                    setShowFormModal(true);
                  }}
                  size="lg"
                  variant="cyber"
                  className="relative text-lg px-8 py-2"
                >
                  Enroll Now
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-4 text-lg text-white"
            >
              Offer valid for <CountdownTimer targetDate={targetDate} />
            </motion.div>
          </div>
        </div>
      )}

      {/* Form Modal Popup */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg relative text-center max-w-md w-full mx-4">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-black font-bold text-xl"
              aria-label="Close Form"
            >
              ×
            </button>
            <h2 className="mb-4 text-2xl text-black font-bold">Enter Your Details</h2>
            {formSubmitted ? (
              <p className="text-green-600">Thank you! We'll contact you shortly.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <input
                  type="text"
                  placeholder="Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <Button type="submit" size="lg" variant="cyber" className="w-full">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- Rest of your page content --- */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-bold leading-tight md:text-6xl"
          >
            Master the Art of{" "}
            <span className="font-extrabold text-yellow-400">Basal Implants</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-xl md:text-2xl"
          >
            Designed to teach you everything you need to know about basal implants
          </motion.p>
        </div>
      </section>

      {/* Special Offer Section (remains unchanged) */}
      <section className="bg-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            Special Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-2xl font-semibold md:text-3xl"
          >
            Boost your <span className="text-green-500">income</span> and expand your expertise for just
          </motion.p>
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl text-red-500 line-through md:text-3xl"
            >
              ₹1999
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-6xl font-bold text-yellow-400 md:text-7xl"
            >
              ₹999
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-xy rounded-md opacity-75 group-hover:opacity-100 transition-all duration-500" />
              <Button
                onClick={() => setShowFormModal(true)}
                size="lg"
                variant="cyber"
                className="relative text-lg px-8 py-2"
              >
                Enroll Now
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-lg text-white"
          >
            Offer valid for <CountdownTimer targetDate={targetDate} />
          </motion.div>
        </div>
      </section>

      {/* Course Details */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
            What You'll Learn
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courseModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group rounded-lg p-1 bg-gradient-to-r from-yellow-500 via--500 to-red-500 animate-gradient-xy"
              >
                <div className="rounded-lg md:h-[20vh] bg-gray-700 hover:bg-blue-800 p-4 shadow-lg transition-all duration-300">
                  <h3 className="mb-2 text-xl font-semibold text-blue-400">
                    {module.title}
                  </h3>
                  <p>{module.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Photos */}
      <section className="py-16 md:px-0 px-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courseImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="bg-yellow-400 py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-extrabold md:text-5xl text-black"
          >
            Ready to Transform Your Career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-xl md:text-2xl text-black"
          >
            Join hundreds of successful dentists who expanded their expertise with this masterclass.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-xy rounded-md opacity-75 group-hover:opacity-100 transition-all duration-500" />
              <Button
                onClick={() => setShowFormModal(true)}
                size="lg"
                variant="glow"
                className="relative text-lg px-8 py-2"
              >
                Pay Now - Start Learning
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Constant Bottom Bar */}
      <div
        onClick={() => setShowFormModal(true)}
        className="fixed bottom-0 left-0 right-0 bg-white py-4 text-center z-50 cursor-pointer"
      >
        <span className="text-black font-bold uppercase tracking-wide">
          LIMITED OFFER ONLY: ENROLL FOR THE MASTERCLASS FOR 999 ONLY
        </span>
      </div>

      {/* Global Styles for the Gradient Animation */}
      <style jsx global>{`
        @keyframes gradient-xy {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 5s ease infinite;
        }
      `}</style>
    </main>
  );
}
