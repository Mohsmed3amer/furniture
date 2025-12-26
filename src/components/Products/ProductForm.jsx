import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'كنب',
    stock: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'كنب',
        stock: product.stock || '',
        image: product.image || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  const categories = ['كنب', 'طاولات', 'أسرة', 'خزائن', 'كراسي', 'إضاءة', 'ديكور'];

  return (
    <div className="product-form">
      <h3>{product ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>اسم المنتج</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>السعر (ريال)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>الفئة</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>الكمية المتاحة</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>رمز الصورة (اختياري)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="مثال: 🛋️"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {product ? 'تحديث المنتج' : 'إضافة المنتج'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;