import { Tabs } from "expo-router";
import { LayoutDashboard, PhoneCall, CircleUser } from "lucide-react-native";

export default function ProviderLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF4500",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e7bdb2",
          height: 64,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} /> }} />
      <Tabs.Screen name="calls" options={{ title: "Calls", tabBarIcon: ({ color, size }) => <PhoneCall color={color} size={size} /> }} />
      <Tabs.Screen name="account" options={{ title: "Account", tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} /> }} />
      <Tabs.Screen name="growth-plans" options={{ href: null }} />
      <Tabs.Screen name="incoming-call" options={{ href: null }} />
    </Tabs>
  );
}
