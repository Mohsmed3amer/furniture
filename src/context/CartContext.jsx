import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // قاعدة بيانات محاكاة للعربة (يمكن استبدالها بـ JSON Server)
  const mockCartData = [
    // بيانات افتراضية للعربة
  ];

  useEffect(() => {
    // تحميل العربة من localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setCartItems(cartData);
        updateCartStats(cartData);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);

  const updateCartStats = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setCartCount(count);
    setCartTotal(total);
    
    // حفظ في localStorage
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      // تحديث الكمية إذا المنتج موجود بالفعل
      updatedCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // إضافة منتج جديد
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        stock: product.stock
      };
      updatedCart = [...cartItems, newItem];
    }
    
    setCartItems(updatedCart);
    updateCartStats(updatedCart);
    
    return true;
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    updateCartStats(updatedCart);
    return true;
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(productId);
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    );
    
    setCartItems(updatedCart);
    updateCartStats(updatedCart);
    return true;
  };

  const clearCart = () => {
    setCartItems([]);
    updateCartStats([]);
    localStorage.removeItem('cart');
    return true;
  };

  const checkout = async (orderData) => {
    try {
      // في التطبيق الحقيقي، هنا سيتم إرسال الطلب للخادم
      console.log('Order data:', orderData);
      
      // تفريغ العربة بعد الشراء
      clearCart();
      return { success: true, message: 'تم إنشاء الطلب بنجاح' };
    } catch (error) {
      console.error('Error during checkout:', error);
      return { success: false, message: 'حدث خطأ أثناء إنشاء الطلب' };
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};