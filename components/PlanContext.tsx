import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccountData, Transaction, Investment } from '../types';
import { fetchPlanData } from '../services/apiService';

interface PlanContextType {
  accountData: AccountData;
  transactions: Transaction[];
  investments: Investment[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const initialAccountData: AccountData = {
  totalBalance: 0.00,
  vestedBalance: 0.00,
  ytdChange: 0.00,
  rateOfReturn: 0.00,
  lastContributionAmount: 0.00,
  nextContributionDate: 'N/A',
  contributionRate: 0,
};

const PlanContext = createContext<PlanContextType>({
  accountData: initialAccountData,
  transactions: [],
  investments: [],
  isLoading: true,
  refreshData: async () => {},
});

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountData, setAccountData] = useState<AccountData>(initialAccountData);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPlanData();
      setAccountData(data.accountData);
      setTransactions(data.transactions);
      setInvestments(data.investments);
    } catch (error) {
      console.error("Failed to fetch plan data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PlanContext.Provider value={{
      accountData,
      transactions,
      investments,
      isLoading,
      refreshData: loadData
    }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanData = () => useContext(PlanContext);