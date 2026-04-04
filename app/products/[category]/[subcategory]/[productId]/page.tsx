import React from 'react';
import { notFound } from 'next/navigation';
import { productCategories } from '@/lib/productData';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';

interface ProductDetailPageProps {
  params: {
    category: string;
    subcategory: string;
    productId: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { category, subcategory, productId } = params;

  // Find the product
  const categoryData = productCategories.find(cat => cat.id === category);
  const subcategoryData = categoryData?.subcategories.find(sub => sub.id === subcategory);
  const product = subcategoryData?.products.find(p => p.id === productId);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-blue-600">Products</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/products/${category}`} className="text-gray-500 hover:text-blue-600">
            {categoryData?.name}
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={`/products/${category}/${subcategory}`} className="text-gray-500 hover:text-blue-600">
            {subcategoryData?.name}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Price */}
          {product.price && (
            <div className="mb-6">
              <div className="text-3xl font-bold text-blue-700">{product.price}</div>
              {product.availability && (
                <div className="text-sm text-green-600 mt-1">{product.availability}</div>
              )}
            </div>
          )}

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <dl className="grid grid-cols-1 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                      <dt className="font-medium text-gray-600">{key}</dt>
                      <dd className="text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 min-w-[200px] px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 text-gray-700 flex items-center justify-center">
              <Heart className="mr-2" size={20} />
              Wishlist
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 text-gray-700 flex items-center justify-center">
              <Share2 className="mr-2" size={20} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-12">
        <Link 
          href={`/products/${category}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to {categoryData?.name}
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;