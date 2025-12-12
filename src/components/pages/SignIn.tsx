
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mail, Lock, ArrowRight, } from 'lucide-react';

interface SignInProps {
  onLogin: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#2E3340]">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Fluid Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C8A45E]/20 rounded-full blur-[100px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#4CAF50]/15 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-[#ffffff]/5 rounded-full blur-[100px] mix-blend-overlay animate-blob animation-delay-4000" />
      </div>

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-6xl h-[75vh] md:h-[650px] m-4 bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/50 flex overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Brand & Vision (Visible on Large Screens) */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-[#F5F0E1]/30">
           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
           
           {/* Top: Logo */}
           <div className="relative z-10 flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/5">
                 {/* GO-GREEN Icon */}
                 <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#4CAF50]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
                 </svg>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#2E3340] tracking-tight leading-none">GO-GREEN</span>
                <span className="text-xs font-bold text-[#C8A45E] uppercase tracking-widest leading-none">Packaging</span>
              </div>
           </div>
           
           {/* Center: Hero Text */}
           <div className="relative z-10 space-y-6">
              <h1 className="text-5xl font-bold text-[#2E3340] leading-[1.1]">
                 Packaging the <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A45E] to-[#B08D4B]">future</span>, today.
              </h1>
              <p className="text-[#2E3340]/70 text-lg max-w-md leading-relaxed">
                 Modernize your workflow now. Unify logistics, visitor management, and eco-tracking in one intelligent hub
              </p>
           </div>

           {/* Bottom: Social Proof */}
           <div className="relative z-10">
              <div className="inline-flex items-center gap-4 px-5 py-3 bg-[#2E3340]/5 rounded-full border border-[#2E3340]/5 backdrop-blur-sm transition-transform hover:scale-105 cursor-default">
                 <div className="flex -space-x-3">
                    {[
                      'https://ui-avatars.com/api/?name=Alex&background=random', 
                      'https://ui-avatars.com/api/?name=Sarah&background=random', 
                      'https://ui-avatars.com/api/?name=Mike&background=random'
                    ].map((src, i) => (
                        <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-white" alt="User" /> 
                    ))}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs font-bold text-[#2E3340]"> MADE FOR GO GREEN</span>
                  <span className="text-[10px] text-[#2E3340]/60"> ISO 20001 CERTIFIED </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 bg-white/60 p-8 md:p-12 flex flex-col justify-center relative">
           
           <div className="max-w-sm mx-auto w-full space-y-6">
              
              {/* Mobile Logo (Visible only on small screens) */}
              <div className="lg:hidden flex items-center space-x-3 mb-6">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                    {/* GO-GREEN Icon */}
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#4CAF50]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
                    </svg>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-lg font-bold text-[#2E3340] tracking-tight leading-none">GO-GREEN</span>
                   <span className="text-[10px] font-bold text-[#C8A45E] uppercase tracking-widest leading-none">Packaging</span>
                 </div>
              </div>

              <div className="space-y-2">
                 <h2 className="text-3xl font-bold text-[#2E3340]">Welcome back</h2>
                 <p className="text-gray-500 text-sm">Enter your details to access your workspace.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="space-y-3">
                    <div className="group">
                      <Input 
                        label="Email Address" 
                        type="email" 
                        placeholder="name@gogreen.com" 
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/50 border-gray-200 focus:bg-white transition-colors h-11"
                      />
                    </div>
                    <div className="group">
                      <Input 
                        label="Password" 
                        type="password" 
                        placeholder="••••••••" 
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/50 border-gray-200 focus:bg-white transition-colors h-11"
                      />
                    </div>
                 </div>

                 <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center cursor-pointer group">
                       <input type="checkbox" className="rounded border-gray-300 text-[#C8A45E] focus:ring-[#C8A45E] cursor-pointer" />
                       <span className="ml-2 text-gray-500 group-hover:text-[#2E3340] transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="font-bold text-[#C8A45E] hover:text-[#B08D4B] transition-colors">
                       Forgot Password?
                    </button>
                 </div>

                 <Button 
                   type="submit" 
                   className="w-full h-12 text-base font-bold bg-[#2E3340] hover:bg-[#1E212B] text-white shadow-xl shadow-[#2E3340]/20 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]" 
                   disabled={isLoading}
                   rightIcon={!isLoading ? ArrowRight : undefined}
                 >
                   {isLoading ? 'Signing in...' : 'Sign In'}
                 </Button>
              </form>

              <div className="relative py-2">
                 <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300/50"></div>
                 </div>
                 <div className="relative flex justify-center text-xs">
                    <span className="px-2 text-gray-400 bg-transparent backdrop-blur-xl rounded-full">Or continue with</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-semibold text-[#2E3340] text-xs">Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                   <svg className="w-4 h-4 mr-2" viewBox="0 0 23 23">
                     <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                     <path fill="#f35325" d="M1 1h10v10H1z"/>
                     <path fill="#81bc06" d="M12 1h10v10H12z"/>
                     <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                     <path fill="#ffba08" d="M12 12h10v10H12z"/>
                   </svg>
                  <span className="font-semibold text-[#2E3340] text-xs">Microsoft</span>
                </button>
              </div>
           </div>
           
           <div className="absolute bottom-6 w-full text-center lg:text-left left-0 lg:left-12">
              <p className="text-[10px] text-gray-400">© 2023 GO-GREEN Enterprise. <a href="#" className="hover:text-[#C8A45E] underline">Privacy Policy</a></p>
           </div>
        </div>
      </div>
    </div>
  );
};
