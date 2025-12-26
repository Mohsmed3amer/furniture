import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      // عرض آخر 5 طلبات فقط
      setOrders(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'قيد الانتظار' },
      processing: { class: 'status-processing', text: 'قيد المعالجة' },
      completed: { class: 'status-completed', text: 'مكتمل' },
      cancelled: { class: 'status-cancelled', text: 'ملغي' }
    };
    
    const config = statusConfig[status] || { class: 'status-default', text: status };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return <div className="loading">جاري تحميل الطلبات...</div>;
  }

  return (
    <div className="recent-orders">
      <h3>آخر الطلبات</h3>
      {orders.length === 0 ? (
        <p className="no-orders">لا توجد طلبات حديثة</p>
      ) : (
        <div className="orders-table">
          <div className="table-header">
            <div>رقم الطلب</div>
            <div>العميل</div>
            <div>التاريخ</div>
            <div>المبلغ</div>
            <div>الحالة</div>
          </div>
          {orders.map(order => (
            <div key={order.id} className="table-row">
              <div>#{order.id}</div>
              <div>{order.customerName}</div>
              <div>{order.orderDate}</div>
              <div>{order.total.toLocaleString()} ريال</div>
              <div>{getStatusBadge(order.status)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;