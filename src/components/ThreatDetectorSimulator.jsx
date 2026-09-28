import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Wifi, Terminal, CheckCircle2, Bug, Play, RefreshCw } from 'lucide-react';

export default function ThreatDetectorSimulator() {
  const [threatStatus, setThreatStatus] = useState('BENIGN');
  const [confidence, setConfidence] = useState(99.2);
  const [packetCount, setPacketCount] = useState(4820);
  const [activeAttack, setActiveAttack] = useState(null);
  const [packets, setPackets] = useState([
    { id: 1, ip: '192.168.1.45', port: 443, protocol: 'HTTPS', status: 'SAFE', length: 1420 },
    { id: 2, ip: '10.0.4.12', port: 80, protocol: 'HTTP', status: 'SAFE', length: 512 },
    { id: 3, ip: '192.168.1.100', port: 22, protocol: 'SSH', status: 'SAFE', length: 128 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount(prev => prev + Math.floor(Math.random() * 25 + 10));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerAttack = (attackType) => {
    setActiveAttack(attackType);
    setThreatStatus('MALICIOUS ATTEMPT');
    setConfidence(98.7);

    const attackPackets = {
      ddos: { ip: '185.220.101.4', port: 80, protocol: 'SYN-FLOOD', status: 'DDoS ATTACK', length: 64 },
      portscan: { ip: '45.142.214.22', port: 8080, protocol: 'TCP-SCAN', status: 'PORT SCAN DETECTED', length: 40 },
      sqli: { ip: '194.26.29.112', port: 443, protocol: 'HTTP-POST', status: 'SQL INJECTION', length: 2048 }
    };

    const target = attackPackets[attackType];
    setPackets(prev => [{ id: Date.now(), ...target }, ...prev.slice(0, 4)]);
  };

  const resetDetector = () => {
    setActiveAttack(null);
    setThreatStatus('BENIGN');
    setConfidence(99.2);
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
              AI Cyber Threat Detection & Packet Inspector
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Scapy Network Sniffer + Random Forest Classifier
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 text-slate-300">
            Total Traffic: <span className="text-purple-400 font-bold">{packetCount.toLocaleString()} pkts</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className={`p-4 rounded-lg border transition ${activeAttack ? 'bg-red-950/40 border-red-500/50' : 'bg-slate-800/60 border-slate-700'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>ML Threat Status</span>
            {activeAttack ? <ShieldAlert className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="text-xl font-heading font-bold">
            {activeAttack ? (
              <span className="text-red-400 flex items-center gap-2">
                🚨 {activeAttack.toUpperCase()} DETECTED
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-2">
                ✅ NETWORK SECURE (BENIGN)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Model Model Confidence: {confidence}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Automated Defense Mitigation</span>
            <Bug className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xs font-mono text-slate-200">
            {activeAttack ? (
              <span className="text-amber-300 font-semibold">
                🛡️ Firewall Rule Injected: DROP src {packets[0]?.ip}
              </span>
            ) : (
              <span className="text-slate-400">
                Active Monitoring • Zero Vulnerabilities Flagged
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Inspection Protocol: AES-256 TLS Handshake Verified
          </div>
        </div>
      </div>

      {/* Simulator Trigger Buttons */}
      <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 mb-5">
        <h5 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
          <Play className="w-4 h-4" /> Simulate Malicious Traffic Signatures
        </h5>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => triggerAttack('ddos')}
            className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition"
          >
            🔥 DDoS SYN Flood Attack
          </button>
          <button
            onClick={() => triggerAttack('portscan')}
            className="px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition"
          >
            🔍 Stealth Port Scan
          </button>
          <button
            onClick={() => triggerAttack('sqli')}
            className="px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition"
          >
            💉 SQL Injection Payload
          </button>
          <button
            onClick={resetDetector}
            className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition border border-slate-700 ml-auto flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Safe State
          </button>
        </div>
      </div>

      {/* Realtime Stream */}
      <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Live Network Packet Stream
          </span>
          <span>SCAPY DECODER</span>
        </div>
        <div className="space-y-1.5 max-h-32 overflow-y-auto">
          {packets.map((pkt) => (
            <div key={pkt.id} className={`flex items-center justify-between p-1.5 rounded ${pkt.status !== 'SAFE' ? 'bg-red-950/40 text-red-300 border border-red-800/40 font-bold' : 'text-slate-400'}`}>
              <span className="w-32">{pkt.ip}</span>
              <span className="w-20">Port: {pkt.port}</span>
              <span className="w-24">{pkt.protocol}</span>
              <span className="w-24 text-right">{pkt.length} bytes</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${pkt.status === 'SAFE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/30 text-red-300'}`}>
                {pkt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
