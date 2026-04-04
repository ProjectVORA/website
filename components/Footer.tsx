import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0E27] text-white py-16">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <nav className="space-y-3">
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Hardware repair & upgrade
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Software troubleshooting
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Network configuration
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Cloud Services
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Data Recovery
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <a href="mailto:support@fixopro.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>support@fixopro.com</span>
              </a>
              <a href="tel:+11031456789" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+1 (103) 456-7890</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>4517 Washington Ave. Manchester, KY 39495</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Monday-Saturday: 8am- 6 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 All rights reserved by UiMile built with Framer</p>
        </div>
      </div>
    </footer>
  );
}
