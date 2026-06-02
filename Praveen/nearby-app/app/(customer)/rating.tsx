import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Star } from "lucide-react-native";

const QUALITY_CHIPS = ["Service Speed", "Behavior", "Pricing", "Cleanliness"];

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const toggleChip = (chip: string) =>
    setSelected((prev) => prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]);

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5">
        <Text className="text-white text-lg font-semibold">Rate Your Experience</Text>
        <Text className="text-white/80 text-sm mt-1">Your feedback helps other customers</Text>
      </View>

      <View className="px-5 pt-6 pb-8">
        {/* Provider */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary-fixed items-center justify-center mb-3">
            <Text className="text-trust-blue text-3xl font-bold">R</Text>
          </View>
          <Text className="text-on-surface text-lg font-bold">Rate Rajesh Kumar</Text>
          <Text className="text-brand-teal text-sm font-medium">Plumber<Text className="text-on-surface-variant font-normal"> · Tap Fixing</Text></Text>
        </View>

        {/* Stars */}
        <View className="items-center mb-6">
          <View className="flex-row gap-3">
            {[1,2,3,4,5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Star color="#FFC107" size={44} fill={s <= rating ? "#FFC107" : "none"} />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text className="text-appbar-bg text-sm font-semibold mt-2">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </Text>
          )}
        </View>

        {/* Quality chips */}
        <Text className="text-on-surface text-sm font-bold mb-3">What went well?</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {QUALITY_CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip}
              className={`px-4 py-2 rounded-full border-2 ${selected.includes(chip) ? "bg-appbar-bg border-appbar-bg" : "bg-surface-container-lowest border-outline-variant"}`}
              onPress={() => toggleChip(chip)}
            >
              <Text className={`text-sm font-medium ${selected.includes(chip) ? "text-white" : "text-on-surface"}`}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-on-surface text-sm font-bold mb-3">Additional comments</Text>
        <TextInput
          className="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-4 text-on-surface text-sm mb-8"
          style={{ minHeight: 100, textAlignVertical: "top" }}
          placeholder="Share your experience (optional)..."
          placeholderTextColor="#926f66"
          multiline
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          className={`rounded-xl h-14 items-center justify-center ${rating > 0 ? "bg-appbar-bg" : "bg-surface-container-high"}`}
          style={rating > 0 ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
          disabled={rating === 0}
          onPress={() => router.replace("/(customer)/home")}
        >
          <Text className={`text-base font-bold ${rating > 0 ? "text-white" : "text-on-surface-variant"}`}>
            Submit Review
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
