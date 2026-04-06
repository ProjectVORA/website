'use client';

import { solutionsData } from "@/lib/solutionsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { Contact } from "lucide-react";
import ContactSection from "@/components/Contact";

type Props = {
  params: { slug: string };
};

export default function SolutionDetailPage({ params }: Props) {
  const solution = solutionsData.find(
    (item) => item.slug === params.slug
  );

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!solution) return notFound();

  // Icons for features
  const featureIcons = [
    "🔒", "📹", "🚪", "🔔", "📱", "💾", "🌐", "⚡", "🎯", "🛡️"
  ];

  return (
    <div className="bg-gray-50">
      <Header />

      {/* HERO - Fixed overlapping issue */}
      <section className="relative h-[400px] md:h-[450px] w-full">
        <div className="relative w-full h-full">
          <Image
            src={solution.image}
            alt={solution.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/solutions" className="hover:text-white">Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{solution.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {solution.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base md:text-lg text-gray-200">
            {solution.tagline}
          </p>
        </div>
      </section>

      {/* INTRO SECTION - Fixed missing image */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src={solution.image}
            alt={solution.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* FEATURES ICON ROW - Fixed mapping (was using necessities incorrectly) */}
      {solution.highlights && (
        <section className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Key Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {solution.highlights.map((highlight, i) => (
              <div key={i} className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-2xl">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <p className="text-sm text-gray-700 font-medium text-center">{highlight}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NECESSITIES SECTION - Fixed mapping */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-4">
            Necessities
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Essential security components for your {solution.title} facility
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {solution.necessities.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
              
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERINGS SECTION - Fixed image sizing */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
          Our Offerings
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Advanced security products tailored for your needs
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {solution.offerings.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-32 w-full  mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain rounded-xl group-hover:scale-110 transition duration-300"
                />
              </div>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA - Fixed form functionality */}
      <ContactSection />
      <Footer />
    </div>
  );
}