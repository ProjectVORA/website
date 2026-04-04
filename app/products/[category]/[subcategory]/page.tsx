import React from 'react';
import { notFound } from 'next/navigation';
import { productCategories } from '@/lib/productData';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { category } = params;
  
  // Find the category
  const categoryData = productCategories.find(cat => cat.id === category);
  
  // If category not found, show 404
  if (!categoryData) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-blue-600">Products</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{categoryData.name}</span>
        </div>
      </nav>

      {/* Category Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryData.name}</h1>
        <p className="text-lg text-gray-600">{categoryData.description}</p>
      </div>

      {/* Subcategories */}
      <div className="space-y-12">
        {categoryData.subcategories.map((subcategory) => (
          <section key={subcategory.id} className="border-b border-gray-200 pb-12 last:border-0">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{subcategory.name}</h2>
              <p className="text-gray-600">{subcategory.description}</p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategory.products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      {product.price && (
                        <span className="font-bold text-blue-700">{product.price}</span>
                      )}
                      <Link
                        href={`/products/${category}/${subcategory.id}/${product.id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;