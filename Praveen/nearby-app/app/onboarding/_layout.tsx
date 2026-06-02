import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="role-select" />
      {/* Customer onboarding */}
      <Stack.Screen name="customer-signup" />
      <Stack.Screen name="customer-otp" />
      <Stack.Screen name="customer-address" />
      {/* Provider onboarding */}
      <Stack.Screen name="provider-signup" />
      <Stack.Screen name="provider-aadhaar" />
      <Stack.Screen name="provider-address" />
      <Stack.Screen name="provider-services" />
      <Stack.Screen name="provider-skills" />
      <Stack.Screen name="provider-preview" />
    </Stack>
  );
}
