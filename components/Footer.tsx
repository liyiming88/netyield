import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-3">NetYield</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-fidelity-light">About Us</a></li>
              <li><a href="#" className="hover:text-fidelity-light">Careers</a></li>
              <li><a href="#" className="hover:text-fidelity-light">Privacy</a></li>
              <li><a href="#" className="hover:text-fidelity-light">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Help & Support</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-fidelity-light">Contact Us</a></li>
              <li><a href="#" className="hover:text-fidelity-light">Forms</a></li>
              <li><a href="#" className="hover:text-fidelity-light">Glossary</a></li>
              <li><a href="#" className="hover:text-fidelity-light">FAQ</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-3">Important Information</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Investing involves risk, including risk of loss. The value of your investment will fluctuate over time and you may gain or lose money.
              <br/><br/>
              NetYield Brokerage Services LLC, Member NYSE, SIPC, 900 Salem Street, Smithfield, RI 02917
              <br/><br/>
              © 2024 FMR LLC. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};