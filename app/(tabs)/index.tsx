import { ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import HeroCard from '@/components/home/HeroCard';
import AIInsightsCard from '@/components/home/AIInsightsCard';
import RenewalsList, { Subscription } from '@/components/home/RenewalsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { TransactionRow } from '@/components/home/TransactionRow';

const mockSubscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', logo: 'N', amount: 129, renewalDate: '2026-04-27', daysUntilRenewal: 3 },
  { id: '2', name: 'Spotify', logo: 'S', amount: 80, renewalDate: '2026-05-01', daysUntilRenewal: 7 },
  { id: '3', name: 'YouTube', logo: 'Y', amount: 85, renewalDate: '2026-05-05', daysUntilRenewal: 11 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <HeroCard />
        <View style={styles.section}>
          <AIInsightsCard
            insight="Food delivery up 3x vs last week — mostly Thursday nights."
            trendMultiplier={3}
            amount={340}
            category="Food"
          />
        </View>
        <View style={styles.section}>
          <RenewalsList subscriptions={mockSubscriptions} />
        </View>
        <View style={styles.section}>
          <TransactionRow icon={''} iconBg={''} merchant={''} category={''} amount={0} />
        </View>
        <View style={{ paddingBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  scroll: {
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  section: {
    marginTop: 20,
  },
});