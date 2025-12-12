
import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Monitor, RefreshCw, Activity, ExternalLink, CheckCircle, AlertTriangle, Download } from 'lucide-react';

interface KioskMonitoringProps {
  activeTab: 'status' | 'log';
  onLaunchKiosk?: () => void;
}

const mockActivityLog = [
  { id: 1, time: '10:32 AM', event: 'Visitor Check-in Started', device: 'Lobby iPad 1' },
  { id: 2, time: '10:35 AM', event: 'Visitor Check-in Completed', device: 'Lobby iPad 1' },
  { id: 3, time: '11:00 AM', event: 'Heartbeat (Online)', device: 'Rear Entrance Tablet' },
  { id: 4, time: '11:05 AM', event: 'Device Offline', device: 'Rear Entrance Tablet' },
  { id: 5, time: '11:15 AM', event: 'Manual Restart Triggered', device: 'Admin Console' },
];

export const KioskMonitoring: React.FC<KioskMonitoringProps> = ({ activeTab, onLaunchKiosk }) => {
  const [isRestarting, setIsRestarting] = useState(false);

  const handleRestart = () => {
    setIsRestarting(true);
    // Simulate restart delay
    setTimeout(() => {
      setIsRestarting(false);
      alert('Kiosk session restarted successfully.');
    }, 2000);
  };

  const handleExport = () => {
    // Generate CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Time,Event,Device\n"
        + mockActivityLog.map(row => `${row.time},${row.event},${row.device}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kiosk_activity_log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (activeTab === 'log') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Kiosk Activity Log</h1>
            <p className="text-gray-500 text-sm">Real-time event stream from all connected kiosks.</p>
          </div>
          <Button leftIcon={Download} onClick={handleExport}>Export CSV</Button>
        </div>

        <Card className="p-0 overflow-hidden">
           <table className="w-full text-sm text-left">
              <thead className="bg-surface-subtle text-gray-500">
                 <tr>
                    <th className="px-6 py-4 font-semibold uppercase text-xs">Time</th>
                    <th className="px-6 py-4 font-semibold uppercase text-xs">Event</th>
                    <th className="px-6 py-4 font-semibold uppercase text-xs">Device</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {mockActivityLog.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 font-mono text-gray-500">{log.time}</td>
                       <td className="px-6 py-4 font-medium text-secondary flex items-center">
                          <Activity className="w-3 h-3 mr-2 text-gray-400" />
                          {log.event}
                       </td>
                       <td className="px-6 py-4 text-gray-500">{log.device}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </Card>
      </div>
    );
  }

  // Status View
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Kiosk Status</h1>
          <p className="text-gray-500 text-sm">Monitor health and control active kiosk sessions.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={RefreshCw} onClick={handleRestart} disabled={isRestarting}>
            {isRestarting ? 'Restarting...' : 'Restart Session'}
          </Button>
          <Button leftIcon={ExternalLink} onClick={onLaunchKiosk}>Launch Kiosk</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Online Device */}
         <Card className="border-l-4 border-l-green-500">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                     <Monitor className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="font-bold text-secondary">Lobby iPad 1</h3>
                     <p className="text-xs text-gray-400">IP: 192.168.1.104</p>
                  </div>
               </div>
               <Badge status="Active" className="bg-green-100 text-green-700">Online</Badge>
            </div>
            <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                  <span className="text-gray-500">Battery</span>
                  <span className="font-medium text-secondary">98%</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">App Version</span>
                  <span className="font-medium text-secondary">v2.1.0</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">Last Heartbeat</span>
                  <span className="font-medium text-secondary">Just now</span>
               </div>
            </div>
         </Card>

         {/* Offline Device */}
         <Card className="border-l-4 border-l-gray-300 opacity-80">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                     <Monitor className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="font-bold text-secondary">Rear Entrance</h3>
                     <p className="text-xs text-gray-400">IP: 192.168.1.105</p>
                  </div>
               </div>
               <Badge status="Inactive" className="bg-gray-100 text-gray-500">Offline</Badge>
            </div>
            <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                  <span className="text-gray-500">Battery</span>
                  <span className="font-medium text-secondary">--</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">App Version</span>
                  <span className="font-medium text-secondary">v2.0.5</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">Last Heartbeat</span>
                  <span className="font-medium text-secondary">2 hours ago</span>
               </div>
            </div>
         </Card>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
         <div className="mr-3 mt-0.5 text-blue-600">
            <CheckCircle className="w-5 h-5" />
         </div>
         <div>
            <h4 className="font-bold text-blue-800 text-sm">System Healthy</h4>
            <p className="text-xs text-blue-700 mt-1">
               All core services are operational. Visitor sync is active.
            </p>
         </div>
      </div>
    </div>
  );
};
