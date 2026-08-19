import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useSignIn } from '@clerk/expo'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'

export default function signIn() {
    const { signIn, fetchStatus } = useSignIn()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const handleSignIn = async () => {
        if (fetchStatus === "fetching") return;
        try {
            const signInAttempt = await signIn.create({ identifier: form.email, password: form.password })
            if (signIn.identifier) {
                console.log(signIn.identifier);
                router.push("/home")
            } else {
                console.log(JSON.stringify(signInAttempt, null, 2));
                Alert.alert("Error", "Log in failed. Please try again.")

            }
        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));
            Alert.alert("Error", error.errors[0].longMessage)
        }
    }

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='flex-1 bg-white'>
                <View className=' relative w-full h-[250px]'>
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className=' text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'> Welcome 👋</Text>
                </View>
                <View className='p-5'>
                    <InputField
                        label='Email'
                        placeholder='Enter email'
                        icon={icons.email}
                        textContentType='emailAddress'
                        value={form.email}
                        onChangeText={(email) => setForm({ ...form, email })} />
                    <InputField
                        label='Password'
                        placeholder='Enter password'
                        icon={icons.lock}
                        secureTextEntry
                        textContentType='password'
                        value={form.password}
                        onChangeText={(password) => setForm({ ...form, password })} />
                    <CustomButton
                        title='Sign In'
                        onPress={handleSignIn}
                        className='mt-6'
                    />
                </View>
                <OAuth />
                <Link href={"/sign-up"} className='text-lg text-center text-general-200 mt-10 '>
                    Don't have an account ? {" "}
                    <Text className='text-primary-500'>
                        Sign Up
                    </Text>
                </Link>

            </View>

        </ScrollView>
    )
}