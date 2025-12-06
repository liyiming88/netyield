import React, { useState } from 'react';
import { Menu, Search, User, Bell, X, ChevronRight, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-fidelity-green text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="font-bold text-2xl tracking-tight flex items-center space-x-2">
            <div className="w-8 h-8 bg-fidelity-light rounded-sm flex items-center justify-center">
              <span className="text-white font-serif font-black text-xl">N</span>
            </div>
            <span>NetYield</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#" className="opacity-100 border-b-2 border-white py-5">Accounts & Trade</a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:border-b-2 hover:border-white/50 py-5 transition-all">Planning & Advice</a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:border-b-2 hover:border-white/50 py-5 transition-all">News & Research</a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:border-b-2 hover:border-white/50 py-5 transition-all">Products</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-green-900/30 px-3 py-1.5 rounded-full border border-green-700/50">
            <Search size={16} className="text-green-100 mr-2" />
            <input 
              type="text" 
              placeholder="Search or get a quote" 
              className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-green-200/70 w-40" 
            />
          </div>
          <button className="p-2 hover:bg-green-800 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-fidelity-green"></span>
          </button>
          <button className="hidden sm:flex items-center space-x-2 hover:bg-green-800 px-3 py-1.5 rounded-full transition-colors">
            <User size={20} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
          <button 
            className="md:hidden p-2 hover:bg-green-800 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-fidelity-green border-t border-green-800 absolute w-full left-0 shadow-xl animate-in slide-in-from-top-5 duration-200 z-50">
          <nav className="flex flex-col p-4 space-y-1">
            <div className="mb-4 pb-4 border-b border-green-800/50">
               <div className="flex items-center bg-green-900/30 px-3 py-2 rounded-lg border border-green-700/50 mb-2">
                <Search size={16} className="text-green-100 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search or get a quote" 
                  className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-green-200/70 w-full" 
                />
              </div>
            </div>
             <a href="#" className="flex items-center justify-between px-4 py-3 hover:bg-green-800 rounded-lg transition-colors group">
               <span className="font-medium">Accounts & Trade</span>
               <ChevronRight size={16} className="text-green-300 group-hover:translate-x-1 transition-transform" />
             </a>
             <a href="#" className="flex items-center justify-between px-4 py-3 hover:bg-green-800 rounded-lg transition-colors group">
               <span className="font-medium opacity-90">Planning & Advice</span>
               <ChevronRight size={16} className="text-green-300 group-hover:translate-x-1 transition-transform" />
             </a>
             <a href="#" className="flex items-center justify-between px-4 py-3 hover:bg-green-800 rounded-lg transition-colors group">
               <span className="font-medium opacity-90">News & Research</span>
               <ChevronRight size={16} className="text-green-300 group-hover:translate-x-1 transition-transform" />
             </a>
             <a href="#" className="flex items-center justify-between px-4 py-3 hover:bg-green-800 rounded-lg transition-colors group">
               <span className="font-medium opacity-90">Products</span>
               <ChevronRight size={16} className="text-green-300 group-hover:translate-x-1 transition-transform" />
             </a>
             <div className="pt-4 mt-2 border-t border-green-800/50">
               <button className="flex items-center space-x-3 px-4 py-3 text-green-100 w-full hover:bg-green-800 rounded-lg transition-colors">
                 <LogOut size={18} />
                 <span className="font-medium">Log Out</span>
               </button>
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};