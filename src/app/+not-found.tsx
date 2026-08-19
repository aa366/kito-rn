import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <SafeAreaView style={styles.container}>
        <Text >Not Found page</Text>
        <Text >This Screen doesn't exist.</Text>
        <Link href={"/"} style={styles.link}>
          Go to home screen!</Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
})
