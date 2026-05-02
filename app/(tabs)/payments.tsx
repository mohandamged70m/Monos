import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
   StatusBar,
   Modal,
 } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, HelpCircle, Calendar } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BillsSummaryCard from '@/components/payments/BillsSummaryCard';
import EmptyState from '@/components/payments/EmptyState';
import SubscriptionList from '@/components/payments/subscriptions/SubscriptionList';
import InstallmentList from '@/components/payments/installments/InstallmentList';
import SubscriptionForm from '@/components/payments/subscriptions/SubscriptionForm';
import InstallmentForm from '@/components/payments/installments/InstallmentForm';
import { useBills } from '@/context/BillsContext';

type BillsTab = 'subscriptions' | 'installments';

export default function BillsPage() {
   const {
     subscriptions,
     installments,
     subscriptionSummary,
     installmentSummary,
     activeTab,
     setActiveTab,
   } = useBills();

   const [showAddSubscription, setShowAddSubscription] = useState(false);
   const [showAddInstallment, setShowAddInstallment] = useState(false);

   const isSubscription = activeTab === 'subscriptions';
   const accentColor = isSubscription ? theme.colors.teal : theme.colors.accent;

   const handleAddPress = () => {
     if (isSubscription) {
       setShowAddSubscription(true);
     } else {
       setShowAddInstallment(true);
     }
   };

  const handleTabPress = (tab: BillsTab) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Payments</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <HelpCircle color={theme.colors.textSecondary} size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Calendar color={theme.colors.textSecondary} size={22} />
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
            isSubscription && styles.tabActive,
            isSubscription && { borderColor: theme.colors.teal },
          ]}
          onPress={() => handleTabPress('subscriptions')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              isSubscription && { color: theme.colors.teal },
            ]}
          >
            Subscriptions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            !isSubscription && styles.tabActive,
            !isSubscription && { borderColor: theme.colors.accent },
          ]}
          onPress={() => handleTabPress('installments')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              !isSubscription && { color: theme.colors.accent },
            ]}
          >
            Installments
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BillsSummaryCard
          type={activeTab}
          subscriptionData={subscriptionSummary}
          installmentData={installmentSummary}
        />

        {isSubscription ? (
          subscriptions.length > 0 ? (
            <SubscriptionList subscriptions={subscriptions} />
          ) : (
            <EmptyState type="subscriptions" onAddPress={handleAddPress} />
          )
        ) : installments.length > 0 ? (
          <InstallmentList installments={installments} />
        ) : (
          <EmptyState type="installments" onAddPress={handleAddPress} />
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        visible={showAddSubscription}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddSubscription(false)}
      >
        <SafeAreaView edges={['top']} style={styles.modalContainer}>
          <SubscriptionForm
            onSave={() => setShowAddSubscription(false)}
            onCancel={() => setShowAddSubscription(false)}
          />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={showAddInstallment}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddInstallment(false)}
      >
        <SafeAreaView edges={['top']} style={styles.modalContainer}>
          <InstallmentForm
            onSave={() => setShowAddInstallment(false)}
            onCancel={() => setShowAddInstallment(false)}
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
   bottomPadding: {
     height: 100,
   },
   modalContainer: {
     flex: 1,
     backgroundColor: theme.colors.background,
   },
});