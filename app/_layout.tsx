import { Stack } from 'expo-router'
import 'react-native-reanimated'
import { TransactionsProvider } from '@/context/TransactionsContext'
import { BillsProvider } from '@/context/BillsContext'

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <BillsProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BillsProvider>
    </TransactionsProvider>
  )
}
