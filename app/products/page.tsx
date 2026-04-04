"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// ==================== API Configuration ====================
const API_BASE_URL = 'https://f4ff-2401-4900-9021-b9c9-8400-380c-cf78-dc7d.ngrok-free.app';

// Helper function for API calls using fetch with ngrok warning bypass
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
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
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
      if (contentType?.includes('text/html')) {
        throw new Error('Backend server is not accessible.');
      }
      
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
interface IconProps {
  className?: string;
  [key: string]: any;
}

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

interface CategoryType {
  id: string;
  name: string;
  description?: string;
  subcategories?: SubcategoryType[];
}

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
  Router: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Switch: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth="2"/>
      <path d="M8 8H16" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 12H16" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16H16" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Gateway: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" strokeWidth="2"/>
      <path d="M12 8V4" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 20V16" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 12H4" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 12H16" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  IPPBX: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
      <path d="M9 9H15V15H9V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 18L15 18" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Phone: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C16.04 20.92 12.08 16.96 12.08 12C12.08 11.45 12.53 11 13.08 11H16.08C16.63 11 17.08 11.45 17.08 12C17.08 14.76 19.32 17 22.08 17C22.63 17 23.08 17.45 23.08 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.03 2.82C14.28 2.32 14.82 2 15.41 2C16.33 2 17 2.67 17 3.59V3.59C17 4.18 16.68 4.72 16.18 4.97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 18C2 9.16 9.16 2 18 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Firewall: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 12L11 14L15 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Camera: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Biometric: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 20C6 17.79 7.79 16 10 16H14C16.21 16 18 17.79 18 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 10L22 13L19 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Lock: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Default: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H15V15H9V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 18L15 18" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

// ==================== Helper Functions ====================
const getProductIcon = (productName: string, categoryName: string = ''): React.FC<IconProps> => {
  const name = productName.toLowerCase();
  const category = categoryName.toLowerCase();
  
  if (name.includes('camera') || category.includes('camera')) return ProductIcons.Camera;
  if (name.includes('router') || category.includes('router')) return ProductIcons.Router;
  if (name.includes('switch') || category.includes('switch')) return ProductIcons.Switch;
  if (name.includes('gateway') || category.includes('gateway')) return ProductIcons.Gateway;
  if (name.includes('pbx') || category.includes('pbx')) return ProductIcons.IPPBX;
  if (name.includes('phone') || category.includes('phone')) return ProductIcons.Phone;
  if (name.includes('firewall') || category.includes('firewall')) return ProductIcons.Firewall;
  if (name.includes('biometric') || category.includes('biometric')) return ProductIcons.Biometric;
  if (name.includes('lock') || category.includes('lock')) return ProductIcons.Lock;
  
  return ProductIcons.Default;
};

// ==================== Main Component ====================
export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(12);

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Fetch products when filters, search, or page changes
  useEffect(() => {
    if (categories.length > 0 || subcategories.length > 0) {
      fetchProducts();
    }
  }, [currentPage, searchTerm, selectedFilters, activeCategory, activeSubcategory, categories, subcategories]);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const response = await api.get('/inventory/categories');
      console.log('Categories response:', response);
      const categoriesData = Array.isArray(response) ? response : [];
      setCategories(categoriesData);
    } catch (err: any) {
      console.error('Failed to fetch categories:', err);
      setError(err.message || 'Failed to fetch categories');
      setCategories([]);
    }
  };

  const fetchSubcategories = async () => {
    try {
      console.log('Fetching subcategories...');
      const response = await api.get('/inventory/subcategories');
      console.log('Subcategories response:', response);
      const subcategoriesData = Array.isArray(response) ? response : [];
      setSubcategories(subcategoriesData);
    } catch (err: any) {
      console.error('Failed to fetch subcategories:', err);
      setError(err.message || 'Failed to fetch subcategories');
      setSubcategories([]);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching products...');
      // Use GET request to /products/ endpoint
      let url = '/products/';
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      if (activeCategory) {
        const category = categories.find(c => c.name === activeCategory);
        if (category) {
          params.append('category_id', category.id);
        }
      }

      if (activeSubcategory) {
        const subcategory = subcategories.find(s => s.name === activeSubcategory);
        if (subcategory) {
          params.append('subcategory_id', subcategory.id);
        }
      }

      // Add pagination
      params.append('page', currentPage.toString());
      params.append('page_size', pageSize.toString());

      // Add query string if there are parameters
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('Fetching products from URL:', url);
      const data = await api.get(url);
      console.log('Products response:', data);
      
      // Handle the response data
      let productsData: ApiProduct[] = [];
      let totalCount = 0;
      
      if (Array.isArray(data)) {
        productsData = data;
        totalCount = data.length;
      } else if (data && typeof data === 'object') {
        if (data.results && Array.isArray(data.results)) {
          productsData = data.results;
          totalCount = data.count || data.results.length;
        } else if (data.id) {
          productsData = [data];
          totalCount = 1;
        }
      }
      
      setProducts(productsData);
      setTotalProducts(totalCount);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    setExpandedSubcategory(null); // Close subcategory when toggling category
  };

  const toggleSubcategory = (subcategoryName: string) => {
    setExpandedSubcategory(expandedSubcategory === subcategoryName ? null : subcategoryName);
  };

  const handleFilterSelect = (categoryName: string, subtype: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [categoryName]: prev[categoryName] === subtype ? '' : subtype
    }));
    setActiveCategory(categoryName);
    setActiveSubcategory(subtype);
    setCurrentPage(1);
  };

  const clearFilter = (categoryName: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[categoryName];
      return newFilters;
    });
    if (Object.keys(selectedFilters).length <= 1) {
      setActiveCategory('');
      setActiveSubcategory('');
    }
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveSubcategory('');
    setCurrentPage(1);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    setActiveSubcategory(subcategoryName);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setActiveCategory('');
    setActiveSubcategory('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const retryConnection = () => {
    setError(null);
    setLoading(true);
    fetchCategories();
    fetchSubcategories();
  };

  // Group subcategories by category
  const categoriesWithSubcategories = useMemo(() => {
    const categoryMap = new Map();
    
    // First, add all categories
    categories.forEach(category => {
      categoryMap.set(category.id, {
        ...category,
        subcategories: []
      });
    });

    // Then, add subcategories to their respective categories
    subcategories.forEach(sub => {
      if (categoryMap.has(sub.category_id)) {
        const category = categoryMap.get(sub.category_id);
        category.subcategories.push(sub);
      }
    });

    return Array.from(categoryMap.values());
  }, [categories, subcategories]);

  // Loading State
  if (loading && products.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">Connection Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-medium mb-2">Troubleshooting steps:</p>
              <ul className="list-disc text-left pl-5 space-y-1">
                <li>Make sure your backend server is running</li>
                <li>Check if ngrok is pointing to the correct port</li>
                <li>Verify the API endpoints are correct</li>
                <li>Try accessing the URL directly in browser</li>
              </ul>
            </div>
            <button 
              onClick={retryConnection}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <div className="relative w-full min-h-[500px] md:min-h-[600px] bg-black">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1557862925-7c4d30f8d036?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>
          
          <div className="relative container mx-auto px-4 py-16 md:py-24 h-full flex items-center">
            <div className="w-full md:w-1/2 lg:w-2/5 text-white z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Products
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                Secureye offers a comprehensive range of advanced security and surveillance solutions
              </p>
              <div className="flex items-center text-sm">
                <Link href="/" className="text-white hover:text-blue-300 transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-semibold text-white">Products</span>
              </div>
            </div>
          </div>
          
          {/* Quick Enquiry Button */}
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-2 md:px-3 rounded-l-lg shadow-lg transition-all duration-300 hover:shadow-xl group"
              onClick={() => window.location.href = '/contact'}
            >
              <div className="flex items-center">
                <span className="hidden md:inline-block mr-2 text-sm">Quick</span>
                <span className="text-sm md:text-base font-medium whitespace-nowrap">Enquiry</span>
                <svg 
                  className="w-4 h-4 ml-1 md:ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="w-full border-t border-gray-300 mb-8"></div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filter Section */}
            <div className="lg:w-1/4">
              <div className="sticky top-8 bg-[#ffffff] rounded-lg border border-gray-300 p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-800 mb-4 pb-3 border-b-2 border-gray-300">
                  Filter By
                </h2>
                
                <div className="mb-4 pb-3 border-b-2 border-gray-300">
                  <p className="text-gray-700 text-sm font-medium mb-2">Product</p>
                </div>
                
                {/* Search */}
                <div className="mb-6">
                  <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-sm outline-none text-gray-700 placeholder-gray-500"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm py-3 px-6 rounded transition-colors"
                    >
                      Filter
                    </button>
                  </form>
                </div>
                
                {/* Categories with Subcategories */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b-2 border-gray-300">
                    Categories
                  </h3>
                  
                  <div className="space-y-0">
                    {categoriesWithSubcategories.length === 0 ? (
                      <p className="text-sm text-gray-500 py-2">No categories available</p>
                    ) : (
                      categoriesWithSubcategories.map((category, index) => (
                        <div key={category.id} className={`${index < categoriesWithSubcategories.length - 1 ? 'border-b-2 border-gray-300' : ''}`}>
                          {/* Category Header */}
                          <div 
                            className={`py-2 px-3 cursor-pointer transition-all duration-200 group flex items-center justify-between ${
                              expandedCategory === category.name 
                                ? 'text-blue-700 font-medium bg-blue-50' 
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleCategory(category.name)}
                          >
                            <span 
                              className="text-sm cursor-pointer hover:text-blue-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCategoryClick(category.name);
                              }}
                            >
                              {category.name}
                            </span>
                            
                            {category.subcategories && category.subcategories.length > 0 && (
                              <svg 
                                className={`w-4 h-4 transition-all duration-200 ${
                                  expandedCategory === category.name 
                                    ? 'text-blue-600 rotate-180' 
                                    : 'text-gray-400 group-hover:text-gray-600'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </div>
                          
                          {/* Subcategories */}
                          {expandedCategory === category.name && category.subcategories && category.subcategories.length > 0 && (
                            <div className="pl-4 pr-3 pb-2 bg-blue-50">
                              <div className="pt-2 space-y-2">
                                {category.subcategories.map((sub: SubcategoryType) => (
                                  <div key={sub.id}>
                                    <div 
                                      className={`flex items-center py-1 px-2 rounded cursor-pointer transition-colors ${
                                        activeSubcategory === sub.name 
                                          ? 'bg-blue-100' 
                                          : 'hover:bg-gray-100'
                                      }`}
                                      onClick={() => handleSubcategoryClick(sub.name)}
                                    >
                                      <input
                                        type="checkbox"
                                        id={`sub-${sub.id}`}
                                        checked={activeSubcategory === sub.name}
                                        onChange={() => handleSubcategoryClick(sub.name)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                      />
                                      <label 
                                        htmlFor={`sub-${sub.id}`}
                                        className={`ml-3 text-sm cursor-pointer flex-1 ${
                                          activeSubcategory === sub.name 
                                            ? 'text-blue-700 font-medium' 
                                            : 'text-gray-700'
                                        }`}
                                      >
                                        {sub.name}
                                      </label>
                                      <span className="text-xs text-gray-500">{sub.code}</span>
                                    </div>
                                    
                                    {/* Nested level if needed - you can add another level here */}
                                    {expandedSubcategory === sub.name && (
                                      <div className="ml-6 mt-1 space-y-1">
                                        {/* Add nested items here if needed */}
                                      </div>
                                    )}
                                  </div>
                                ))}
                                
                                {activeCategory === category.name && (
                                  <button
                                    onClick={() => {
                                      setActiveCategory('');
                                      setActiveSubcategory('');
                                    }}
                                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    Clear category selection
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Active Filters Summary */}
                  {(activeCategory || activeSubcategory || Object.keys(selectedFilters).length > 0) && (
                    <div className="mt-4 pt-3 border-t-2 border-gray-300">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h4>
                      <div className="space-y-1">
                        {activeCategory && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">
                              Category: <span className="font-medium">{activeCategory}</span>
                            </span>
                            <button
                              onClick={() => {
                                setActiveCategory('');
                                setActiveSubcategory('');
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                        {activeSubcategory && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">
                              Subcategory: <span className="font-medium">{activeSubcategory}</span>
                            </span>
                            <button
                              onClick={() => setActiveSubcategory('')}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                        {Object.entries(selectedFilters).map(([category, subtype]) => (
                          subtype && category !== activeCategory && (
                            <div key={category} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">
                                {category}: <span className="font-medium">{subtype}</span>
                              </span>
                              <button
                                onClick={() => clearFilter(category)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          )
                        ))}
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - Products Display */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              {(searchTerm || activeCategory || activeSubcategory || Object.keys(selectedFilters).length > 0) && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {activeSubcategory || activeCategory || 'All Products'}
                  </h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    {searchTerm && <p>Search: "{searchTerm}"</p>}
                    {activeCategory && !activeSubcategory && <p>Category: {activeCategory}</p>}
                    {activeSubcategory && <p>Subcategory: {activeSubcategory}</p>}
                    <p className="font-medium">
                      Showing {products.length} of {totalProducts} products
                    </p>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                </div>
              ) : !Array.isArray(products) || products.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                      const IconComponent = getProductIcon(product.name, product.category?.name);
                      const primaryImage = product.media_items?.find(
                        item => item.media_type === 'image' && item.is_primary
                      )?.url;

                      return (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                          {/* Product Image */}
                          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
                            {primaryImage ? (
                              <img 
                                src={primaryImage} 
                                alt={product.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Fallback to icon if image fails to load
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            
                            {/* Fallback Icon */}
                            <div className={`absolute inset-0 flex items-center justify-center ${primaryImage ? 'hidden' : ''} fallback-icon`}>
                              <IconComponent className="w-32 h-32 text-gray-300" />
                            </div>
                            
                            {/* Model Number Badge */}
                            <div className="absolute top-4 right-4 z-10">
                              <span className="text-xs font-medium text-gray-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-gray-200">
                                {product.model_number}
                              </span>
                            </div>
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-5">
                            <h3 className="text-base font-medium text-gray-900 mb-2 leading-tight line-clamp-2">
                              {product.name}
                            </h3>
                            
                            {product.short_description && (
                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {product.short_description}
                              </p>
                            )}
                            
                            {/* Category and Subcategory Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {product.category && (
                                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                  {product.category.name}
                                </span>
                              )}
                              {product.subcategory && (
                                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                  {product.subcategory.name}
                                </span>
                              )}
                            </div>
                            
                            {/* Specifications */}
                            {product.specifications && product.specifications.length > 0 && (
                              <div className="space-y-2 mb-6">
                                {product.specifications.slice(0, 3).map((spec, specIndex) => (
                                  <div key={specIndex} className="flex justify-between">
                                    <span className="text-sm text-gray-600 capitalize">
                                      {spec.spec_name}:
                                    </span>
                                    <span className="text-sm font-medium">{spec.spec_value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Price */}
                            {product.price > 0 && (
                              <div className="mb-4">
                                <span className="text-lg font-bold text-gray-900">
                                  ₹{product.price.toLocaleString('en-IN')}
                                </span>
                              </div>
                            )}
                            
                            {/* Actions */}
                            <div className="flex space-x-3">
                              <Link 
                                href={`/products/${product.id}`}
                                className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors text-center"
                              >
                                View Details
                              </Link>
                              <button 
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                  // Handle quote functionality
                                  console.log('Add to quote:', product.id);
                                }}
                              >
                                <span className="text-sm">Quote</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalProducts > pageSize && (
                    <div className="flex justify-center mt-8 space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {currentPage}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage * pageSize >= totalProducts}
                        className={`px-4 py-2 border rounded-md ${
                          currentPage * pageSize >= totalProducts
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Need assistance? Our sales team is here to help
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Sales: 1800 102 366
            </p>
            <Link 
              href="/contact"
              className="inline-block text-sm text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}