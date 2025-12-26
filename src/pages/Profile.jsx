import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // جلب بيانات المستخدم من localStorage
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setEditForm({
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          phone: parsedUser.phone || '',
          address: parsedUser.address || ''
        });

        // جلب طلبات المستخدم من API
        try {
          const ordersResponse = await orderAPI.getAll();
          const userOrders = ordersResponse.data.filter(
            order => order.customerId === parsedUser.id
          );
          setOrders(userOrders);
        } catch (orderError) {
          console.error('Error fetching orders:', orderError);
          // استخدام بيانات افتراضية إذا فشل الاتصال
          setOrders([
            {
              id: 1,
              customerId: parsedUser.id,
              total: 2500,
              status: 'completed',
              orderDate: '2023-10-10'
            },
            {
              id: 2,
              customerId: parsedUser.id,
              total: 1800,
              status: 'pending',
              orderDate: '2023-10-15'
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // تحديث البيانات في localStorage
      const updatedUser = { ...user, ...editForm };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      localStorage.setItem('username', updatedUser.name);
      
      setUser(updatedUser);
      setIsEditing(false);
      alert('تم تحديث بياناتك بنجاح');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('حدث خطأ أثناء تحديث البيانات');
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      completed: 'مكتمل',
      cancelled: 'ملغي'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const statusClassMap = {
      pending: 'status-pending',
      processing: 'status-processing',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return statusClassMap[status] || 'status-default';
  };

  if (loading) {
    return <div className="loading">جاري تحميل البيانات...</div>;
  }

  if (!user) {
    return (
      <div className="error">
        <p>لم يتم العثور على بيانات المستخدم</p>
        <button 
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const userOrdersTotal = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'processing'
  ).length;

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2 className="page-title">الملف الشخصي</h2>
        <button 
          className="btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}
        </button>
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">
            {user.name?.charAt(0) || 'م'}
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p className="member-since">
              عضو منذ: {user.joinDate ? new Date(user.joinDate).getFullYear() : '2023'}
            </p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-form-section">
            <h3>البيانات الشخصية</h3>
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label>رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label>العنوان</label>
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  required
                />
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    حفظ التغييرات
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="profile-stats-section">
            <h3>إحصائياتي</h3>
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-content">
                  <h4>إجمالي الطلبات</h4>
                  <p className="stat-value">{orders.length}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h4>الطلبات النشطة</h4>
                  <p className="stat-value">{activeOrders}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h4>إجمالي المشتريات</h4>
                  <p className="stat-value">{userOrdersTotal.toLocaleString()} ريال</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <h4>العضو منذ</h4>
                  <p className="stat-value">
                    {user.joinDate ? new Date(user.joinDate).getFullYear() : '2023'}
                  </p>
                </div>
              </div>
            </div>

            <div className="recent-orders-section">
              <h3>آخر الطلبات</h3>
              {orders.length === 0 ? (
                <p className="no-orders">لا توجد طلبات سابقة</p>
              ) : (
                <div className="orders-mini-table">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="order-mini-row">
                      <div className="order-id">#{order.id}</div>
                      <div className="order-date">{order.orderDate}</div>
                      <div className="order-total">{order.total.toLocaleString()} ريال</div>
                      <div className={`order-status ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;