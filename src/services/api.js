import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة التوكن لطلبات المصادقة
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// خدمات المنتجات
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

// خدمات الطلبات
export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (order) => api.post('/orders', order),
  update: (id, order) => api.put(`/orders/${id}`, order),
  delete: (id) => api.delete(`/orders/${id}`),
  getByUserId: (userId) => api.get(`/orders?customerId=${userId}`),
};

// خدمات المستخدمين (محاكاة)
export const userAPI = {
  getProfile: () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return Promise.resolve({ data: JSON.parse(userData) });
    }
    return Promise.reject(new Error('No user data found'));
  },
  
  updateProfile: (data) => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const currentUser = JSON.parse(userData);
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      localStorage.setItem('username', updatedUser.name);
      return Promise.resolve({ data: updatedUser });
    }
    return Promise.reject(new Error('No user data found'));
  }
};

// دالة تسجيل الدخول المبسطة
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@furniture.com' && password === 'admin123') {
        resolve({
          success: true,
          data: {
            token: 'fake-jwt-token',
            user: {
              id: 1,
              name: 'مدير النظام',
              email: 'admin@furniture.com',
              role: 'admin',
              phone: '+966500000001',
              address: 'الرياض، المملكة العربية السعودية',
              joinDate: '2023-01-01'
            }
          }
        });
      } else if (email === 'user@furniture.com' && password === 'user123') {
        resolve({
          success: true,
          data: {
            token: 'fake-jwt-token',
            user: {
              id: 2,
              name: 'مستخدم عادي',
              email: 'user@furniture.com',
              role: 'user',
              phone: '+966500000002',
              address: 'جدة، المملكة العربية السعودية',
              joinDate: '2023-06-15'
            }
          }
        });
      } else {
        reject(new Error('بيانات الدخول غير صحيحة'));
      }
    }, 500);
  });
};

// دالة تسجيل مستخدم جديد
export const registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password) {
        resolve({
          success: true,
          data: {
            token: 'fake-jwt-token',
            user: {
              id: Date.now(),
              name: userData.name,
              email: userData.email,
              role: 'user',
              phone: userData.phone || '',
              address: userData.address || '',
              joinDate: new Date().toISOString().split('T')[0]
            }
          }
        });
      } else {
        reject(new Error('بيانات غير كاملة'));
      }
    }, 500);
  });
};

export default api;