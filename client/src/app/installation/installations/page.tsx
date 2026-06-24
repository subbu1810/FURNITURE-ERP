"use client";
import { useState } from "react";
import "./page.css";

function InstallationManagement() {

 const [showDetails, setShowDetails] = useState(false);
 const [selectedInstallation, setSelectedInstallation] = useState<any>(null);

  return (
    <div className="installation-page">

      

      {/* Top Bar */}
      <div className="topbar">
        <div>
          <h2>Installation Management</h2>
          <p>Installation &gt; Installations</p>
        </div>

        <div className="topbar-right">
          <select>
            <option>HSR Layout Warehouse</option>
          </select>

          <div className="notification">
            🔔
            <span>1</span>
          </div>

          <div className="admin">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
            />
            <span>Admin</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="cards">

  <div className="card">
    <div className="card-icon blue">🛠️</div>
    <div>
      <h4>Total Installations</h4>
      <h2>142</h2>
      <p>View all</p>
    </div>
  </div>

  <div className="card">
    <div className="card-icon green">✓</div>
    <div>
      <h4>Completed</h4>
      <h2>86</h2>
      <p>60.56% of total</p>
    </div>
  </div>

  <div className="card">
    <div className="card-icon orange">🕒</div>
    <div>
      <h4>In Progress</h4>
      <h2>32</h2>
      <p>22.54% of total</p>
    </div>
  </div>

  <div className="card">
    <div className="card-icon purple">📅</div>
    <div>
      <h4>Scheduled</h4>
      <h2>18</h2>
      <p>12.68% of total</p>
    </div>
  </div>

  <div className="card">
    <div className="card-icon red">✕</div>
    <div>
      <h4>Cancelled</h4>
      <h2>6</h2>
      <p>4.22% of total</p>
    </div>
  </div>

</div>

      {/* Filters */}
      <div className="filters">

  <select>
    <option>All Status</option>
  </select>

  <select>
    <option>All Outlets</option>
  </select>

  <select>
    <option>All Installers</option>
  </select>

  <input
    className="date-range"
    type="text"
    value="01 May 2025 - 17 May 2025"
    readOnly
  />

 <div className="search-box">
  <input
    type="text"
    placeholder="Search by Order No, Customer, Phone..."
  />
</div>

  <button>
    Filters
  </button>

  <button className="new-btn">
    + New Installation
  </button>

</div>

    {/* Main Content */}
<div className="content-wrapper">

  {/*  Table */}
  <div className="table-section">
    <table>
      <thead>
        <tr>
          <th>Installation No</th>
          <th>Order No</th>
          <th>Customer</th>
          <th>Outlet</th>
          <th>Schedule Date</th>
          <th>Installer / Team</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

  <tr>
    <td>INS-1256</td>
    <td>ORD-1256</td>
    <td>Ramesh Kumar</td>
    <td>HSR Layout</td>
    <td>17 May 2025</td>
    <td>Vikram Team</td>
    <td><span className="completed">Completed</span></td>
    <td className="action-cell">
 <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1256",
      orderNo: "ORD-1256",
      customer: "Ramesh Kumar",
      phone: "9876543210",
      installer: "Vikram Team",
      lead: "Vikram Naik",
      vehicle: "KA03AB1234",
      duration: "3h 30m",
      rating: "5.0",
      feedback:
        "Excellent service. Installation completed neatly."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1255</td>
    <td>ORD-1255</td>
    <td>Neha Singh</td>
    <td>HSR Layout</td>
    <td>17 May 2025</td>
    <td>Arun Team</td>
    <td><span className="progress">In Progress</span></td>
    <td className="action-cell">
 <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1255",
      orderNo: "ORD-1255",
      customer: "Neha Singh",
      phone: "9876543211",
      installer: "Arun Team",
      lead: "Arun Kumar",
      vehicle: "KA03AB5678",
      duration: "2h 15m",
      rating: "4.8",
      feedback:
        "Good installation service."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1254</td>
    <td>ORD-1254</td>
    <td>Arjun Prasad</td>
    <td>Marathahalli</td>
    <td>17 May 2025</td>
    <td>Manoj Team</td>
    <td><span className="scheduled">Scheduled</span></td>
    <td className="action-cell">
  <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1254",
      orderNo: "ORD-1254",
      customer: "Arjun Prasad",
      phone: "9876543212",
      installer: "Manoj Team",
      lead: "Manoj Kumar",
      vehicle: "KA03AB9012",
      duration: "4h 10m",
      rating: "4.9",
      feedback: "Installation completed successfully."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1253</td>
    <td>ORD-1253</td>
    <td>Priya Sharma</td>
    <td>Koramangala</td>
    <td>16 May 2025</td>
    <td>Ravi Team</td>
    <td><span className="progress">In Progress</span></td>
    <td className="action-cell">
  <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1253",
      orderNo: "ORD-1253",
      customer: "Priya Sharma",
      phone: "9876543213",
      installer: "Ravi Team",
      lead: "Ravi Kumar",
      vehicle: "KA03AB3456",
      duration: "3h 00m",
      rating: "4.7",
      feedback: "Very professional service."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1252</td>
    <td>ORD-1252</td>
    <td>Suresh Babu</td>
    <td>Whitefield</td>
    <td>16 May 2025</td>
    <td>Vikram Team</td>
    <td><span className="completed">Completed</span></td>
    <td className="action-cell">
 <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1252",
      orderNo: "ORD-1252",
      customer: "Suresh Babu",
      phone: "9876543214",
      installer: "Vikram Team",
      lead: "Vikram Naik",
      vehicle: "KA03AB7777",
      duration: "3h 45m",
      rating: "5.0",
      feedback: "Excellent installation."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1251</td>
    <td>ORD-1251</td>
    <td>Karthik Reddy</td>
    <td>HSR Layout</td>
    <td>16 May 2025</td>
    <td>Arun Team</td>
    <td><span className="scheduled">Scheduled</span></td>
    <td className="action-cell">
 <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1251",
      orderNo: "ORD-1251",
      customer: "Karthik Reddy",
      phone: "9876543215",
      installer: "Arun Team",
      lead: "Arun Kumar",
      vehicle: "KA03AB8888",
      duration: "2h 50m",
      rating: "4.6",
      feedback: "Good and timely installation."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1250</td>
    <td>ORD-1250</td>
    <td>Pooja Nair</td>
    <td>Jayanagar</td>
    <td>15 May 2025</td>
    <td>Manoj Team</td>
    <td><span className="completed">Completed</span></td>
    <td className="action-cell">
  <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1250",
      orderNo: "ORD-1250",
      customer: "Pooja Nair",
      phone: "9876543216",
      installer: "Manoj Team",
      lead: "Manoj Kumar",
      vehicle: "KA03AB9999",
      duration: "3h 20m",
      rating: "4.9",
      feedback: "Installation was neat and clean."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1249</td>
    <td>ORD-1249</td>
    <td>Vijay Shetty</td>
    <td>Marathahalli</td>
    <td>15 May 2025</td>
    <td>Ravi Team</td>
    <td><span className="cancelled">Cancelled</span></td>
    <td className="action-cell">
  <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1249",
      orderNo: "ORD-1249",
      customer: "Vijay Shetty",
      phone: "9876543217",
      installer: "Ravi Team",
      lead: "Ravi Kumar",
      vehicle: "KA03AB4321",
      duration: "Cancelled",
      rating: "0",
      feedback: "Installation cancelled."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1248</td>
    <td>ORD-1248</td>
    <td>Anitha Iyer</td>
    <td>Koramangala</td>
    <td>15 May 2025</td>
    <td>Arun Team</td>
    <td><span className="progress">In Progress</span></td>
   <td className="action-cell">
<button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1248",
      orderNo: "ORD-1248",
      customer: "Anitha Iyer",
      phone: "9876543218",
      installer: "Arun Team",
      lead: "Arun Kumar",
      vehicle: "KA03AB2468",
      duration: "2h 40m",
      rating: "4.8",
      feedback: "Satisfied with installation."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

  <tr>
    <td>INS-1247</td>
    <td>ORD-1247</td>
    <td>Harish Bhat</td>
    <td>Whitefield</td>
    <td>14 May 2025</td>
    <td>Vikram Team</td>
    <td><span className="scheduled">Scheduled</span></td>
   <td className="action-cell">
  <button
  className="view-btn"
  onClick={() => {
    setSelectedInstallation({
      installationNo: "INS-1247",
      orderNo: "ORD-1247",
      customer: "Harish Bhat",
      phone: "9876543219",
      installer: "Vikram Team",
      lead: "Vikram Naik",
      vehicle: "KA03AB1357",
      duration: "3h 10m",
      rating: "4.9",
      feedback: "Excellent service and support."
    });

    setShowDetails(true);
  }}
>
  👁 View
</button>
</td>
  </tr>

</tbody>
    </table>
  </div>
</div>

{showDetails && (
  <div className="modal-overlay">
    <div className="details-modal">

      <div className="modal-header">
        <h2>Installation Details</h2>

        <button
          className="close-btn"
          onClick={() => setShowDetails(false)}
        >
          ✕
        </button>
      </div>

      <div className="detail-grid">

        <div>
  <strong>Installation No</strong>
  <p>{selectedInstallation?.installationNo}</p>
</div>

        <div>
          <strong>Order No</strong>
          <p>{selectedInstallation?.orderNo}</p>
        </div>

        <div>
          <strong>Customer</strong>
          <p>{selectedInstallation?.customer}</p>
        </div>

        <div>
          <strong>Phone</strong>
         <p>{selectedInstallation?.phone}</p>
        </div>

      </div>

      <h3>Installation Progress</h3>

      <div className="timeline">

        <div className="timeline-step">
          <div className="circle"></div>
          <h5>Scheduled</h5>
        </div>

        <div className="timeline-step">
          <div className="circle"></div>
          <h5>Dispatched</h5>
        </div>

        <div className="timeline-step">
          <div className="circle"></div>
          <h5>On Site</h5>
        </div>

        <div className="timeline-step">
          <div className="circle"></div>
          <h5>Completed</h5>
        </div>

      </div>

      <div className="detail-tabs">
        <span className="active-tab">Overview</span>
        <span>Items</span>
        <span>Checklist</span>
        <span>Photos</span>
        <span>Notes</span>
        <span>History</span>
      </div>

      <div className="overview-content">

        <div>
          <p><strong>Installer:</strong> Vikram Team</p>
          <p>
  <strong>Lead:</strong>{" "}
  {selectedInstallation?.lead}
</p>
         <p>
  <strong>Vehicle:</strong>{" "}
  {selectedInstallation?.vehicle}
</p>
          <p>
  <strong>Duration:</strong>{" "}
  {selectedInstallation?.duration}
</p>
        </div>

        <div className="feedback-box">
  <h4>Customer Feedback</h4>

  <div className="rating">
    ⭐⭐⭐⭐⭐ <span>{selectedInstallation?.rating}</span>
  </div>

  <p>{selectedInstallation?.feedback}</p>
</div>

      </div>

    </div>
  </div>
)}

</div>

 );
}

export default InstallationManagement;