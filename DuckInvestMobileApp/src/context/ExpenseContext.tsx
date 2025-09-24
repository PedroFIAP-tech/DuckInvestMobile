import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Expense {
  id: string;
  value: number;
  date: string;
  category: string;
  description: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  getExpensesByCategory: (category: string) => Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const getExpensesByCategory = (category: string) => {
    return expenses.filter(expense => expense.category === category);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, getExpensesByCategory }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
