import React, { useState } from 'react';
import { ShoppingCart, Package, Users, FileCheck, Database, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ElectronicsShopSimulator() {
  const [activeModule, setActiveModule] = useState('Product Inventory');
  const [inventory, setInventory] = useState([
    { id: 101, name: 'Wireless Ergonomic Mouse', category: 'Peripherals', price: '$45.00', stock: 24, status: 'IN_STOCK' },
    { id: 102, name: 'Mechanical Gaming Keyboard', category: 'Peripherals', price: '$120.00', stock: 8, status: 'LOW_STOCK' },
    { id: 103, name: '27" 4K IPS Monitor', category: 'Displays', price: '$350.00', stock: 15, status: 'IN_STOCK' }
  ]);

  const [salesTotal, setSalesTotal] = useState(1450);

  const handleSimulateSale = (productId) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === productId && item.stock > 0) {
          const newStock = item.stock - 1;
          return {
            ...item,
            stock: newStock,
            status: newStock <= 8 ? 'LOW_STOCK' : 'IN_STOCK'
          };
        }
        return item;
      })
    );
    setSalesTotal(prev => prev + 45);
  };

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-2xl text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg text-white">
              Online Electronics Shop Management System
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Core Java + JDBC + MySQL • 4 Core Modules • 20+ Test Cases
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            ✅ 20+ Validation Tests Passed
          </span>
        </div>
      </div>

      {/* Module Tabs */}
      <div className="mb-5">
        <div className="text-xs font-mono text-cyan-400 uppercase mb-2 font-semibold">
          Select Active Java System Module (4 Modules Built)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Product Inventory', 'Sales Management', 'Supplier Purchases', 'Customer CRM'].map((mod) => (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={`p-2 rounded-lg text-xs font-mono font-medium transition flex items-center justify-center gap-1.5 ${
                activeModule === mod
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{mod}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="text-xs text-slate-400 font-mono mb-1">Active Java Module</div>
          <div className="text-lg font-heading font-extrabold text-white">{activeModule}</div>
          <div className="text-[11px] text-cyan-400 font-mono mt-1">JDBC Connectivity: Active</div>
        </div>

        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="text-xs text-slate-400 font-mono mb-1">Total Sales Processed</div>
          <div className="text-lg font-heading font-extrabold text-purple-400">${salesTotal.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">Prepared Statements Used</div>
        </div>

        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="text-xs text-slate-400 font-mono mb-1">MySQL Database Tables</div>
          <div className="text-lg font-heading font-extrabold text-emerald-400">5+ Relational Tables</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">Inventory, Orders, Customers</div>
        </div>
      </div>

      {/* Product Stock Table */}
      <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
            Java Inventory Management Table (Live JDBC Stream)
          </h5>
          <span className="text-[11px] font-mono text-slate-400">Click "Simulate Sale" to test Java JDBC deduction</span>
        </div>

        <div className="space-y-2">
          {inventory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-cyan-400">#{item.id}</span>
                  <span className="font-semibold text-white">{item.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Category: {item.category} • Price: {item.price}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  item.status === 'LOW_STOCK' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  Stock: {item.stock} units
                </span>

                <button
                  onClick={() => handleSimulateSale(item.id)}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[11px] transition"
                >
                  Simulate Sale
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JDBC Query Output Stream */}
      <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-slate-300">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            JDBC MySQL Driver Console (com.mysql.cj.jdbc.Driver)
          </span>
          <span className="text-emerald-400 font-semibold">JDBC CONNECTION: OK</span>
        </div>
        <div className="text-slate-400 space-y-1">
          <div>PreparedStatement stmt = conn.prepareStatement("UPDATE inventory SET stock_qty = ? WHERE product_id = ?");</div>
          <div className="text-cyan-300">stmt.setInt(1, currentStock - 1); stmt.executeUpdate();</div>
          <div className="text-emerald-400">✅ Transaction Committed Successfully (Row updated in MySQL DB)</div>
        </div>
      </div>
    </div>
  );
}
