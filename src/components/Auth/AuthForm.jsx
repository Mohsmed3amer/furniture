import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {type === 'register' && (
        <div className="form-group">
          <label>الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="أدخل اسمك الكامل"
          />
        </div>
      )}

      <div className="form-group">
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="example@email.com"
        />
      </div>

      <div className="form-group">
        <label>كلمة المرور</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="أدخل كلمة المرور"
          minLength="6"
        />
      </div>

      {type === 'register' && (
        <div className="form-group">
          <label>تأكيد كلمة المرور</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="أعد إدخال كلمة المرور"
            minLength="6"
          />
        </div>
      )}

      <button type="submit" className="btn-primary btn-auth">
        {type === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
      </button>
    </form>
  );
};

export default AuthForm;