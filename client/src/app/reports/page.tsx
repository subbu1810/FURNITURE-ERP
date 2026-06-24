"use client";
import "./page.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  FaChartLine,
  FaCouch,
  FaBox,
  FaTruck,
  FaTools,
  FaFileAlt,
  FaWarehouse,
  FaIndustry,
  FaMoneyBillWave,
  FaBell,
  FaSyncAlt,
  FaUserCircle,
} from "react-icons/fa";

function ReportsAnalytics() {

    const revenueData = [
  { name: "01 May", revenue: 30, profit: 12 },
  { name: "03 May", revenue: 35, profit: 18 },
  { name: "05 May", revenue: 28, profit: 14 },
  { name: "07 May", revenue: 34, profit: 19 },
  { name: "09 May", revenue: 40, profit: 22 },
  { name: "11 May", revenue: 32, profit: 15 },
  { name: "13 May", revenue: 38, profit: 20 },
  { name: "15 May", revenue: 36, profit: 18 },
  { name: "17 May", revenue: 43, profit: 21 },
];

const categoryData = [
  { name: "Sofas", value: 32.6 },
  { name: "Beds", value: 21.8 },
  { name: "Dining", value: 17.4 },
  { name: "Wardrobes", value: 12.6 },
  { name: "Tables", value: 8.9 },
  { name: "Others", value: 6.7 },
];

const outletData = [
  { name: "HSR Layout", sales: 48 },
  { name: "Jayanagar", sales: 28 },
  { name: "Whitefield", sales: 19 },
  { name: "Marathahalli", sales: 15 },
  { name: "Koramangala", sales: 12 },
];

const orderStatusData = [
  { name: "Delivered", value: 184 },
  { name: "In Transit", value: 68 },
  { name: "Pending", value: 54 },
  { name: "Cancelled", value: 28 },
  { name: "Failed", value: 18 },
];

const monthlyTrendData = [
  { month: "Jan", revenue: 45 },
  { month: "Feb", revenue: 60 },
  { month: "Mar", revenue: 80 },
  { month: "Apr", revenue: 110 },
  { month: "May", revenue: 125 },
  { month: "Jun", revenue: 70 },
  { month: "Jul", revenue: 50 },
  { month: "Aug", revenue: 65 },
  { month: "Sep", revenue: 75 },
  { month: "Oct", revenue: 95 },
  { month: "Nov", revenue: 110 },
  { month: "Dec", revenue: 130 },
];

const STATUS_COLORS = [
  "#22c55e",
  "#2563eb",
  "#f59e0b",
  "#ef4444",
  "#94a3b8",
];

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#94a3b8",
];

  return (
    <div className="reports-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Get insights into your business performance</p>
        </div>

        <div className="header-actions">

  <select>
    <option>HSR Layout (All Outlets)</option>
  </select>

  <input
    type="text"
    value="01 May 2025 - 17 May 2025"
    readOnly
  />

  <button className="icon-btn">
    <FaSyncAlt />
  </button>

  <div className="notification">
    <FaBell />
    <span>12</span>
  </div>

  <div className="admin-profile">
    <FaUserCircle />
    <div>
      <h5>Admin</h5>
      <small>Super Admin</small>
    </div>
  </div>

  <button className="export-btn">
    Export Report
  </button>

</div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="active">Overview</button>
        <button>Sales</button>
        <button>Inventory</button>
        <button>Manufacturing</button>
        <button>Delivery</button>
        <button>Installation</button>
        <button>Financials</button>
      </div>

      {/* KPI Cards */}
<div className="stats-grid">

  <div className="stat-card">
    <div className="icon blue">📈</div>
    <div>
      <p>Total Revenue</p>
      <h2>₹ 1,24,58,600</h2>
      <span>↑ 18.6% vs previous period</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="icon green">🛒</div>
    <div>
      <p>Total Orders</p>
      <h2>352</h2>
      <span>↑ 12.4% vs previous period</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="icon purple">💼</div>
    <div>
      <p>Gross Profit</p>
      <h2>₹ 28,76,450</h2>
      <span>↑ 16.2% vs previous period</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="icon orange">💰</div>
    <div>
      <p>Net Profit</p>
      <h2>₹ 14,68,820</h2>
      <span>↑ 14.8% vs previous period</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="icon cyan">👥</div>
    <div>
      <p>Total Customers</p>
      <h2>1,285</h2>
      <span>↑ 10.3% vs previous period</span>
    </div>
  </div>

</div>

{/* Analytics Row */}
<div className="analytics-grid">

  {/* Revenue Overview */}
  <div className="chart-card revenue-card">
    <div className="card-header">
      <h3>Revenue Overview</h3>

      <select>
        <option>Daily</option>
      </select>
    </div>

    <div className="chart-area">
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#2563eb"
        strokeWidth={3}
      />

      <Line
        type="monotone"
        dataKey="profit"
        stroke="#22c55e"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
  </div>

  {/* Sales by Category */}
  <div className="chart-card category-card">
    <div className="card-header">
      <h3>Sales by Category</h3>
    </div>

    <div className="donut-wrapper">

  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={80}
        dataKey="value"
      >
        {categoryData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

  <div className="category-list">
    {categoryData.map((item, index) => (
      <div className="category-item" key={index}>
        <span
          className="dot"
          style={{ background: COLORS[index] }}
        ></span>

        <span>{item.name}</span>

        <strong>{item.value}%</strong>
      </div>
    ))}
  </div>

</div>
  </div>

  {/* Sales by Outlet */}
  <div className="chart-card outlet-card">
    <div className="card-header">
      <h3>Sales by Outlet</h3>

      <select>
        <option>This Month</option>
      </select>
    </div>

    <div className="chart-area">

  <ResponsiveContainer width="100%" height={260}>
    <BarChart
      data={outletData}
      layout="vertical"
      margin={{
        top: 10,
        right: 20,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis
        type="category"
        dataKey="name"
        width={90}
      />
      <Tooltip />

      <Bar
        dataKey="sales"
        fill="#2563eb"
        radius={[0, 6, 6, 0]}
      />
    </BarChart>
  </ResponsiveContainer>

</div>
  </div>

</div>

{/* Second Row */}
<div className="second-row">

<div className="dashboard-card">
  <h3>Order Status Summary</h3>

  <div className="status-wrapper">

    <div className="status-chart">

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={orderStatusData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
          >
            {orderStatusData.map((entry, index) => (
              <Cell
                key={index}
                fill={STATUS_COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="status-center">
        <h2>352</h2>
        <span>Total Orders</span>
      </div>

    </div>

    <div className="status-legend">

      <div>🟢 Delivered - 184</div>
      <div>🔵 In Transit - 68</div>
      <div>🟠 Pending - 54</div>
      <div>🔴 Cancelled - 28</div>
      <div>⚫ Failed - 18</div>

    </div>

  </div>
</div>

 <div className="dashboard-card">
  <h3>Monthly Trend (Revenue)</h3>

  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={monthlyTrendData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="revenue"
        fill="#2563eb"
        radius={[6, 6, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

 <div className="dashboard-card product-card">
  <h3>Top 5 Best Selling Products</h3>

  <div className="table-wrapper">
    <table className="product-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Category</th>
      <th>Qty Sold</th>
      <th>Revenue</th>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td>3 Seater Sofa</td>
      <td>Sofas</td>
      <td>156</td>
      <td>₹19,68,000</td>
    </tr>

    <tr>
      <td>King Size Bed</td>
      <td>Beds</td>
      <td>112</td>
      <td>₹15,23,200</td>
    </tr>

    <tr>
      <td>Dining Table</td>
      <td>Dining</td>
      <td>98</td>
      <td>₹11,76,000</td>
    </tr>

    <tr>
      <td>Wardrobe 3 Door</td>
      <td>Wardrobes</td>
      <td>86</td>
      <td>₹9,46,000</td>
    </tr>

    <tr>
      <td>Center Table</td>
      <td>Tables</td>
      <td>74</td>
      <td>₹6,35,000</td>
    </tr>

  </tbody>
</table>
</div>
</div>

</div>

<div className="insights-section">

  <h3>Quick Insights</h3>

  <div className="insights-grid">

    <div className="insight-card">
      <span><FaChartLine /></span>
      <p>Revenue this month is 18.6% higher</p>
    </div>

    <div className="insight-card">
      <span><FaCouch /></span>
      <p>Sofas are the top category</p>
    </div>

    <div className="insight-card">
      <span><FaBox /></span>
      <p>Inventory worth ₹2,34,56,780</p>
    </div>

    <div className="insight-card">
      <span><FaTruck /></span>
      <p>32 deliveries in transit</p>
    </div>

    <div className="insight-card">
      <span><FaTools /></span>
      <p>18 installations scheduled</p>
    </div>

  </div>

</div>

<div className="shortcuts-card">

  <h3>Report Shortcuts</h3>

  <div className="shortcuts-grid">

    <button><FaFileAlt /> Sales Report</button>

    <button><FaWarehouse /> Inventory Report</button>

    <button><FaIndustry /> Production Report</button>

    <button><FaTruck /> Delivery Report</button>

    <button><FaTools /> Installation Report</button>

    <button><FaMoneyBillWave /> Financial Report</button>

  </div>

</div>

    </div>
  );
}

export default ReportsAnalytics;