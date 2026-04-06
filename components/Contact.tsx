'use client';

import { useState } from 'react';

export default function ContactSectionSimple() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    consultation: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      consultation: '',
      message: ''
    });
    
    setTimeout(() => setSubmitted(false), 5000);
    setIsSubmitting(false);
  };

  return (
    <section className="bg-[#b8a999] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT SIDE */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                Connect with Us for <br />
                <span className="italic font-medium">Your Next Project</span>
              </h2>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                You can contact us through the form below, or give us a call
                during our office hours, Monday to Friday, from 9:00 AM to 7:00 PM.
                Let's work together to bring your ideas to life!
              </p>

              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Project"
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">
                    Essential Aspects <br />
                    <span className="italic font-light">Driving Our Success</span>
                  </h3>
                  <p className="text-sm mt-2">
                    Our success is driven by innovation, operational excellence,
                    and a strong commitment to our client
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="bg-gray-100 p-6 rounded-3xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white"
                  />

                  <select
                    name="consultation"
                    value={formData.consultation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-600"
                  >
                    <option value="">Select consultation type</option>
                    <option value="Security Assessment">Security Assessment</option>
                    <option value="Product Demo">Product Demo</option>
                    <option value="Quote Request">Quote Request</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Project Information"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0f1f1a] text-white py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}