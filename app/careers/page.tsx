// app/careers/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, MapPin, Briefcase, Clock, GraduationCap, Users, Award, DollarSign } from 'lucide-react';

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "Senior Security Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "San Francisco, CA",
      experience: "5+ years",
      icon: <Briefcase className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "Cybersecurity Analyst",
      department: "Security Operations",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      icon: <Users className="w-5 h-5" />,
      color: "green"
    },
    {
      title: "Frontend Developer",
      department: "Product Development",
      type: "Full-time",
      location: "New York, NY",
      experience: "4+ years",
      icon: <Award className="w-5 h-5" />,
      color: "purple"
    },
    {
      title: "Sales Executive",
      department: "Business Development",
      type: "Full-time",
      location: "Chicago, IL",
      experience: "3+ years",
      icon: <DollarSign className="w-5 h-5" />,
      color: "orange"
    },
    {
      title: "Technical Support Specialist",
      department: "Customer Success",
      type: "Full-time",
      location: "Remote",
      experience: "2+ years",
      icon: <Users className="w-5 h-5" />,
      color: "teal"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      type: "Contract",
      location: "Austin, TX",
      experience: "4+ years",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "indigo"
    }
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description: "Industry-leading compensation packages",
      icon: <DollarSign className="w-8 h-8" />,
      color: "text-green-600"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision",
      icon: "❤️",
      color: "text-red-600"
    },
    {
      title: "Remote Friendly",
      description: "Flexible work-from-home options",
      icon: "🏠",
      color: "text-blue-600"
    },
    {
      title: "Learning & Growth",
      description: "Professional development budget",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "text-purple-600"
    },
    {
      title: "Team Culture",
      description: "Collaborative and inclusive environment",
      icon: <Users className="w-8 h-8" />,
      color: "text-amber-600"
    },
    {
      title: "Work-Life Balance",
      description: "Generous PTO and flexible hours",
      icon: <Clock className="w-8 h-8" />,
      color: "text-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Same design as Solutions page */}
      <section className="relative bg-gray-900 text-white">
        {/* Background Image - Right-aligned */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
            alt="Careers at TechSolutions"
            className="w-full h-full object-cover object-right"
          />
          {/* Gradient Overlay - Dark on left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 via-50% to-gray-900/20" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[400px] flex items-center">
          <div className="max-w-xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-sm text-gray-300 mb-6">
              <Link 
                href="/" 
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-white font-medium">Careers</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Careers
            </h1>

            {/* Descriptive Text */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Join our team of innovators and help build the future of security technology. 
              We're looking for passionate individuals to grow with us.
            </p>

            {/* Optional CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#openings" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                View Open Positions
              </Link>
              <Link 
                href="#benefits" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                See Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Join Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We foster a culture of innovation, collaboration, and continuous growth. 
              Join our team to work on cutting-edge technology while developing your skills 
              in a supportive and dynamic environment.
            </p>
          </div>

          {/* Benefits Card Row - 5 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {/* Card 1: Highly Competitive Compensation */}
            <div className="bg-amber-50 rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Highly Competitive Compensation
              </h3>
            </div>

            {/* Card 2: Supersonic Growth */}
            <div className="bg-amber-50 rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Supersonic Growth
              </h3>
            </div>

            {/* Card 3: Annual Appraisals */}
            <div className="bg-amber-50 rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Annual Appraisals
              </h3>
            </div>

            {/* Card 4: Fun, Dynamic Environment */}
            <div className="bg-amber-50 rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Fun, Dynamic Environment
              </h3>
            </div>

            {/* Card 5: Best Incentive Structure */}
            <div className="bg-amber-50 rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Best Incentive Structure
              </h3>
            </div>
          </div>

          {/* Secondary Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Working@Secureye
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We prioritize growth, well-being, and success for every team member, 
              creating a workplace where everyone can thrive.
            </p>
          </div>

          {/* Image Gallery Row - 3 equal images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Team Collaboration"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Workplace Culture"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                alt="Team Events"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings Section - MOVED to be immediately below image gallery */}
      <section id="openings" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore opportunities to join our growing team. We're always looking for talented individuals.
            </p>
          </div>

          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.02] hover:bg-blue-50 transition-all duration-300 ease-out group cursor-pointer p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        job.color === 'blue' ? 'bg-blue-50' :
                        job.color === 'green' ? 'bg-green-50' :
                        job.color === 'purple' ? 'bg-purple-50' :
                        job.color === 'orange' ? 'bg-orange-50' :
                        job.color === 'teal' ? 'bg-teal-50' :
                        job.color === 'indigo' ? 'bg-indigo-50' : 'bg-gray-50'
                      }`}>
                        <div className={`${
                          job.color === 'blue' ? 'text-blue-600' :
                          job.color === 'green' ? 'text-green-600' :
                          job.color === 'purple' ? 'text-purple-600' :
                          job.color === 'orange' ? 'text-orange-600' :
                          job.color === 'teal' ? 'text-teal-600' :
                          job.color === 'indigo' ? 'text-indigo-600' : 'text-gray-600'
                        }`}>
                          {job.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-800 transition-colors duration-300">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            {job.department}
                          </span>
                          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            {job.type}
                          </span>
                          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </span>
                          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            {job.experience} experience
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:flex-shrink-0">
                    <Link
                      href={`/careers/apply/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:font-semibold transition-all duration-300"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Don't see a perfect match? We're always interested in meeting talented people.
            </p>
            <Link
              href="/careers/general-application"
              className="inline-flex items-center bg-gray-900 hover:bg-black text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Submit General Application
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section - Removed from this position */}
      {/* Application Process - Removed from this position */}
      {/* CTA Section - Removed from this position */}

      <Footer />
    </div>
  );
}