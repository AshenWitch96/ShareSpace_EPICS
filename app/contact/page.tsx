"use client";

import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Failed to send message. Please Login in first.");

      setSubmitted(true);
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>

        {submitted ? (
          <p className="text-green-500 text-center">
            Thank you! We&apos;ll get back to you soon. Please check your email inbox for updates and our response.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              placeholder="Your Message"
              className="w-full p-2 border rounded h-24"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#5f9ea0] text-white py-3 rounded-lg font-semibold transition hover:opacity-80 disabled:opacity-50"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}