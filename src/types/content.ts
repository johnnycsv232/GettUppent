// ============================================
// GettUpp ENT - CMS Content Types
// Premium Nightlife Agency Design System
// ============================================

// Hero Section
export interface HeroSection {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    // Trust bar stats (optional, has defaults)
    venueCount?: number;
    shootCount?: number;
    onTimeRate?: number;
}

// ROI Math Section
export interface RoiMathSection {
    customersNeeded: number;
    packagePrice: number;
    customerLTV: number;
    verificationText: string;
}

// Johnny Cage / Founder Section
export interface FounderSection {
    name: string;
    title: string;
    subtitle: string;
    quote: string;
    bio: string;
    imageUrl: string;
    instagramHandle: string;
    instagramUrl: string;
    instagramFollowers: string;
    activeLocation: string;
    isStripeVerified: boolean;
}

// ShotClock / Deadline Section
export interface ShotClockSection {
    headline: string;
    turnaroundHours: number;
    onTimeRate: number;
    lastDelivery: string;
    nextShoot: string;
}

// Testimonial
export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    venue: string;
    venueInitials: string;
    metric: string;
    metricLabel: string;
    rating: number;
    isVerified: boolean;
}

// Pilot Offer
export interface PilotOffer {
    price: number;
    features: string[];
    monthlyLimit: number;
    isAvailable: boolean;
}

// Pricing Tier
export interface PricingTier {
    id?: string;
    name: string;
    label: string;
    badge?: string;
    price: number;
    description?: string;
    savings: string;
    features: string[];
    ctaText: string;
    isPopular?: boolean;
    isPremium?: boolean;
}

// GettUpp Girls Section
export interface GettUppGirlsSection {
    tagline: string;
    soldCount: number;
    images: string[];
    shopUrl: string;
    venues: string[];
}

// Editing Service
export interface EditingService {
    batchPrice: number;
    batchPhotos: number;
    singlePrice: number;
    turnaroundHours: number;
    batchesEdited: number;
    rating: number;
}

// Gallery / Portfolio Item
export interface PortfolioItem {
    id?: string;
    title: string;
    category?: string;
    type?: 'image' | 'video' | 'Photo' | 'Video';
    src?: string;
    imageUrl: string;
    videoUrl?: string;
    venue?: string;
    date?: string;
    width?: number;
    height?: number;
    aspect?: 'tall' | 'wide' | 'square';
}

// Footer Section
export interface FooterSection {
    smsNumber: string;
    smsKeyword: string;
    instagramUrl: string;
    twitterUrl: string;
    email: string;
}

// Legacy Feature type (kept for compatibility)
export interface Feature {
    title: string;
    description: string;
    icon: string;
}

// Complete Site Content
export interface SiteContent {
    hero: HeroSection;
    roiMath?: RoiMathSection;
    founder?: FounderSection;
    shotClock?: ShotClockSection;
    testimonials?: Testimonial[];
    pilotOffer?: PilotOffer;
    pricing: PricingTier[];
    gettuppGirls?: GettUppGirlsSection;
    editingService?: EditingService;
    portfolio: PortfolioItem[];
    footer?: FooterSection;
    features?: Feature[]; // Legacy
}

// ============================================
// Default Values for CMS
// ============================================

export const DEFAULT_HERO: HeroSection = {
    headline: "OWN THE NIGHT",
    subheadline: "We don't just post. We pack venues.",
    ctaText: "Start The Pilot",
    ctaLink: "#pilot",
    venueCount: 12,
    shootCount: 500,
    onTimeRate: 99.2,
};

export const DEFAULT_ROI_MATH: RoiMathSection = {
    customersNeeded: 3,
    packagePrice: 995,
    customerLTV: 350,
    verificationText: "Average venue result based on 8 months of partnership data",
};

export const DEFAULT_FOUNDER: FounderSection = {
    name: "Johnny Cage",
    title: "MOTHERFUCKEN J-CAGE",
    subtitle: "You-Already-Know",
    quote: "I don't sell content. I deliver tracked RSVPs. If I don't move the numbers, don't keep me.",
    bio: "Operating since 2024 across Warehouse District, North Loop, and Uptown. If it's happening in Minneapolis nightlife, we're there.",
    imageUrl: "/images/johnny-cage.jpg",
    instagramHandle: "@MPLSJOHNNYCAGE",
    instagramUrl: "https://www.instagram.com/mplsjohnnycage/",
    instagramFollowers: "12.4K",
    activeLocation: "North Loop",
    isStripeVerified: true,
};

export const DEFAULT_SHOTCLOCK: ShotClockSection = {
    headline: "NEVER MISS A DEADLINE",
    turnaroundHours: 72,
    onTimeRate: 99.2,
    lastDelivery: "2 hours ago",
    nextShoot: "Tonight 11PM",
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        quote: "They don't just take photos—they track what works. Our table bookings are up 28% since we started.",
        name: "DJ Khrome",
        role: "Resident",
        venue: "Vanquish",
        venueInitials: "VQ",
        metric: "+28%",
        metricLabel: "Bookings",
        rating: 5,
        isVerified: true,
    },
    {
        id: "2",
        quote: "First shoot with Johnny, we saw a 40% jump in door count that Friday. Second shoot, we beat our record.",
        name: "Marcus Chen",
        role: "GM",
        venue: "The Warehouse",
        venueInitials: "TW",
        metric: "+40%",
        metricLabel: "Door Count",
        rating: 5,
        isVerified: true,
    },
    {
        id: "3",
        quote: "We tried three other content creators. They gave us 'pretty photos.' Johnny gave us packed Saturdays.",
        name: "Sarah Kim",
        role: "Marketing Director",
        venue: "Rabbit Hole",
        venueInitials: "RH",
        metric: "+35%",
        metricLabel: "Weekend Traffic",
        rating: 5,
        isVerified: true,
    },
];

export const DEFAULT_PILOT_OFFER: PilotOffer = {
    price: 345,
    features: [
        "1 Premium Shoot",
        "30 Edited Photos",
        "72h Delivery Guarantee",
        "Full GettUpp Look",
    ],
    monthlyLimit: 3,
    isAvailable: true,
};

export const DEFAULT_PRICING: PricingTier[] = [
    {
        name: "Friday Nights",
        label: "STARTER",
        badge: "ENTRY LEVEL",
        price: 445,
        savings: "SAVE $1,200/YR VS FREELANCERS",
        features: [
            "1 Shoot / Month",
            "30 Edited Photos",
            "72h Delivery",
            "Single-Venue Focus",
        ],
        ctaText: "Start Friday Nights",
        isPopular: false,
    },
    {
        name: "Weekend Warrior",
        label: "GROWTH",
        badge: "MOST POPULAR",
        price: 695,
        savings: "SAVE $2,340/YR VS FREELANCERS",
        features: [
            "2 Shoots / Month",
            "60 Edited Photos + 2 Reels",
            "48h Delivery Guarantee",
            "Priority Scheduling",
            "Route-Batched Efficiency",
        ],
        ctaText: "Go Weekend Warrior",
        isPopular: true,
    },
    {
        name: "VIP Partner",
        label: "EMPIRE",
        badge: "PREMIUM",
        price: 995,
        savings: "SAVE $4,500/YR VS AGENCY",
        features: [
            "3 Shoots / Month",
            "80 Edited Photos + 3 Reels",
            "24-48h Delivery",
            "Full Creative Team",
            "Monthly Strategy Call",
        ],
        ctaText: "Become VIP",
        isPremium: true,
    },
];

export const DEFAULT_EDITING_SERVICE: EditingService = {
    batchPrice: 199,
    batchPhotos: 30,
    singlePrice: 49,
    turnaroundHours: 72,
    batchesEdited: 124,
    rating: 4.9,
};

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
    { id: "1", title: "The Warehouse", venue: "The Warehouse", date: "Nov 14", imageUrl: "/images/gallery/gallery-1.jpg", aspect: "tall" },
    { id: "2", title: "Vanquish", venue: "Vanquish", date: "Nov 12", imageUrl: "/images/gallery/gallery-2.jpg", aspect: "wide" },
    { id: "3", title: "Rabbit Hole", venue: "Rabbit Hole", date: "Nov 10", imageUrl: "/images/gallery/gallery-3.jpg", aspect: "square" },
    { id: "4", title: "Club Nova", venue: "Club Nova", date: "Nov 08", imageUrl: "/images/gallery/gallery-4.jpg", aspect: "square" },
    { id: "5", title: "The Loft", venue: "The Loft", date: "Nov 06", imageUrl: "/images/gallery/gallery-5.jpg", aspect: "tall" },
    { id: "6", title: "First Avenue", venue: "First Avenue", date: "Nov 04", imageUrl: "/images/gallery/gallery-6.jpg", aspect: "wide" },
];
