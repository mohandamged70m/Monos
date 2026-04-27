import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function HeroCard() {
  return (
    <>
    <View className='p-5'>
        <Text className='text-xl font-bold'>Subscriptions</Text>
    </View>
    <LinearGradient
      colors={['#f0f0f0', '#ffffff' ]}
      className=''
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Subscription Hero Card</Text>
      <Text style={{ marginTop: 10 }}>This is a placeholder for the subscription hero card.</Text>

    </LinearGradient>
    </>
  )
}