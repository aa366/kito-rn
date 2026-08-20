import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { isSignedIn, isLoaded } = useAuth()


  if (!isLoaded) {
    return
  }
  if (isSignedIn) return <Redirect href={"/Home"} />
  return <Redirect href="/welcom" />;
}
