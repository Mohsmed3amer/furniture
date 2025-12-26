import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onEdit, onDelete, isAdmin }) => {
  if (products.length === 0) {
    return <div className="no-products">لا توجد منتجات متاحة</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ProductList;