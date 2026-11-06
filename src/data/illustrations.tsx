import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number | string;
}

export const CartoonAgo: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F0F9FF" />
    {/* Visual timeline */}
    <line x1="25" y1="80" x2="175" y2="80" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
    <polygon points="20,80 32,74 32,86" fill="#0284C7" />
    
    {/* Past point */}
    <circle cx="55" cy="80" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
    <text x="55" y="108" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">PAST</text>
    <path d="M 55 45 C 55 35, 75 35, 95 45" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 3" fill="none" />
    <polygon points="53,46 59,40 62,49" fill="#F59E0B" />
    <text x="85" y="32" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="bold">2 days ago</text>

    {/* Today point */}
    <circle cx="150" cy="80" r="12" fill="#10B981" stroke="#047857" strokeWidth="3" />
    <text x="150" y="108" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">TODAY</text>
    <circle cx="150" cy="80" r="4" fill="#FFFFFF" />

    {/* Little clock in past */}
    <circle cx="55" cy="58" r="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    <line x1="55" y1="58" x2="55" y2="52" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <line x1="55" y1="58" x2="60" y2="58" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CartoonCalendar: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#EFF6FF" />
    {/* Calendar Card */}
    <rect x="45" y="30" width="110" height="95" rx="12" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="3" />
    <path d="M 45 42 Q 45 30 57 30 L 143 30 Q 155 30 155 42 L 155 56 L 45 56 Z" fill="#3B82F6" />
    {/* Spiral rings */}
    <rect x="65" y="24" width="8" height="14" rx="4" fill="#1E40AF" />
    <rect x="95" y="24" width="8" height="14" rx="4" fill="#1E40AF" />
    <rect x="125" y="24" width="8" height="14" rx="4" fill="#1E40AF" />
    {/* Header text */}
    <text x="100" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">CALENDAR</text>
    {/* Grid of days */}
    <circle cx="65" cy="74" r="5" fill="#E2E8F0" />
    <circle cx="85" cy="74" r="5" fill="#E2E8F0" />
    <circle cx="105" cy="74" r="5" fill="#38BDF8" />
    <circle cx="125" cy="74" r="5" fill="#E2E8F0" />
    <circle cx="65" cy="94" r="5" fill="#E2E8F0" />
    <circle cx="85" cy="94" r="6" fill="#EF4444" />
    <circle cx="105" cy="94" r="5" fill="#E2E8F0" />
    <circle cx="125" cy="94" r="5" fill="#E2E8F0" />
    <circle cx="100" cy="112" r="4" fill="#10B981" />
  </svg>
);

export const CartoonDate: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FEF2F2" />
    {/* Large Date Page */}
    <rect x="50" y="25" width="100" height="105" rx="12" fill="#FFFFFF" stroke="#FCA5A5" strokeWidth="3" />
    <path d="M 50 37 Q 50 25 62 25 L 138 25 Q 150 25 150 37 L 150 54 L 50 54 Z" fill="#EF4444" />
    <text x="100" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">MAY</text>
    {/* Big Date Number */}
    <text x="100" y="98" textAnchor="middle" fill="#1E293B" fontSize="42" fontWeight="800">10</text>
    {/* Red Hand-drawn Circle for Date highlight */}
    <ellipse cx="100" cy="88" rx="36" ry="26" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 4" fill="none" />
    <text x="100" y="120" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="bold">TODAY&apos;S DATE</text>
  </svg>
);

export const CartoonHowLong: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FDF4FF" />
    {/* Hourglass and duration arrow */}
    <circle cx="70" cy="75" r="32" fill="#FFFFFF" stroke="#E879F9" strokeWidth="3" />
    {/* Clock face */}
    <circle cx="70" cy="75" r="2" fill="#9333EA" />
    <line x1="70" y1="75" x2="70" y2="54" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="75" x2="86" y2="75" stroke="#C026D3" strokeWidth="3" strokeLinecap="round" />
    {/* Duration measurement span */}
    <path d="M 115 50 L 165 50" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
    <line x1="115" y1="42" x2="115" y2="58" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
    <line x1="165" y1="42" x2="165" y2="58" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
    {/* Question bubble */}
    <rect x="110" y="72" width="60" height="34" rx="8" fill="#9333EA" />
    <text x="140" y="93" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">How long?</text>
    <polygon points="125,106 135,106 122,114" fill="#9333EA" />
    <text x="70" y="125" textAnchor="middle" fill="#7E22CE" fontSize="11" fontWeight="bold">Duration / Time span</text>
  </svg>
);

export const CartoonEarly: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FFFBEB" />
    {/* Rising Sun */}
    <circle cx="100" cy="115" r="45" fill="#FDE047" />
    <line x1="100" y1="60" x2="100" y2="50" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <line x1="55" y1="80" x2="45" y2="75" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <line x1="145" y1="80" x2="155" y2="75" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    {/* Alarm clock showing 6:00 AM */}
    <circle cx="100" cy="75" r="28" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
    <circle cx="100" cy="75" r="2" fill="#B45309" />
    <line x1="100" y1="75" x2="100" y2="56" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="100" y1="75" x2="100" y2="86" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <circle cx="83" cy="52" r="5" fill="#F59E0B" />
    <circle cx="117" cy="52" r="5" fill="#F59E0B" />
    <text x="100" y="132" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="bold">EARLY · 6:00 AM</text>
  </svg>
);

export const CartoonLate: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FEF2F2" />
    {/* Running clock with sweat drops */}
    <circle cx="85" cy="70" r="30" fill="#FFFFFF" stroke="#EF4444" strokeWidth="3.5" />
    <line x1="85" y1="70" x2="85" y2="48" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    <line x1="85" y1="70" x2="102" y2="76" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    {/* Bells ringing */}
    <circle cx="68" cy="46" r="6" fill="#DC2626" />
    <circle cx="102" cy="46" r="6" fill="#DC2626" />
    {/* Speed lines */}
    <line x1="30" y1="65" x2="45" y2="65" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="75" x2="42" y2="75" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="85" x2="47" y2="85" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    {/* Child rushing */}
    <circle cx="145" cy="55" r="10" fill="#FCA5A5" />
    <path d="M 145 65 L 140 85 L 130 102 M 140 85 L 152 100 M 143 72 L 158 68" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    <text x="100" y="132" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="bold">LATE · HURRY!</text>
  </svg>
);

export const CartoonTime: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#ECFDF5" />
    {/* Beautiful analog clock */}
    <circle cx="100" cy="72" r="42" fill="#FFFFFF" stroke="#10B981" strokeWidth="4" />
    <circle cx="100" cy="72" r="3" fill="#047857" />
    {/* Hour tick marks */}
    <circle cx="100" cy="38" r="2" fill="#059669" />
    <circle cx="134" cy="72" r="2" fill="#059669" />
    <circle cx="100" cy="106" r="2" fill="#059669" />
    <circle cx="66" cy="72" r="2" fill="#059669" />
    {/* Clock hands */}
    <line x1="100" y1="72" x2="100" y2="48" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="100" y1="72" x2="118" y2="60" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    <text x="100" y="134" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">TIME · CLOCK</text>
  </svg>
);

export const CartoonYear: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#EEF2FF" />
    {/* 4 Seasons circular cycle */}
    <ellipse cx="100" cy="70" rx="55" ry="32" stroke="#6366F1" strokeWidth="2.5" strokeDasharray="5 4" fill="none" />
    {/* Winter node */}
    <circle cx="45" cy="70" r="14" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
    <text x="45" y="74" textAnchor="middle" fontSize="11">❄️</text>
    {/* Spring node */}
    <circle cx="100" cy="38" r="14" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
    <text x="100" y="42" textAnchor="middle" fontSize="11">🌸</text>
    {/* Summer node */}
    <circle cx="155" cy="70" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
    <text x="155" y="74" textAnchor="middle" fontSize="11">☀️</text>
    {/* Autumn node */}
    <circle cx="100" cy="102" r="14" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2" />
    <text x="100" y="106" textAnchor="middle" fontSize="11">🍂</text>
    <text x="100" y="75" textAnchor="middle" fill="#4338CA" fontSize="14" fontWeight="800">1 YEAR</text>
    <text x="100" y="136" textAnchor="middle" fill="#4F46E5" fontSize="11" fontWeight="bold">12 MONTHS CYCLE</text>
  </svg>
);

export const CartoonFestival: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FFF7ED" />
    {/* Bunting flags */}
    <path d="M 15 25 Q 100 45 185 25" stroke="#F97316" strokeWidth="2" fill="none" />
    <polygon points="35,28 48,29 41,45" fill="#EF4444" />
    <polygon points="65,33 78,34 71,50" fill="#3B82F6" />
    <polygon points="95,35 108,35 101,52" fill="#10B981" />
    <polygon points="125,34 138,33 131,50" fill="#F59E0B" />
    <polygon points="155,29 168,28 161,45" fill="#EC4899" />
    {/* Festival Tent */}
    <polygon points="100,50 60,115 140,115" fill="#F43F5E" />
    <polygon points="100,50 85,115 115,115" fill="#FFFFFF" />
    <polygon points="100,50 95,115 105,115" fill="#F43F5E" />
    {/* Tent flag */}
    <line x1="100" y1="50" x2="100" y2="40" stroke="#9F1239" strokeWidth="2" />
    <polygon points="100,40 114,44 100,48" fill="#FBBF24" />
    {/* Balloons */}
    <circle cx="45" cy="75" r="10" fill="#38BDF8" />
    <line x1="45" y1="85" x2="48" y2="105" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="155" cy="72" r="10" fill="#A855F7" />
    <line x1="155" y1="82" x2="152" y2="105" stroke="#94A3B8" strokeWidth="1.5" />
    <text x="100" y="136" textAnchor="middle" fill="#C2410C" fontSize="13" fontWeight="bold">SCHOOL FESTIVAL</text>
  </svg>
);

export const CartoonHaveNoFear: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F0FDF4" />
    {/* Confident Child with hero cape */}
    {/* Red Hero Cape */}
    <path d="M 90 70 L 65 115 L 95 105 Z" fill="#EF4444" />
    {/* Head */}
    <circle cx="100" cy="55" r="15" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
    {/* Smiling face */}
    <circle cx="95" cy="53" r="2" fill="#1E293B" />
    <circle cx="105" cy="53" r="2" fill="#1E293B" />
    <path d="M 96 60 Q 100 64 104 60" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Confident Body */}
    <rect x="90" y="70" width="20" height="30" rx="6" fill="#3B82F6" />
    {/* Hands on hips */}
    <path d="M 90 75 L 80 82 L 90 90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 110 75 L 120 82 L 110 90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Legs */}
    <line x1="95" y1="100" x2="95" y2="118" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
    <line x1="105" y1="100" x2="105" y2="118" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
    {/* Small shadow/fear smiling peacefully in corner */}
    <ellipse cx="155" cy="85" rx="18" ry="12" fill="#E2E8F0" />
    <text x="155" y="88" textAnchor="middle" fontSize="10">🦁💤</text>
    <text x="100" y="138" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">HAVE NO FEAR · BRAVE</text>
  </svg>
);

export const CartoonPrepare: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F8FAFC" />
    {/* School backpack being prepared */}
    <rect x="75" y="55" width="50" height="60" rx="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
    <rect x="85" y="75" width="30" height="25" rx="6" fill="#60A5FA" />
    <path d="M 90 55 C 90 40, 110 40, 110 55" stroke="#1D4ED8" strokeWidth="3" fill="none" />
    {/* Items being packed: Book, pencil, ruler */}
    <rect x="50" y="60" width="18" height="26" rx="3" fill="#10B981" transform="rotate(-15 50 60)" />
    <rect x="135" y="58" width="6" height="30" rx="2" fill="#F59E0B" transform="rotate(20 135 58)" />
    {/* Checkmark */}
    <circle cx="100" cy="35" r="10" fill="#10B981" />
    <path d="M 96 35 L 99 38 L 105 32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <text x="100" y="136" textAnchor="middle" fill="#1D4ED8" fontSize="13" fontWeight="bold">PREPARE · PACK BAG</text>
  </svg>
);

export const CartoonComicBook: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FFFBEB" />
    {/* Comic Book Cover */}
    <rect x="65" y="25" width="70" height="95" rx="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
    <polygon points="100,38 108,46 122,42 116,55 125,65 110,66 104,78 96,68 82,72 88,58 80,47 94,48" fill="#EF4444" />
    <text x="100" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">POW!</text>
    {/* Speech bubble */}
    <ellipse cx="100" cy="95" rx="24" ry="12" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="2" />
    <text x="100" y="99" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="800">COMIC</text>
    <text x="100" y="138" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="bold">COMIC BOOK</text>
  </svg>
);

export const CartoonLion: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FFF7ED" />
    {/* Lion Mane */}
    <circle cx="100" cy="70" r="38" fill="#F97316" />
    {/* Lion Face */}
    <circle cx="100" cy="72" r="26" fill="#FED7AA" />
    {/* Ears */}
    <circle cx="80" cy="46" r="10" fill="#F97316" />
    <circle cx="80" cy="46" r="5" fill="#FED7AA" />
    <circle cx="120" cy="46" r="10" fill="#F97316" />
    <circle cx="120" cy="46" r="5" fill="#FED7AA" />
    {/* Eyes */}
    <circle cx="92" cy="68" r="4" fill="#1E293B" />
    <circle cx="108" cy="68" r="4" fill="#1E293B" />
    <circle cx="93" cy="67" r="1" fill="#FFFFFF" />
    <circle cx="109" cy="67" r="1" fill="#FFFFFF" />
    {/* Cute Nose and Smile */}
    <polygon points="100,76 95,72 105,72" fill="#7C2D12" />
    <path d="M 95 78 Q 100 83 105 78" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" fill="none" />
    <text x="100" y="135" textAnchor="middle" fill="#C2410C" fontSize="13" fontWeight="bold">LION PUPPET</text>
  </svg>
);

export const CartoonMountain: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F0FDFA" />
    {/* Back Mountain */}
    <polygon points="140,55 90,120 185,120" fill="#94A3B8" />
    <polygon points="140,55 125,74 135,78 145,72 155,75" fill="#F8FAFC" />
    {/* Main Tall Mountain */}
    <polygon points="75,30 20,120 130,120" fill="#475569" />
    {/* Snow Peak */}
    <polygon points="75,30 55,58 68,64 78,56 90,62 95,58" fill="#FFFFFF" />
    {/* Green Trees at base */}
    <polygon points="40,118 35,128 45,128" fill="#15803D" />
    <polygon points="90,116 85,128 95,128" fill="#15803D" />
    <text x="100" y="138" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">TALL MOUNTAIN</text>
  </svg>
);

export const CartoonRainbow: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F0F9FF" />
    {/* Rainbow Arcs */}
    <path d="M 30 115 A 70 70 0 0 1 170 115" stroke="#EF4444" strokeWidth="7" fill="none" />
    <path d="M 37 115 A 63 63 0 0 1 163 115" stroke="#F97316" strokeWidth="7" fill="none" />
    <path d="M 44 115 A 56 56 0 0 1 156 115" stroke="#EAB308" strokeWidth="7" fill="none" />
    <path d="M 51 115 A 49 49 0 0 1 149 115" stroke="#22C55E" strokeWidth="7" fill="none" />
    <path d="M 58 115 A 42 42 0 0 1 142 115" stroke="#3B82F6" strokeWidth="7" fill="none" />
    <path d="M 65 115 A 35 35 0 0 1 135 115" stroke="#A855F7" strokeWidth="7" fill="none" />
    {/* Fluffy clouds at ends */}
    <circle cx="32" cy="115" r="16" fill="#FFFFFF" />
    <circle cx="44" cy="110" r="12" fill="#FFFFFF" />
    <circle cx="168" cy="115" r="16" fill="#FFFFFF" />
    <circle cx="156" cy="110" r="12" fill="#FFFFFF" />
    <text x="100" y="138" textAnchor="middle" fill="#0284C7" fontSize="13" fontWeight="bold">RAINBOW</text>
  </svg>
);

export const CartoonSnail: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F0FDF4" />
    {/* Green leaf base */}
    <path d="M 25 110 Q 100 135 175 105 Q 120 95 25 110 Z" fill="#86EFAC" stroke="#22C55E" strokeWidth="2" />
    {/* Snail body */}
    <path d="M 45 105 Q 85 105 130 105 Q 145 105 145 90 Q 145 75 130 85 Q 90 95 50 102 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
    {/* Snail Shell (Spiral) */}
    <circle cx="85" cy="80" r="22" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
    <circle cx="85" cy="80" r="14" fill="#FDBA74" stroke="#C2410C" strokeWidth="2" />
    <circle cx="85" cy="80" r="6" fill="#FED7AA" />
    {/* Eye stalks */}
    <line x1="140" y1="80" x2="148" y2="65" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="149" cy="64" r="3.5" fill="#1E293B" />
    <line x1="134" y1="82" x2="138" y2="68" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="139" cy="67" r="3" fill="#1E293B" />
    <text x="100" y="138" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="bold">LITTLE SNAIL</text>
  </svg>
);

export const CartoonTall: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#FEFCE8" />
    {/* Giraffe: very tall */}
    {/* Body */}
    <ellipse cx="130" cy="100" rx="25" ry="16" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    {/* Tall Neck */}
    <path d="M 140 100 L 140 35 L 148 35 L 152 100 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    {/* Head */}
    <ellipse cx="140" cy="30" rx="10" ry="7" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    {/* Spots */}
    <circle cx="144" cy="50" r="3" fill="#B45309" />
    <circle cx="142" cy="70" r="4" fill="#B45309" />
    <circle cx="130" cy="98" r="5" fill="#B45309" />
    {/* Legs */}
    <line x1="115" y1="110" x2="115" y2="128" stroke="#D97706" strokeWidth="3" />
    <line x1="140" y1="110" x2="140" y2="128" stroke="#D97706" strokeWidth="3" />
    {/* Small comparison child */}
    <circle cx="65" cy="95" r="9" fill="#FED7AA" stroke="#F97316" strokeWidth="1.5" />
    <rect x="58" y="104" width="14" height="16" rx="4" fill="#3B82F6" />
    <line x1="61" y1="120" x2="61" y2="128" stroke="#1E293B" strokeWidth="2.5" />
    <line x1="69" y1="120" x2="69" y2="128" stroke="#1E293B" strokeWidth="2.5" />
    {/* Height arrow */}
    <line x1="85" y1="125" x2="85" y2="30" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
    <polygon points="85,25 81,35 89,35" fill="#059669" />
    <text x="100" y="140" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="bold">TALL · HIGH REACH</text>
  </svg>
);

export const CartoonTired: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="200" height="150" rx="16" fill="#F1F5F9" />
    {/* Cozy child resting head on soft pillow */}
    <rect x="45" y="80" width="110" height="40" rx="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
    {/* Pillow */}
    <ellipse cx="100" cy="85" rx="40" ry="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    {/* Resting head */}
    <circle cx="95" cy="72" r="18" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
    {/* Sleeping eyes */}
    <path d="M 86 72 Q 91 76 96 72" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Zzz marks */}
    <text x="135" y="50" fill="#64748B" fontSize="16" fontWeight="bold">Z</text>
    <text x="148" y="38" fill="#94A3B8" fontSize="12" fontWeight="bold">z</text>
    <text x="156" y="28" fill="#CBD5E1" fontSize="9" fontWeight="bold">z</text>
    <text x="100" y="136" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="bold">TIRED · RESTING</text>
  </svg>
);

// Neutral Decorative Visual Learning Cues for the 12 Months (Purely visual cues, NO season classification)
export const MonthIconPartyHat: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#EFF6FF" />
    <polygon points="40,16 24,56 56,56" fill="#3B82F6" />
    <circle cx="40" cy="15" r="4" fill="#F59E0B" />
    <circle cx="33" cy="35" r="3" fill="#FDE047" />
    <circle cx="46" cy="44" r="3.5" fill="#EC4899" />
    <circle cx="36" cy="50" r="2.5" fill="#10B981" />
    {/* Streamers */}
    <path d="M 22 58 Q 20 66 26 68" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M 58 58 Q 62 66 56 69" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const MonthIconHeartRibbon: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#FFF1F2" />
    <path d="M 40 56 C 24 44 18 32 24 24 C 30 16 38 20 40 26 C 42 20 50 16 56 24 C 62 32 56 44 40 56 Z" fill="#F43F5E" />
    <circle cx="34" cy="27" r="3" fill="#FDA4AF" />
    {/* Sparkle */}
    <path d="M 52 20 L 54 24 L 58 25 L 54 26 L 52 30 L 50 26 L 46 25 L 50 24 Z" fill="#FDE047" />
  </svg>
);

export const MonthIconKite: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#F0FDF4" />
    {/* Diamond kite */}
    <polygon points="40,16 54,36 40,56 26,36" fill="#10B981" />
    <polygon points="40,16 54,36 40,36" fill="#34D399" />
    <polygon points="26,36 40,36 40,56" fill="#059669" />
    {/* String & bows */}
    <path d="M 40 56 Q 44 64 38 70" stroke="#047857" strokeWidth="1.5" fill="none" />
    <polygon points="38,62 44,61 41,65" fill="#F59E0B" />
    <polygon points="36,68 42,67 39,71" fill="#EC4899" />
  </svg>
);

export const MonthIconSprout: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#ECFDF5" />
    {/* Flowerpot */}
    <polygon points="30,46 50,46 47,64 33,64" fill="#EA580C" />
    <rect x="28" y="42" width="24" height="6" rx="2" fill="#C2410C" />
    {/* Green sprout leaves */}
    <path d="M 40 44 Q 40 32 30 26 Q 38 24 40 34" fill="#22C55E" />
    <path d="M 40 38 Q 44 26 52 24 Q 48 34 40 40" fill="#16A34A" />
  </svg>
);

export const MonthIconFlower: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#FDF2F8" />
    {/* Petals */}
    <circle cx="40" cy="28" r="9" fill="#F472B6" />
    <circle cx="51" cy="35" r="9" fill="#F472B6" />
    <circle cx="48" cy="48" r="9" fill="#F472B6" />
    <circle cx="32" cy="48" r="9" fill="#F472B6" />
    <circle cx="29" cy="35" r="9" fill="#F472B6" />
    {/* Center */}
    <circle cx="40" cy="39" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
  </svg>
);

export const MonthIconSun: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#FEFCE8" />
    <circle cx="40" cy="40" r="18" fill="#F59E0B" />
    <circle cx="40" cy="40" r="14" fill="#FBBF24" />
    {/* Rays */}
    <line x1="40" y1="12" x2="40" y2="18" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="62" x2="40" y2="68" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="12" y1="40" x2="18" y2="40" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="62" y1="40" x2="68" y2="40" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="20" y1="20" x2="25" y2="25" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="55" y1="55" x2="60" y2="60" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="20" y1="60" x2="25" y2="55" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <line x1="55" y1="25" x2="60" y2="20" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const MonthIconPopsicle: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#F0FDFA" />
    {/* Stick */}
    <rect x="37" y="48" width="6" height="18" rx="2" fill="#D97706" />
    {/* Popsicle Body */}
    <path d="M 28 32 C 28 22 52 22 52 32 L 52 48 L 28 48 Z" fill="#06B6D4" />
    <path d="M 28 32 C 28 22 52 22 52 32 L 52 38 L 28 38 Z" fill="#F43F5E" />
    <circle cx="34" cy="30" r="2" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

export const MonthIconSailboat: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#EFF6FF" />
    {/* Boat hull */}
    <polygon points="20,54 60,54 52,64 28,64" fill="#B45309" />
    {/* Mast */}
    <line x1="39" y1="20" x2="39" y2="54" stroke="#78350F" strokeWidth="2" />
    {/* White & cyan sails */}
    <polygon points="41,22 58,46 41,46" fill="#0284C7" />
    <polygon points="37,26 22,48 37,48" fill="#38BDF8" />
  </svg>
);

export const MonthIconBookPencil: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
    {/* Book */}
    <rect x="22" y="28" width="36" height="30" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
    <rect x="26" y="32" width="28" height="22" rx="2" fill="#FFFFFF" />
    <line x1="30" y1="38" x2="48" y2="38" stroke="#93C5FD" strokeWidth="2" />
    <line x1="30" y1="44" x2="44" y2="44" stroke="#93C5FD" strokeWidth="2" />
    {/* Yellow pencil across */}
    <polygon points="46,20 54,28 32,54 26,52" fill="#F59E0B" />
    <polygon points="26,52 24,56 28,54" fill="#1E293B" />
  </svg>
);

export const MonthIconLantern: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#FFF7ED" />
    {/* Hanging handle */}
    <path d="M 32 20 Q 40 14 48 20" stroke="#78350F" strokeWidth="2" fill="none" />
    <rect x="30" y="20" width="20" height="6" rx="2" fill="#9A3412" />
    {/* Glowing lantern body */}
    <rect x="28" y="26" width="24" height="30" rx="6" fill="#F59E0B" stroke="#7C2D12" strokeWidth="2" />
    <circle cx="40" cy="40" r="8" fill="#FEF08A" />
    <rect x="30" y="56" width="20" height="4" rx="2" fill="#9A3412" />
  </svg>
);

export const MonthIconCozyMug: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#F5F3FF" />
    {/* Mug handle */}
    <path d="M 48 36 C 58 36 58 50 48 50" stroke="#8B5CF6" strokeWidth="3" fill="none" />
    {/* Mug */}
    <rect x="26" y="32" width="26" height="28" rx="5" fill="#7C3AED" />
    {/* Steam curls */}
    <path d="M 33 26 Q 31 20 34 16" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M 43 28 Q 45 22 42 17" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const MonthIconStarBell: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="40" cy="40" r="36" fill="#FEF9C3" />
    {/* Golden bell */}
    <path d="M 40 18 C 32 18 28 32 25 46 L 55 46 C 52 32 48 18 40 18 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
    <ellipse cx="40" cy="48" rx="16" ry="4" fill="#D97706" />
    <circle cx="40" cy="53" r="3.5" fill="#78350F" />
    {/* Ribbon bow */}
    <polygon points="40,20 33,16 35,24" fill="#EF4444" />
    <polygon points="40,20 47,16 45,24" fill="#EF4444" />
  </svg>
);

// Unit Cartoon Illustrations for Student Homepage
export const UnitIconWelcome: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#E0F2FE" />
    {/* Backpack */}
    <rect x="36" y="42" width="48" height="52" rx="14" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
    <rect x="46" y="60" width="28" height="22" rx="6" fill="#38BDF8" />
    <path d="M 50 42 C 50 28 70 28 70 42" stroke="#0369A1" strokeWidth="3" fill="none" />
    {/* Golden star */}
    <polygon points="60,22 64,32 74,32 66,38 69,48 60,42 51,48 54,38 46,32 56,32" fill="#FBBF24" />
  </svg>
);

export const UnitIconPersonalInterest: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#DCFCE7" />
    {/* Paint palette & brush */}
    <ellipse cx="55" cy="60" rx="32" ry="24" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
    <circle cx="42" cy="54" r="5" fill="#EF4444" />
    <circle cx="56" cy="50" r="5" fill="#3B82F6" />
    <circle cx="68" cy="56" r="5" fill="#10B981" />
    {/* Paintbrush */}
    <polygon points="76,30 84,38 52,78 44,72" fill="#78350F" />
    <polygon points="44,72 40,82 50,78" fill="#EC4899" />
  </svg>
);

export const UnitIconHouseDesigns: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#FEF3C7" />
    {/* Cozy cartoon house */}
    <polygon points="60,28 26,58 94,58" fill="#EF4444" stroke="#DC2626" strokeWidth="3" />
    <rect x="36" y="58" width="48" height="42" rx="4" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" />
    {/* Door */}
    <rect x="52" y="74" width="16" height="26" rx="3" fill="#3B82F6" />
    <circle cx="64" cy="87" r="1.5" fill="#FDE047" />
    {/* Window */}
    <rect x="42" y="66" width="12" height="12" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
    <rect x="66" y="66" width="12" height="12" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
  </svg>
);

export const UnitIconJobPaths: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#F3E8FF" />
    {/* Astronaut & builder helmet */}
    <circle cx="60" cy="56" r="28" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="3" />
    <ellipse cx="60" cy="56" rx="20" ry="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
    <path d="M 44 80 L 76 80 L 80 92 L 40 92 Z" fill="#A78BFA" />
    <circle cx="60" cy="24" r="5" fill="#F59E0B" />
  </svg>
);

export const UnitIconGloriousFood: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#FFE4E6" />
    {/* Chef Hat */}
    <path d="M 42 66 C 30 66 30 46 42 46 C 40 34 60 28 66 38 C 76 28 90 38 86 50 C 94 56 90 66 80 66 Z" fill="#FFFFFF" stroke="#E11D48" strokeWidth="2.5" />
    <rect x="42" y="66" width="38" height="18" rx="3" fill="#FFFFFF" stroke="#E11D48" strokeWidth="2" />
    <circle cx="61" cy="74" r="2" fill="#E11D48" />
  </svg>
);

// Vocabulary Group Icons
export const VocabGroupTimeIcon: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#EFF6FF" />
    <circle cx="50" cy="50" r="30" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" />
    <line x1="50" y1="50" x2="50" y2="30" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="50" x2="65" y2="50" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="50" r="3" fill="#1D4ED8" />
  </svg>
);

export const VocabGroupEventsIcon: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#FFF7ED" />
    <polygon points="50,20 25,75 75,75" fill="#F97316" />
    <polygon points="50,20 40,75 60,75" fill="#FFFFFF" />
    <circle cx="28" cy="35" r="8" fill="#F43F5E" />
    <circle cx="72" cy="35" r="8" fill="#3B82F6" />
  </svg>
);

export const VocabGroupNatureIcon: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#ECFDF5" />
    <polygon points="50,20 20,70 80,70" fill="#10B981" />
    <polygon points="50,40 28,75 72,75" fill="#059669" />
    <rect x="46" y="70" width="8" height="15" fill="#78350F" />
  </svg>
);

export const VocabGroupDescriptionIcon: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" fill="#FEF3C7" />
    {/* Comparative height blocks */}
    <rect x="25" y="45" width="18" height="40" rx="3" fill="#38BDF8" />
    <rect x="52" y="20" width="22" height="65" rx="3" fill="#F59E0B" />
    {/* Arrow */}
    <line x1="63" y1="20" x2="63" y2="10" stroke="#B45309" strokeWidth="2.5" />
    <polygon points="63,8 59,16 67,16" fill="#B45309" />
  </svg>
);

// Prestigious Gold Story Master Trophy
export const GoldStoryMasterTrophy: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <filter id="trophyGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.4" />
      </filter>
    </defs>
    <rect x="35" y="125" width="70" height="20" rx="4" fill="#78350F" />
    <rect x="42" y="115" width="56" height="12" rx="3" fill="#92400E" />
    <rect x="45" y="130" width="50" height="10" rx="2" fill="#FEF08A" />
    <text x="70" y="138" textAnchor="middle" fill="#78350F" fontSize="7" fontWeight="bold">STORY MASTER</text>

    <path d="M 62 90 L 78 90 L 75 115 L 65 115 Z" fill="url(#goldGrad)" />
    <path d="M 35 30 Q 35 90 70 90 Q 105 90 105 30 Z" fill="url(#goldGrad)" filter="url(#trophyGlow)" stroke="#FACC15" strokeWidth="2" />
    <ellipse cx="70" cy="30" rx="35" ry="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />

    <path d="M 35 40 C 15 40, 15 75, 42 75" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M 105 40 C 125 40, 125 75, 98 75" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
    <polygon points="70,48 73,56 82,56 75,62 78,70 70,65 62,70 65,62 58,56 67,56" fill="#FFFFFF" />
  </svg>
);

// Map of illustration components for dynamic lookup
export const ILLUSTRATION_MAP: Record<string, React.FC<IllustrationProps>> = {
  ago: CartoonAgo,
  calendar: CartoonCalendar,
  date: CartoonDate,
  how_long: CartoonHowLong,
  early: CartoonEarly,
  late: CartoonLate,
  time: CartoonTime,
  year: CartoonYear,
  festival: CartoonFestival,
  have_no_fear: CartoonHaveNoFear,
  prepare: CartoonPrepare,
  comic_book: CartoonComicBook,
  lion: CartoonLion,
  mountain: CartoonMountain,
  rainbow: CartoonRainbow,
  snail: CartoonSnail,
  tall: CartoonTall,
  tired: CartoonTired,
  // 12 Months Decorative Cues
  january: MonthIconPartyHat,
  february: MonthIconHeartRibbon,
  march: MonthIconKite,
  april: MonthIconSprout,
  may: MonthIconFlower,
  june: MonthIconSun,
  july: MonthIconPopsicle,
  august: MonthIconSailboat,
  september: MonthIconBookPencil,
  october: MonthIconLantern,
  november: MonthIconCozyMug,
  december: MonthIconStarBell,
  trophy_gold: GoldStoryMasterTrophy,
};

// =========================================================================
// HIGH-FIDELITY STORY SCENE ILLUSTRATIONS (Mona's Fun Festival)
// Character Consistency: Mona has dark brown wavy bob hair (#3E2723),
// purple hairband with little bow (#9333EA), cheerful expressive eyes,
// rosy cheeks, coral/salmon jacket (#F43F5E), turquoise shirt (#06B6D4),
// denim skirt (#1E3A8A), and yellow shoes (#FBBF24).
// =========================================================================

export const StorySceneIllustration: React.FC<{ pageNumber: number; className?: string }> = ({ pageNumber, className = 'w-full h-full' }) => {
  if (pageNumber === 1) {
    return (
      <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="p1Sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
          <linearGradient id="p1Grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width="500" height="320" fill="url(#p1Sky)" />

        {/* Clouds */}
        <ellipse cx="80" cy="50" rx="50" ry="24" fill="#FFFFFF" opacity="0.9" />
        <ellipse cx="110" cy="42" rx="40" ry="22" fill="#FFFFFF" opacity="0.9" />
        <ellipse cx="420" cy="70" rx="60" ry="26" fill="#FFFFFF" opacity="0.9" />
        <ellipse cx="380" cy="62" rx="45" ry="22" fill="#FFFFFF" opacity="0.9" />

        {/* Cheerful School Festival Building in Background */}
        <rect x="60" y="90" width="380" height="140" rx="16" fill="#FEF08A" stroke="#EAB308" strokeWidth="4" />
        <polygon points="250,30 40,95 460,95" fill="#EF4444" stroke="#B91C1C" strokeWidth="4" />
        {/* School Clock Tower */}
        <rect x="220" y="45" width="60" height="50" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="3" />
        <circle cx="250" cy="70" r="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <line x1="250" y1="70" x2="250" y2="60" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        <line x1="250" y1="70" x2="258" y2="70" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

        {/* Windows */}
        <rect x="90" y="120" width="44" height="40" rx="6" fill="#67E8F9" stroke="#0891B2" strokeWidth="2.5" />
        <rect x="160" y="120" width="44" height="40" rx="6" fill="#67E8F9" stroke="#0891B2" strokeWidth="2.5" />
        <rect x="296" y="120" width="44" height="40" rx="6" fill="#67E8F9" stroke="#0891B2" strokeWidth="2.5" />
        <rect x="366" y="120" width="44" height="40" rx="6" fill="#67E8F9" stroke="#0891B2" strokeWidth="2.5" />
        {/* Door */}
        <rect x="226" y="160" width="48" height="70" rx="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />

        {/* Festive Bunting Garlands */}
        <path d="M 20 40 Q 140 80 250 50 Q 360 80 480 40" stroke="#F97316" strokeWidth="3" fill="none" />
        <polygon points="50,48 70,50 60,75" fill="#EC4899" />
        <polygon points="100,60 120,62 110,87" fill="#3B82F6" />
        <polygon points="150,66 170,67 160,92" fill="#10B981" />
        <polygon points="330,66 350,67 340,92" fill="#F59E0B" />
        <polygon points="380,60 400,61 390,86" fill="#A855F7" />
        <polygon points="430,48 450,49 440,74" fill="#EF4444" />

        {/* Colorful Balloons */}
        <circle cx="50" cy="110" r="14" fill="#F43F5E" />
        <circle cx="65" cy="100" r="12" fill="#38BDF8" />
        <circle cx="430" cy="105" r="14" fill="#FBBF24" />
        <circle cx="445" cy="95" r="12" fill="#A855F7" />

        {/* Ground */}
        <path d="M 0 220 Q 250 205 500 220 L 500 320 L 0 320 Z" fill="url(#p1Grass)" />

        {/* MONA Character (Consistent: hair, headband, face, outfit) */}
        <g transform="translate(190, 110)">
          {/* Hair back */}
          <ellipse cx="60" cy="65" rx="30" ry="32" fill="#3E2723" />
          {/* Body: Coral Jacket over turquoise top */}
          <rect x="42" y="88" width="36" height="46" rx="10" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          <polygon points="55,88 65,88 60,105" fill="#06B6D4" />
          {/* Skirt */}
          <polygon points="38,132 82,132 86,156 34,156" fill="#1E3A8A" />
          {/* Legs */}
          <rect x="45" y="156" width="9" height="24" rx="4" fill="#FED7AA" />
          <rect x="66" y="156" width="9" height="24" rx="4" fill="#FED7AA" />
          {/* Yellow Shoes */}
          <ellipse cx="49" cy="180" rx="9" ry="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <ellipse cx="70" cy="180" rx="9" ry="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />

          {/* Head */}
          <circle cx="60" cy="58" r="24" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          {/* Hair front & bob curls */}
          <path d="M 36 50 Q 60 40 84 50 Q 86 68 80 75 Q 74 62 60 62 Q 46 62 40 75 Z" fill="#3E2723" />
          {/* Purple Headband with little bow */}
          <path d="M 39 46 Q 60 36 81 46" stroke="#9333EA" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="76" cy="42" r="4.5" fill="#A855F7" />
          <circle cx="81" cy="40" r="3.5" fill="#A855F7" />

          {/* Mona's Expressive Big Happy Eyes */}
          <circle cx="52" cy="56" r="4.5" fill="#1E293B" />
          <circle cx="51" cy="54" r="1.5" fill="#FFFFFF" />
          <circle cx="68" cy="56" r="4.5" fill="#1E293B" />
          <circle cx="67" cy="54" r="1.5" fill="#FFFFFF" />
          {/* Rosy Blushing Cheeks */}
          <ellipse cx="46" cy="64" rx="4.5" ry="3" fill="#FDA4AF" />
          <ellipse cx="74" cy="64" rx="4.5" ry="3" fill="#FDA4AF" />
          {/* Happy Smile */}
          <path d="M 54 64 Q 60 71 66 64" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Mona holding up the calendar with May 10 */}
          {/* Arm holding calendar */}
          <path d="M 76 96 L 98 90 L 100 80" stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" />
          <circle cx="100" cy="80" r="5" fill="#FED7AA" />
          {/* Big Colorful Wall Calendar */}
          <g transform="translate(90, 30)">
            <rect x="0" y="0" width="60" height="70" rx="8" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" />
            <rect x="0" y="0" width="60" height="20" rx="6" fill="#EF4444" />
            <text x="30" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">MAY</text>
            <text x="30" y="52" textAnchor="middle" fill="#1E293B" fontSize="28" fontWeight="900" fontFamily="sans-serif">10</text>
            <circle cx="30" cy="44" r="18" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 3" fill="none" />
          </g>
        </g>
      </svg>
    );
  }

  if (pageNumber === 2) {
    return (
      <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="p2Wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FFFBEB" />
          </linearGradient>
        </defs>
        {/* Cozy Morning Bedroom */}
        <rect width="500" height="320" fill="url(#p2Wall)" />

        {/* Bedroom Window with early morning golden sunshine */}
        <rect x="40" y="30" width="120" height="120" rx="12" fill="#BAE6FD" stroke="#F59E0B" strokeWidth="4" />
        <circle cx="100" cy="80" r="30" fill="#FDE047" />
        <line x1="100" y1="30" x2="100" y2="150" stroke="#F59E0B" strokeWidth="3" />
        <line x1="40" y1="90" x2="160" y2="90" stroke="#F59E0B" strokeWidth="3" />
        {/* Curtains */}
        <path d="M 36 28 Q 60 70 42 152 L 36 152 Z" fill="#F472B6" />
        <path d="M 164 28 Q 140 70 158 152 L 164 152 Z" fill="#F472B6" />

        {/* Wall Clock showing 6:30 early morning */}
        <circle cx="210" cy="65" r="24" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
        <circle cx="210" cy="65" r="2.5" fill="#0369A1" />
        <line x1="210" y1="65" x2="210" y2="48" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="210" y1="65" x2="222" y2="65" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Floor */}
        <rect x="0" y="240" width="500" height="80" fill="#E2E8F0" />
        <line x1="0" y1="240" x2="500" y2="240" stroke="#CBD5E1" strokeWidth="4" />

        {/* Mom Character (Warm, loving smile with yellow apron) */}
        <g transform="translate(140, 95)">
          <ellipse cx="60" cy="50" rx="24" ry="26" fill="#78350F" />
          <circle cx="60" cy="46" r="20" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          {/* Hair bun */}
          <circle cx="60" cy="22" r="12" fill="#78350F" />
          {/* Eyes & Smile */}
          <circle cx="54" cy="44" r="3" fill="#1E293B" />
          <circle cx="66" cy="44" r="3" fill="#1E293B" />
          <ellipse cx="50" cy="50" rx="3.5" ry="2" fill="#FDA4AF" />
          <ellipse cx="70" cy="50" rx="3.5" ry="2" fill="#FDA4AF" />
          <path d="M 55 52 Q 60 57 65 52" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Dress & Apron */}
          <rect x="42" y="70" width="36" height="75" rx="8" fill="#10B981" />
          <rect x="46" y="80" width="28" height="60" rx="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Arm holding water bottle / helping */}
          <path d="M 44 80 L 25 110" stroke="#10B981" strokeWidth="7" strokeLinecap="round" />
          <circle cx="25" cy="110" r="5" fill="#FED7AA" />
        </g>

        {/* Desk with School Bag and Comic Book */}
        <rect x="250" y="190" width="170" height="60" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="3" />
        {/* Blue Backpack open */}
        <rect x="280" y="130" width="60" height="70" rx="14" fill="#0284C7" stroke="#0369A1" strokeWidth="3.5" />
        <rect x="290" y="155" width="40" height="35" rx="8" fill="#38BDF8" />

        {/* Comic Book clearly visible being prepared */}
        <g transform="translate(340, 115) rotate(15)">
          <rect x="0" y="0" width="45" height="65" rx="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          {/* Star burst */}
          <polygon points="22,12 26,18 34,16 30,23 35,28 27,29 25,36 20,30 14,32 17,25 12,20 19,19" fill="#EF4444" />
          <text x="22" y="27" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">POW!</text>
          <text x="22" y="48" textAnchor="middle" fill="#B45309" fontSize="7" fontWeight="bold" fontFamily="sans-serif">COMIC</text>
        </g>

        {/* MONA Character (Consistent hair, purple headband, coral jacket, happy face) */}
        <g transform="translate(370, 120)">
          <ellipse cx="40" cy="50" rx="24" ry="26" fill="#3E2723" />
          <rect x="26" y="70" width="28" height="42" rx="8" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          <polygon points="22,112 58,112 60,132 20,132" fill="#1E3A8A" />
          <circle cx="40" cy="44" r="19" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          <path d="M 21 38 Q 40 30 59 38 Q 61 52 56 58 Q 50 48 40 48 Q 28 48 24 58 Z" fill="#3E2723" />
          {/* Purple Headband */}
          <path d="M 23 35 Q 40 27 57 35" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="53" cy="32" r="3.5" fill="#A855F7" />
          {/* Face */}
          <circle cx="34" cy="42" r="3.5" fill="#1E293B" />
          <circle cx="33.5" cy="40.5" r="1" fill="#FFFFFF" />
          <circle cx="46" cy="42" r="3.5" fill="#1E293B" />
          <circle cx="45.5" cy="40.5" r="1" fill="#FFFFFF" />
          <ellipse cx="29" cy="48" rx="3.5" ry="2" fill="#FDA4AF" />
          <ellipse cx="51" cy="48" rx="3.5" ry="2" fill="#FDA4AF" />
          <path d="M 36 49 Q 40 54 44 49" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Arms packing the bag */}
          <path d="M 26 78 L 0 95" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" />
          <circle cx="0" cy="95" r="4.5" fill="#FED7AA" />
        </g>
      </svg>
    );
  }

  if (pageNumber === 3) {
    return (
      <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="p3Sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width="500" height="320" fill="url(#p3Sky)" />

        {/* Tall Mountain in Distance */}
        <polygon points="170,50 30,240 310,240" fill="#64748B" />
        <polygon points="170,50 135,95 155,105 175,92 195,102 215,95" fill="#FFFFFF" />
        {/* Secondary Mountain */}
        <polygon points="290,90 190,240 390,240" fill="#94A3B8" />
        <polygon points="290,90 268,125 282,132 298,124 314,130" fill="#FFFFFF" />

        {/* Beautiful Vibrant 6-Color Rainbow across the sky */}
        <g transform="translate(130, 240)">
          <path d="M -70 0 A 180 180 0 0 1 290 0" stroke="#EF4444" strokeWidth="10" fill="none" />
          <path d="M -60 0 A 170 170 0 0 1 280 0" stroke="#F97316" strokeWidth="10" fill="none" />
          <path d="M -50 0 A 160 160 0 0 1 270 0" stroke="#FBBF24" strokeWidth="10" fill="none" />
          <path d="M -40 0 A 150 150 0 0 1 260 0" stroke="#22C55E" strokeWidth="10" fill="none" />
          <path d="M -30 0 A 140 140 0 0 1 250 0" stroke="#0284C7" strokeWidth="10" fill="none" />
          <path d="M -20 0 A 130 130 0 0 1 240 0" stroke="#8B5CF6" strokeWidth="10" fill="none" />
          {/* Cloud at rainbow end */}
          <circle cx="240" cy="-5" r="25" fill="#FFFFFF" />
          <circle cx="265" cy="-15" r="20" fill="#FFFFFF" />
          <circle cx="215" cy="-10" r="18" fill="#FFFFFF" />
        </g>

        {/* Festival Green Hills Foreground */}
        <path d="M 0 200 Q 180 170 350 200 Q 440 215 500 200 L 500 320 L 0 320 Z" fill="#22C55E" />
        <path d="M 0 235 Q 220 220 500 240 L 500 320 L 0 320 Z" fill="#16A34A" />

        {/* Mossy Rock in Foreground with Little Cute Snail */}
        <ellipse cx="370" cy="275" rx="55" ry="24" fill="#64748B" stroke="#475569" strokeWidth="3" />
        <ellipse cx="355" cy="265" rx="30" ry="14" fill="#94A3B8" />

        {/* Cute Snail with Spiral Shell and Happy Face */}
        <g transform="translate(350, 230)">
          {/* Snail Body on rock */}
          <path d="M 0 25 Q 25 25 45 22 Q 52 20 50 12 Q 48 6 42 12 Q 25 18 5 22 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {/* Shell with big spiral */}
          <circle cx="22" cy="12" r="15" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
          <circle cx="22" cy="12" r="9" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.5" />
          <circle cx="22" cy="12" r="4" fill="#FED7AA" />
          {/* Eye stalks */}
          <line x1="47" y1="10" x2="52" y2="0" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <circle cx="53" cy="0" r="2.5" fill="#1E293B" />
          <line x1="43" y1="11" x2="46" y2="2" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <circle cx="47" cy="2" r="2.5" fill="#1E293B" />
        </g>

        {/* Wildflowers */}
        <circle cx="100" cy="250" r="6" fill="#F43F5E" />
        <circle cx="100" cy="250" r="2" fill="#FEF08A" />
        <circle cx="130" cy="270" r="6" fill="#38BDF8" />
        <circle cx="130" cy="270" r="2" fill="#FEF08A" />
        <circle cx="260" cy="260" r="6" fill="#FBBF24" />

        {/* MONA Character admiring the rainbow, mountain, and snail */}
        <g transform="translate(80, 140)">
          <ellipse cx="40" cy="50" rx="24" ry="26" fill="#3E2723" />
          <rect x="26" y="70" width="28" height="42" rx="8" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          <polygon points="22,112 58,112 62,135 18,135" fill="#1E3A8A" />
          <rect x="28" y="135" width="7" height="20" fill="#FED7AA" />
          <rect x="45" y="135" width="7" height="20" fill="#FED7AA" />
          <ellipse cx="31" cy="155" rx="7" ry="4" fill="#FBBF24" />
          <ellipse cx="48" cy="155" rx="7" ry="4" fill="#FBBF24" />

          {/* Head */}
          <circle cx="40" cy="44" r="19" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          <path d="M 21 38 Q 40 30 59 38 Q 61 52 56 58 Q 50 48 40 48 Q 28 48 24 58 Z" fill="#3E2723" />
          {/* Purple Headband */}
          <path d="M 23 35 Q 40 27 57 35" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="53" cy="32" r="3.5" fill="#A855F7" />
          {/* Wondering joyful eyes pointing at rainbow and mountain */}
          <circle cx="34" cy="42" r="4" fill="#1E293B" />
          <circle cx="35" cy="40" r="1.5" fill="#FFFFFF" />
          <circle cx="46" cy="42" r="4" fill="#1E293B" />
          <circle cx="47" cy="40" r="1.5" fill="#FFFFFF" />
          <ellipse cx="29" cy="48" rx="3.5" ry="2" fill="#FDA4AF" />
          <ellipse cx="51" cy="48" rx="3.5" ry="2" fill="#FDA4AF" />
          <path d="M 36 49 Q 40 55 44 49" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Arm pointing up at the mountain & rainbow */}
          <path d="M 54 78 L 85 55" stroke="#F43F5E" strokeWidth="7" strokeLinecap="round" />
          <circle cx="85" cy="55" r="4.5" fill="#FED7AA" />
        </g>
      </svg>
    );
  }

  if (pageNumber === 4) {
    return (
      <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="p4Stage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        {/* Background festival fairground */}
        <rect width="500" height="320" fill="#FEF2F2" />

        {/* Festival Bunting */}
        <path d="M 10 30 Q 250 60 490 30" stroke="#F59E0B" strokeWidth="3" fill="none" />
        <polygon points="40,35 60,36 50,58" fill="#3B82F6" />
        <polygon points="100,43 120,44 110,66" fill="#10B981" />
        <polygon points="160,48 180,48 170,70" fill="#EC4899" />
        <polygon points="320,48 340,48 330,70" fill="#8B5CF6" />
        <polygon points="380,43 400,44 390,66" fill="#F97316" />
        <polygon points="440,35 460,36 450,58" fill="#06B6D4" />

        {/* Puppet Stage Booth */}
        <rect x="180" y="50" width="280" height="200" rx="14" fill="#78350F" stroke="#451A03" strokeWidth="4" />
        <rect x="200" y="70" width="240" height="130" fill="url(#p4Stage)" />
        {/* Red & White Striped Awning */}
        <path d="M 180 50 L 460 50 L 450 75 L 190 75 Z" fill="#EF4444" />
        <polygon points="210,50 230,50 225,75 205,75" fill="#FFFFFF" />
        <polygon points="250,50 270,50 265,75 245,75" fill="#FFFFFF" />
        <polygon points="290,50 310,50 305,75 285,75" fill="#FFFFFF" />
        <polygon points="330,50 350,50 345,75 325,75" fill="#FFFFFF" />
        <polygon points="370,50 390,50 385,75 365,75" fill="#FFFFFF" />
        <polygon points="410,50 430,50 425,75 405,75" fill="#FFFFFF" />

        {/* Big Friendly Lion Puppet! Fluffy golden yarn mane, cute smile */}
        <g transform="translate(265, 80)">
          {/* Big fluffy mane */}
          <circle cx="55" cy="50" r="46" fill="#F97316" />
          <circle cx="55" cy="50" r="38" fill="#FBBF24" />
          {/* Ears */}
          <circle cx="28" cy="22" r="12" fill="#F97316" />
          <circle cx="28" cy="22" r="6" fill="#FED7AA" />
          <circle cx="82" cy="22" r="12" fill="#F97316" />
          <circle cx="82" cy="22" r="6" fill="#FED7AA" />
          {/* Face */}
          <circle cx="55" cy="52" r="28" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          {/* Big cute friendly eyes */}
          <circle cx="44" cy="46" r="5" fill="#1E293B" />
          <circle cx="43" cy="44" r="1.5" fill="#FFFFFF" />
          <circle cx="66" cy="46" r="5" fill="#1E293B" />
          <circle cx="65" cy="44" r="1.5" fill="#FFFFFF" />
          {/* Button nose & smile */}
          <polygon points="55,56 49,52 61,52" fill="#7C2D12" />
          <path d="M 48 59 Q 55 66 62 59" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Puppet Waving Paw */}
          <ellipse cx="98" cy="72" rx="14" ry="10" fill="#FBBF24" stroke="#F97316" strokeWidth="2" transform="rotate(-20 98 72)" />
        </g>

        {/* Stage sign */}
        <rect x="240" y="210" width="160" height="28" rx="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
        <text x="320" y="228" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="bold" fontFamily="sans-serif">LION PUPPET SHOW</text>

        {/* Floor */}
        <rect x="0" y="250" width="500" height="70" fill="#E2E8F0" />

        {/* MONA Character (Consistent hair, headband, smiling, relaxed with friend) */}
        <g transform="translate(60, 140)">
          <ellipse cx="40" cy="50" rx="24" ry="26" fill="#3E2723" />
          <rect x="26" y="70" width="28" height="42" rx="8" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          <polygon points="22,112 58,112 62,135 18,135" fill="#1E3A8A" />
          <rect x="28" y="135" width="7" height="20" fill="#FED7AA" />
          <rect x="45" y="135" width="7" height="20" fill="#FED7AA" />
          <ellipse cx="31" cy="155" rx="7" ry="4" fill="#FBBF24" />
          <ellipse cx="48" cy="155" rx="7" ry="4" fill="#FBBF24" />

          {/* Head */}
          <circle cx="40" cy="44" r="19" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          <path d="M 21 38 Q 40 30 59 38 Q 61 52 56 58 Q 50 48 40 48 Q 28 48 24 58 Z" fill="#3E2723" />
          <path d="M 23 35 Q 40 27 57 35" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="53" cy="32" r="3.5" fill="#A855F7" />
          {/* Eyes & Warm confident smile */}
          <circle cx="35" cy="42" r="3.5" fill="#1E293B" />
          <circle cx="47" cy="42" r="3.5" fill="#1E293B" />
          <ellipse cx="29" cy="48" rx="3.5" ry="2" fill="#FDA4AF" />
          <ellipse cx="51" cy="48" rx="3.5" ry="2" fill="#FDA4AF" />
          <path d="M 37 49 Q 41 55 46 49" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Mona's Friend (Reassuring friend: "Have no fear, Mona!") */}
        <g transform="translate(125, 145)">
          <ellipse cx="35" cy="48" rx="20" ry="22" fill="#047857" />
          <circle cx="35" cy="44" r="18" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
          <rect x="22" y="68" width="26" height="42" rx="8" fill="#0284C7" />
          <circle cx="30" cy="42" r="3" fill="#1E293B" />
          <circle cx="42" cy="42" r="3" fill="#1E293B" />
          <path d="M 32 49 Q 36 54 40 49" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Friendly hand on Mona's shoulder */}
          <path d="M 22 75 L -10 82" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  // Page 5
  return (
    <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="p5Sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="35%" stopColor="#7C3AED" />
          <stop offset="70%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      {/* Twilight Sunset Gradient Sky */}
      <rect width="500" height="320" fill="url(#p5Sunset)" />

      {/* Glowing Warm Sun dipping below horizon */}
      <circle cx="250" cy="200" r="50" fill="#FDE047" opacity="0.9" />

      {/* Twinkling Evening Stars */}
      <polygon points="80,40 82,45 87,46 83,49 84,54 80,51 76,54 77,49 73,46 78,45" fill="#FEF08A" />
      <polygon points="420,50 422,55 427,56 423,59 424,64 420,61 416,64 417,59 413,56 418,55" fill="#FEF08A" />
      <polygon points="340,30 341,33 345,34 342,36 343,40 340,38 337,40 338,36 335,34 339,33" fill="#FFFFFF" />
      <polygon points="160,60 161,63 165,64 162,66 163,70 160,68 157,70 158,66 155,64 159,63" fill="#FFFFFF" />

      {/* Silhouettes of Festival Tents and Lights in background */}
      <polygon points="60,160 20,220 100,220" fill="#312E81" opacity="0.7" />
      <polygon points="420,165 380,220 460,220" fill="#312E81" opacity="0.7" />
      {/* String of warm glowing festival lanterns */}
      <path d="M 20 140 Q 250 170 480 140" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 4" fill="none" />
      <circle cx="80" cy="148" r="5" fill="#FEF08A" />
      <circle cx="150" cy="154" r="5" fill="#FEF08A" />
      <circle cx="350" cy="154" r="5" fill="#FEF08A" />
      <circle cx="420" cy="148" r="5" fill="#FEF08A" />

      {/* Ground in evening purple silhouette */}
      <path d="M 0 210 Q 250 195 500 210 L 500 320 L 0 320 Z" fill="#1E1B4B" />

      {/* A year ago vs NOW: Brave Timeline Badge */}
      <g transform="translate(40, 60)">
        <rect x="0" y="0" width="140" height="52" rx="12" fill="#FFFFFF" opacity="0.95" stroke="#818CF8" strokeWidth="2.5" />
        <text x="70" y="20" textAnchor="middle" fill="#6B7280" fontSize="9" fontWeight="bold" fontFamily="sans-serif">A YEAR AGO: AFRAID</text>
        <text x="70" y="38" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="900" fontFamily="sans-serif">NOW: BRAVE! ⭐</text>
      </g>

      {/* Time to go home: tired but happy */}
      <g transform="translate(320, 75)">
        <rect x="0" y="0" width="140" height="46" rx="12" fill="#FFFFFF" opacity="0.95" stroke="#F59E0B" strokeWidth="2.5" />
        <text x="70" y="19" textAnchor="middle" fill="#4B5563" fontSize="9" fontWeight="bold" fontFamily="sans-serif">TIME TO GO HOME</text>
        <text x="70" y="35" textAnchor="middle" fill="#D97706" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Tired but Happy! 😊</text>
      </g>

      {/* MONA Character (Center stage, superhero stance, confident, brave, smiling, backpack on) */}
      <g transform="translate(210, 115)">
        {/* Little Red Hero Cape blowing gently in evening breeze */}
        <path d="M 34 85 Q 10 115 15 150 Q 38 135 44 110 Z" fill="#EF4444" />

        {/* Hair Back */}
        <ellipse cx="40" cy="50" rx="26" ry="28" fill="#3E2723" />
        {/* Jacket */}
        <rect x="24" y="72" width="32" height="44" rx="8" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
        <polygon points="36,72 44,72 40,86" fill="#06B6D4" />
        {/* Skirt */}
        <polygon points="20,116 60,116 64,142 16,142" fill="#1E3A8A" />
        {/* Legs in confident wide stance */}
        <rect x="24" y="142" width="8" height="26" rx="4" fill="#FED7AA" />
        <rect x="48" y="142" width="8" height="26" rx="4" fill="#FED7AA" />
        {/* Yellow Shoes */}
        <ellipse cx="28" cy="168" rx="8" ry="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <ellipse cx="52" cy="168" rx="8" ry="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />

        {/* Head */}
        <circle cx="40" cy="44" r="20" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
        <path d="M 20 38 Q 40 30 60 38 Q 62 52 57 58 Q 50 48 40 48 Q 28 48 23 58 Z" fill="#3E2723" />
        {/* Purple Headband with bow */}
        <path d="M 22 35 Q 40 27 58 35" stroke="#9333EA" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="54" cy="32" r="3.5" fill="#A855F7" />

        {/* Mona's Proud, Confident, Brave Sparkling Eyes */}
        <circle cx="34" cy="42" r="4" fill="#1E293B" />
        <circle cx="33" cy="40" r="1.5" fill="#FFFFFF" />
        <circle cx="46" cy="42" r="4" fill="#1E293B" />
        <circle cx="45" cy="40" r="1.5" fill="#FFFFFF" />
        <ellipse cx="28" cy="48" rx="4" ry="2.5" fill="#FDA4AF" />
        <ellipse cx="52" cy="48" rx="4" ry="2.5" fill="#FDA4AF" />
        {/* Broad proud smile */}
        <path d="M 34 48 Q 40 56 46 48" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Hands on hips in proud brave stance */}
        <path d="M 24 82 L 14 94 L 24 100" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="100" r="3.5" fill="#FED7AA" />
        <path d="M 56 82 L 66 94 L 56 100" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="56" cy="100" r="3.5" fill="#FED7AA" />
      </g>
    </svg>
  );
};

// =========================================================================
// WELCOME UNIT SECTION CARTOON ILLUSTRATIONS
// =========================================================================

export const SectionIconMonths: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#E0F2FE" />
    {/* Calendar body */}
    <rect x="28" y="32" width="64" height="62" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
    <rect x="28" y="32" width="64" height="22" rx="10" fill="#0284C7" />
    {/* Spiral rings */}
    <rect x="40" y="24" width="6" height="14" rx="3" fill="#F59E0B" />
    <rect x="57" y="24" width="6" height="14" rx="3" fill="#F59E0B" />
    <rect x="74" y="24" width="6" height="14" rx="3" fill="#F59E0B" />
    {/* Grid squares */}
    <rect x="36" y="62" width="10" height="10" rx="2" fill="#BAE6FD" />
    <rect x="50" y="62" width="10" height="10" rx="2" fill="#BAE6FD" />
    <rect x="64" y="62" width="10" height="10" rx="2" fill="#BAE6FD" />
    <rect x="78" y="62" width="6" height="10" rx="2" fill="#BAE6FD" />
    <rect x="36" y="76" width="10" height="10" rx="2" fill="#BAE6FD" />
    <rect x="50" y="76" width="10" height="10" rx="2" fill="#F43F5E" />
    <rect x="64" y="76" width="10" height="10" rx="2" fill="#BAE6FD" />
  </svg>
);

export const SectionIconNumbers: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#EEF2FF" />
    {/* 3 Number blocks stacked */}
    {/* Block 1 (Indigo) */}
    <rect x="24" y="44" width="34" height="34" rx="8" fill="#4F46E5" stroke="#3730A3" strokeWidth="2.5" />
    <text x="41" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="sans-serif">1</text>
    {/* Block 2 (Cyan) */}
    <rect x="62" y="30" width="34" height="34" rx="8" fill="#06B6D4" stroke="#0891B2" strokeWidth="2.5" />
    <text x="79" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="sans-serif">2</text>
    {/* Block 3 (Amber) */}
    <rect x="52" y="68" width="34" height="34" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
    <text x="69" y="93" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="sans-serif">3</text>
  </svg>
);

export const SectionIconVocabulary: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#FEF3C7" />
    {/* Open book */}
    <path d="M 24 50 Q 60 40 60 84 Q 24 74 24 50 Z" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M 96 50 Q 60 40 60 84 Q 96 74 96 50 Z" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="2.5" />
    <path d="M 22 52 Q 60 42 60 86 Q 98 42 98 52" stroke="#CA8A04" strokeWidth="3" fill="none" />
    {/* Colorful word lines */}
    <line x1="32" y1="58" x2="52" y2="58" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="66" x2="48" y2="66" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="68" y1="58" x2="88" y2="58" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    <line x1="68" y1="66" x2="84" y2="66" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
    {/* Sparkle */}
    <polygon points="60,26 63,33 70,33 64,38 66,45 60,40 54,45 56,38 50,33 57,33" fill="#F59E0B" />
  </svg>
);

export const SectionIconStory: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="54" fill="#FFE4E6" />
    {/* Story book standing */}
    <rect x="36" y="28" width="48" height="64" rx="8" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" />
    <rect x="42" y="34" width="36" height="52" rx="4" fill="#FFFFFF" />
    {/* Red ribbon bookmark */}
    <polygon points="46,26 52,26 52,44 49,41 46,44" fill="#FBBF24" />
    {/* Cheerful star on cover */}
    <polygon points="60,50 63,57 70,57 65,62 67,69 60,64 53,69 55,62 50,57 57,57" fill="#F59E0B" />
  </svg>
);

