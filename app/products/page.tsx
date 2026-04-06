"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// ==================== API Configuration ====================
const API_BASE_URL = 'https://6295-2401-4900-902c-1216-55a3-6146-4bd0-302f.ngrok-free.app';

const api = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
      redirect: 'follow',
    });
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      throw new Error('NGROK BROKE: Received HTML instead of JSON');
    }
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.message || `HTTP ${response.status}`);
    }
    return response.json();
  },

  post: async (url: string, data?: any, options?: { params?: any }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    let fullUrl = `${API_BASE_URL}${url}`;
    if (options?.params) {
      const params = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, String(value));
      });
      fullUrl += `?${params.toString()}`;
    }
    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: data ? JSON.stringify(data) : undefined,
        redirect: 'follow',
      });
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('text/html')) throw new Error('Backend server is not accessible.');
      if (!response.ok) {
        if (response.status === 401 && typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || error.message || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }
};

// ==================== Type Definitions ====================
interface IconProps { className?: string; [key: string]: any; }
interface ProductSpec { id: string; spec_name: string; spec_value: string; }
interface ProductFeature { id: string; feature_text: string; order_index: number; }
interface ProductMedia { id: string; media_type: string; url: string; is_primary: boolean; }
interface ProductLink { id: string; link_type: string; url: string; }
interface Category { id: string; name: string; }
interface Subcategory { id: string; name: string; }

interface ApiProduct {
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

interface CategoryType { id: string; name: string; description?: string; }
interface SubcategoryType {
  id: string;
  category_id: string;
  name: string;
  code: string;
  is_active: boolean;
  created_at: string;
}

// ==================== SVG Icons ====================
const ProductIcons: { [key: string]: React.FC<IconProps> } = {
  Router: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Switch: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth="2"/>
      <path d="M8 8H16" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 12H16" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16H16" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Default: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H15V15H9V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 18L15 18" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const getProductIcon = (productName: string, categoryName: string = ''): React.FC<IconProps> => {
  const name = productName.toLowerCase();
  const category = categoryName.toLowerCase();
  if (name.includes('router') || category.includes('router')) return ProductIcons.Router;
  if (name.includes('switch') || category.includes('switch')) return ProductIcons.Switch;
  return ProductIcons.Default;
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active': case 'in stock': return 'bg-green-100 text-green-800';
    case 'inactive': case 'out of stock': return 'bg-red-100 text-red-800';
    case 'coming soon': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// ==================== YouTube URL helper ====================
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    // Handle youtu.be/ID and youtube.com/watch?v=ID and youtube.com/embed/ID
    const u = new URL(url);
    let videoId = '';
    if (u.hostname === 'youtu.be') {
      videoId = u.pathname.slice(1).split('?')[0];
    } else if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) {
        videoId = u.pathname.split('/embed/')[1].split('?')[0];
      } else {
        videoId = u.searchParams.get('v') || '';
      }
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

// ==================== Media Thumbnail ====================
type MediaTab = 'image' | 'video' | 'datasheet';

// ==================== Product Detail Component ====================
function ProductDetail({ product, onBack }: { product: ApiProduct; onBack: () => void }) {
  const images     = (product.media_items || []).filter(m => m.media_type === 'image');
  const videos     = (product.media_items || []).filter(m => m.media_type === 'video');
  const datasheets = (product.media_items || []).filter(m => m.media_type === 'datasheet');

  const primaryImage = images.find(m => m.is_primary)?.url || images[0]?.url || '';
  const [selectedImage, setSelectedImage] = useState<string>(primaryImage);
  const [activeMediaTab, setActiveMediaTab] = useState<MediaTab>('image');
  const [quantity, setQuantity] = useState(1);

  // Derived links
  const enquiryLink  = product.links?.find(l => l.link_type === 'enquiry')?.url;
  const downloadLink = product.links?.find(l => l.link_type === 'download')?.url;

  // Keep image in sync when product changes
  useEffect(() => {
    const pri = images.find(m => m.is_primary)?.url || images[0]?.url || '';
    setSelectedImage(pri);
    setActiveMediaTab('image');
  }, [product.id]);

  // Sort features by order_index
  const sortedFeatures = [...(product.features || [])].sort((a, b) => a.order_index - b.order_index);

  const mediaTabs = [
    images.length > 0     && { key: 'image'     as MediaTab, label: 'Images',    count: images.length },
    videos.length > 0     && { key: 'video'     as MediaTab, label: 'Videos',    count: videos.length },
    datasheets.length > 0 && { key: 'datasheet' as MediaTab, label: 'Datasheets',count: datasheets.length },
  ].filter(Boolean) as { key: MediaTab; label: string; count: number }[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Products
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* ── TOP GRID: Media + Info ── */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT – Media viewer */}
          <div className="space-y-4">
            {/* Media tab switcher */}
            {mediaTabs.length > 1 && (
              <div className="flex gap-2">
                {mediaTabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveMediaTab(tab.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                      activeMediaTab === tab.key
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}>
                    {tab.label}
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeMediaTab === tab.key ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>
                  </button>
                ))}
              </div>
            )}

            {/* IMAGE VIEW */}
            {activeMediaTab === 'image' && (
              <>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="relative h-[380px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
                    {selectedImage ? (
                      <img src={selectedImage} alt={product.name} className="w-full h-full object-contain p-6" />
                    ) : (
                      <svg className="w-28 h-28 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 flex-wrap">
                    {images.map(img => (
                      <button key={img.id} onClick={() => setSelectedImage(img.url)}
                        className={`h-20 w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          selectedImage === img.url ? 'border-blue-600 shadow-md scale-105' : 'border-gray-200 hover:border-gray-400'
                        }`}>
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                        {img.is_primary && (
                          <div className="absolute bottom-0 left-0 right-0 bg-blue-600/80 text-white text-[9px] text-center py-0.5">Primary</div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* VIDEO VIEW */}
            {activeMediaTab === 'video' && (
              <div className="space-y-4">
                {videos.map(video => {
                  const embedUrl = getYouTubeEmbedUrl(video.url);
                  return (
                    <div key={video.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                      {embedUrl ? (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Product video"
                          />
                        </div>
                      ) : (
                        <div className="p-5 flex items-center gap-3">
                          <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.47 12.35 12.35 0 00-2-.6A6.29 6.29 0 0112 3.5a6.29 6.29 0 01-1.82.12 12.35 12.35 0 00-2 .6A4.83 4.83 0 014.41 6.69C2.85 8.27 2 10.36 2 12.5s.85 4.23 2.41 5.81a4.83 4.83 0 013.77 2.47 12.35 12.35 0 002 .6A6.29 6.29 0 0012 21.5a6.29 6.29 0 001.82-.12 12.35 12.35 0 002-.6 4.83 4.83 0 013.77-2.47C21.15 16.73 22 14.64 22 12.5s-.85-4.23-2.41-5.81zM10 15.5v-6l5 3-5 3z"/>
                          </svg>
                          <a href={video.url} target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm font-medium truncate">
                            {video.url}
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* DATASHEET VIEW */}
            {activeMediaTab === 'datasheet' && (
              <div className="space-y-3">
                {datasheets.map((ds, idx) => (
                  <div key={ds.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">Datasheet {idx + 1}</p>
                      <p className="text-xs text-gray-400 truncate">{ds.url}</p>
                    </div>
                    {ds.url && ds.url !== 'test' && (
                      <a href={ds.url} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex-shrink-0 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT – Product info */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.category    && <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{product.category.name}</span>}
              {product.subcategory && <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">{product.subcategory.name}</span>}
              {product.status      && <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>{product.status}</span>}
            </div>

            {/* Name + model */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-1">{product.name}</h1>
            {product.model_number && (
              <p className="text-sm text-gray-400 mb-4 font-mono">Model: {product.model_number}</p>
            )}

            {/* Price */}
            {product.price > 0 && (
              <div className="mb-5 pb-5 border-b border-gray-100">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-400 ml-2">+ GST</span>
              </div>
            )}

            {/* Short description */}
            {product.short_description && (
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">{product.short_description}</p>
            )}

            {/* Created at */}
            {product.created_at && (
              <p className="text-xs text-gray-400 mb-5">
                Listed: {new Date(product.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition text-lg font-medium">−</button>
                <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition text-lg font-medium">+</button>
              </div>
            </div>

            {/* CTA buttons — driven by links[] */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              {enquiryLink ? (
                <a href={enquiryLink} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md text-sm">
                  Get Quote
                </a>
              ) : (
                <button onClick={() => alert(`Quote requested for ${product.name} (Qty: ${quantity})`)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md text-sm">
                  Get Quote
                </button>
              )}

              {downloadLink ? (
                <a href={downloadLink} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition text-sm flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Brochure
                </a>
              ) : (
                <button onClick={() => alert(`Brochure download for ${product.name}`)}
                  className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition text-sm">
                  Download Brochure
                </button>
              )}
            </div>

            {/* All extra links (besides enquiry/download) */}
            {product.links?.filter(l => l.link_type !== 'enquiry' && l.link_type !== 'download').map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="mt-3 text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 capitalize">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {link.link_type.replace(/_/g, ' ')}
              </a>
            ))}
          </div>
        </div>

        {/* ── FULL DESCRIPTION ── */}
        {product.full_description && (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{product.full_description}</p>
          </div>
        )}

        {/* ── SPECS + FEATURES SIDE BY SIDE ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Specifications */}
          {product.specifications?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
                Technical Specifications
              </h2>
              <div className="space-y-0">
                {product.specifications.map((spec, idx) => (
                  <div key={spec.id || idx} className={`flex justify-between items-center py-3 px-2 rounded-lg ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <span className="text-sm text-gray-500 capitalize font-medium">{spec.spec_name}</span>
                    <span className="text-sm font-semibold text-gray-900 text-right max-w-[55%]">{spec.spec_value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {sortedFeatures.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-500 rounded-full inline-block" />
                Key Features
              </h2>
              <div className="space-y-2.5">
                {sortedFeatures.map((feature, idx) => (
                  <div key={feature.id || idx} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{feature.feature_text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── MEDIA GALLERY (all items overview) ── */}
        {(product.media_items?.length ?? 0) > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
              Media &amp; Resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.media_items.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-blue-300 hover:bg-blue-50/30 transition group">
                  {/* Icon by type */}
                  {item.media_type === 'image' && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.url} alt="" className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                    </div>
                  )}
                  {item.media_type === 'video' && (
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                  {item.media_type === 'datasheet' && (
                    <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-700 capitalize">{item.media_type}{item.is_primary ? ' · Primary' : ''}</p>
                    <p className="text-xs text-gray-400 truncate">{item.url}</p>
                  </div>
                  {item.url && item.url !== 'test' && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition text-blue-500 hover:text-blue-700 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>{/* end max-w container */}

      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need assistance? Our sales team is here to help</p>
          <p className="text-lg font-semibold text-gray-900 mb-4">Sales: 1800 102 366</p>
          <Link href="/contact" className="inline-block text-sm text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors">Contact Sales</Link>
        </div>
      </footer>
    </div>
  );
}

// ==================== Main Products Page Component ====================
export default function ProductsPage() {
  // --- Raw data from API (fetched once) ---
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryType[]>([]);

  // --- UI state ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Filter state (all client-side) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

  // --- Detail view ---
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // ── Fetch everything once on mount ──────────────────────────────
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
        api.get('/products/'),
        api.get('/inventory/categories'),
        api.get('/inventory/subcategories'),
      ]);

      // Normalise products
      let products: ApiProduct[] = [];
      if (Array.isArray(productsRes)) products = productsRes;
      else if (productsRes?.results) products = productsRes.results;
      else if (productsRes?.id) products = [productsRes];

      setAllProducts(products);
      setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);
      setSubcategories(Array.isArray(subcategoriesRes) ? subcategoriesRes : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleProduct = async (productId: string) => {
    setLoadingProduct(true);
    try {
      const data = await api.get(`/products/${productId}`);
      setSelectedProduct(data);
    } catch (err: any) {
      alert('Failed to load product details');
    } finally {
      setLoadingProduct(false);
    }
  };

  // ── Client-side filtering ────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // 1. Category filter
    if (selectedCategoryId) {
      result = result.filter(p => p.category?.id === selectedCategoryId);
    }

    // 2. Subcategory filter
    if (selectedSubcategoryId) {
      result = result.filter(p => p.subcategory?.id === selectedSubcategoryId);
    }

    // 3. Search filter — match name, model number, short description
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.model_number?.toLowerCase().includes(term) ||
        p.short_description?.toLowerCase().includes(term) ||
        p.category?.name?.toLowerCase().includes(term) ||
        p.subcategory?.name?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [allProducts, selectedCategoryId, selectedSubcategoryId, searchTerm]);

  // ── Pagination slice ─────────────────────────────────────────────
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  // Reset to page 1 whenever filters change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategoryId, selectedSubcategoryId]);

  // ── Sidebar: categories with their subcategories ─────────────────
  const categoriesWithSubs = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      subcategories: subcategories.filter(s => s.category_id === cat.id),
    }));
  }, [categories, subcategories]);

  // ── Sidebar: how many products per category/sub ──────────────────
  const countByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    allProducts.forEach(p => {
      if (p.category?.id) map[p.category.id] = (map[p.category.id] || 0) + 1;
    });
    return map;
  }, [allProducts]);

  const countBySubcategory = useMemo(() => {
    const map: Record<string, number> = {};
    allProducts.forEach(p => {
      if (p.subcategory?.id) map[p.subcategory.id] = (map[p.subcategory.id] || 0) + 1;
    });
    return map;
  }, [allProducts]);

  // ── Handlers ─────────────────────────────────────────────────────
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId);
      return next;
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    // Toggle selection
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId('');
      setSelectedSubcategoryId('');
      // Collapse it too
      setExpandedCategories(prev => { const n = new Set(prev); n.delete(categoryId); return n; });
    } else {
      setSelectedCategoryId(categoryId);
      setSelectedSubcategoryId('');
      // Always expand the newly selected category
      setExpandedCategories(prev => new Set([...prev, categoryId]));
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategoryId(prev => prev === subcategoryId ? '' : subcategoryId);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategoryId('');
    setSelectedSubcategoryId('');
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || '';
  const getSubcategoryName = (id: string) => subcategories.find(s => s.id === id)?.name || '';

  const hasActiveFilters = !!(searchTerm || selectedCategoryId || selectedSubcategoryId);

  // ── Render guards ─────────────────────────────────────────────────
  if (selectedProduct) return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;

  if (loadingProduct) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Connection Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchAll} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">Try Again</button>
        </div>
      </div>
    </div>
  );

  // ── Main Render ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
      <Header />

      <main className="w-full">
        {/* Hero */}
        <div className="relative w-full min-h-[500px] md:min-h-[600px] bg-black">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557862925-7c4d30f8d036?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 h-full flex items-center">
            <div className="w-full md:w-1/2 lg:w-2/5 text-white z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Products</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                Secureye offers a comprehensive range of advanced security and surveillance solutions
              </p>
              <div className="flex items-center text-sm">
                <Link href="/" className="text-white hover:text-blue-300 transition-colors">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-semibold text-white">Products</span>
              </div>
            </div>
          </div>

          {/* Quick Enquiry */}
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-2 md:px-3 rounded-l-lg shadow-lg transition-all duration-300 hover:shadow-xl group"
              onClick={() => window.location.href = '/contact'}>
              <div className="flex items-center">
                <span className="hidden md:inline-block mr-2 text-sm">Quick</span>
                <span className="text-sm md:text-base font-medium whitespace-nowrap">Enquiry</span>
                <svg className="w-4 h-4 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="w-full border-t border-gray-300 mb-8" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── LEFT SIDEBAR ── */}
            <div className="lg:w-1/4">
              <div className="sticky top-8 bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 mb-4 pb-3 border-b-2 border-gray-300">Filter By</h2>

                {/* Search input */}
                <div className="mb-6">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by name, model..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-gray-700 placeholder-gray-400 transition"
                    />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {/* Live result count hint */}
                  {searchTerm && (
                    <p className="text-xs text-gray-500 mt-1.5 ml-1">
                      {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                    </p>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">Categories</h3>

                  {/* "All" option */}
                  <button
                    onClick={clearAllFilters}
                    className={`w-full text-left py-2 px-3 rounded-lg text-sm mb-1 flex justify-between items-center transition-all ${
                      !selectedCategoryId && !selectedSubcategoryId && !searchTerm
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>All Products</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      !selectedCategoryId && !selectedSubcategoryId && !searchTerm
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {allProducts.length}
                    </span>
                  </button>

                  <div className="space-y-0.5">
                    {categoriesWithSubs.map(category => {
                      const isSelected = selectedCategoryId === category.id;
                      const isExpanded = expandedCategories.has(category.id);
                      const hasSubs = category.subcategories.length > 0;
                      const count = countByCategory[category.id] || 0;

                      return (
                        <div key={category.id} className="border-b border-gray-100 last:border-0">
                          {/* Category row */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCategoryClick(category.id)}
                              className={`flex-1 text-left py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-blue-600 text-white font-semibold'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              <span className="text-sm">{category.name}</span>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                              }`}>{count}</span>
                            </button>

                            {/* Expand/collapse toggle (separate from selection) */}
                            {hasSubs && (
                              <button
                                onClick={() => toggleCategory(category.id)}
                                className={`p-1.5 rounded-md transition-colors ${
                                  isSelected ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-100'
                                }`}
                              >
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            )}
                          </div>

                          {/* Subcategories — shown when expanded (regardless of selection) */}
                          {hasSubs && isExpanded && (
                            <div className="ml-3 mt-0.5 mb-1.5 space-y-0.5 border-l-2 border-gray-200 pl-3">
                              {category.subcategories.map((sub: SubcategoryType) => {
                                const subSelected = selectedSubcategoryId === sub.id;
                                const subCount = countBySubcategory[sub.id] || 0;
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => handleSubcategoryClick(sub.id)}
                                    className={`w-full text-left py-1.5 px-2.5 rounded-md text-sm flex items-center justify-between transition-all ${
                                      subSelected
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                                  >
                                    <span>{sub.name}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                      subSelected ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-400'
                                    }`}>{subCount}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="mt-5 pt-4 border-t-2 border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">Active Filters</h4>
                      <button onClick={clearAllFilters} className="text-xs text-red-500 hover:text-red-700 font-medium">Clear all</button>
                    </div>
                    <div className="space-y-1.5">
                      {selectedCategoryId && (
                        <div className="flex items-center justify-between text-xs bg-blue-50 border border-blue-100 p-2 rounded-lg">
                          <span className="text-blue-800">📁 {getCategoryName(selectedCategoryId)}</span>
                          <button onClick={() => { setSelectedCategoryId(''); setSelectedSubcategoryId(''); }} className="text-blue-400 hover:text-blue-600 ml-2">✕</button>
                        </div>
                      )}
                      {selectedSubcategoryId && (
                        <div className="flex items-center justify-between text-xs bg-green-50 border border-green-100 p-2 rounded-lg">
                          <span className="text-green-800">📂 {getSubcategoryName(selectedSubcategoryId)}</span>
                          <button onClick={() => setSelectedSubcategoryId('')} className="text-green-400 hover:text-green-600 ml-2">✕</button>
                        </div>
                      )}
                      {searchTerm && (
                        <div className="flex items-center justify-between text-xs bg-yellow-50 border border-yellow-100 p-2 rounded-lg">
                          <span className="text-yellow-800">🔍 "{searchTerm}"</span>
                          <button onClick={() => setSearchTerm('')} className="text-yellow-500 hover:text-yellow-700 ml-2">✕</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div className="lg:w-3/4">
              {/* Results header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedSubcategoryId
                      ? getSubcategoryName(selectedSubcategoryId)
                      : selectedCategoryId
                        ? getCategoryName(selectedCategoryId)
                        : searchTerm
                          ? `Search: "${searchTerm}"`
                          : 'All Products'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Showing {paginatedProducts.length} of {filteredProducts.length} products
                  </p>
                </div>
              </div>

              {/* Grid */}
              {paginatedProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
                  <button onClick={clearAllFilters} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProducts.map(product => {
                      const IconComponent = getProductIcon(product.name, product.category?.name);
                      const primaryImage = product.media_items?.find(item => item.media_type === 'image' && item.is_primary)?.url;

                      return (
                        <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white group">
                          {/* Image */}
                          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
                            {primaryImage ? (
                              <img src={primaryImage} alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                onError={e => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`absolute inset-0 flex items-center justify-center ${primaryImage ? 'hidden' : ''} fallback-icon`}>
                              <IconComponent className="w-24 h-24 text-gray-200" />
                            </div>
                            {product.model_number && (
                              <div className="absolute top-3 right-3">
                                <span className="text-xs font-medium text-gray-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-gray-100">
                                  {product.model_number}
                                </span>
                              </div>
                            )}
                            {product.status && (
                              <div className="absolute top-3 left-3">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                                  {product.status}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-5">
                            <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-tight line-clamp-2">{product.name}</h3>
                            {product.short_description && (
                              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.short_description}</p>
                            )}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {product.category && (
                                <span
                                  className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full cursor-pointer hover:bg-blue-100 transition"
                                  onClick={() => handleCategoryClick(product.category.id)}
                                >
                                  {product.category.name}
                                </span>
                              )}
                              {product.subcategory && (
                                <span
                                  className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full cursor-pointer hover:bg-green-100 transition"
                                  onClick={() => {
                                    handleCategoryClick(product.category.id);
                                    handleSubcategoryClick(product.subcategory.id);
                                  }}
                                >
                                  {product.subcategory.name}
                                </span>
                              )}
                            </div>
                            {product.specifications?.length > 0 && (
                              <div className="space-y-1.5 mb-4">
                                {product.specifications.slice(0, 3).map((spec, i) => (
                                  <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-500 capitalize">{spec.spec_name}:</span>
                                    <span className="font-medium text-gray-800">{spec.spec_value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {product.price > 0 && (
                              <div className="mb-4">
                                <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                                <span className="text-xs text-gray-400 ml-1">+ GST</span>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => fetchSingleProduct(product.id)}
                                className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                View Details
                              </button>
                              <button
                                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600"
                                onClick={() => console.log('Add to quote:', product.id)}
                              >
                                Quote
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        ← Prev
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'}`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need assistance? Our sales team is here to help</p>
          <p className="text-lg font-semibold text-gray-900 mb-4">Sales: 1800 102 366</p>
          <Link href="/contact" className="inline-block text-sm text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors">Contact Sales</Link>
        </div>
      </footer>
    </div>
  );
}