"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ==================== API Configuration (Copy from your products page) ====================
const API_BASE_URL = 'https://aba3-2401-4900-902c-1216-55a3-6146-4bd0-302f.ngrok-free.app';

const api = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      redirect: 'follow',
    });

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      throw new Error('Received HTML instead of JSON');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },
};

// ==================== Type Definitions ====================
interface ProductSpec {
  spec_name: string;
  spec_value: string;
}

interface ProductFeature {
  feature_text: string;
}

interface ProductMedia {
  media_type: string;
  url: string;
  is_primary: boolean;
}

interface ProductLink {
  link_type: string;
  url: string;
}

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  model_number: string;
  price: number;
  status: string;
  short_description: string;
  full_description: string;
  created_at: string;
  category: Category;
  subcategory: Subcategory;
  features: ProductFeature[];
  specifications: ProductSpec[];
  media_items: ProductMedia[];
  links: ProductLink[];
}

// ==================== Helper Functions ====================
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'in stock':
      return 'bg-green-100 text-green-800';
    case 'inactive':
    case 'out of stock':
      return 'bg-red-100 text-red-800';
    case 'coming soon':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// ==================== Main Component ====================
export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching product:', productId);
      const data = await api.get(`/products/${productId}`);
      console.log('Product data:', data);
      setProduct(data);
      
      // Set default selected image
      const primaryImage = data.media_items?.find(
        (item: ProductMedia) => item.media_type === 'image' && item.is_primary
      )?.url;
      
      const firstImage = data.media_items?.find(
        (item: ProductMedia) => item.media_type === 'image'
      )?.url;
      
      setSelectedImage(primaryImage || firstImage || '');
    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError(err.message || 'Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleGetQuote = () => {
    console.log('Get quote for product:', product?.id, 'Quantity:', quantity);
    // Add your quote logic here
    alert(`Quote requested for ${product?.name} (Qty: ${quantity})\n\nOur sales team will contact you shortly.`);
  };

  const handleDownloadBrochure = () => {
    console.log('Download brochure for product:', product?.id);
    // Add your brochure download logic here
    alert(`Brochure download started for ${product?.name}`);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link 
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get all images
  const images = product.media_items?.filter(item => item.media_type === 'image') || [];
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Breadcrumb */}
      <section className="relative bg-gray-900 text-white py-12">
        <div className="absolute inset-0 overflow-hidden">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover opacity-20"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white transition">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          {product.model_number && (
            <p className="text-gray-300 mt-2">Model: {product.model_number}</p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Product Overview Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            
            {/* LEFT: Product Images */}
            <div>
              {/* Main Image */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
                <div className="relative h-[400px]">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                      <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {hasImages && images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(image.url)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === image.url 
                          ? 'border-blue-600 shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info & Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Category & Subcategory */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.category && (
                  <Link 
                    href={`/products?category=${encodeURIComponent(product.category.name)}`}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition"
                  >
                    {product.category.name}
                  </Link>
                )}
                {product.subcategory && (
                  <Link 
                    href={`/products?subcategory=${encodeURIComponent(product.subcategory.name)}`}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full hover:bg-green-200 transition"
                  >
                    {product.subcategory.name}
                  </Link>
                )}
                {product.status && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                )}
              </div>

              {/* Price */}
              {product.price > 0 && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500 ml-2">+ GST</span>
                </div>
              )}

              {/* Short Description */}
              {product.short_description && (
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {product.short_description}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleGetQuote}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                >
                  Get Quote
                </button>
                <button
                  onClick={handleDownloadBrochure}
                  className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Download Brochure
                </button>
              </div>

              {/* Product Links/Resources */}
              {product.links && product.links.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Resources</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {link.link_type || 'Download'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Description */}
          {product.full_description && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.full_description}
              </p>
            </div>
          )}

          {/* Specifications Section */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Technical Specifications
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{spec.spec_name}:</span>
                    <span className="font-medium text-gray-900">{spec.spec_value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {product.features && product.features.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature.feature_text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Products Button */}
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}