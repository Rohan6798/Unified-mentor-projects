import React, { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';
import { InfoCard } from './components/InfoCard';
import { Chart } from './components/Chart';

function App() {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Simulate increasing active users
    const interval = setInterval(() => {
      setActiveUsers(prev => (prev + 1) % 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const monthlyData = [65, 59, 80, 81, 56, 55, 40];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interactive Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time analytics and insights</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard
            title="Active Users"
            value={activeUsers.toString()}
            change={12.5}
            description="Total users active in the last 24 hours"
          />
          <InfoCard
            title="Revenue"
            value="$45,231"
            change={8.2}
            description="Total revenue this month"
          />
          <InfoCard
            title="Conversion Rate"
            value="3.24%"
            change={-2.1}
            description="Compared to last month"
          />
          <InfoCard
            title="Growth"
            value="+2,345"
            change={14.8}
            description="New users this week"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Trends</h2>
          <Chart data={monthlyData} labels={monthLabels} height={300} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
              <BarChart3 className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page Views</span>
                <span className="font-semibold">124,563</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bounce Rate</span>
                <span className="font-semibold">32.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Session</span>
                <span className="font-semibold">4m 23s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Analytics visualization"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">Data Insights</h3>
            <p className="text-gray-600 mt-2">
              Analyze your performance metrics and make data-driven decisions to improve your business outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;