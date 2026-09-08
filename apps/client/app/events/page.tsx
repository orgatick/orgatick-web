"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBrandWhatsapp,
  IconCalendar,
  IconCheck,
  IconCode,
  IconDeviceGamepad2,
  IconFilter,
  IconFlame,
  IconHeart,
  IconHeartFilled,
  IconMapPin,
  IconMusic,
  IconPalette,
  IconRocket,
  IconSearch,
  IconShare,
  IconSparkles,
  IconTicket,
  IconTrophy,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

interface EventItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Hackathons" | "Tech Summits" | "Cultural" | "Esports" | "Workshops" | "Design";
  mode: "In-Person" | "Online" | "Hybrid";
  location: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  price: number; // 0 for free
  priceLabel?: string;
  originalPrice?: number;
  organizer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  totalSpots: number;
  registeredCount: number;
  featured?: boolean;
  trending?: boolean;
  badge?: string;
  tags: string[];
  gradient: string;
}

const DUMMY_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    slug: "hacknova-2026",
    title: "HackNova 2026: 36hr National Hackathon",
    tagline: "Build AI, Web3, and Climate-Tech innovations. Over ₹5,00,000 in cash prizes and incubator grants.",
    category: "Hackathons",
    mode: "Hybrid",
    location: "Bengaluru, Karnataka",
    venue: "NIMHANS Convention Centre & Discord",
    city: "Bengaluru",
    date: "Oct 24 - 26, 2026",
    time: "09:00 AM IST",
    price: 0,
    priceLabel: "Free",
    organizer: {
      name: "Orgatick Dev Community & IEEE",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 1500,
    registeredCount: 1380,
    featured: true,
    trending: true,
    badge: "🔥 Fast Selling",
    tags: ["AI/ML", "Web3", "Hardware", "Prize Pool ₹5L"],
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
  },
  {
    id: "evt-2",
    slug: "devsummit-ai-conclave",
    title: "DevSummit: Applied Generative AI 2026",
    tagline: "Deep dives into LLM fine-tuning, autonomous agents, and production AI architectures.",
    category: "Tech Summits",
    mode: "In-Person",
    location: "Hyderabad, Telangana",
    venue: "HICC Novotel, Hitec City",
    city: "Hyderabad",
    date: "Nov 07, 2026",
    time: "10:00 AM IST",
    price: 499,
    originalPrice: 999,
    organizer: {
      name: "CloudNative & AI Guild",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 600,
    registeredCount: 490,
    featured: true,
    trending: true,
    badge: "⭐ 50% Early Bird",
    tags: ["LLMs", "Agentic Workflows", "Vector DBs", "Lunch & Swag"],
    gradient: "from-cyan-600 via-blue-600 to-emerald-600",
  },
  {
    id: "evt-3",
    slug: "synapse-cultural-fest",
    title: "Synapse '26: Annual Inter-College Fest",
    tagline: "3 days of electrifying musical concerts, battle of bands, dance face-offs, and fashion shows.",
    category: "Cultural",
    mode: "In-Person",
    location: "Mumbai, Maharashtra",
    venue: "IIT Bombay Open Air Amphitheatre",
    city: "Mumbai",
    date: "Nov 14 - 16, 2026",
    time: "04:00 PM IST",
    price: 299,
    originalPrice: 499,
    organizer: {
      name: "Student Cultural Council",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 3500,
    registeredCount: 3120,
    featured: true,
    badge: "🎉 Celebrity Night",
    tags: ["Concert", "EDM Night", "Battle of Bands", "Food Carnival"],
    gradient: "from-pink-600 via-rose-500 to-amber-500",
  },
  {
    id: "evt-4",
    slug: "gamesync-esports-arena",
    title: "GameSync: National Collegiate Esports League",
    tagline: "5v5 Valorant & BGMI championships. Live casting, LAN finals, and certified gaming gear giveaways.",
    category: "Esports",
    mode: "Hybrid",
    location: "Delhi NCR",
    venue: "Pragati Maidan Hall 5 & Twitch/YouTube",
    city: "Delhi NCR",
    date: "Dec 05 - 06, 2026",
    time: "11:00 AM IST",
    price: 199,
    organizer: {
      name: "Campus Esports Federation",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 256,
    registeredCount: 220,
    badge: "🏆 128 Teams",
    tags: ["Valorant", "BGMI", "LAN Finals", "Prize Pool ₹2L"],
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
  },
  {
    id: "evt-5",
    slug: "nextjs-masterclass-2026",
    title: "Full-Stack Next.js 16 & Microservices Workshop",
    tagline: "Live interactive coding workshop: Server actions, Turbopack optimizations, cache components & auth.",
    category: "Workshops",
    mode: "Online",
    location: "Virtual (Online)",
    venue: "Live Zoom Stream & Interactive GitHub Codespaces",
    city: "Online",
    date: "Oct 18, 2026",
    time: "02:00 PM IST",
    price: 0,
    priceLabel: "Free",
    organizer: {
      name: "React & Next.js Builders Club",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 1000,
    registeredCount: 890,
    trending: true,
    badge: "📜 Free Certificate",
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "Architecture"],
    gradient: "from-teal-600 via-emerald-600 to-cyan-700",
  },
  {
    id: "evt-6",
    slug: "designsprint-ux-bootcamp",
    title: "DesignSprint '26: UX/UI & Product Conclave",
    tagline:
      "Learn atomic design systems, interactive prototyping in Figma, and real portfolio reviews with design leads.",
    category: "Design",
    mode: "In-Person",
    location: "Pune, Maharashtra",
    venue: "Symbiosis Institute of Design Auditorium",
    city: "Pune",
    date: "Nov 21, 2026",
    time: "09:30 AM IST",
    price: 349,
    originalPrice: 699,
    organizer: {
      name: "DesignLed Community",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 300,
    registeredCount: 195,
    badge: "🎨 Portfolio Clinic",
    tags: ["Figma Systems", "UX Research", "Live Mentorship", "Goodies"],
    gradient: "from-amber-600 via-orange-500 to-red-600",
  },
  {
    id: "evt-7",
    slug: "robowars-championship-2026",
    title: "RoboWars & Autonomous Drone Arena",
    tagline: "Heavyweight combat robots battling in a bulletproof cage, plus FPV drone speed obstacle trials.",
    category: "Tech Summits",
    mode: "In-Person",
    location: "Bengaluru, Karnataka",
    venue: "IISc Gymkhana Grounds",
    city: "Bengaluru",
    date: "Dec 12 - 13, 2026",
    time: "10:00 AM IST",
    price: 150,
    organizer: {
      name: "Robotics & Automation Society",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 800,
    registeredCount: 640,
    badge: "⚡ High Octane",
    tags: ["Combat Robotics", "Drone Racing", "Trophies", "Exhibition"],
    gradient: "from-red-600 via-orange-600 to-amber-700",
  },
  {
    id: "evt-8",
    slug: "founders-mixer-web3",
    title: "Founders Mixer: Web3 & AI Builders Gala",
    tagline:
      "Exclusive high-signal networking evening connecting student founders, angel investors, and venture scouts.",
    category: "Tech Summits",
    mode: "In-Person",
    location: "Bengaluru, Karnataka",
    venue: "WeWork Galaxy, Residency Road",
    city: "Bengaluru",
    date: "Dec 19, 2026",
    time: "06:30 PM IST",
    price: 799,
    organizer: {
      name: "Campus Venture Collective",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      verified: true,
    },
    totalSpots: 120,
    registeredCount: 108,
    badge: "🥂 Curated Access",
    tags: ["Networking", "Pitch Sessions", "VCs & Angels", "Dinner"],
    gradient: "from-indigo-700 via-purple-700 to-pink-700",
  },
];

const CATEGORIES = [
  { label: "All Events", value: "All", icon: IconSparkles },
  { label: "Hackathons", value: "Hackathons", icon: IconCode },
  { label: "Tech Summits", value: "Tech Summits", icon: IconRocket },
  { label: "Cultural Fests", value: "Cultural", icon: IconMusic },
  { label: "Esports & Gaming", value: "Esports", icon: IconDeviceGamepad2 },
  { label: "Workshops", value: "Workshops", icon: IconTrophy },
  { label: "Design", value: "Design", icon: IconPalette },
];

const CITIES = ["All Locations", "Bengaluru", "Hyderabad", "Mumbai", "Delhi NCR", "Pune", "Online"];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [modeFilter, setModeFilter] = useState<"all" | "in-person" | "online" | "hybrid">("all");
  const [savedEvents, setSavedEvents] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSave = (id: string) => {
    setSavedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (evt: EventItem) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/events#${evt.slug}`);
      setCopiedId(evt.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredEvents = useMemo(() => {
    return DUMMY_EVENTS.filter((evt) => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesTagline = evt.tagline.toLowerCase().includes(q);
        const matchesVenue = evt.venue.toLowerCase().includes(q);
        const matchesCity = evt.city.toLowerCase().includes(q);
        const matchesOrganizer = evt.organizer.name.toLowerCase().includes(q);
        const matchesTags = evt.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTagline && !matchesVenue && !matchesCity && !matchesOrganizer && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "All" && evt.category !== selectedCategory) {
        return false;
      }

      // City filter
      if (selectedCity !== "All Locations" && evt.city !== selectedCity) {
        return false;
      }

      // Price filter
      if (priceFilter === "free" && evt.price !== 0) return false;
      if (priceFilter === "paid" && evt.price === 0) return false;

      // Mode filter
      if (modeFilter !== "all") {
        if (modeFilter === "in-person" && evt.mode !== "In-Person") return false;
        if (modeFilter === "online" && evt.mode !== "Online") return false;
        if (modeFilter === "hybrid" && evt.mode !== "Hybrid") return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCity, priceFilter, modeFilter]);

  const featuredEvents = useMemo(() => DUMMY_EVENTS.filter((e) => e.featured), []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedCity("All Locations");
    setPriceFilter("all");
    setModeFilter("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedCity !== "All Locations" ||
    priceFilter !== "all" ||
    modeFilter !== "all";

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Hero Section */}
      <section className="relative border-b border-border/50 bg-linear-to-b from-primary/10 via-background to-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <IconSparkles className="size-3.5" />
              <span>Explore Live & Upcoming Events</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Discover, Attend & Experience <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Epic Campus Events
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Find hackathons, technical conferences, cultural fests, and workshops. Instant QR passes delivered
              directly to your WhatsApp.
            </p>

            {/* Search and Filters Bar */}
            <div className="mt-8 rounded-2xl border border-border/80 bg-card p-3 shadow-xl shadow-primary/5 sm:p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                {/* Search Input */}
                <div className="relative flex-1">
                  <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events, topics, colleges, or keywords..."
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <IconX className="size-4" />
                    </button>
                  )}
                </div>

                {/* Location Select */}
                <div className="relative md:w-52">
                  <IconMapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="Filter by location"
                    className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-background py-2.5 pl-9 pr-8 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Toggle */}
                <div className="flex rounded-xl border border-border bg-muted/50 p-1">
                  <button
                    type="button"
                    onClick={() => setPriceFilter("all")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      priceFilter === "all"
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriceFilter("free")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      priceFilter === "free"
                        ? "bg-card text-emerald-600 font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriceFilter("paid")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      priceFilter === "paid"
                        ? "bg-card text-primary font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Paid
                  </button>
                </div>
              </div>

              {/* Mode Filters & Active counts */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-muted-foreground mr-1">Event Type:</span>
                  {(["all", "in-person", "online", "hybrid"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModeFilter(m)}
                      className={`capitalize rounded-full px-2.5 py-1 transition-colors ${
                        modeFilter === m
                          ? "bg-primary text-primary-foreground font-medium"
                          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                      }`}
                    >
                      {m === "all" ? "All Formats" : m}
                    </button>
                  ))}
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-xs font-medium text-destructive hover:underline"
                  >
                    <IconX className="size-3.5" />
                    Reset all filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Slider */}
      <section className="border-b border-border/40 bg-background/60 backdrop-blur-xs py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "border border-border/70 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        {/* Featured Events Spotlight (shown when no deep filter is active) */}
        {!hasActiveFilters && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <IconFlame className="size-5 text-amber-500" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Featured & Trending Events
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Hand-picked flagship experiences with verified passes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {featuredEvents.map((evt) => {
                const isSaved = !!savedEvents[evt.id];
                const percentBooked = Math.round((evt.registeredCount / evt.totalSpots) * 100);

                return (
                  <div
                    key={evt.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                  >
                    {/* Top Gradient Banner */}
                    <div
                      className={`relative h-44 w-full bg-linear-to-br ${evt.gradient} p-4 text-white flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md uppercase">
                          {evt.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleShare(evt)}
                            title="Copy event link"
                            className="rounded-full bg-black/30 p-1.5 backdrop-blur-md transition-colors hover:bg-black/50"
                          >
                            {copiedId === evt.id ? (
                              <IconCheck className="size-4 text-emerald-400" />
                            ) : (
                              <IconShare className="size-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSave(evt.id)}
                            title="Save event"
                            className="rounded-full bg-black/30 p-1.5 backdrop-blur-md transition-colors hover:bg-black/50"
                          >
                            {isSaved ? (
                              <IconHeartFilled className="size-4 text-rose-400" />
                            ) : (
                              <IconHeart className="size-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        {evt.badge && (
                          <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur-md text-white mb-1.5">
                            {evt.badge}
                          </span>
                        )}
                        <h3 className="text-lg font-bold leading-snug line-clamp-2 text-white">{evt.title}</h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{evt.tagline}</p>

                      {/* Event Meta Details */}
                      <div className="mt-4 space-y-2 text-xs text-foreground/80 border-t border-border/50 pt-3">
                        <div className="flex items-center gap-2">
                          <IconCalendar className="size-4 text-primary shrink-0" />
                          <span>
                            {evt.date} • {evt.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconMapPin className="size-4 text-rose-500 shrink-0" />
                          <span className="truncate">{evt.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconUsers className="size-4 text-secondary shrink-0" />
                          <span className="truncate">Organized by {evt.organizer.name}</span>
                        </div>
                      </div>

                      {/* Registration progress */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                          <span>{evt.registeredCount} registered</span>
                          <span>{percentBooked}% booked</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${percentBooked}%` }}
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {evt.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions & Price */}
                      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                            Pass Price
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-extrabold text-foreground">
                              {evt.price === 0 ? "Free" : `₹${evt.price}`}
                            </span>
                            {evt.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">₹{evt.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => alert(`Redirecting to registration for: ${evt.title}`)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <IconTicket className="size-3.5" />
                            <span>Get Pass</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Main Events Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {selectedCategory === "All" ? "All Upcoming Events" : `${selectedCategory} Events`}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} matching your
                criteria
              </p>
            </div>

            {/* Quick sorting or category indicators */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Mode:</span>
              <span className="rounded-md border border-border bg-card px-2.5 py-1 font-medium capitalize">
                {modeFilter === "all" ? "All Formats" : modeFilter}
              </span>
              <span className="text-muted-foreground ml-2">City:</span>
              <span className="rounded-md border border-border bg-card px-2.5 py-1 font-medium">{selectedCity}</span>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/50 p-12 text-center my-8">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
                <IconFilter className="size-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No events found</h3>
              <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-muted-foreground">
                We couldn't find any events matching your current filters. Try changing your search query or location.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <IconX className="size-3.5" />
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredEvents.map((evt) => {
                const isSaved = !!savedEvents[evt.id];
                const percentBooked = Math.round((evt.registeredCount / evt.totalSpots) * 100);

                return (
                  <div
                    key={evt.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    {/* Header Gradient */}
                    <div
                      className={`relative h-32 w-full bg-linear-to-br ${evt.gradient} p-3.5 text-white flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                          {evt.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleShare(evt)}
                            title="Share"
                            className="rounded-full bg-black/30 p-1 backdrop-blur-md hover:bg-black/50"
                          >
                            {copiedId === evt.id ? (
                              <IconCheck className="size-3.5 text-emerald-400" />
                            ) : (
                              <IconShare className="size-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSave(evt.id)}
                            title="Save"
                            className="rounded-full bg-black/30 p-1 backdrop-blur-md hover:bg-black/50"
                          >
                            {isSaved ? (
                              <IconHeartFilled className="size-3.5 text-rose-400" />
                            ) : (
                              <IconHeart className="size-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        {evt.badge && (
                          <span className="inline-block rounded-sm bg-white/20 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-md text-white mb-1">
                            {evt.badge}
                          </span>
                        )}
                        <h3 className="text-sm font-bold leading-tight line-clamp-1 text-white">{evt.title}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{evt.tagline}</p>

                      <div className="mt-3 space-y-1.5 text-xs text-foreground/80 border-t border-border/40 pt-2.5">
                        <div className="flex items-center gap-1.5">
                          <IconCalendar className="size-3.5 text-primary shrink-0" />
                          <span className="truncate">{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <IconMapPin className="size-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">
                            {evt.city} • {evt.mode}
                          </span>
                        </div>
                      </div>

                      {/* Capacity progress */}
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>
                            {evt.registeredCount}/{evt.totalSpots} spots
                          </span>
                          <span>{percentBooked}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-primary/80 rounded-full" style={{ width: `${percentBooked}%` }} />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {evt.tags.slice(0, 2).map((t) => (
                          <span key={t} className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                        <div>
                          <span className="text-sm font-bold text-foreground">
                            {evt.price === 0 ? "Free" : `₹${evt.price}`}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => alert(`Selected event: ${evt.title}`)}
                          className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          <span>Register</span>
                          <IconArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Host Event Banner */}
        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-r from-primary/15 via-secondary/10 to-accent/15 p-8 sm:p-12 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-3">
                <IconTicket className="size-3.5" />
                For Event Organizers & College Clubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Hosting a College Fest or Hackathon?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Empower your attendees with automated WhatsApp pass delivery, sub-second offline QR scanners, real-time
                ledgers, and zero ticket fee tiers for student communities.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-[1.02]"
                >
                  <span>Host with Orgatick</span>
                  <IconArrowUpRight className="size-4" />
                </Link>
                <a
                  href="https://wa.me/918539863808?text=Hi%20Orgatick%20Team%2C%20I%20want%20to%20host%20an%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <IconBrandWhatsapp className="size-4 text-emerald-600" />
                  <span>Talk to Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
