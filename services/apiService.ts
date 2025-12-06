import { AccountData, Transaction, Investment } from '../types';

export const fetchPlanData = async (): Promise<{
  accountData: AccountData;
  transactions: Transaction[];
  investments: Investment[];
}> => {
  // Simulate server latency (1.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    accountData: {
      totalBalance: 142567.89,
      vestedBalance: 139850.45,
      ytdChange: 12450.50,
      rateOfReturn: 12.4,
      lastContributionAmount: 850.00,
      nextContributionDate: '2024-06-15',
      contributionRate: 8,
    },
    transactions: [
      { id: '1', date: '2024-06-01', description: 'Contribution - Pay Period 11', amount: 850.00, type: 'Contribution' },
      { id: '2', date: '2024-06-01', description: 'Employer Match', amount: 425.00, type: 'Contribution' },
      { id: '3', date: '2024-05-15', description: 'Contribution - Pay Period 10', amount: 850.00, type: 'Contribution' },
      { id: '4', date: '2024-03-31', description: 'Dividend Reinvestment - FDKLX', amount: 345.20, type: 'Dividend' },
      { id: '5', date: '2024-03-31', description: 'Plan Admin Fee', amount: -25.00, type: 'Fee' },
    ],
    investments: [
      { name: 'Target Date 2060 Fund', ticker: 'FDKLX', balance: 64155.55, allocationPercentage: 45 },
      { name: '500 Index Fund', ticker: 'FXAIX', balance: 49898.76, allocationPercentage: 35 },
      { name: 'Bond Index Fund', ticker: 'FXNAX', balance: 28513.58, allocationPercentage: 20 },
    ]
  };
};