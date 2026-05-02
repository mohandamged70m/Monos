import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, HelpCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import TargetsSummaryCard from '@/components/targets/TargetsSummaryCard';
import TargetsEmptyState from '@/components/targets/TargetsEmptyState';
import GoalCard from '@/components/targets/goals/GoalCard';
import BudgetCard from '@/components/targets/budgets/BudgetCard';
import GoalForm from '@/components/targets/goals/GoalForm';
import BudgetForm from '@/components/targets/budgets/BudgetForm';
import { useTargets } from '@/context/TargetsContext';
import { TargetsTab } from '@/context/TargetsContext';

export default function TargetsPage() {
  const {
    goals,
    budgets,
    goalsSummary,
    budgetsSummary,
    activeTab,
    setActiveTab,
    loading,
    refetch,
  } = useTargets();

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const insets = useSafeAreaInsets();

  const isGoal = activeTab === 'goals';
  const accentColor = isGoal ? theme.colors.teal : theme.colors.accent;

  if (loading) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const handleAddPress = () => {
    if (isGoal) {
      setShowAddGoal(true);
    } else {
      setShowAddBudget(true);
    }
  };

  const handleTabPress = (tab: TargetsTab) => {
    setActiveTab(tab);
  };

  const handleGoalSave = async () => {
    setShowAddGoal(false);
    await refetch();
  };

  const handleBudgetSave = async () => {
    setShowAddBudget(false);
    await refetch();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Targets</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <HelpCircle color={theme.colors.textSecondary} size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fabButton, { backgroundColor: accentColor }]}
            activeOpacity={0.85}
            onPress={handleAddPress}
          >
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            isGoal && styles.tabActive,
            isGoal && { borderColor: theme.colors.teal },
          ]}
          onPress={() => handleTabPress('goals')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              isGoal && { color: theme.colors.teal },
            ]}
          >
            Goals
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            !isGoal && styles.tabActive,
            !isGoal && { borderColor: theme.colors.accent },
          ]}
          onPress={() => handleTabPress('budget')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              !isGoal && { color: theme.colors.accent },
            ]}
          >
            Budget
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TargetsSummaryCard
          type={activeTab}
          goalsData={goalsSummary}
          budgetData={budgetsSummary}
        />

        {isGoal ? (
          goals.length > 0 ? (
            goals.map((goal) => (
              <View key={goal.id} style={styles.cardWrapper}>
                <GoalCard goal={goal} />
              </View>
            ))
          ) : (
            <TargetsEmptyState type="goals" onAddPress={handleAddPress} />
          )
        ) : budgets.length > 0 ? (
          budgets.map((budget) => (
            <View key={budget.id} style={styles.cardWrapper}>
              <BudgetCard budget={budget} />
            </View>
          ))
        ) : (
          <TargetsEmptyState type="budget" onAddPress={handleAddPress} />
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        visible={showAddGoal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddGoal(false)}
      >
        <SafeAreaView edges={['top']} style={styles.modalContainer}>
          <GoalForm
            onSave={handleGoalSave}
            onCancel={() => setShowAddGoal(false)}
          />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={showAddBudget}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddBudget(false)}
      >
        <SafeAreaView edges={['top']} style={styles.modalContainer}>
          <BudgetForm
            onSave={handleBudgetSave}
            onCancel={() => setShowAddBudget(false)}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  tabText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
   cardWrapper: {
     marginBottom: 12,
   },
   bottomPadding: {
     height: 100,
   },
   modalContainer: {
     flex: 1,
     backgroundColor: theme.colors.background,
   },
});
