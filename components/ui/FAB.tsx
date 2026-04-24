// components/ui/FAB.tsx
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Plus } from 'lucide-react-native'
import { colors } from '@/constants/colors'

export function FAB({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity 
      style={styles.fab} 
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Plus color="white" size={28} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 84,      // sits above the nav bar
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  }
})