'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <span className="text-sm font-medium text-[#2D5BFF]">Contact Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Connect With Us. We're<br />
            Here for You
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Need IT support, repairs, or assistance? Contact Fixpro today—our expert team is ready to solve your tech challenges!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact details</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Explore our FAQ for quick answers. Need more help? Fill out the form below, and we'll assist you promptly.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#2D5BFF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Call / Email Us</h3>
                      <p className="text-gray-600 mb-2">Call: (123) 456-7890</p>
                      <p className="text-gray-600">Email: support@yourbusiness.com</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#2D5BFF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Hours of Operation:</h3>
                      <p className="text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Fill the contact form</h2>
              <p className="text-gray-600 mb-8">
                Have a detailed question or need a quote? Fill out the form below, and we'll reach out to you as soon as possible.
              </p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
                />
                <textarea
                  placeholder="Type your message here"
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#2D5BFF] hover:bg-[#2348CC] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Book A Call
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#0A0E27] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-[#2D5BFF]">Fixopro</div>
              <div>
                <h3 className="text-xl font-bold mb-1">Join our newsletter</h3>
                <p className="text-gray-400 text-sm">Subscribe now for exciting offers and news!</p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 md:w-80 px-4 py-3 bg-[#1a1f3a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] text-white placeholder-gray-500"
                />
                <button className="bg-[#2D5BFF] hover:bg-[#2348CC] text-white p-3 rounded-lg transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
