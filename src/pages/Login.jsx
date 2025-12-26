import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';

const Login = ({ onLogin }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // محاكاة للمصادقة مع بيانات ثابتة
      let user;
      
      if (formData.email === 'admin@furniture.com' && formData.password === 'admin123') {
        user = {
          id: 1,
          name: 'مدير النظام',
          email: 'admin@furniture.com',
          role: 'admin',
          phone: '+966500000001',
          address: 'الرياض، المملكة العربية السعودية',
          joinDate: '2023-01-01'
        };
      } else if (formData.email === 'user@furniture.com' && formData.password === 'user123') {
        user = {
          id: 2,
          name: 'مستخدم عادي',
          email: 'user@furniture.com',
          role: 'user',
          phone: '+966500000002',
          address: 'جدة، المملكة العربية السعودية',
          joinDate: '2023-06-15'
        };
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        return;
      }

      // استدعاء onLogin مع البيانات الصحيحة
      onLogin({
        token: 'fake-jwt-token',
        user: user
      });
      
      navigate('/dashboard');
      
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>تسجيل الدخول</h2>
          <p>مرحباً بعودتك إلى معرض الأثاث</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <AuthForm 
          type="login"
          onSubmit={handleSubmit}
        />
        
        <div className="auth-footer">
          <p>
            ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
          </p>
          <p>
            <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;