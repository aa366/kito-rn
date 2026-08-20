import RideCard from '@/components/RideCard'
import { MockRides } from '@/constants/MockData'
import { useAuth, useUser } from '@clerk/expo'
import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function home() {
    const { user } = useUser()
    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
        router.replace("/sign-in")
    }
    const [hasPermisson, setHasPermission] = useState(false)

    return (
        <SafeAreaView className='bg-white'>
            <FlatList
                data={MockRides}
                renderItem={
                    ({ item }) => <RideCard ride={item} />}
                keyExtractor={(item, index) => index.toString()}
                className='px-5'
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            />
            <Text>home</Text>
        </SafeAreaView>
    )
}