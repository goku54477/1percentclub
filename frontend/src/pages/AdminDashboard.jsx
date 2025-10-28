import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Users, ShoppingCart, LogOut } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('waitlist');
  const [waitlistData, setWaitlistData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');
  const username = localStorage.getItem('adminUsername');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = activeTab === 'waitlist' ? '/api/admin/waitlist' : '/api/admin/orders';
      const response = await fetch(`${BACKEND_URL}${endpoint}?token=${token}`);
      
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        navigate('/admin/login');
        return;
      }

      const data = await response.json();

      if (data.success) {
        if (activeTab === 'waitlist') {
          setWaitlistData(data.data);
        } else {
          setOrdersData(data.data);
        }
      } else {
        setError(data.detail || 'Failed to load data');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Load data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const endpoint = activeTab === 'waitlist' ? '/api/admin/waitlist/download' : '/api/admin/orders/download';
      const response = await fetch(`${BACKEND_URL}${endpoint}?token=${token}`);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeTab === 'waitlist' ? 'waitlist_submissions.xlsx' : 'order_submissions.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to download file');
      console.error('Download error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/admin/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    } catch (err) {
      console.error('Logout error:', err);
    }

    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const currentData = activeTab === 'waitlist' ? waitlistData : ordersData;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
              alt="1% Logo"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-zinc-400 text-sm">Welcome, {username}</p>
            </div>
          </div>
          
          <Button
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'waitlist'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            Waitlist ({waitlistData.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'orders'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Orders ({ordersData.length})
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {activeTab === 'waitlist' ? 'Waitlist Submissions' : 'Order Submissions'}
          </h2>
          <Button
            onClick={handleDownload}
            disabled={currentData.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Excel
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Data Table */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-zinc-400">
              Loading data...
            </div>
          ) : currentData.length === 0 ? (
            <div className="p-12 text-center text-zinc-400">
              No {activeTab === 'waitlist' ? 'waitlist submissions' : 'orders'} found yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-800">
                  <tr>
                    {activeTab === 'waitlist' ? (
                      <>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Date</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Customer Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Address</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Items</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Date</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {currentData.map((item, index) => (
                    <tr key={index} className="hover:bg-zinc-800/50 transition-colors">
                      {activeTab === 'waitlist' ? (
                        <>
                          <td className="px-6 py-4 text-sm text-white">
                            {item.firstName} {item.lastName}
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{item.email}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{item.phone}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-sm text-white">{item.customerName}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{item.customerEmail}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{item.customerPhone}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300 max-w-xs truncate">
                            {item.customerAddress}
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{item.items}</td>
                          <td className="px-6 py-4 text-sm text-yellow-500 font-semibold">
                            ₹{item.total?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-300">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
