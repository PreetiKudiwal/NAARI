import React from 'react'
import { FaUser, FaChartLine, FaCogs, FaShoppingCart } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function AdminDashBoard() {

  const StatCard = ({ label, value, helpText, icon: Icon, bgColor = 'backgroundColor' }) => (
    <div className={`${bgColor} text-white p-6 rounded-2xl shadow-md w-full md:w-1/4`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-gray-400 text-sm font-medium">{label}</h4>
        <Icon className="text-purple-400 text-xl" />
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-green-400 text-sm mt-2">{helpText}</p>
    </div>
  );

  const lineData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4000 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 7000 },
  ];
  
  const barData = [
    { name: 'Week 1', users: 400 },
    { name: 'Week 2', users: 800 },
    { name: 'Week 3', users: 600 },
    { name: 'Week 4', users: 1000 },
  ];
  
  

  return (
    <div className="m-4 mt-8">
        <h2 className="text-2xl font-bold my-4 text-white">Dashboard</h2>

      {/* Stats */}
      <div className="flex gap-6 mb-10">
        <StatCard
          label="Total Users"
          value="12,984"
          helpText="+230 this month"
          icon={FaUser}
        />
        <StatCard
          label="Orders This Month"
          value="2,340"
          helpText="+150 new orders"
          icon={FaShoppingCart}
        />
        <StatCard
          label="Monthly Revenue"
          value="$83,000"
          helpText="+6.5% growth"
          icon={FaChartLine}
        />
        <StatCard
          label="System Health"
          value="95%"
          helpText="Stable"
          icon={FaCogs}
        />
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className=" text-white p-6 rounded-2xl shadow-md"style={{
      background: "linear-gradient(145deg, #1a1a1a 0%, #2e2e2e 5%, #000000 100%)"
    }}>
          <h2 className="text-lg mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#CBD5E1" />
              <YAxis stroke="#CBD5E1" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
              <Line type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="text-white p-6 rounded-2xl shadow-md"style={{
      background: "linear-gradient(90deg, #1a1a1a 0%, #2e2e2e 5%, #000000 100%)"
    }}>
          <h2 className="text-lg mb-4">Weekly Active Users</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#CBD5E1" />
              <YAxis stroke="#CBD5E1" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
              <Bar dataKey="users" fill="#34D399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
