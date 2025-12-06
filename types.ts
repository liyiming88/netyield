export interface AccountData {
  totalBalance: number;
  vestedBalance: number;
  ytdChange: number;
  rateOfReturn: number;
  lastContributionAmount: number;
  nextContributionDate: string;
  contributionRate: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Contribution' | 'Fee' | 'Dividend' | 'Transfer';
}

export interface Investment {
  name: string;
  ticker: string;
  balance: number;
  allocationPercentage: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum TabView {
  SUMMARY = 'SUMMARY',
  CONTRIBUTIONS = 'CONTRIBUTIONS',
  INVESTMENTS = 'INVESTMENTS',
  HISTORY = 'HISTORY'
}