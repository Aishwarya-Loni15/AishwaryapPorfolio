import React, { useState } from 'react';
import { Shield, UserCheck, CheckCircle2, Database, FileText, Activity, AlertCircle, Search, ArrowUpRight } from 'lucide-react';

export default function GovtTrackerSimulator() {
  const [activeRole, setActiveRole] = useState('Department Head');
  const [tasks, setTasks] = useState([
    { id: 'TSK-101', title: 'Urban Sanitation Audit Report', officer: 'Officer R. Sharma', status: 'IN_PROGRESS', priority: 'HIGH', dept: 'Public Works' },
    { id: 'TSK-102', title: 'District Water Supply Inspection', officer: 'Officer A. Patil', status: 'COMPLETED', priority: 'MEDIUM', dept: 'Water Resources' },
    { id: 'TSK-103', title: 'E-Governance File Processing', officer: 'Officer V. Kulkarni', status: 'PENDING', priority: 'URGENT', dept: 'Revenue Dept' }
  ]);

  const [testCasesPassed, setTestCasesPassed] = useState(22);
  const [selectedDept, setSelectedDept] = useState('Public Works');

  const handleAssignNewTask = () => {
    const newTask = {
      id: `TSK-${Math.floor(104 + Math.random() * 50)}`,
      title: 'Roadway Infrastructure Verification',
      officer: 'Officer S. Deshmukh',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dept: selectedDept
    };
    setTasks(prev => [newTask, ...prev]);
    setTestCasesPassed(prev => prev + 1);
  };

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-2xl text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg text-white">
              Smart Government Productivity Tracker
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Python + MySQL Relational Database • 4 User Roles • 20+ Test Cases Passed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            ✅ {testCasesPassed} Test Cases Verified
          </span>
        </div>
      </div>

      {/* Role Switcher Tabs */}
      <div className="mb-5">
        <div className="text-xs font-mono text-purple-400 uppercase mb-2 font-semibold">
          Select Active User Role View (4 Roles Built)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Super Admin', 'Department Head', 'Government Officer', 'Auditor'].map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`p-2 rounded-lg text-xs font-mono font-medium transition flex items-center justify-center gap-1.5 ${
                activeRole === role
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Role Context Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="text-xs text-slate-400 font-mono mb-1">Active Department</div>
          <div className="text-lg font-heading font-extrabold text-white">{selectedDept}</div>
          <div className="text-[11px] text-purple-400 font-mono mt-1">Role: {activeRole}</div>
        </div>

        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="text-xs text-slate-400 font-mono mb-1">MySQL Database Tables</div>
          <div className="text-lg font-heading font-extrabold text-cyan-400">5+ Connected Tables</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">Employees, Tasks, Logs</div>
        </div>

        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="text-xs text-slate-400 font-mono mb-1">Department Efficiency</div>
          <div className="text-lg font-heading font-extrabold text-emerald-400">94.8% Operational</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">10+ Features Active</div>
        </div>
      </div>

      {/* Interactive Task Assignment Action */}
      <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-xs font-semibold text-purple-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> Live Task Management & Productivity Stream
          </h5>
          <button
            onClick={handleAssignNewTask}
            className="px-3 py-1.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition flex items-center gap-1.5 shadow-md"
          >
            Assign New Govt Task <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-wrap items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-purple-400">{task.id}</span>
                  <span className="font-semibold text-white">{task.title}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Assigned to: {task.officer} • Dept: {task.dept}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  task.priority === 'URGENT' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {task.priority}
                </span>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MySQL Data Schema Stream */}
      <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-slate-300">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            MySQL Relational Query Log
          </span>
          <span className="text-emerald-400 font-semibold">DB STATUS: CONNECTED</span>
        </div>
        <div className="text-slate-400 space-y-1">
          <div>SELECT * FROM govt_employees WHERE role_id = '{activeRole}';</div>
          <div className="text-purple-300">SELECT task_id, title, status FROM govt_tasks WHERE dept_name = '{selectedDept}';</div>
          <div className="text-emerald-400">✅ Query Executed in 1.4ms (5 tables joined)</div>
        </div>
      </div>
    </div>
  );
}
