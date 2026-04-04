'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, ChevronLeft, ChevronRight, ChevronDown, Send } from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const stats = [
    { value: '12+', label: 'Years of Experience' },
    { value: '95k+', label: 'Satisfied Clients' },
    { value: '99%', label: 'Customer Satisfaction' }
  ];

  const features = [
    {
      title: 'Certified Expertise',
      description: 'Our team consists of certified IT professionals with years of hands-on experience in computer repair and technical support.'
    },
    {
      title: 'Instant Support & Live Chat',
      description: 'Get real-time assistance through our 24/7 live chat support. We are always ready to help you with any IT challenges.'
    },
    {
      title: 'Security & Virus Protection',
      description: 'Comprehensive security solutions to protect your systems from malware, viruses, and other cyber threats.'
    }
  ];

  const testimonials = [
    {
      text: 'I couldn\'t believe how quickly FixoPro resolved my laptop issues! Their team was professional, knowledgeable, and incredibly efficient. My device is running better than ever. Highly recommend their services!',
      author: 'Dan Martinez',
      role: 'CEO, TechCorp'
    },
    {
      text: 'Outstanding service from start to finish. The technicians were courteous, professional, and fixed my computer in no time. Excellent value for money!',
      author: 'Monica Lee',
      role: 'Marketing Director'
    }
  ];

  const team = [
    {
      name: 'Mark Williams',
      role: 'Head of Service',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Alan Martinez',
      role: 'Senior technician',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Samuel Jackson',
      role: 'Computer technician',
      image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Elizabeth Smith',
      role: 'Customer Service',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const faqs = [
    {
      question: 'What services does FixoPro offer?',
      answer: 'FixoPro provides comprehensive IT solutions, including computer repair, virus removal, data recovery, hardware upgrades, network setup, and more tailored to your needs.'
    },
    {
      question: 'How quickly can FixoPro repair my device?',
      answer: 'Most repairs are completed within 24-48 hours. Complex issues may take longer, but we always provide an estimated timeline upfront.'
    },
    {
      question: 'Can FixoPro help with data recovery?',
      answer: 'Yes, we specialize in data recovery from damaged, corrupted, or failed storage devices with high success rates.'
    },
    {
      question: 'Does FixoPro offer any warranty on repairs?',
      answer: 'Yes, all our repairs come with a warranty. The duration depends on the type of service provided.'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Turning Visions into Reality Founded on a<br />
              Commitment to Excellence
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team working"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Reliable IT support,<br />
                seamless solutions.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At FixoPro, we're dedicated to delivering exceptional IT support and repair services. With a focus on reliability, efficiency, and customer satisfaction, we help businesses and individuals stay connected and productive.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Digital age goes beyond service excellence—it's about building lasting relationships. Our experienced team works diligently to provide practical, efficient, and supportive tech solutions tailored to each client's needs, ensuring technology enhances, not hinders.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#2D5BFF] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-[#2D5BFF]">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            Reliable IT support, seamless solutions.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7991490/pexels-photo-7991490.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Mission"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div>
              <div className="inline-block mb-4">
                <span className="text-sm font-medium text-[#2D5BFF]">About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At FixoPro, our mission is to make technology accessible and reliable for everyone. We strive to provide top-tier computer repair services, expert IT support, and personalized solutions that empower our clients to achieve their goals without technical limitations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We're committed to transparency, integrity, and exceptional customer service. By leveraging cutting-edge tools and proven techniques, we ensure every device performs at its best while keeping data secure and systems running smoothly.
              </p>
              <button className="bg-[#2D5BFF] hover:bg-[#2348CC] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                About FixoPro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Customer Stories</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {testimonials[currentTestimonial].text}
              </p>
              <div>
                <p className="font-bold text-gray-900">{testimonials[currentTestimonial].author}</p>
                <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet our expert team</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 overflow-hidden rounded-lg aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Contact"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Fill the contact form</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
              />
              <textarea
                placeholder="Type your message here"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent resize-none"
              />
              <button
                type="submit"
                className="bg-[#2D5BFF] hover:bg-[#2348CC] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Book A Call
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-[#2D5BFF]">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Have Questions? We're Here to Help!
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
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
