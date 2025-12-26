import React from 'react';
import { useCart } from '../../context/CartContext'; // ← مسار مصحح

const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const success = await addToCart(product);
    if (success) {
      alert('تمت إضافة المنتج إلى سلة التسوق');
    } else {
      alert('حدث خطأ أثناء إضافة المنتج');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image || '🛋️'}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">{product.price?.toLocaleString() || '0'} ريال</span>
          <span className="product-category">{product.category}</span>
          <span className={`product-stock ${product.stock < 5 ? 'low-stock' : ''}`}>
            {product.stock > 0 ? `المخزون: ${product.stock}` : 'غير متوفر'}
          </span>
        </div>
        
        <div className="product-actions">
          {!isAdmin ? (
            <button 
              className="btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'أضف إلى السلة' : 'غير متوفر'}
            </button>
          ) : (
            <>
              <button 
                className="btn-secondary"
                onClick={() => onEdit(product)}
              >
                تعديل
              </button>
              <button 
                className="btn-danger"
                onClick={() => onDelete(product.id)}
              >
                حذف
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;