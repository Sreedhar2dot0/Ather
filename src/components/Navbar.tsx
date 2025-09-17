import React from 'react';
import { Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Ather Energy</h1>
              <p className="text-xs text-gray-500">Loan Facilitation Portal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">Finance Your EV</p>
            <p className="text-xs text-gray-500">Quick & Easy</p>
          </div>
        </div>
      </div>
    </nav>
  );
};