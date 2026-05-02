import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { createDB, Goal as DBGoal, Budget as DBBudget } from '@/utils/db';
import { useTransactions } from './TransactionsContext';

export interface UIGoal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  monthlyContribution: number;
  color: string;
  icon?: string;
}

export interface UIBudget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
  icon?: string;
}

interface GoalsSummary {
  totalSaved: number;
  totalTarget: number;
  goalsCount: number;
  monthlyTotal: number;
}

interface BudgetsSummary {
  totalBudget: number;
  totalSpent: number;
  categoriesCount: number;
  remaining: number;
}

export type TargetsTab = 'goals' | 'budget';

interface TargetsContextType {
  goals: UIGoal[];
  budgets: UIBudget[];
  goalsSummary: GoalsSummary;
  budgetsSummary: BudgetsSummary;
  activeTab: TargetsTab;
  setActiveTab: (tab: TargetsTab) => void;
  loading: boolean;
  refetch: () => Promise<void>;
}

const TargetsContext = createContext<TargetsContextType | undefined>(undefined);

function computeGoalsSummary(goals: UIGoal[]): GoalsSummary {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const monthlyTotal = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
  return {
    totalSaved,
    totalTarget,
    goalsCount: goals.length,
    monthlyTotal,
  };
}

function computeBudgetsSummary(budgets: UIBudget[]): BudgetsSummary {
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  return {
    totalBudget,
    totalSpent,
    categoriesCount: budgets.length,
    remaining: totalBudget - totalSpent,
  };
}

function mapDBToUIGoal(g: DBGoal): UIGoal {
  return {
    id: g.id.toString(),
    name: g.name,
    targetAmount: g.target,
    savedAmount: g.saved,
    monthlyContribution: g.monthly_contribution,
    color: g.color,
    icon: g.emoji || undefined,
  };
}

function mapDBToUIBudget(b: DBBudget, spent: number = 0): UIBudget {
  return {
    id: b.id.toString(),
    category: b.category,
    limit: b.limit,
    spent,
    color: b.color,
    icon: b.category.charAt(0) || '$',
  };
}

export function TargetsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<UIGoal[]>([]);
  const [budgets, setBudgets] = useState<UIBudget[]>([]);
  const [goalsSummary, setGoalsSummary] = useState<GoalsSummary>({
    totalSaved: 0,
    totalTarget: 0,
    goalsCount: 0,
    monthlyTotal: 0,
  });
  const [budgetsSummary, setBudgetsSummary] = useState<BudgetsSummary>({
    totalBudget: 0,
    totalSpent: 0,
    categoriesCount: 0,
    remaining: 0,
  });
  const [activeTab, setActiveTab] = useState<TargetsTab>('goals');
  const [loading, setLoading] = useState(true);
  const { getToken, userId } = useAuth();
  const { transactions } = useTransactions();
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;
  const transactionsRef = useRef(transactions);
  transactionsRef.current = transactions;

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const db = createDB(async () => (await getTokenRef.current()) || '');
      const [goalsData, budgetsData] = await Promise.all([
        db.goals.getAll(userId),
        db.budgets.getAll(userId),
      ]);

      const uiGoals = goalsData.map(mapDBToUIGoal);
      setGoals(uiGoals);
      setGoalsSummary(computeGoalsSummary(uiGoals));

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const categorySpent: Record<string, number> = {};
      transactionsRef.current.forEach((tx) => {
        if (tx.type !== 'expense' || !tx.date) return;
        const txDate = new Date(tx.date);
        if (txDate.getMonth() !== currentMonth || txDate.getFullYear() !== currentYear) return;
        categorySpent[tx.category] = (categorySpent[tx.category] || 0) + tx.amount;
      });

      const uiBudgets = budgetsData.map((b: DBBudget) =>
        mapDBToUIBudget(b, categorySpent[b.category] || 0)
      );
      setBudgets(uiBudgets);
      setBudgetsSummary(computeBudgetsSummary(uiBudgets));
    } catch (err) {
      console.error('Failed to fetch targets data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, transactions]);

  return (
    <TargetsContext.Provider
      value={{
        goals,
        budgets,
        goalsSummary,
        budgetsSummary,
        activeTab,
        setActiveTab,
        loading,
        refetch: fetchData,
      }}
    >
      {children}
    </TargetsContext.Provider>
  );
}

export function useTargets() {
  const context = useContext(TargetsContext);
  if (!context) {
    throw new Error('useTargets must be used within a TargetsProvider');
  }
  return context;
}
