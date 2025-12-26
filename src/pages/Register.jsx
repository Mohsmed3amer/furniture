import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';

const Register = ({ onLogin }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // التحقق من البيانات
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('يرجى ملء جميع الحقول');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('كلمات المرور غير متطابقة');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
      }

      // إنشاء مستخدم جديد
      const newUser = {
        id: Date.now(), // معرف فريد مؤقت
        name: formData.name,
        email: formData.email,
        role: 'user', // دائماً مستخدم عادي
        phone: '',
        address: '',
        joinDate: new Date().toISOString().split('T')[0]
      };

      setSuccess(true);
      
      // تسجيل الدخول تلقائياً بعد التسجيل
      setTimeout(() => {
        onLogin({
          token: 'fake-jwt-token',
          user: newUser
        });
        navigate('/dashboard');
      }, 1500);
      
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>إنشاء حساب جديد</h2>
          <p>انضم إلينا في معرض الأثاث</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">تم إنشاء الحساب بنجاح! سيتم توجيهك...</div>}
        
        <AuthForm 
          type="register"
          onSubmit={handleSubmit}
        />
        
        <div className="auth-footer">
          <p>
            لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;