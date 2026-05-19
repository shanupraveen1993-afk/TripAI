// ─────────────────────────────────────────────────────────────────────────────
// Thanjavur Itinerary Preset
//
// Ground-truth distances, travel times, and traffic levels for all realistic
// stop-pairs in a Thanjavur day itinerary.
//
// Sources:
//   • THANJAVUR_FACTS in plan.ts (walk times, auto fares, crowd patterns)
//   • CITY_LANDMARKS in plan.ts (GPS coords for Big Temple, Palace, Station)
//   • OpenStreetMap verified coords for remaining sites
//
// How to use:
//   import { getPresetLeg, canonicalKey } from './itineraryPreset';
//   const leg = getPresetLeg('big_temple', 'palace');
//   // → { distanceM, walkMins, autoMins, autoFare, mode, traffic: { Morning, Afternoon, Evening } }
//
// Fallback: if a pair is not in PRESET_LEGS, getPresetLeg() returns a
// Haversine-estimated leg with 'Moderate' traffic for all slots.
// ─────────────────────────────────────────────────────────────────────────────

export type TrafficLevel = 'Light' | 'Moderate' | 'Heavy';

export interface PresetLeg {
  distanceM:   number;          // road distance in metres
  walkMins:    number | null;   // null if walking is impractical (> 20 min or unsafe)
  autoMins:    number;          // auto/car time (no traffic)
  autoFare:    number;          // one-way INR estimate (₹)
  mode:        'walk' | 'auto' | 'taxi'; // recommended mode
  traffic: {
    Morning:   TrafficLevel;   // 7 AM – 12 PM
    Afternoon: TrafficLevel;   // 2 PM – 5 PM
    Evening:   TrafficLevel;   // 5 PM – 7 PM
  };
  note?: string;               // special instruction (taxi-only, bus+auto, etc.)
}

// ── Stop registry ─────────────────────────────────────────────────────────────
// Each entry: canonical key, GPS, and alias strings Gemini might return
// GPS source: CITY_LANDMARKS (Big Temple, Palace, Station, Bus Stand) +
//             OpenStreetMap for the rest
// ─────────────────────────────────────────────────────────────────────────────

export const STOPS: Record<string, {
  lat:     number;
  lng:     number;
  label:   string;        // display name
  aliases: string[];      // substrings to match against Gemini stop names (lowercase)
}> = {
  big_temple: {
    lat: 10.7827, lng: 79.1317,
    label: 'Brihadeeswarar Temple',
    aliases: ['brihadeeswarar', 'brihadeeswara', 'big temple', 'peruvudaiyar', 'thanjavur temple', 'brhadeeshwar'],
  },
  palace: {
    lat: 10.7819, lng: 79.1308,
    label: 'Thanjavur Palace',
    aliases: ['thanjavur palace', 'maratha palace', 'royal museum', 'palace museum', 'nayak palace', 'tanjore palace'],
  },
  saraswathi_mahal: {
    lat: 10.7820, lng: 79.1310,
    label: 'Saraswathi Mahal Library',
    aliases: ['saraswathi mahal', 'saraswati mahal', 'saraswathi library', 'palm leaf', 'manuscript'],
  },
  art_gallery: {
    lat: 10.7821, lng: 79.1312,
    label: 'Thanjavur Art Gallery',
    aliases: ['art gallery', 'thanjavur art', 'tanjore art', 'chola bronze', 'nataraja gallery'],
  },
  sivaganga_fort: {
    lat: 10.7812, lng: 79.1258,
    label: 'Sivaganga Fort',
    aliases: ['sivaganga', 'sivaganga fort', 'sivaganga park', 'fort'],
  },
  schwartz_church: {
    lat: 10.7848, lng: 79.1324,
    label: 'Schwartz Church',
    aliases: ['schwartz', 'schwartz church', 'danish mission', 'church'],
  },
  punnainallur_temple: {
    lat: 10.7738, lng: 79.1293,
    label: 'Punnainallur Mariamman Temple',
    aliases: ['punnainallur', 'mariamman', 'punnainallur mariamman'],
  },
  rajarajan_manimandapam: {
    lat: 10.7831, lng: 79.1320,
    label: 'Rajarajan Manimandapam',
    aliases: ['rajarajan', 'manimandapam', 'rajaraja statue', 'rajarajan statue'],
  },
  serfoji_memorial: {
    lat: 10.7822, lng: 79.1314,
    label: 'Raja Serfoji Memorial Hall',
    aliases: ['serfoji', 'raja serfoji', 'serfoji memorial', 'maharaja serfoji'],
  },
  airavatesvara_temple: {
    lat: 10.9524, lng: 79.3574,
    label: 'Airavatesvara Temple',
    aliases: ['airavatesvara', 'airavatheesvara', 'darasuram', 'airavateswarar'],
  },
  gangaikonda_cholapuram: {
    lat: 11.2071, lng: 79.4537,
    label: 'Gangaikonda Cholapuram',
    aliases: ['gangaikonda', 'gangaikondacholapuram', 'gangai konda'],
  },
  lunch_stop: {
    lat: 10.7855, lng: 79.1388,   // city centre — generic food area
    label: 'Thanjavur Thali Lunch',
    aliases: ['thali lunch', 'lunch', 'thanjavur thali', 'venkatramana', 'chola mess', 'banana leaf'],
  },
};

// ── Pair lookup ───────────────────────────────────────────────────────────────
// Key format: "from_key|to_key" (alphabetical order — looked up bidirectionally)
// All times are for an average adult, daytime conditions.
// ─────────────────────────────────────────────────────────────────────────────

const PRESET_LEGS: Record<string, PresetLeg> = {

  // ── Palace cluster: all walkable, zero auto needed ───────────────────────

  'big_temple|palace': {
    distanceM: 400, walkMins: 5, autoMins: 3, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
  },
  'big_temple|saraswathi_mahal': {
    distanceM: 500, walkMins: 7, autoMins: 4, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
  },
  'big_temple|art_gallery': {
    distanceM: 520, walkMins: 7, autoMins: 4, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
  },
  'big_temple|rajarajan_manimandapam': {
    distanceM: 2800, walkMins: null, autoMins: 12, autoFare: 80,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
    note: 'Road route goes around the outer temple complex — 2.8 km by auto (~12 min)',
  },
  'palace|saraswathi_mahal': {
    distanceM: 150, walkMins: 2, autoMins: 1, autoFare: 0,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Light', Evening: 'Light' },
    note: 'Same Palace complex — follow the interior corridor',
  },
  'palace|art_gallery': {
    distanceM: 180, walkMins: 2, autoMins: 1, autoFare: 0,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Light', Evening: 'Light' },
    note: 'Same Palace complex — art gallery is at the east wing',
  },
  'palace|serfoji_memorial': {
    distanceM: 120, walkMins: 2, autoMins: 1, autoFare: 0,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Light', Evening: 'Light' },
    note: 'Inside Palace complex',
  },
  'saraswathi_mahal|art_gallery': {
    distanceM: 100, walkMins: 2, autoMins: 1, autoFare: 0,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Light', Evening: 'Light' },
    note: 'Same complex — 2-minute walk through the inner courtyard',
  },
  'saraswathi_mahal|serfoji_memorial': {
    distanceM: 100, walkMins: 2, autoMins: 1, autoFare: 0,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Light', Evening: 'Light' },
  },
  'art_gallery|serfoji_memorial': {
    distanceM: 80, walkMins: 1, autoMins: 1, autoFare: 0,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Light', Evening: 'Light' },
  },

  // ── Short auto hops within city ──────────────────────────────────────────

  'big_temple|schwartz_church': {
    distanceM: 600, walkMins: 8, autoMins: 4, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'big_temple|sivaganga_fort': {
    distanceM: 1300, walkMins: null, autoMins: 8, autoFare: 60,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
  },
  'big_temple|punnainallur_temple': {
    distanceM: 1400, walkMins: null, autoMins: 10, autoFare: 70,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'big_temple|lunch_stop': {
    distanceM: 1200, walkMins: null, autoMins: 12, autoFare: 70,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Heavy', Evening: 'Moderate' },
    note: 'Head to Ganesh Mess / Chola Mess area — arrive by 12:15 PM for thali',
  },
  'palace|sivaganga_fort': {
    distanceM: 900, walkMins: 15, autoMins: 7, autoFare: 60,
    mode: 'auto',   // 15-min walk is borderline — auto recommended in heat
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
  },
  'palace|lunch_stop': {
    distanceM: 1100, walkMins: null, autoMins: 12, autoFare: 70,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Heavy', Evening: 'Moderate' },
  },
  'palace|punnainallur_temple': {
    distanceM: 1200, walkMins: null, autoMins: 10, autoFare: 70,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'palace|schwartz_church': {
    distanceM: 700, walkMins: 10, autoMins: 5, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'sivaganga_fort|lunch_stop': {
    distanceM: 1800, walkMins: null, autoMins: 14, autoFare: 80,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Heavy', Evening: 'Moderate' },
  },
  'sivaganga_fort|punnainallur_temple': {
    distanceM: 1600, walkMins: null, autoMins: 12, autoFare: 80,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'lunch_stop|sivaganga_fort': {
    distanceM: 1800, walkMins: null, autoMins: 14, autoFare: 80,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
  },
  'schwartz_church|palace': {
    distanceM: 700, walkMins: 10, autoMins: 5, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'schwartz_church|big_temple': {
    distanceM: 600, walkMins: 8, autoMins: 4, autoFare: 50,
    mode: 'walk',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'punnainallur_temple|big_temple': {
    distanceM: 1400, walkMins: null, autoMins: 10, autoFare: 70,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
  },
  'rajarajan_manimandapam|palace': {
    distanceM: 3200, walkMins: null, autoMins: 14, autoFare: 90,
    mode: 'auto',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Heavy' },
    note: '2.8 km from Big Temple area; palace is a further ~400 m — auto recommended',
  },

  // ── Long-distance: taxi required ─────────────────────────────────────────

  'big_temple|airavatesvara_temple': {
    distanceM: 38000, walkMins: null, autoMins: 55, autoFare: 1000,
    mode: 'taxi',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
    note: 'Hired taxi only — ₹800–1,200 round trip. Auto is not an option for this distance.',
  },
  'palace|airavatesvara_temple': {
    distanceM: 38000, walkMins: null, autoMins: 55, autoFare: 1000,
    mode: 'taxi',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
    note: 'Hired taxi only — ₹800–1,200 round trip.',
  },
  'big_temple|gangaikonda_cholapuram': {
    distanceM: 66000, walkMins: null, autoMins: 70, autoFare: 1200,
    mode: 'taxi',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
    note: 'Hired taxi only — ₹800–1,200 round trip. ~1 hr each way.',
  },
  'palace|gangaikonda_cholapuram': {
    distanceM: 66000, walkMins: null, autoMins: 70, autoFare: 1200,
    mode: 'taxi',
    traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' },
    note: 'Hired taxi only — ₹800–1,200 round trip.',
  },
};

// ── Canonical key lookup ──────────────────────────────────────────────────────
// Matches a Gemini stop name (any casing/variant) to a STOPS key.
// Returns null if no match found — caller should use Haversine fallback.
// ─────────────────────────────────────────────────────────────────────────────

export function canonicalKey(stopName: string): string | null {
  const n = stopName.toLowerCase().trim();
  for (const [key, stop] of Object.entries(STOPS)) {
    if (stop.aliases.some(a => n.includes(a) || a.includes(n))) return key;
  }
  return null;
}

// ── Haversine fallback ────────────────────────────────────────────────────────

function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R  = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a  = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fallbackLeg(fromKey: string | null, toKey: string | null): PresetLeg {
  // If both keys are known, compute straight-line × 1.35 road factor
  if (fromKey && toKey && STOPS[fromKey] && STOPS[toKey]) {
    const { lat: lat1, lng: lng1 } = STOPS[fromKey];
    const { lat: lat2, lng: lng2 } = STOPS[toKey];
    const straightM  = haversineM(lat1, lng1, lat2, lng2);
    const distanceM  = Math.round(straightM * 1.35);
    const walkMins   = distanceM <= 1000 ? Math.round(distanceM / 80) : null;
    const autoMins   = Math.max(3, Math.round(distanceM / 250));  // ~15 km/h city average
    const autoFare   = distanceM > 30000
      ? Math.round(distanceM / 1000 * 18)         // ₹18/km for long taxi
      : Math.min(300, Math.max(50, Math.round(distanceM / 1000 * 20 + 30))); // ₹30 base + ₹20/km
    const mode: 'walk' | 'auto' | 'taxi' =
      distanceM > 20000 ? 'taxi' : walkMins !== null ? 'walk' : 'auto';
    return { distanceM, walkMins, autoMins, autoFare, mode,
             traffic: { Morning: 'Light', Afternoon: 'Moderate', Evening: 'Moderate' } };
  }
  // Unknown stops — safe neutral defaults
  return { distanceM: 1000, walkMins: null, autoMins: 12, autoFare: 70, mode: 'auto',
           traffic: { Morning: 'Moderate', Afternoon: 'Moderate', Evening: 'Moderate' } };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns travel data for a stop-pair.
 * Accepts either canonical keys (e.g. 'big_temple') or raw Gemini stop names.
 * Lookup is bidirectional (A→B === B→A for distance/mode/traffic).
 */
export function getPresetLeg(from: string, to: string): PresetLeg {
  const fk = canonicalKey(from) ?? from;
  const tk = canonicalKey(to)   ?? to;

  // Try both directions
  const key1 = `${fk}|${tk}`;
  const key2 = `${tk}|${fk}`;

  return PRESET_LEGS[key1] ?? PRESET_LEGS[key2] ?? fallbackLeg(fk, tk);
}

/**
 * Build a human-readable travelToNext string from a PresetLeg.
 * e.g. "5 min walk" | "12 min auto ~₹70" | "55 min taxi ~₹1,000"
 */
export function legToTravelString(leg: PresetLeg): string {
  const mins = leg.walkMins ?? leg.autoMins;
  if (leg.mode === 'walk')  return `${leg.walkMins} min walk`;
  if (leg.mode === 'taxi')  return `${leg.autoMins} min taxi ~₹${leg.autoFare.toLocaleString('en-IN')}`;
  return `${leg.autoMins} min auto ~₹${leg.autoFare}`;
}

/**
 * Build a human-readable reachNote from a PresetLeg.
 */
export function legToReachNote(leg: PresetLeg, toStop: string): string {
  const label = STOPS[canonicalKey(toStop) ?? '']?.label ?? toStop;
  if (leg.note) return leg.note;
  if (leg.mode === 'walk') {
    const dist = leg.distanceM < 1000
      ? `${leg.distanceM}m`
      : `${(leg.distanceM / 1000).toFixed(1)}km`;
    return `${dist} walk (${leg.walkMins} min) to ${label}`;
  }
  if (leg.mode === 'taxi') {
    return `Hired taxi to ${label} — ~${leg.autoMins} min, ₹${leg.autoFare.toLocaleString('en-IN')} round trip`;
  }
  return `Auto to ${label} — ~${leg.autoMins} min, ~₹${leg.autoFare} one-way`;
}

// ── Preset route plans (Thanjavur only) ──────────────────────────────────────
// Ordered stop-key sequences for each time slot.
// These define the visit order — Gemini only fills in content, not sequence.
// ─────────────────────────────────────────────────────────────────────────────

export const SLOT_PLANS: Record<string, string[]> = {
  '07:00': ['big_temple', 'palace', 'saraswathi_mahal', 'art_gallery', 'sivaganga_fort'],
  '14:00': ['palace', 'art_gallery', 'sivaganga_fort'],
  '12:00': ['palace', 'art_gallery', 'sivaganga_fort'],   // alias
  '17:00': ['sivaganga_fort', 'big_temple'],
  '16:00': ['sivaganga_fort', 'big_temple'],              // alias
};

// Slot label used to look up traffic in PresetLeg.traffic
export function slotLabel(startTime: string): 'Morning' | 'Afternoon' | 'Evening' {
  if (startTime.startsWith('07') || startTime.startsWith('08') || startTime.startsWith('09')) return 'Morning';
  if (startTime.startsWith('16') || startTime.startsWith('17')) return 'Evening';
  return 'Afternoon';
}
