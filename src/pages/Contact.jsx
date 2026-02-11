import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!subject.trim()) return toast.error("Subject is required");
    if (!message.trim()) return toast.error("Message is required");

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/messages`,
        { name, email, subject, message }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Message sent successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(res.data.message || "Failed to send message");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-20 px-6 flex justify-center items-start">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-gray-700 mb-6">
            Have questions or need support? Fill out the form and our team will get back to you as soon as possible.
          </p>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-gray-900">Contact Info</h2>
          <p className="text-gray-700 text-lg">
            You can also reach us directly using the following contact information:
          </p>

          <div className="flex flex-col gap-4">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-gray-900 text-xl">Email</h3>
              <p className="text-gray-700">support@e-computer.com</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-gray-900 text-xl">Phone</h3>
              <p className="text-gray-700">+94 77 123 4567</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-gray-900 text-xl">Address</h3>
              <p className="text-gray-700">123 Digital Street, Colombo, Sri Lanka</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-gray-900 text-xl">Working Hours</h3>
              <p className="text-gray-700">Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
