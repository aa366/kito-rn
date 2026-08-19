import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignUp } from '@clerk/expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

interface VerificationType {
    code: string;
    error: string;
    state: "pending" | "default" | "success" | "failed";
}

export default function SignUp() {

    const { signUp, fetchStatus } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [verification, setVerification] = useState<VerificationType>({
        state: "default",
        error: "",
        code: ""
    })
    const onSignUpPress = async () => {
        if (fetchStatus === "fetching") return

        try {
            const attempt = await signUp.create({
                firstName: form.name,
                emailAddress: form.email,
                password: form.password,
            })
            if (attempt.error) {
                console.log(attempt.error)
                throw new Error("attempt failed")
            };



            await signUp.verifications.sendEmailCode();
            setVerification({
                ...verification,
                state: "pending"
            })
            console.log("sign up complete");

        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));
            Alert.alert("ERROR", (error.errors[0].longMessage ?? error))

        }
    }
    const onPressVerify = async () => {
        if (fetchStatus === "fetching") return
        try {
            const completeSignUp = await signUp.verifications.verifyEmailCode({ code: verification.code })
            console.log("verifing");

            if (!completeSignUp.error) {
                console.log("clerk fine");
                setVerification({
                    ...verification,
                    state: "success"
                })

            } else {
                setVerification({
                    ...verification,
                    error: "Verification failed. Please try again .",
                    state: "failed"
                })
            }
            console.log("verifing finished");


        } catch (error: any) {
            setVerification({
                ...verification,
                error: error.errors[0].longMessage,
                state: "failed"
            })
        }
    }
    return (
        <ScrollView className="flex-1 bg-white">
            <View className='flex-1 bg-white'>
                <View className=" relative w-full h-[250px] ">
                    <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
                    <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
                        Create your account
                    </Text>
                </View>
                <View className="p-5">
                    <InputField
                        label='Name'
                        placeholder='Enter Name'
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({ ...form, name: value })} />
                    <InputField
                        label='email'
                        placeholder='Enter email'
                        icon={icons.email}
                        textContentType='emailAddress'
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })} />
                    <InputField
                        label='password'
                        placeholder='Enter password'
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })} />
                    <CustomButton
                        title='Sign Up'
                        onPress={onSignUpPress}
                        className=' mt-6' />

                    {/* OAuth */}
                    <OAuth />
                    <Link href={"/sign-in"} className='text-lg text-center text-general-200 mt-10 '>
                        Already have an account? {" "}
                        <Text className='text-primary-500'> Log In</Text></Link>

                </View>

                {/* Verify Model */}
                <ReactNativeModal isVisible={verification.state === "pending"} onModalHide={() => {
                    if (verification.state === "success") {
                        setShowSuccessModal(true)
                    }
                }}>
                    <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
                        <Text className=' font-JakartaExtraBold text-2xl mb-2 '>
                            Verification
                        </Text>
                        <Text className=' font-Jakarta mb-5'>
                            We&apos;ve sent a verification code to {form.email}
                        </Text>
                        <InputField
                            label='code'
                            icon={icons.lock}
                            placeholder='12345'
                            value={verification.code}
                            keyboardType='numeric'
                            onChangeText={(code) => setVerification({ ...verification, code })} />
                        {verification.error && (<Text className='text-red-500 text-sm mt-1 '>
                            {verification.error}
                        </Text>)}
                        <CustomButton
                            title='Verify Email'
                            onPress={onPressVerify}
                            className='mt-5 bg-success-500'
                        />
                    </View>
                </ReactNativeModal>

                {/* Success Moal */}
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
                        <Image source={images.check}
                            className=' w-[110px] h-[110px] mx-auto my-5' />
                        <Text className='text-3xl font-JakartaBold text-center'>
                            Verified
                        </Text>
                        <Text className='text-base text-gray-400 font-Jakarta text-center mt-2'>
                            You have successfully verified your account.
                        </Text>
                        <CustomButton
                            title='Browse Home'
                            onPress={() => router.push("/home")}
                            className='mt-5' />

                    </View>


                </ReactNativeModal>
            </View>


        </ScrollView>
    )
}