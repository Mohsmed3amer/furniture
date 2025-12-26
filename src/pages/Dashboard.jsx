import React, { useState, useEffect } from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentOrders from '../components/Dashboard/RecentOrders';
import { productAPI, orderAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productAPI.getAll(),
        orderAPI.getAll(),
      ]);

      const totalProducts = productsRes.data.length;
      const totalOrders = ordersRes.data.length;
      const pendingOrders = ordersRes.data.filter(order => order.status === 'pending').length;
      const revenue = ordersRes.data
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.total, 0);

      setStats({
        totalProducts,
        totalOrders,
        pendingOrders,
        revenue,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">جاري التحميل...</div>;
  }

  return (
    <div className="dashboard">
      <h2 className="page-title">لوحة التحكم</h2>
      
      <div className="stats-grid">
        <StatsCard
          title="إجمالي المنتجات"
          value={stats.totalProducts}
          icon="🛋️"
          color="blue"
        />
        <StatsCard
          title="إجمالي الطلبات"
          value={stats.totalOrders}
          icon="📦"
          color="green"
        />
        <StatsCard
          title="طلبات قيد الانتظار"
          value={stats.pendingOrders}
          icon="⏳"
          color="orange"
        />
        <StatsCard
          title="الإيرادات"
          value={`${stats.revenue.toFixed(2)} ريال`}
          icon="💰"
          color="purple"
        />
      </div>

      
    </div>
  );
};

export default Dashboard;