import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart, checkout } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = parseInt(localStorage.getItem('userId'));
  const userName = localStorage.getItem('username') || 'مستخدم';
  const userEmail = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).email : '';

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('هل تريد إزالة هذا المنتج من السلة؟')) {
      await removeFromCart(itemId);
    }
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      alert('يرجى إدخال عنوان التوصيل');
      return;
    }

    if (!phoneNumber.trim()) {
      alert('يرجى إدخال رقم الهاتف');
      return;
    }

    if (cartItems.length === 0) {
      alert('سلة التسوق فارغة');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customerId: userId,
        customerName: userName,
        customerEmail: userEmail,
        customerPhone: phoneNumber,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: cartTotal,
        status: 'pending',
        orderDate: new Date().toISOString().split('T')[0],
        deliveryAddress: deliveryAddress
      };

      // إنشاء الطلب
      await orderAPI.create(orderData);
      
      // تفريغ العربة
      await checkout();
      
      alert('تم إنشاء الطلب بنجاح! شكراً لشرائك من متجرنا');
      navigate('/orders');
      
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('حدث خطأ أثناء إنشاء الطلب');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="page-header">
          <h2 className="page-title">سلة التسوق</h2>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>سلة التسوق فارغة</h3>
          <p>لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/products')}
          >
            تصفح المنتجات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h2 className="page-title">سلة التسوق</h2>
        <button 
          className="btn-secondary"
          onClick={() => {
            if (window.confirm('هل تريد تفريغ سلة التسوق بالكامل؟')) {
              clearCart();
            }
          }}
        >
          تفريغ السلة
        </button>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          <h3>المنتجات ({cartItems.length})</h3>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                {item.image || '📦'}
              </div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-price">{item.price.toLocaleString()} ريال</p>
              </div>
              <div className="cart-item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                {(item.price * item.quantity).toLocaleString()} ريال
              </div>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>تفاصيل الطلب</h3>
          
          <div className="order-details">
            <div className="summary-row">
              <span>عدد المنتجات:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row">
              <span>إجمالي المنتجات:</span>
              <span>{cartTotal.toLocaleString()} ريال</span>
            </div>
            <div className="summary-row">
              <span>رسوم التوصيل:</span>
              <span>مجاناً</span>
            </div>
            <div className="summary-row total">
              <span>المبلغ الإجمالي:</span>
              <span>{cartTotal.toLocaleString()} ريال</span>
            </div>
          </div>

          <div className="delivery-info">
            <h4>معلومات التوصيل</h4>
            <div className="form-group">
              <label>رقم الهاتف</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="أدخل رقم هاتفك"
                required
              />
            </div>
            <div className="form-group">
              <label>عنوان التوصيل</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="أدخل عنوان التوصيل بالتفصيل"
                rows="3"
                required
              />
            </div>
          </div>

          <button 
            className="btn-primary checkout-btn"
            onClick={handleCheckout}
            disabled={loading || !deliveryAddress.trim() || !phoneNumber.trim()}
          >
            {loading ? 'جاري إنشاء الطلب...' : 'إتمام الشراء'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;