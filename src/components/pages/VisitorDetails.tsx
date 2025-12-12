import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  ArrowLeft, Download, Clock, MapPin, FileText, 
  Trash2, Edit, Printer, LogOut, CheckCircle
} from 'lucide-react';

export const VisitorDetails: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" leftIcon={ArrowLeft}>Back to List</Button>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" leftIcon={Trash2}>Delete</Button>
          <Button variant="outline" leftIcon={Printer}>Print Badge</Button>
          <Button leftIcon={Edit}>Edit Info</Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          <img 
            src="https://picsum.photos/id/48/150/150" 
            alt="Visitor" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-surface-subtle shadow-inner"
          />
          <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-1">
             <h1 className="text-3xl font-bold text-secondary">Sarah Connor</h1>
             <Badge status="Checked In" />
          </div>
          <p className="text-lg text-gray-500 font-medium">Skynet Systems</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
             <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-primary"/> HQ - Floor 3</div>
             <div className="flex items-center"><FileText className="w-4 h-4 mr-1.5 text-primary"/> Visitor Type: Vendor</div>
          </div>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
           <Button variant="secondary" className="w-full md:w-auto" size="lg" leftIcon={LogOut}>Check Out Now</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Current Visit Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                 <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Host</label>
                   <div className="flex items-center mt-2">
                      <img src="https://ui-avatars.com/api/?name=Elizabeth+Addams&background=0D8ABC&color=fff" className="w-8 h-8 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold text-secondary">Elizabeth Addams</p>
                        <p className="text-xs text-gray-500">Product Team</p>
                      </div>
                   </div>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Purpose</label>
                   <p className="mt-1 font-medium text-gray-700">Vendor Meeting regarding Q4 Supplies</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="bg-surface-subtle p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-gray-500 uppercase">Check In</span>
                       <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-xl font-bold text-secondary">09:15 AM</p>
                    <p className="text-xs text-gray-400">Oct 24, 2023</p>
                 </div>
                 <div className="bg-surface-subtle p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-gray-500 uppercase">Elapsed Time</span>
                       <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xl font-bold text-secondary">2h 14m</p>
                 </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visit Notes</label>
              <p className="mt-2 text-sm text-gray-600 italic">"Brought samples for the packaging review. Needs access to loading dock B for 15 mins."</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-secondary mb-4">Previous Visits</h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                   <th className="px-4 py-2 text-left text-xs uppercase">Date</th>
                   <th className="px-4 py-2 text-left text-xs uppercase">Host</th>
                   <th className="px-4 py-2 text-left text-xs uppercase">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 <tr>
                   <td className="px-4 py-3">Oct 10, 2023</td>
                   <td className="px-4 py-3">Johnny Fox</td>
                   <td className="px-4 py-3">1h 30m</td>
                 </tr>
                 <tr>
                   <td className="px-4 py-3">Sep 28, 2023</td>
                   <td className="px-4 py-3">Elizabeth Addams</td>
                   <td className="px-4 py-3">45m</td>
                 </tr>
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right Column - NDA & Files */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-secondary mb-4">Agreements</h3>
            <div className="space-y-4">
               <div className="flex items-start justify-between p-3 border border-gray-100 rounded-xl bg-green-50/50">
                  <div className="flex items-start">
                     <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm mr-3">
                        <FileText className="w-5 h-5 text-red-500" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-secondary">Standard NDA</p>
                        <p className="text-xs text-gray-500 mt-0.5">Signed: Oct 24, 09:12 AM</p>
                     </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
               </div>
               
               <div className="flex items-start justify-between p-3 border border-gray-100 rounded-xl">
                  <div className="flex items-start">
                     <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm mr-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-secondary">Safety Brief</p>
                        <p className="text-xs text-gray-500 mt-0.5">Pending Signature</p>
                     </div>
                  </div>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
               </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4" leftIcon={Download}>Download All PDFs</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};