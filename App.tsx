import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SummaryTab } from './components/SummaryTab';
import { Assistant } from './components/Assistant';
import { PlanProvider, usePlanData } from './components/PlanContext';
import { TabView } from './types';
import { FileText, PieChart, Clock, Home, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Extract inner component to safely use the hook
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.SUMMARY);
  const { accountData, transactions, investments, isLoading } = usePlanData();

  const renderTabContent = () => {
    if (isLoading && activeTab !== TabView.SUMMARY) {
      return (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200 animate-pulse">
           <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
           <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      );
    }

    switch (activeTab) {
      case TabView.SUMMARY:
        return <SummaryTab />;
      case TabView.CONTRIBUTIONS:
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Contribution Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your payroll deductions and savings rate.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Current Rate</p>
                    <p className="text-2xl font-bold text-fidelity-green">{accountData.contributionRate}%</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                     <h3 className="font-semibold text-gray-800 mb-3">Pre-Tax Contributions</h3>
                     <p className="text-sm text-gray-600 mb-4">Contributions are deducted from your pay before taxes are calculated.</p>
                     <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                        <span className="font-medium">Current Election</span>
                        <span className="font-bold">{accountData.contributionRate}%</span>
                     </div>
                     <button className="mt-4 w-full py-2 bg-fidelity-light text-white rounded hover:bg-fidelity-green transition-colors text-sm font-medium">Change Rate</button>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                     <h3 className="font-semibold text-gray-800 mb-3">Roth (After-Tax)</h3>
                     <p className="text-sm text-gray-600 mb-4">Contributions are deducted after taxes. Qualified withdrawals are tax-free.</p>
                     <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                        <span className="font-medium">Current Election</span>
                        <span className="font-bold">0%</span>
                     </div>
                     <button className="mt-4 w-full py-2 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors text-sm font-medium">Start Roth</button>
                  </div>
                </div>
            </div>
        );
      case TabView.INVESTMENTS:
         return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Investment Options</h2>
                    <p className="text-gray-500 text-sm mt-1">Current holdings and fund performance.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                      <tr>
                        <th className="py-3 px-4 rounded-l-lg">Name</th>
                        <th className="py-3 px-4">Symbol</th>
                        <th className="py-3 px-4 text-right">Balance</th>
                        <th className="py-3 px-4 text-right rounded-r-lg">Allocation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {investments.map((inv, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-gray-900">{inv.name}</td>
                          <td className="py-4 px-4 text-gray-500 font-mono text-xs">{inv.ticker}</td>
                          <td className="py-4 px-4 text-right font-medium">${inv.balance.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right">
                            <span className="bg-blue-50 text-blue-700 py-1 px-2 rounded text-xs font-semibold">{inv.allocationPercentage}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
        );
      case TabView.HISTORY:
         return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                    <p className="text-gray-500 text-sm mt-1">Recent activity on your account.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {tx.amount > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.date} • {tx.type}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${tx.amount > 0 ? 'text-green-700' : 'text-gray-900'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                     <div className="text-center py-10 text-gray-500">No transactions found</div>
                  )}
                </div>
            </div>
        );
      default:
        return <SummaryTab />;
    }
  };

  const TabButton = ({ tab, label, icon: Icon }: { tab: TabView, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`pb-3 px-1 flex items-center space-x-2 border-b-2 transition-colors font-medium text-sm ${
        activeTab === tab
          ? 'border-fidelity-light text-fidelity-green'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6 flex items-center">
            <a href="#" className="hover:underline">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">Plan Summary</span>
        </div>

        {/* Account Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fidelity-green mb-1">ABC CORPORATION 401(k) PLAN</h1>
          <p className="text-gray-500 text-sm">Account #: •••••6789</p>
        </div>

        {/* Page Tabs */}
        <div className="flex space-x-6 border-b border-gray-200 mb-8 overflow-x-auto">
          <TabButton tab={TabView.SUMMARY} label="Summary" icon={Home} />
          <TabButton tab={TabView.CONTRIBUTIONS} label="Contributions" icon={FileText} />
          <TabButton tab={TabView.INVESTMENTS} label="Investments" icon={PieChart} />
          <TabButton tab={TabView.HISTORY} label="History" icon={Clock} />
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-300">
            {renderTabContent()}
        </div>
      </main>

      <Footer />
      <Assistant />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PlanProvider>
      <AppContent />
    </PlanProvider>
  );
};

export default App;