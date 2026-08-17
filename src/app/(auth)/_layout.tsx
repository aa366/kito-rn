import { Stack } from "expo-router";
import "@/global.css";

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name="welcom" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />

        </Stack>
    );
}
