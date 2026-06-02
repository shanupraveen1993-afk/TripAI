import { Tabs } from "expo-router";
import { Home, Clock, User } from "lucide-react-native";

export default function CustomerLayout() {
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
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tabs.Screen name="history" options={{ title: "History", tabBarIcon: ({ color, size }) => <Clock color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
      <Tabs.Screen name="plumbing" options={{ href: null }} />
      <Tabs.Screen name="providers" options={{ href: null }} />
      <Tabs.Screen name="provider-detail" options={{ href: null }} />
      <Tabs.Screen name="call" options={{ href: null }} />
      <Tabs.Screen name="review-status" options={{ href: null }} />
      <Tabs.Screen name="rating" options={{ href: null }} />
      <Tabs.Screen name="notification-settings" options={{ href: null }} />
      <Tabs.Screen name="help-center" options={{ href: null }} />
    </Tabs>
  );
}
