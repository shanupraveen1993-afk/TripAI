import { Redirect } from "expo-router";

export default function Index() {
  // Entry point — redirect to splash/welcome
  return <Redirect href="/onboarding/splash" />;
}
