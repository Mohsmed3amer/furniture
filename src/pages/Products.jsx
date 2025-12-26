import React, { useState, useEffect } from 'react';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import { productAPI } from '../services/api';

const Products = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await productAPI.delete(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSubmitProduct = async (productData) => {
    try {
      if (editingProduct) {
        // تحديث المنتج
        const response = await productAPI.update(editingProduct.id, productData);
        setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
      } else {
        // إضافة منتج جديد
        const response = await productAPI.create(productData);
        setProducts([...products, response.data]);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (loading) {
    return <div className="loading">جاري تحميل المنتجات...</div>;
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h2 className="page-title">إدارة المنتجات</h2>
        {isAdmin && (
          <button className="btn-primary" onClick={handleAddProduct}>
            إضافة منتج جديد
          </button>
        )}
      </div>

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmitProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default Products;
