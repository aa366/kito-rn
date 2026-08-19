import { icons } from '@/constants';
import { useSSO } from '@clerk/expo';
import { router } from 'expo-router';
import { Alert, Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';

export default function OAuth() {
    const { startSSOFlow } = useSSO()
    const handleGoogleSignIn = async () => {

        const result = await startSSOFlow({ strategy: "oauth_google" })
        if (result.createdSessionId) {
            Alert.alert("Success", "Session exists. Redirecting to home screen .")
            router.push("/home")
        }
        Alert.alert(result.setActive ? "Succes" : "Error", result.authSessionResult?.type)
    }
    return (
        <View>
            <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-general-100 ' />
                <Text className='text-lg'>OR</Text>
                <View className='flex-1 h-[1px] bg-general-100 ' />
            </View>
            <CustomButton
                onPress={handleGoogleSignIn}
                title='Log In with Google'
                className='mt-5 w-full shadow-none'
                IconLeft={() => <Image
                    source={icons.google}
                    resizeMode='contain'
                    className='w-5 h-5 mx-2'

                />}
                bgVariant='outline'
                textVariant='primary'
            />
        </View>
    )
}