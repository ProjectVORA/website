import { ArrowRight, Cpu, Layers, Network, Cloud, Database, Laptop } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const iconMap: { [key: string]: any } = {
  cpu: Cpu,
  layers: Layers,
  network: Network,
  cloud: Cloud,
  database: Database,
  laptop: Laptop,
};

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Cpu;

  return (
    <div className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow border border-gray-100">
      <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
        <IconComponent className="w-7 h-7 text-gray-700" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
      <Link href="#" className="text-[#2D5BFF] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm">
        Learn More <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
