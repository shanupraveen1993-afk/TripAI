import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react-native';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Cleaning'];

const SKILLS_MAP: Record<string, { id: string; label: string; desc: string }[]> = {
  Plumbing: [
    { id: 'tap',    label: 'Tap Fixing & Repair',  desc: 'Fixing leaks, drips, and replacements.' },
    { id: 'basin',  label: 'Wash Basin Service',    desc: 'Clog removal and mounting.' },
    { id: 'leak',   label: 'Leakage Repair',        desc: 'Expert pipe leak detection and fix.' },
    { id: 'toilet', label: 'Toilet Fittings',       desc: 'Flushing issues and installations.' },
    { id: 'ro',     label: 'RO & Filter Service',   desc: 'Filter replacement and maintenance.' },
  ],
  Electrical: [
    { id: 'wiring',  label: 'Wiring & Fitting',  desc: 'New wiring and socket installations.' },
    { id: 'fan',     label: 'Fan & Light',        desc: 'Fan and light fixture repairs.' },
    { id: 'switch',  label: 'Switchboard Repair', desc: 'MCB and switchboard work.' },
  ],
  Painting: [
    { id: 'wall',    label: 'Wall Painting',      desc: 'Interior and exterior wall painting.' },
    { id: 'texture', label: 'Texture Work',       desc: 'Designer textures and finishes.' },
  ],
  Cleaning: [
    { id: 'deep',    label: 'Deep Cleaning',      desc: 'Full home deep cleaning.' },
    { id: 'sofa',    label: 'Sofa Cleaning',      desc: 'Professional sofa shampoo cleaning.' },
  ],
};

export default function ProviderSkills() {
  const router = useRouter();
  const [category, setCategory] = useState('Plumbing');
  const [selected, setSelected] = useState<Set<string>>(new Set(['tap']));
  const [experience, setExperience] = useState(5);

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const skills = SKILLS_MAP[category] ?? [];

  return (
    <View className="flex-1 bg-surface-container-lowest">
      {/* Header */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Nearby Setup</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Title */}
        <View className="px-4 pt-5 pb-3 items-center" style={{ gap: 6 }}>
          <Text className="text-2xl font-bold text-text-primary">Select Your Skills</Text>
          <Text className="text-sm text-text-secondary text-center">Tell us what you're good at. You can always change this later in your profile settings.</Text>
        </View>

        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 pb-3" contentContainerStyle={{ gap: 8 }}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={{ paddingHorizontal: 24, paddingVertical: 10, borderRadius: 999, backgroundColor: category === cat ? '#FF4500' : '#fff', borderWidth: category === cat ? 0 : 1, borderColor: '#e7bdb2' }}
              onPress={() => setCategory(cat)}
              activeOpacity={0.85}
            >
              <Text style={{ color: category === cat ? '#fff' : '#757575', fontSize: 14, fontWeight: '600' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Experience Slider (simplified with +/-) */}
        <View className="px-4 py-4 bg-white border-b border-outline-variant" style={{ gap: 10 }}>
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-text-primary">Years of Experience</Text>
            <View style={{ backgroundColor: '#FF4500', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2 }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>{experience >= 20 ? '20+ Years' : `${experience} Years`}</Text>
            </View>
          </View>
          <View className="flex-row items-center" style={{ gap: 12 }}>
            <TouchableOpacity onPress={() => setExperience(e => Math.max(0, e - 1))} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffe9e4', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: '#FF4500', fontWeight: '700' }}>−</Text>
            </TouchableOpacity>
            <View className="flex-1 bg-surface-container-high rounded-full" style={{ height: 4 }}>
              <View style={{ height: 4, borderRadius: 2, backgroundColor: '#FF4500', width: `${(experience / 20) * 100}%` }} />
            </View>
            <TouchableOpacity onPress={() => setExperience(e => Math.min(20, e + 1))} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffe9e4', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: '#FF4500', fontWeight: '700' }}>+</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            {['0 yrs', '10 yrs', '20+ yrs'].map(l => (
              <Text key={l} style={{ fontSize: 10, color: '#757575', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</Text>
            ))}
          </View>
        </View>

        {/* Skill Cards */}
        <View className="px-4 pt-4" style={{ gap: 12 }}>
          {skills.map(skill => {
            const sel = selected.has(skill.id);
            return (
              <TouchableOpacity
                key={skill.id}
                className="flex-row items-center bg-white rounded-xl p-4"
                style={{ borderWidth: sel ? 2 : 1, borderColor: sel ? '#FF4500' : '#e7bdb2', gap: 16, backgroundColor: sel ? '#fff1ed' : '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}
                onPress={() => toggle(skill.id)}
                activeOpacity={0.85}
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-text-primary">{skill.label}</Text>
                  <Text className="text-sm text-text-secondary mt-0.5">{skill.desc}</Text>
                </View>
                {sel
                  ? <CheckCircle2 size={22} color="#FF4500" fill="#FF4500" />
                  : <Circle size={22} color="#e7bdb2" />
                }
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant px-4 py-4">
        <TouchableOpacity className="w-full rounded-full py-4 items-center" style={{ backgroundColor: '#FF4500', shadowColor: '#FF4500', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }} onPress={() => router.push('/onboarding/provider-preview')} activeOpacity={0.85}>
          <Text className="text-white text-base font-semibold">Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
