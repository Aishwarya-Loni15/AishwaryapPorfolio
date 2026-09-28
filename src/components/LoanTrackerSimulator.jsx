import React, { useState } from 'react';
import { DollarSign, ShieldCheck, PieChart, FileText, CheckCircle2, AlertOctagon, ArrowUpRight } from 'lucide-react';

export default function LoanTrackerSimulator() {
  const [loanLimit, setLoanLimit] = useState(250000);
  const [trancheClaim, setTrancheClaim] = useState(65000);
  const [category, setCategory] = useState('Equipment & Hardware');
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, time: '10:42 AM', action: 'Tranche #01 Approved', amount: '$45,000', status: 'VERIFIED', risk: 'LOW' },
    { id: 2, time: '02:15 PM', action: 'Expense Receipt Uploaded', amount: '$12,400', status: 'VERIFIED', risk: 'LOW' }
  ]);
  const [claimedTotal, setClaimedTotal] = useState(122400);

  // Risk evaluation logic
  const utilizationRatio = (claimedTotal / loanLimit) * 100;
  const isHighRisk = trancheClaim > 100000 || utilizationRatio > 85;

  const handleSubmitExpense = (e) => {
    e.preventDefault();
    const newClaimed = claimedTotal + Number(trancheClaim);
    setClaimedTotal(newClaimed);

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = {
      id: Date.now(),
      time,
      action: `Claim Submitted: ${category}`,
      amount: `$${Number(trancheClaim).toLocaleString()}`,
      status: isHighRisk ? 'FLAGGED FOR AUDIT' : 'AUTOMATED VERIFIED',
      risk: isHighRisk ? 'HIGH' : 'LOW'
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-2xl text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-500/20 text-purple-400 font-mono text-xs border border-purple-500/30">
              ENTERPRISE AUDIT SYSTEM
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/40">
              SPRING BOOT + REACT
            </span>
          </div>
          <h4 className="font-heading font-bold text-xl text-white mt-1">
            Smart Loan Utilization Tracker
          </h4>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 font-mono">Approved Facility Limit</div>
          <div className="text-2xl font-heading font-extrabold text-purple-400">
            ${loanLimit.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Utilization & Risk Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Total Utilization Progress */}
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700 md:col-span-2">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Disbursed Fund Utilization: ${claimedTotal.toLocaleString()}</span>
            <span className="text-cyan-400 font-bold">{utilizationRatio.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${utilizationRatio > 85 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-purple-500 to-cyan-400'}`}
              style={{ width: `${Math.min(100, utilizationRatio)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
            <span>Tranche 1 (Equipment)</span>
            <span>Tranche 2 (Infrastructure)</span>
            <span>Tranche 3 (Operations)</span>
          </div>
        </div>

        {/* Risk Assessment Gauge */}
        <div className={`p-4 rounded-lg border transition ${isHighRisk ? 'bg-amber-950/40 border-amber-500/50' : 'bg-slate-800/60 border-slate-700'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Automated Risk Assessment</span>
            {isHighRisk ? (
              <AlertOctagon className="w-4 h-4 text-amber-400" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="text-xl font-heading font-bold mt-1">
            {isHighRisk ? (
              <span className="text-amber-400 flex items-center gap-1.5">
                ⚠️ MODERATE / HIGH
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" /> LOW RISK (APPROVED)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            OCR Verification Confidence: 99.4%
          </p>
        </div>
      </div>

      {/* Interactive Expense Form */}
      <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 mb-5">
        <h5 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
          <FileText className="w-4 h-4" /> Simulate Tranche Expense Verification Claim
        </h5>

        <form onSubmit={handleSubmitExpense} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-mono">Expense Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option>Equipment & Hardware</option>
              <option>IT Infrastructure & Cloud</option>
              <option>Operational Expense</option>
              <option>R&D Research Audit</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 font-mono">Claim Amount ($)</label>
            <input
              type="number"
              value={trancheClaim}
              onChange={(e) => setTrancheClaim(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs py-2 px-4 rounded-md transition flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/20"
          >
            Submit Expense Claim <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="font-semibold text-purple-400 font-mono">Real-Time Immutable Audit Log</span>
          <span>POSTGRESQL AUDIT TRAIL</span>
        </div>
        <div className="space-y-2 max-h-36 overflow-y-auto">
          {auditLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800/80 text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-slate-500">{log.time}</span>
                <span className="font-medium text-slate-200">{log.action}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-400">{log.amount}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.risk === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
