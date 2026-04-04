// Product data for all categories
export interface ProductItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  specifications?: Record<string, string>;
  image: string;
  category: string;
  subcategory: string;
  price?: string;
  availability?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: {
    id: string;
    name: string;
    description: string;
    products: ProductItem[];
  }[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "networking",
    name: "Networking Equipment",
    description: "Enterprise-grade networking solutions including routers, switches, and gateways for reliable connectivity.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      {
        id: "routers",
        name: "Routers",
        description: "High-performance routers for seamless network connectivity",
        products: [
          {
            id: "wired-router-1",
            name: "Enterprise Wired Router",
            description: "High-performance wired router designed for enterprise environments with multiple LAN ports and advanced security features.",
            features: [
              "Gigabit Ethernet ports",
              "Advanced firewall protection",
              "VPN support",
              "Quality of Service (QoS)",
              "VLAN support"
            ],
            specifications: {
              "Ports": "4x Gigabit LAN, 1x WAN",
              "Speed": "10/100/1000 Mbps",
              "Security": "SPI Firewall, IPSec",
              "Warranty": "3 years"
            },
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
            category: "Networking Equipment",
            subcategory: "Routers",
            price: "$299.99",
            availability: "In Stock"
          },
          {
            id: "wireless-router-1",
            name: "WiFi Enterprise Router",
            description: "Advanced wireless router with dual-band connectivity and MU-MIMO technology for high-density environments.",
            features: [
              "Dual-band WiFi (2.4GHz & 5GHz)",
              "MU-MIMO technology",
              "Up to 300 devices support",
              "Beamforming+",
              "Guest network support"
            ],
            specifications: {
              "WiFi Standard": "802.11ac",
              "Speed": "Up to 1.9 Gbps",
              "Antennas": "4 external, 4 internal",
              "Security": "WPA3, Firewall",
              "Warranty": "2 years"
            },
            image: "https://images.unsplash.com/photo-1593005510329-8a4035a7238f?auto=format&fit=crop&w=600&q=80",
            category: "Networking Equipment",
            subcategory: "Routers",
            price: "$349.99",
            availability: "In Stock"
          }
        ]
      },
      {
        id: "switches",
        name: "Switches",
        description: "Managed and unmanaged switches for reliable network infrastructure",
        products: [
          {
            id: "poe-switch-1",
            name: "24-Port POE Switch",
            description: "Managed Power over Ethernet switch with 24 ports for powering IP cameras, VoIP phones, and wireless access points.",
            features: [
              "24x 10/100/1000 Mbps POE+ ports",
              "4x Gigabit SFP uplink ports",
              "Web-based management interface",
              "Energy-efficient Ethernet",
              "Advanced QoS features"
            ],
            specifications: {
              "Ports": "24x POE+, 4x SFP",
              "Power Budget": "370W",
              "Switching Capacity": "56 Gbps",
              "Packet Forwarding": "42 Mpps",
              "Warranty": "3 years"
            },
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
            category: "Networking Equipment",
            subcategory: "Switches",
            price: "$499.99",
            availability: "In Stock"
          }
        ]
      },
      {
        id: "gateways",
        name: "Gateways",
        description: "Communication gateways for connecting different network protocols",
        products: [
          {
            id: "gsm-gateway-1",
            name: "GSM/3G/4G Gateway",
            description: "Multi-network gateway supporting GSM, 3G, and 4G for reliable cellular connectivity.",
            features: [
              "Quad-band GSM support",
              "3G/4G LTE connectivity",
              "SIP protocol support",
              "Up to 32 SIM card slots",
              "Web-based configuration"
            ],
            specifications: {
              "Network Support": "GSM/3G/4G",
              "SIM Slots": "32",
              "Channels": "32",
              "Protocols": "SIP, GSM",
              "Power Supply": "DC 12V/3A"
            },
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
            category: "Networking Equipment",
            subcategory: "Gateways",
            price: "$899.99",
            availability: "In Stock"
          }
        ]
      }
    ]
  },
  {
    id: "communication",
    name: "Communication Systems",
    description: "Complete IP communication solutions including PBX systems and IP phones for enterprise environments.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      {
        id: "ippbx",
        name: "IPPBX",
        description: "IP Private Branch Exchange systems for enterprise communications",
        products: [
          {
            id: "sme-ip-pbx-1",
            name: "SME IP PBX System",
            description: "Complete IP PBX solution designed for small to medium enterprises with up to 100 users.",
            features: [
              "Supports up to 100 users",
              "Built-in voicemail",
              "Conference calling",
              "Call forwarding and transfer",
              "Mobile app integration"
            ],
            specifications: {
              "Users": "Up to 100",
              "Concurrent Calls": "50",
              "Extensions": "100",
              "Voicemail Boxes": "100",
              "Warranty": "2 years"
            },
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
            category: "Communication Systems",
            subcategory: "IPPBX",
            price: "$1,299.99",
            availability: "In Stock"
          }
        ]
      },
      {
        id: "ip-phones",
        name: "IP Phones",
        description: "High-quality IP phones for enterprise communication",
        products: [
          {
            id: "executive-phone-1",
            name: "Executive IP Phone",
            description: "Premium IP phone with HD voice quality and advanced features for executives.",
            features: [
              "7-inch color touchscreen",
              "HD voice quality",
              "Bluetooth connectivity",
              "Gigabit Ethernet",
              "Advanced call management"
            ],
            specifications: {
              "Display": "7-inch color touchscreen",
              "Codecs": "G.711, G.722, G.729",
              "Ports": "2x Gigabit Ethernet",
              "Bluetooth": "Yes",
              "Warranty": "3 years"
            },
            image: "https://images.unsplash.com/photo-1593005510329-8a4035a7238f?auto=format&fit=crop&w=600&q=80",
            category: "Communication Systems",
            subcategory: "IP Phones",
            price: "$249.99",
            availability: "In Stock"
          }
        ]
      }
    ]
  },
  {
    id: "security",
    name: "Security & Surveillance",
    description: "Comprehensive security solutions including firewalls, CCTV systems, and intrusion detection.",
    image: "https://images.unsplash.com/photo-1563013544-824ae17633c0?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      {
        id: "firewall",
        name: "Firewall",
        description: "Network security appliances to protect your infrastructure",
        products: [
          {
            id: "hardware-firewall-1",
            name: "Enterprise Hardware Firewall",
            description: "Next-generation hardware firewall with advanced threat protection and deep packet inspection.",
            features: [
              "Next-generation firewall (NGFW)",
              "Intrusion prevention system (IPS)",
              "Application control",
              "VPN support",
              "Real-time threat intelligence"
            ],
            specifications: {
              "Throughput": "1 Gbps",
              "Concurrent Sessions": "500,000",
              "New Connections": "25,000/sec",
              "Security Features": "NGFW, IPS, AV",
              "Warranty": "3 years"
            },
            image: "https://images.unsplash.com/photo-1563013544-824ae17633c0?auto=format&fit=crop&w=600&q=80",
            category: "Security & Surveillance",
            subcategory: "Firewall",
            price: "$1,499.99",
            availability: "In Stock"
          }
        ]
      },
      {
        id: "cctv",
        name: "Cameras - CCTV",
        description: "Surveillance cameras and recording systems for security monitoring",
        products: [
          {
            id: "ip-camera-1",
            name: "4K IP Surveillance Camera",
            description: "Ultra-high definition IP camera with night vision and intelligent analytics.",
            features: [
              "4K resolution (3840x2160)",
              "Night vision up to 50m",
              "Motion detection",
              "Two-way audio",
              "Weatherproof IP66 rating"
            ],
            specifications: {
              "Resolution": "4K (3840x2160)",
              "Lens": "2.8mm fixed",
              "Night Vision": "50 meters",
              "Storage": "MicroSD, NAS, NVR",
              "Power": "PoE (802.3af)"
            },
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
            category: "Security & Surveillance",
            subcategory: "Cameras - CCTV",
            price: "$199.99",
            availability: "In Stock"
          }
        ]
      }
    ]
  },
  {
    id: "access-control",
    name: "Access Control",
    description: "Biometric and smart lock solutions for secure access management.",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      {
        id: "biometric",
        name: "Biometric",
        description: "Fingerprint and facial recognition systems for secure access",
        products: [
          {
            id: "fingerprint-biometric-1",
            name: "Fingerprint Biometric Reader",
            description: "Advanced fingerprint recognition system with multi-user support and secure access control.",
            features: [
              "5000 fingerprint templates",
              "Fast recognition (<1 sec)",
              "Anti-spoofing technology",
              "Audit trail logging",
              "RS485 and TCP/IP interface"
            ],
            specifications: {
              "Templates": "5000 fingerprints",
              "Recognition Time": "<1 second",
              "False Acceptance Rate": "<0.001%",
              "False Rejection Rate": "<0.1%",
              "Interface": "RS485, TCP/IP"
            },
            image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=600&q=80",
            category: "Access Control",
            subcategory: "Biometric",
            price: "$399.99",
            availability: "In Stock"
          }
        ]
      },
      {
        id: "smart-locks",
        name: "Smart Locks",
        description: "Electronic locks for secure door access",
        products: [
          {
            id: "rfid-lock-1",
            name: "RFID Card Lock",
            description: "Electronic door lock with RFID card access and audit trail capabilities.",
            features: [
              "RFID card access",
              "Up to 1000 user cards",
              "Audit trail (100,000 records)",
              "Emergency key override",
              "Low battery indicator"
            ],
            specifications: {
              "Cards Supported": "1000",
              "Audit Trail": "100,000 records",
              "Power": "4 AA batteries",
              "Operating Temperature": "-10°C to 60°C",
              "Material": "Stainless steel"
            },
            image: "https://images.unsplash.com/photo-1593005510329-8a4035a7238f?auto=format&fit=crop&w=600&q=80",
            category: "Access Control",
            subcategory: "Smart Locks",
            price: "$249.99",
            availability: "In Stock"
          }
        ]
      }
    ]
  }
];
