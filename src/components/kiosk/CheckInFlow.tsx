
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  User, Briefcase, FileText, ChevronRight, 
  ChevronLeft, CheckCircle, Search, Camera,
  Truck, Package, Box
} from 'lucide-react';
import { Card } from '../ui/Card';

interface CheckInFlowProps {
  onComplete: () => void;
  onCancel: () => void;
  flowType: 'visitor' | 'delivery';
}

type Step = 'type' | 'info' | 'host' | 'success' | 'courier' | 'recipient' | 'scan' | 'delivery-success';

export const CheckInFlow: React.FC<CheckInFlowProps> = ({ onComplete, onCancel, flowType }) => {
  const [step, setStep] = useState<Step>(flowType === 'delivery' ? 'courier' : 'type');
  
  // Visitor Form Data
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    company: '',
    email: '',
    host: ''
  });

  // Delivery Form Data
  const [deliveryData, setDeliveryData] = useState({
    courier: '',
    recipient: '',
    photo: null as string | null
  });

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    setStep('info');
  };

  const hosts = [
    { name: 'Elizabeth Addams', role: 'Product', avatar: 'https://ui-avatars.com/api/?name=Elizabeth+Addams&background=0D8ABC&color=fff' },
    { name: 'Johnny Fox', role: 'Engineering', avatar: 'https://ui-avatars.com/api/?name=Johnny+Fox&background=random' },
    { name: 'Doc Brown', role: 'R&D', avatar: 'https://ui-avatars.com/api/?name=Doc+Brown&background=random' },
    { name: 'Maria Garcia', role: 'Design', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=random' },
  ];

  const couriers = [
    { id: 'UPS', name: 'UPS', color: 'bg-[#351C15] text-[#FFB500]' },
    { id: 'FedEx', name: 'FedEx', color: 'bg-[#4D148C] text-white' },
    { id: 'Amazon', name: 'Amazon', color: 'bg-[#232F3E] text-white' },
    { id: 'USPS', name: 'USPS', color: 'bg-[#333366] text-white' },
    { id: 'DHL', name: 'DHL', color: 'bg-[#D40511] text-white' },
    { id: 'Other', name: 'Other', color: 'bg-gray-600 text-white' },
  ];

  const renderStep = () => {
    switch (step) {
      // --- Visitor Steps ---
      case 'type':
        return (
          <div className="max-w-4xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2 text-white">
              <h2 className="text-4xl font-bold">What brings you here today?</h2>
              <p className="text-xl text-white/60">Please select your visit type.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'Guest', icon: User, label: 'Guest', desc: 'Visiting a friend or colleague' },
                { id: 'Vendor', icon: Briefcase, label: 'Vendor', desc: 'Delivery, maintenance, or services' },
                { id: 'Interview', icon: FileText, label: 'Interview', desc: 'Job applicant or candidate' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTypeSelect(item.id)}
                  className="bg-white/10 hover:bg-white/20 border-2 border-transparent hover:border-[#C8A45E] p-8 rounded-3xl text-left transition-all group"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#C8A45E] group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.label}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </button>
              ))}
            </div>
            
            <div className="text-center mt-12">
               <button onClick={onCancel} className="text-white/50 hover:text-white uppercase tracking-widest text-sm font-bold">
                 Cancel Check-In
               </button>
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="max-w-2xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
             <div className="text-center space-y-2 text-white mb-8">
              <h2 className="text-3xl font-bold">Your Details</h2>
              <p className="text-lg text-white/60">Please enter your information.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
               <div className="space-y-4">
                  <Input 
                    label="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jane Doe"
                    className="text-lg py-3"
                  />
                  <Input 
                    label="Company Name" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Acme Inc."
                    className="text-lg py-3"
                  />
                  <Input 
                    label="Email Address" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="jane@example.com"
                    type="email"
                    className="text-lg py-3"
                  />
               </div>
               
               <div className="flex gap-4 pt-4">
                  <Button variant="ghost" onClick={() => setStep('type')} className="flex-1 h-14 text-lg">Back</Button>
                  <Button 
                    disabled={!formData.name}
                    onClick={() => setStep('host')} 
                    className="flex-[2] h-14 text-lg bg-[#C8A45E] hover:bg-[#B08D4B] text-black"
                    rightIcon={ChevronRight}
                  >
                    Next
                  </Button>
               </div>
            </div>
          </div>
        );

      case 'host':
        return (
          <div className="max-w-3xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
             <div className="text-center space-y-2 text-white mb-8">
              <h2 className="text-3xl font-bold">Who are you visiting?</h2>
              <p className="text-lg text-white/60">Select your host from the directory.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
               <Input 
                 placeholder="Search host name..." 
                 icon={Search}
                 className="text-lg py-4 bg-gray-50"
               />

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                  {hosts.map((host, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setFormData({...formData, host: host.name});
                        setStep('success');
                      }}
                      className="flex items-center p-4 border border-gray-100 rounded-xl hover:border-[#C8A45E] hover:bg-[#C8A45E]/5 transition-all text-left"
                    >
                       <img src={host.avatar} className="w-12 h-12 rounded-full mr-4" alt={host.name} />
                       <div>
                          <p className="font-bold text-secondary text-lg">{host.name}</p>
                          <p className="text-gray-500 text-sm">{host.role}</p>
                       </div>
                       <ChevronRight className="ml-auto w-5 h-5 text-gray-300" />
                    </button>
                  ))}
               </div>

               <Button variant="ghost" onClick={() => setStep('info')} className="w-full">Back</Button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="max-w-xl mx-auto w-full text-center space-y-8 animate-in zoom-in duration-500">
             <div className="w-32 h-32 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(76,175,80,0.5)]">
                <CheckCircle className="w-16 h-16 text-white" />
             </div>
             
             <div className="space-y-4 text-white">
                <h2 className="text-4xl font-bold">You're all set!</h2>
                <p className="text-xl text-white/80">
                   Welcome, <span className="text-[#C8A45E] font-bold">{formData.name}</span>.<br/>
                   <span className="font-bold">{formData.host}</span> has been notified of your arrival.
                </p>
             </div>

             <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <p className="text-sm text-white/60 mb-2 uppercase tracking-widest font-bold">Printing Badge</p>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-[#C8A45E] w-2/3 animate-pulse"></div>
                </div>
                <p className="text-xs text-white/40 mt-4">Please collect your badge from the printer.</p>
             </div>

             <Button 
               onClick={onComplete}
               className="w-full h-16 text-xl bg-white text-black hover:bg-gray-100"
             >
               Return to Home
             </Button>
          </div>
        );

      // --- Delivery Steps ---
      case 'courier':
        return (
          <div className="max-w-4xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2 text-white">
              <h2 className="text-4xl font-bold">Select Courier</h2>
              <p className="text-xl text-white/60">Which service are you delivering for?</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {couriers.map((courier) => (
                <button
                  key={courier.id}
                  onClick={() => {
                    setDeliveryData({ ...deliveryData, courier: courier.name });
                    setStep('recipient');
                  }}
                  className={`
                    ${courier.color} 
                    bg-opacity-90 hover:bg-opacity-100
                    p-8 rounded-3xl text-center transition-all transform hover:scale-105 shadow-xl
                    flex flex-col items-center justify-center min-h-[160px]
                  `}
                >
                  <Truck className="w-10 h-10 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">{courier.name}</h3>
                </button>
              ))}
            </div>

            <div className="text-center mt-12">
               <button onClick={onCancel} className="text-white/50 hover:text-white uppercase tracking-widest text-sm font-bold">
                 Cancel
               </button>
            </div>
          </div>
        );

      case 'recipient':
        return (
          <div className="max-w-3xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
             <div className="text-center space-y-2 text-white mb-8">
              <h2 className="text-3xl font-bold">Who is the package for?</h2>
              <p className="text-lg text-white/60">Search for the recipient.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
               <Input 
                 placeholder="Search recipient name..." 
                 icon={Search}
                 className="text-lg py-4 bg-gray-50"
                 autoFocus
               />

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                  {hosts.map((host, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setDeliveryData({...deliveryData, recipient: host.name});
                        setStep('scan');
                      }}
                      className="flex items-center p-4 border border-gray-100 rounded-xl hover:border-[#C8A45E] hover:bg-[#C8A45E]/5 transition-all text-left"
                    >
                       <img src={host.avatar} className="w-12 h-12 rounded-full mr-4" alt={host.name} />
                       <div>
                          <p className="font-bold text-secondary text-lg">{host.name}</p>
                          <p className="text-gray-500 text-sm">{host.role}</p>
                       </div>
                       <ChevronRight className="ml-auto w-5 h-5 text-gray-300" />
                    </button>
                  ))}
               </div>
               
               {/* Generic options if not found */}
               <div className="flex gap-4 border-t border-gray-100 pt-6">
                 <Button 
                   variant="secondary" 
                   onClick={() => {
                     setDeliveryData({...deliveryData, recipient: 'Reception / Front Desk'});
                     setStep('scan');
                   }}
                   className="flex-1"
                 >
                   Reception / Front Desk
                 </Button>
                 <Button 
                   variant="secondary"
                   onClick={() => {
                     setDeliveryData({...deliveryData, recipient: 'Mailroom'});
                     setStep('scan');
                   }}
                   className="flex-1"
                 >
                   Mailroom
                 </Button>
               </div>

               <Button variant="ghost" onClick={() => setStep('courier')} className="w-full">Back</Button>
            </div>
          </div>
        );

      case 'scan':
        return (
          <div className="max-w-2xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2 text-white">
               <h2 className="text-3xl font-bold">Photo of Package</h2>
               <p className="text-lg text-white/60">Please take a photo of the label or package.</p>
            </div>

            <div className="bg-black/40 rounded-3xl p-4 backdrop-blur-md border border-white/10">
               {/* Camera Mock */}
               <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-white/20 m-8 rounded-xl pointer-events-none">
                     <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                     <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                  </div>
                  <div className="text-center">
                     <Box className="w-16 h-16 text-white/20 mx-auto mb-4" />
                     <p className="text-white/40 text-sm">Camera Preview</p>
                  </div>
                  
                  {/* Capture Button Overlay */}
                  <div className="absolute bottom-6 w-full flex justify-center">
                     <button 
                       onClick={() => setStep('delivery-success')}
                       className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 hover:scale-105 transition-transform flex items-center justify-center"
                     >
                       <Camera className="w-8 h-8 text-gray-600" />
                     </button>
                  </div>
               </div>
            </div>

            <div className="flex justify-center">
               <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white" onClick={() => setStep('delivery-success')}>
                  Skip Photo
               </Button>
            </div>
          </div>
        );

      case 'delivery-success':
        return (
          <div className="max-w-xl mx-auto w-full text-center space-y-8 animate-in zoom-in duration-500">
             <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                <Package className="w-16 h-16 text-white" />
             </div>
             
             <div className="space-y-4 text-white">
                <h2 className="text-4xl font-bold">Package Logged</h2>
                <p className="text-xl text-white/80">
                   Thank you for the delivery.<br/>
                   <span className="text-[#C8A45E] font-bold">{deliveryData.recipient}</span> has been notified.
                </p>
             </div>

             <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center space-x-2 text-white/70">
                   <Truck className="w-5 h-5" />
                   <span className="font-mono">{deliveryData.courier}</span>
                </div>
             </div>

             <Button 
               onClick={onComplete}
               className="w-full h-16 text-xl bg-white text-black hover:bg-gray-100"
             >
               Return to Home
             </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 w-full">
       {renderStep()}
    </div>
  );
};
