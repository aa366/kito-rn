import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFound() {
  return (
    <SafeAreaView>
      <Text className="text-red-500 m-auto">Not Found page</Text>
    </SafeAreaView>
  );
}
