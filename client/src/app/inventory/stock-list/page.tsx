"use client";
import {
  FaBox,
  FaWarehouse,
  FaSearch,
  FaExclamationTriangle,
  FaTimesCircle,
  FaEye,
  FaEllipsisV,
  FaFilter,
} from "react-icons/fa";

import "./page.css";

function StockList() {
  return (
    <div className="layout">
      

      {/* Main Content */}
      <div className="main">


        {/* Topbar */}
        <div className="topbar">
          <div>
            <h2>Stock List</h2>

            <div className="breadcrumb">
              Inventory &gt; Stock List
            </div>
          </div>

          <div className="header-right">
            <select className="branch-select">
              <option>HSR Layout Outlet</option>
            </select>

            <div className="notification">
              🔔
              <span className="notification-badge">5</span>
            </div>

            <div className="profile">
              <div className="profile-avatar">A</div>
              <span>Admin</span>
            </div>

            <div className="actions">
              <button>Export</button>
              <button className="stockBtn">+ Stock In</button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <div className="card-icon icon-blue">
              <FaBox />
            </div>

            <h4>Total Items</h4>
            <h2>2,340</h2>

            <p className="card-link">View all items →</p>
          </div>

          <div className="card">
            <div className="card-icon icon-green">
              <FaWarehouse />
            </div>

            <h4>In Stock</h4>
            <h2>1,856</h2>

            <p className="card-percent green-text">
              79.31% of total
            </p>
          </div>

          <div className="card">
            <div className="card-icon icon-orange">
              <FaExclamationTriangle />
            </div>

            <h4>Low Stock</h4>
            <h2>156</h2>

            <p className="card-percent orange-text">
              6.67% of total
            </p>
          </div>

          <div className="card">
            <div className="card-icon icon-red">
              <FaTimesCircle />
            </div>

            <h4>Out Of Stock</h4>
            <h2>28</h2>

            <p className="card-percent red-text">
              1.20% of total
            </p>
          </div>

          <div className="card">
            <div className="card-icon icon-blue">₹</div>

            <h4>Stock Value</h4>
            <h2>₹1,24,58,600</h2>

            <p className="card-link">View valuation →</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <select>
            <option>All Categories</option>
          </select>

          <select>
            <option>All Warehouses</option>
          </select>

          <select>
            <option>All Locations</option>
          </select>

          <select>
            <option>All Status</option>
          </select>

          <div className="search">
            <FaSearch />
            <input
              placeholder="Search by product / SKU / Barcode"
            />
          </div>

          <button className="filter-btn">
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Table */}

<div className="table-container">
  <table>
    <thead>
      <tr>
        <th><input type="checkbox" /></th>
        <th>Image</th>
        <th>SKU / Barcode</th>
        <th>Product</th>
        <th>Category</th>
        <th>Warehouse</th>
        <th>Location</th>
        <th>Available Qty</th>
        <th>Unit</th>
        <th>Status</th>
        <th>Value</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {/* Row 1 */}
      <tr>
        <td><input type="checkbox" /></td>

        <td>
          <img
            src="../src/assets/sofa.png"
            alt="Sofa"
            className="product-img"
          />
        </td>

        <td>
          <strong>SOF-001</strong>
          <div className="barcode">8901234567890</div>
        </td>

        <td>3 Seater Sofa</td>
        <td>Sofas</td>
        <td>Main Warehouse</td>
        <td>Aisle 01 - Rack 01</td>
        <td><span className="qty-green">15</span></td>
        <td>Nos</td>
        <td><span className="green">In Stock</span></td>
        <td>₹4,87,500</td>

        <td>
          <div className="action-icons">
            <FaEye />
            <FaEllipsisV />
          </div>
        </td>
      </tr>

      {/* Row 2 */}
      <tr>
        <td><input type="checkbox" /></td>

        <td>
          <img
            src="../src/assets/bed.png"
            alt="Bed"
            className="product-img"
          />
        </td>

        <td>
          <strong>BED-001</strong>
          <div className="barcode">8901234567891</div>
        </td>

        <td>King Size Bed</td>
        <td>Beds</td>
        <td>Main Warehouse</td>
        <td>Aisle 02 - Rack 03</td>
        <td><span className="qty-green">10</span></td>
        <td>Nos</td>
        <td><span className="green">In Stock</span></td>
        <td>₹3,90,000</td>

        <td>
          <div className="action-icons">
            <FaEye />
            <FaEllipsisV />
          </div>
        </td>
      </tr>

      {/* Row 3 */}
      <tr>
        <td><input type="checkbox" /></td>

        <td>
          <img
            src="../src/assets/dailingtable.png"
            alt="Dining Table"
            className="product-img"
          />
        </td>

        <td>
          <strong>DIN-TBL-001</strong>
          <div className="barcode">8901234567892</div>
        </td>

        <td>Dining Table</td>
        <td>Dining</td>
        <td>Main Warehouse</td>
        <td>Aisle 03 - Rack 02</td>
        <td><span className="qty-orange">5</span></td>
        <td>Nos</td>
        <td><span className="orange">Low Stock</span></td>
        <td>₹1,85,000</td>

        <td>
          <div className="action-icons">
            <FaEye />
            <FaEllipsisV />
          </div>
        </td>
      </tr>

      {/* Row 4 */}
      <tr>
        <td><input type="checkbox" /></td>

        <td>
          <img
            src="../src/assets/officechair.png"
            alt="Chair"
            className="product-img"
          />
        </td>

        <td>
          <strong>CHR-001</strong>
          <div className="barcode">8901234567893</div>
        </td>

        <td>Office Chair</td>
        <td>Chairs</td>
        <td>Main Warehouse</td>
        <td>Aisle 04 - Rack 01</td>
        <td><span className="qty-green">22</span></td>
        <td>Nos</td>
        <td><span className="green">In Stock</span></td>
        <td>₹2,75,000</td>

        <td>
          <div className="action-icons">
            <FaEye />
            <FaEllipsisV />
          </div>
        </td>
      </tr>

      {/* Row 5 */}
      <tr>
        <td><input type="checkbox" /></td>

        <td>
          <img
            src="../src/assets/woodenWardrobe.png"
            alt="wooden"
            className="product-img"
          />
        </td>

        <td>
          <strong>WRD-001</strong>
          <div className="barcode">8901234567894</div>
        </td>

        <td>Wooden Wardrobe</td>
        <td>Storage</td>
        <td>Main Warehouse</td>
        <td>Aisle 05 - Rack 04</td>
        <td><span className="qty-red">0</span></td>
        <td>Nos</td>
        <td><span className="red">Out Of Stock</span></td>
        <td>₹5,20,000</td>

        <td>
          <div className="action-icons">
            <FaEye />
            <FaEllipsisV />
          </div>
        </td>
      </tr>

      {/* Row 6 */}
<tr>
  <td><input type="checkbox" /></td>

  <td>
    <img
      src="../src/assets/centertable.png"
      alt="table"
      className="product-img"
    />
  </td>

  <td>
    <strong>CTR-001</strong>
    <div className="barcode">8901234567895</div>
  </td>

  <td>Center Table</td>
  <td>Tables</td>
  <td>Main Warehouse</td>
  <td>Aisle 06 - Rack 01</td>
  <td><span className="qty-green">8</span></td>
  <td>Nos</td>
  <td><span className="green">In Stock</span></td>
  <td>₹1,25,000</td>

  <td>
    <div className="action-icons">
      <FaEye />
      <FaEllipsisV />
    </div>
  </td>
</tr>

{/* Row 7 */}
<tr>
  <td><input type="checkbox" /></td>

  <td>
    <img
      src="../src/assets/tv.png"
      alt="tv"
      className="product-img"
    />
  </td>

  <td>
    <strong>TVU-001</strong>
    <div className="barcode">8901234567896</div>
  </td>

  <td>TV Unit</td>
  <td>Storage</td>
  <td>Main Warehouse</td>
  <td>Aisle 06 - Rack 02</td>
  <td><span className="qty-green">12</span></td>
  <td>Nos</td>
  <td><span className="green">In Stock</span></td>
  <td>₹2,10,000</td>

  <td>
    <div className="action-icons">
      <FaEye />
      <FaEllipsisV />
    </div>
  </td>
</tr>

{/* Row 8 */}
<tr>
  <td><input type="checkbox" /></td>

  <td>
    <img
      src="../src/assets/recliner.png"
      alt="chair"
      className="product-img"
    />
  </td>

  <td>
    <strong>RCL-001</strong>
    <div className="barcode">8901234567897</div>
  </td>

  <td>Recliner Chair</td>
  <td>Chairs</td>
  <td>Main Warehouse</td>
  <td>Aisle 07 - Rack 01</td>
  <td><span className="qty-orange">3</span></td>
  <td>Nos</td>
  <td><span className="orange">Low Stock</span></td>
  <td>₹95,000</td>

  <td>
    <div className="action-icons">
      <FaEye />
      <FaEllipsisV />
    </div>
  </td>
</tr>

{/* Row 9 */}
<tr>
  <td><input type="checkbox" /></td>

  <td>
    <img
      src="../src/assets/bookstable.png"
      alt="Book"
      className="product-img"
    />
  </td>

  <td>
    <strong>BSH-001</strong>
    <div className="barcode">8901234567898</div>
  </td>

  <td>Bookshelf</td>
  <td>Storage</td>
  <td>Main Warehouse</td>
  <td>Aisle 07 - Rack 03</td>
  <td><span className="qty-red">0</span></td>
  <td>Nos</td>
  <td><span className="red">Out Of Stock</span></td>
  <td>₹75,000</td>

  <td>
    <div className="action-icons">
      <FaEye />
      <FaEllipsisV />
    </div>
  </td>
</tr>

    </tbody>
  </table>
</div>

        <div className="table-footer">
          Showing 1 to 10 of 120 entries
        </div>

        <div className="pagination">
          <button>{"<"}</button>

          <button className="active-page">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>

          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default StockList;