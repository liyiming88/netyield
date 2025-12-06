import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowUpRight, TrendingUp, DollarSign, PieChart as PieIcon, CheckCircle, RefreshCcw } from 'lucide-react';
import { usePlanData } from './PlanContext';

export const SummaryTab: React.FC = () => {
  const { accountData, investments, transactions, isLoading } = usePlanData();

  // Colors for the real chart
  const CHART_COLORS = ['#1a472a', '#5d9632', '#9ca3af', '#e5e7eb'];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl h-64 border border-gray-200"></div>
          <div className="bg-white rounded-xl h-40 border border-gray-200"></div>
          <div className="bg-white rounded-xl h-64 border border-gray-200"></div>
        </div>
        <div className="space-y-6">
           <div className="bg-white rounded-xl h-80 border border-gray-200"></div>
           <div className="bg-white rounded-xl h-48 border border-gray-200"></div>
        </div>
      </div>
    );
  }

  const chartData = investments.map(inv => ({
    name: inv.name,
    value: inv.balance
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Balance & Performance */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Balance</h2>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${accountData.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-gray-400">as of today</span>
              </div>
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
              <span className="text-xs font-medium text-gray-500">
                Vested: ${accountData.vestedBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-fidelity-accent rounded-lg border border-green-100">
              <div className="p-2 bg-white rounded-md mr-3 shadow-sm text-fidelity-light">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rate of Return (YTD)</p>
                <p className="text-lg font-semibold text-gray-900">{accountData.rateOfReturn.toFixed(2)}%</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 bg-white rounded-md mr-3 shadow-sm text-gray-400">
                <ArrowUpRight size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">YTD Change</p>
                <p className="text-lg font-semibold text-green-700">
                  +${accountData.ytdChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insight / Status Card */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-white text-fidelity-light rounded-full shrink-0 shadow-sm">
            <CheckCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900">You are on track!</h3>
            <p className="text-green-800/80 text-sm mt-1 mb-4">
              Your contribution rate of {accountData.contributionRate}% is helping you build a strong foundation. 
              Based on your current trajectory, you are meeting standard milestones for your age group.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white text-fidelity-green border border-green-200 text-sm font-medium rounded-lg hover:bg-green-50 transition-colors shadow-sm">
                View Retirement Projector
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
            <a href="#" className="text-sm text-fidelity-light hover:underline font-medium">View All History</a>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                     {tx.type === 'Contribution' ? <RefreshCcw size={18} /> : <DollarSign size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.amount > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                  </p>
                  <p className="text-xs text-gray-400">{tx.type}</p>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500 font-medium">No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Asset Allocation & Tools */}
      <div className="space-y-6">
        
        {/* Asset Allocation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <PieIcon size={18} className="mr-2 text-fidelity-light" />
            Asset Allocation
          </h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <button className="w-full mt-4 py-2.5 border border-fidelity-light text-fidelity-light font-medium rounded-lg hover:bg-green-50 transition-colors text-sm">
            Change Investments
          </button>
        </div>

        {/* Contribution Quick View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-gray-800">Contributions</h3>
             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Election</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-gray-900">{accountData.contributionRate}%</span>
                <span className="text-sm text-gray-400 mb-1">of salary</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-fidelity-light h-2.5 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min(accountData.contributionRate * 5, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              Next scheduled contribution of <strong>${accountData.lastContributionAmount}</strong> expected on <strong>{accountData.nextContributionDate}</strong>.
            </p>

            <button className="w-full py-2.5 bg-fidelity-light text-white font-medium rounded-lg hover:bg-fidelity-green transition-colors text-sm shadow-sm">
              Change Contribution Amount
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};