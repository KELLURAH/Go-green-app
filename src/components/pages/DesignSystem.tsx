import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Mail, Lock, Search, Calendar, User, Check, AlertCircle } from 'lucide-react';

export const DesignSystem: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-secondary mb-2">Design System</h1>
        <p className="text-gray-500">Atomic components and styles for the PBD Enterprise application.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center"><span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>Buttons</h2>
        <Card className="space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Button>Default Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button leftIcon={User}>With Icon Left</Button>
            <Button rightIcon={Check} variant="secondary">With Icon Right</Button>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center"><span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <h3 className="font-semibold mb-2">Inputs</h3>
            <Input label="Email Address" placeholder="Enter your email" icon={Mail} />
            <Input label="Password" type="password" placeholder="Enter password" icon={Lock} />
            <Input label="Search" placeholder="Search..." icon={Search} className="rounded-full" />
            <Input label="With Error" placeholder="Invalid input" error="This field is required" />
          </Card>

          <Card className="space-y-6">
             <h3 className="font-semibold mb-2">Controls</h3>
             {/* Custom Checkbox */}
             <div className="flex items-center space-x-3">
               <div className="relative flex items-center">
                 <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-primary checked:bg-primary hover:border-primary" id="check1" defaultChecked />
                 <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
               </div>
               <label htmlFor="check1" className="cursor-pointer text-sm font-medium text-gray-700">Subscribe to newsletter</label>
             </div>

             {/* Custom Toggle */}
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
                <button 
                  onClick={() => setToggle(!toggle)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${toggle ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggle ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
             </div>

             {/* Date Picker Mock */}
             <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Date Range</label>
                <button className="w-full flex items-center justify-between bg-surface-subtle border border-gray-200 text-secondary rounded-xl px-4 py-2.5 hover:border-primary transition-colors">
                  <span className="text-sm">Oct 10, 2023 - Oct 17, 2023</span>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </button>
             </div>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center"><span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>Status & Feedback</h2>
        <Card>
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge status="Active" />
            <Badge status="Pending" />
            <Badge status="Inactive" />
            <Badge status="Success" />
            <Badge status="Error" />
            <Badge status="Warning" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-green-800">Success Message</h4>
                <p className="text-xs text-green-700 mt-1">Changes have been saved successfully to the database.</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-800">Critical Error</h4>
                <p className="text-xs text-red-700 mt-1">Please check your connection and try again.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};