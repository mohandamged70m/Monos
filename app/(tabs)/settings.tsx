import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useAuth, useUser, useClerk } from '@clerk/expo'
import React from 'react'

const settings = () => {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>User ID: {user?.id}</Text>
      <Text style={styles.text}>Email: {user?.primaryEmailAddress?.emailAddress}</Text>
      <Pressable style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})

export default settings