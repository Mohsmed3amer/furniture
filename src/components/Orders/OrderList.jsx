import React from 'react';

const OrderList = ({ orders, onUpdateStatus }) => {
  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  if (orders.length === 0) {
    return <div className="no-orders">لا توجد طلبات</div>;
  }

  return (
    <div className="orders-table-container">
      <div className="orders-table">
        <div className="table-header">
          <div>رقم الطلب</div>
          <div>العميل</div>
          <div>التاريخ</div>
          <div>العنوان</div>
          <div>المبلغ</div>
          <div>الحالة</div>
          <div>الإجراءات</div>
        </div>
        {orders.map(order => (
          <div key={order.id} className="table-row">
            <div>#{order.id}</div>
            <div>
              <div>{order.customerName}</div>
              <div className="customer-email">{order.customerEmail}</div>
            </div>
            <div>{formatDate(order.orderDate)}</div>
            <div className="delivery-address">{order.deliveryAddress}</div>
            <div className="order-total">{order.total.toLocaleString()} ريال</div>
            <div>
              <span className={`status-badge status-${order.status}`}>
                {order.status === 'pending' && 'قيد الانتظار'}
                {order.status === 'processing' && 'قيد المعالجة'}
                {order.status === 'completed' && 'مكتمل'}
                {order.status === 'cancelled' && 'ملغي'}
              </span>
            </div>
            <div className="order-actions">
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                className="status-select"
              >
                <option value="pending">قيد الانتظار</option>
                <option value="processing">قيد المعالجة</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
              <button className="btn-secondary btn-sm">عرض التفاصيل</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;