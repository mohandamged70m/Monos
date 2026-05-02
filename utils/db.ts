import { createSupabaseClerkClient } from './supabase'

export interface Transaction {
  id: number
  user_id: string
  amount: number
  category: string
  merchant: string | null
  date: string
  note: string | null
  type: 'income' | 'expense' | 'transfer'
  account: string | null
  created_at: string
}

export interface Subscription {
  id: number
  user_id: string
  name: string
  amount: number
  cycle: 'daily' | 'weekly' | 'monthly' | 'yearly'
  next_renewal: string
  status: 'active' | 'paused' | 'cancelled'
  created_at: string
}

export interface Installment {
  id: number
  user_id: string
  name: string
  amount: number
  total_months: number
  paid_months: number
  remaining_amount: number
  next_payment_date: string
  status: 'active' | 'warning' | 'completed'
  created_at: string
}

export interface Goal {
  id: number
  user_id: string
  name: string
  target: number
  saved: number
  emoji: string | null
  deadline: string | null
  color: string
  monthly_contribution: number
  created_at: string
}

export interface Budget {
  id: number
  user_id: string
  category: string
  limit: number
  color: string
  created_at: string
}

export const createDB = (getToken: () => Promise<string>) => {
  const supabase = createSupabaseClerkClient(getToken);

  return {
    transactions: {
      getAll: async (userId: string) => {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false })
        if (error) throw error
        return data as Transaction[]
      },

      create: async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('transactions')
          .insert(transaction)
          .select()
          .single()
        if (error) throw error
        return data as Transaction
      },

      update: async (id: number, updates: Partial<Omit<Transaction, 'id' | 'created_at'>>) => {
        const { data, error } = await supabase
          .from('transactions')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return data as Transaction
      },

      delete: async (id: number) => {
        const { error } = await supabase.from('transactions').delete().eq('id', id)
        if (error) throw error
      },
    },

    subscriptions: {
      getAll: async (userId: string) => {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userId)
          .order('name')
        if (error) throw error
        return data as Subscription[]
      },

      create: async (subscription: Omit<Subscription, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('subscriptions')
          .insert(subscription)
          .select()
          .single()
        if (error) throw error
        return data as Subscription
      },

      update: async (id: number, updates: Partial<Omit<Subscription, 'id' | 'created_at'>>) => {
        const { data, error } = await supabase
          .from('subscriptions')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return data as Subscription
      },

      delete: async (id: number) => {
        const { error } = await supabase.from('subscriptions').delete().eq('id', id)
        if (error) throw error
      },
    },

    installments: {
      getAll: async (userId: string) => {
        const { data, error } = await supabase
          .from('installments')
          .select('*')
          .eq('user_id', userId)
          .order('next_payment_date', { ascending: true })
        if (error) throw error
        return data as Installment[]
      },

      create: async (installment: Omit<Installment, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('installments')
          .insert(installment)
          .select()
          .single()
        if (error) throw error
        return data as Installment
      },

      update: async (id: number, updates: Partial<Omit<Installment, 'id' | 'created_at'>>) => {
        const { data, error } = await supabase
          .from('installments')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return data as Installment
      },

      delete: async (id: number) => {
        const { error } = await supabase.from('installments').delete().eq('id', id)
        if (error) throw error
      },
    },

    goals: {
      getAll: async (userId: string) => {
        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', userId)
          .order('deadline', { ascending: true })
        if (error) throw error
        return data as Goal[]
      },

      create: async (goal: Omit<Goal, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('goals')
          .insert(goal)
          .select()
          .single()
        if (error) throw error
        return data as Goal
      },

      update: async (id: number, updates: Partial<Omit<Goal, 'id' | 'created_at'>>) => {
        const { data, error } = await supabase
          .from('goals')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return data as Goal
      },

      delete: async (id: number) => {
        const { error } = await supabase.from('goals').delete().eq('id', id)
        if (error) throw error
      },
    },

    budgets: {
      getAll: async (userId: string) => {
        const { data, error } = await supabase
          .from('budgets')
          .select('id, user_id, category, "limit", color, created_at')
          .eq('user_id', userId)
          .order('category')
        if (error) throw error
        return (data || []) as Budget[]
      },

      create: async (budget: Omit<Budget, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('budgets')
          .insert({ user_id: budget.user_id, category: budget.category, "limit": budget.limit, color: budget.color })
          .select()
          .single()
        if (error) throw error
        return {
          ...data,
          limit: (data as any).limit,
        } as unknown as Budget
      },

      update: async (id: number, updates: Partial<Omit<Budget, 'id' | 'created_at'>>) => {
        const updatePayload: Record<string, unknown> = { ...updates }
        if (updates?.limit !== undefined) {
          updatePayload["limit"] = updates.limit
          delete updatePayload.limit
        }
        const { data, error } = await supabase
          .from('budgets')
          .update(updatePayload)
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return { ...data, limit: (data as any).limit } as unknown as Budget
      },

      delete: async (id: number) => {
        const { error } = await supabase.from('budgets').delete().eq('id', id)
        if (error) throw error
      },
    },
  }
}
