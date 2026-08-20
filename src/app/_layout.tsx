import "@/global.css";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from '@clerk/expo/token-cache';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { LogBox } from "react-native";



SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
}

LogBox.ignoreLogs(["Clerk:"])

const Layout = () => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        SplashScreen.hideAsync()
        setLoaded(true)
    }, [])

    if (!loaded) {
        return
    }

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                <Stack.Screen name='(root)' options={{ headerShown: false }} />
            </Stack>
        </ClerkProvider>
    )
}

export default Layout