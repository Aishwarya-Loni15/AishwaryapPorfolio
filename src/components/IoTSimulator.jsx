import React, { useState, useEffect } from 'react';
import { Cpu, Wifi, Activity, AlertTriangle, Flame, RefreshCw, Terminal, Zap } from 'lucide-react';

export default function IoTSimulator() {
  const [temp, setTemp] = useState(24.5);
  const [humidity, setHumidity] = useState(58);
  const [motion, setMotion] = useState(false);
  const [gasAlert, setGasAlert] = useState(false);
  const [logs, setLogs] = useState([]);
  const [tempThreshold, setTempThreshold] = useState(30);

  // Live telemetry pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Slight natural fluctuations
      const tempDelta = (Math.random() - 0.5) * 0.4;
      const humDelta = (Math.random() - 0.5) * 0.8;

      setTemp(prev => parseFloat((prev + tempDelta).toFixed(1)));
      setHumidity(prev => Math.min(100, Math.max(20, Math.round(prev + humDelta))));

      // Add log
      const timeStr = new Date().toLocaleTimeString();
      const newLog = `[${timeStr}] MQTT PUB -> topic: "nodes/esp32_01/sensors" payload: {"temp": ${(temp + tempDelta).toFixed(1)}, "hum": ${Math.round(humidity + humDelta)}, "rssi": -64}`;
      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [temp, humidity]);

  const triggerHeatSpike = () => {
    setTemp(38.2);
    const timeStr = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timeStr}] ⚠️ HIGH TEMP ALERT! Temp (38.2°C) > Threshold (${tempThreshold}°C) -> Buzzer Activated`, ...prev]);
  };

  const triggerMotionAlert = () => {
    setMotion(true);
    const timeStr = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timeStr}] 🚨 PIR SENSOR TRIGGERED: Motion Detected in Zone 1`, ...prev]);
    setTimeout(() => setMotion(false), 4000);
  };

  const toggleGasLeak = () => {
    const nextState = !gasAlert;
    setGasAlert(nextState);
    const timeStr = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timeStr}] ${nextState ? '🔥 MQ-2 GAS SENSOR ALERT: Dangerous Gas Concentration Detected!' : '✅ MQ-2 Sensor Normal'}`, ...prev]);
  };

  const isTempHigh = temp >= tempThreshold;

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-2xl text-slate-100 font-sans">
      {/* Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              ESP32 Telemetry Node #01
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/40">ONLINE</span>
            </h4>
            <p className="text-xs text-slate-400 font-mono">MAC: 24:0A:C4:8A:1E:09 • Firmware v2.4.1</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
            <Wifi className="w-3.5 h-3.5 text-cyan-400" />
            <span>RSSI: -64 dBm</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Power: 45mA (Normal)</span>
          </div>
        </div>
      </div>

      {/* Sensor Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {/* Temperature */}
        <div className={`p-4 rounded-lg border transition ${isTempHigh ? 'bg-red-950/40 border-red-500/50 text-red-200' : 'bg-slate-800/60 border-slate-700 text-slate-100'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>DHT22 Temperature</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold">{temp}°C</span>
            <span className="text-xs text-slate-400 font-mono">Target &lt; {tempThreshold}°C</span>
          </div>
          {isTempHigh && (
            <div className="mt-2 text-xs text-red-400 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High Temp Warning!
            </div>
          )}
        </div>

        {/* Humidity */}
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>DHT22 Relative Humidity</span>
            <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="text-3xl font-heading font-extrabold text-blue-400">{humidity}%</div>
          <p className="text-xs text-slate-400 mt-1">Air Moisture Index</p>
        </div>

        {/* Security / Motion */}
        <div className={`p-4 rounded-lg border transition ${motion || gasAlert ? 'bg-amber-950/40 border-amber-500/50' : 'bg-slate-800/60 border-slate-700'}`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>PIR & MQ-2 Security Status</span>
            <Flame className={`w-4 h-4 ${gasAlert ? 'text-red-500 animate-bounce' : 'text-slate-500'}`} />
          </div>
          <div className="text-xl font-heading font-bold">
            {gasAlert ? (
              <span className="text-red-400">🔥 GAS LEAK DETECTED</span>
            ) : motion ? (
              <span className="text-amber-400">🚨 MOTION DETECTED</span>
            ) : (
              <span className="text-emerald-400">✅ Zone Secure</span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">Microcontroller GPIO 14 & 27</p>
        </div>
      </div>

      {/* Interactive Trigger Panel */}
      <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 mb-5">
        <h5 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
          <Zap className="w-4 h-4" /> Interactive Hardware Hardware Simulation Controls
        </h5>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={triggerHeatSpike}
            className="px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition flex items-center gap-1.5"
          >
            🔥 Simulate Heat Spike (38.2°C)
          </button>
          <button
            onClick={triggerMotionAlert}
            className="px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition flex items-center gap-1.5"
          >
            🚨 Trigger PIR Motion Event
          </button>
          <button
            onClick={toggleGasLeak}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${gasAlert ? 'bg-red-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'}`}
          >
            <Flame className="w-3.5 h-3.5" />
            {gasAlert ? 'Clear Gas Alert' : 'Simulate Gas Leak'}
          </button>
          <button
            onClick={() => setTemp(24.5)}
            className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition border border-slate-700 ml-auto"
          >
            Reset Metrics
          </button>
        </div>

        {/* Temperature Threshold Slider */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-300">
          <span className="font-mono">Alert Threshold:</span>
          <input
            type="range"
            min="20"
            max="45"
            value={tempThreshold}
            onChange={(e) => setTempThreshold(Number(e.target.value))}
            className="accent-purple-500 cursor-pointer w-36"
          />
          <span className="font-mono font-bold text-purple-400">{tempThreshold}°C</span>
        </div>
      </div>

      {/* Console Output */}
      <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-slate-300">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Serial Console Stream (115200 baud)
          </span>
          <span className="text-emerald-400 font-semibold">MQTT BROKER: CONNECTED</span>
        </div>
        <div className="space-y-1 max-h-32 overflow-y-auto font-mono">
          {logs.map((log, i) => (
            <div key={i} className={log.includes('ALERT') || log.includes('HIGH') ? 'text-amber-300 font-bold' : 'text-slate-400'}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
