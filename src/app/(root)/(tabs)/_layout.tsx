import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const TabIcon = ({ focused, source }: {
    focused: boolean;
    source: ImageSourcePropType;
}) => (
    <View
        className={`flex w-12 h-12 rounded-full justify-center items-center  ${focused ? "bg-general-300" : ""} overflow-hidden `}>
        <View className={`  w-12 h-12 items-center justify-center  ${focused ? "bg-general-400" : ""}`}>
            <Image
                source={source}
                tintColor="white"
                resizeMode="contain"
                className="w-8 h-8"
            />
        </View>
    </View>
)
export default function TabsLayout() {
    return (
        <SafeAreaView className=" relative min-h-full min-w-full">
            <Tabs screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 50,
                    paddingVertical: 0,
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 10,
                    paddingTop: 20,
                    height: 80,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute"
                }

            }}>
                <Tabs.Screen name="Home" options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.home} focused={focused}
                        />
                    )
                }} />
                <Tabs.Screen name="Chat" options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.chat} focused={focused}
                        />
                    )
                }} />
                <Tabs.Screen name="History" options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.list} focused={focused}
                        />
                    )
                }} />
                <Tabs.Screen name="Profile" options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.profile} focused={focused}
                        />
                    )
                }} />
            </Tabs>
        </SafeAreaView>
    );
}
