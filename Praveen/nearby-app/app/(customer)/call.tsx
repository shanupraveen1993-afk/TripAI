import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock, Store, Star, CircleDot, Pause, PhonePlus, BookUser, FileEdit, MicOff, PhoneOff } from 'lucide-react-native';

const AVATAR_URI = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfoMfvIxfXNl9lBjjDMNRvv3IXLg_fD0vSfWHmdPOaVwuCqKH-yVmlmyvBfOsHzIDsczXN4XbajXyyD8SXIT6LQrmIHi_BkhnRPumWWX9LACzwe4Lj_oRdpwiG1ph4nJh0rye9OTeMCjcJXczErVY-apj5ZBxY2Zw6kfpw7urXQQJeqBh1isxJK5h6elqG_D5rm3fW387qx-dz7JL5scMhncicZ2hO3Et2VVp3YRa30ZE5boel3bFb4rqCKzLh3E-1G96Qfexio4w';

const ACTIONS = [
  { icon: CircleDot,  label: 'Record'  },
  { icon: Pause,      label: 'Hold'    },
  { icon: PhonePlus,  label: 'Add call'},
  { icon: BookUser,   label: 'Contacts'},
  { icon: FileEdit,   label: 'Note'    },
  { icon: MicOff,     label: 'Mute'    },
];

export default function CallScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(50);
  const [muted, setMuted] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <View style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
      {/* Encrypted badge */}
      <View style={{ alignItems: 'center', paddingTop: 52, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, gap: 6 }}>
          <Lock size={13} color="rgba(255,255,255,0.9)" />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '500' }}>End-to-end encrypted</Text>
        </View>
      </View>

      {/* Avatar + pulse rings */}
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 8, paddingHorizontal: 16 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, width: 160, height: 160 }}>
          {/* Pulse rings */}
          <View style={{ position: 'absolute', width: 128, height: 128, borderRadius: 64, backgroundColor: 'rgba(173,44,0,0.2)' }} />
          <View style={{ position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(173,44,0,0.1)' }} />
          <Image source={{ uri: AVATAR_URI }} style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: '#1A1A1A' }} resizeMode="cover" />
        </View>

        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 6, letterSpacing: -0.5 }}>{fmt(seconds)}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 24 }}>Ongoing Call</Text>

        {/* Provider info card */}
        <View style={{ width: '100%', maxWidth: 320, backgroundColor: '#fff8f6', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e7bdb2', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 6 }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#ffe2db', alignItems: 'center', justifyContent: 'center' }}>
            <Store size={22} color="#FF4500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#1A1A1A', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>Alex's Pro Services</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 }}>
              <Star size={14} color="#FF4500" fill="#FF4500" />
              <Text style={{ color: '#1A1A1A', fontSize: 12, fontWeight: '700' }}>4.9</Text>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#c8c6c6' }} />
              <Text style={{ color: '#757575', fontSize: 12 }}>0.5Km away</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 3×2 action grid */}
      <View style={{ paddingHorizontal: 32, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', marginBottom: 8 }}>
          {ACTIONS.map(({ icon: Icon, label }) => {
            const isToggled = (label === 'Mute' && muted) || (label === 'Hold' && held);
            return (
              <View key={label} style={{ width: '28%', alignItems: 'center', gap: 6 }}>
                <TouchableOpacity
                  style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: isToggled ? 'rgba(255,69,0,0.3)' : 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}
                  onPress={() => {
                    if (label === 'Mute') setMuted(m => !m);
                    if (label === 'Hold') setHeld(h => !h);
                  }}
                  activeOpacity={0.8}
                >
                  <Icon size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Hang up */}
      <View style={{ paddingBottom: 40, paddingTop: 8, alignItems: 'center', background: 'linear-gradient(transparent, rgba(0,0,0,0.4))' }}>
        <TouchableOpacity
          style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center', shadowColor: '#FF4500', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.replace('/(customer)/rating')}
          activeOpacity={0.85}
        >
          <PhoneOff size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
