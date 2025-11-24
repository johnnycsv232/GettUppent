/**
 * The Content Creator: CarouselAgent
 * Purpose: Generates Instagram carousel posts for GettUpp ENT's launch strategy.
 * 
 * Creates 3 carousel series:
 * 1. Who/Problem/Brand (5 slides)
 * 2. Packages/System (6 slides)
 * 3. Proof/CTA/FAQ (5 slides)
 */

const fs = require('fs');
const path = require('path');

class CarouselAgent {
    constructor() {
        // Brand identity
        this.brand = {
            colors: {
                gold: '#D9AE43',
                pink: '#FF3C93',
                ink: '#0B0B0D'
            },
            fonts: {
                heading: 'Montserrat',
                headingAlt: 'Poppins',
                body: 'Inter',
                bodyAlt: 'Roboto'
            }
        };

        // Load configuration
        this.configPath = path.join(__dirname, '..', 'docs', 'config.json');
        this.config = this.loadConfig();

        // Output directory
        this.outputDir = path.join(__dirname, '..', 'carousel_output');
        this.ensureOutputDir();
    }

    loadConfig() {
        if (!fs.existsSync(this.configPath)) {
            console.log('⚠️  Config file not found, using defaults');
            return this.getDefaultConfig();
        }
        return JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    }

    getDefaultConfig() {
        return {
            pricing: {
                pilot_night: { price: 345, deliverables: ['1 Shoot', '30 Photos', '72h Delivery'], limit: '3 per month' },
                tier_1: { price: 445, deliverables: ['1 Shoot / Month', '30 Photos', '0 Reels'] },
                tier_2: { price: 695, deliverables: ['2 Shoots / Month', '60 Photos', '2 Reels'] },
                tier_3: { price: 995, deliverables: ['3 Shoots / Month', '80 Photos', '3 Reels'] }
            }
        };
    }

    ensureOutputDir() {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    // ==================== CAROUSEL 1: WHO / PROBLEM / BRAND ====================

    generateCarousel1() {
        const carousel = {
            name: 'Who/Problem/Brand',
            totalSlides: 5,
            purpose: 'Introduce GettUpp ENT, define the problem, and position the brand as the solution',
            slides: []
        };

        // Slide 1: Cover - Hook
        carousel.slides.push({
            slideNumber: 1,
            purpose: 'Hook the audience',
            dimensions: '1080x1350',
            design: {
                background: 'Dark radial gradient (ink black #0B0B0D to purple-pink tint), faint nightlife photo at 10% opacity',
                layout: 'Centered composition with 100px margins',
                header: {
                    bar: 'Black semi-transparent strip 90-100px tall at top',
                    logo: 'GE monogram (gold/pink) 40px height, left-aligned',
                    slideCount: '1/5 in Inter Bold 18px, white, right-aligned'
                },
                fonts: {
                    headline: `${this.brand.fonts.heading} ExtraBold 72px, ${this.brand.colors.gold}, uppercase, letter-spacing +5`,
                    subtext: `${this.brand.fonts.body} Medium 28-32px, ${this.brand.colors.pink}`
                },
                accents: [
                    'Spotlight glow effect behind headline (radial gradient)',
                    'Small arrow icon (30px, gold/white) on far right edge at mid-height',
                    'Large translucent GettUpp ENT wordmark watermark at 5-10% opacity'
                ]
            },
            content: {
                headline: 'The first nightlife content retainer for Minneapolis venues.',
                subtext: 'Nightlife photos + reels for MPLS bars, clubs & DJs.'
            },
            imagePrompt: 'Professional Instagram carousel slide, dark nightlife aesthetic, centered bold gold text "The first nightlife content retainer for Minneapolis venues" on black background with subtle pink spotlight glow, minimalist premium design, 1080x1350px'
        });

        // Slide 2: Who We're Built For
        carousel.slides.push({
            slideNumber: 2,
            purpose: 'Define the ideal customer profile',
            dimensions: '1080x1350',
            design: {
                background: 'Dark gradient with faint pink-purple tint',
                layout: 'Two-column: 65% text left, 35% abstract club-lights strip right',
                header: {
                    bar: 'Same as slide 1',
                    logo: 'GE monogram',
                    slideCount: '2/5'
                },
                fonts: {
                    sectionTitle: `${this.brand.fonts.heading} Bold 48px, ${this.brand.colors.pink}, left-aligned`,
                    bodyText: `${this.brand.fonts.body} Regular 28-32px, white, line-height 1.4`,
                    bullets: `${this.brand.fonts.body} Regular 26-28px, white, with gold/pink arrow bullets`
                },
                accents: [
                    'Micro-tag at bottom: "01 · WHO" (left) and "If this sounds like you, keep swiping →" (right)',
                    'Abstract club-lights visual on right 35%'
                ]
            },
            content: {
                title: 'Who We Are Built For',
                bullets: [
                    'Bars/clubs with 5k–25k Instagram followers',
                    'DJs needing consistent content',
                    'Owners tired of random freelancers',
                    'Venues that value 24–72h delivery and predictable pricing',
                    'Best fit: Strong brands in North Loop, Warehouse District, Downtown & Uptown'
                ]
            },
            imagePrompt: 'Instagram carousel slide with pink heading "Who We Are Built For", bullet list in white text on dark background, abstract nightclub lights on right side, professional nightlife marketing design'
        });

        // Slide 3: The Content Problem
        carousel.slides.push({
            slideNumber: 3,
            purpose: 'Agitate the pain point',
            dimensions: '1080x1350',
            design: {
                background: `Solid ${this.brand.colors.ink} with subtle hot pink vignette`,
                layout: 'Centered or left-aligned text with ample negative space',
                header: {
                    bar: 'Same as slide 1',
                    logo: 'GE monogram',
                    slideCount: '3/5'
                },
                fonts: {
                    problemStatement: `${this.brand.fonts.heading} Bold Italic 60px, ${this.brand.colors.pink}, centered`,
                    bullets: `${this.brand.fonts.body} Medium 26-28px, white, with pink arrow bullets`
                },
                accents: [
                    'Large question mark or broken camera icon faded in background',
                    'Pink glow behind text to simulate neon lights'
                ]
            },
            content: {
                problemStatement: 'Tired of grainy club photos that show up a week late?',
                rightNow: [
                    'Random shooters popping in and out',
                    'Photos a week later—or never',
                    'Different edit style every time',
                    'No one responsible for your feed'
                ],
                costYou: [
                    'A dead feed after strong nights',
                    'Less proof for promoters & booked talent',
                    'Fewer people seeing your room at its best',
                    'Thousands spent on DJs/promos but no content'
                ],
                conclusion: 'GettUpp ENT exists so this never happens again.'
            },
            imagePrompt: 'Instagram carousel slide with bold pink italic text asking about grainy club photos, bullet list of problems in white, dark background with subtle neon pink glow, nightlife pain point design'
        });

        // Slide 4: Who's Behind GettUpp ENT
        carousel.slides.push({
            slideNumber: 4,
            purpose: 'Introduce the founder and system',
            dimensions: '1080x1350',
            design: {
                background: `Dark gradient with faint warm ${this.brand.colors.gold} glow in corner`,
                layout: 'Split: 60% text left, 40% large distressed "Johnny Cage" mark right at reduced opacity',
                header: {
                    bar: 'Same as slide 1',
                    logo: 'GE monogram',
                    slideCount: '4/5'
                },
                fonts: {
                    sectionTitle: `${this.brand.fonts.heading} Bold 48-56px, ${this.brand.colors.gold}`,
                    bodyText: `${this.brand.fonts.body} Regular 28px, white`,
                    brandPillars: `${this.brand.fonts.body} SemiBold 24px, ${this.brand.colors.gold}`
                },
                accents: [
                    'Footer shows social handles',
                    'Brand pillars: Energy · Consistency · Results'
                ]
            },
            content: {
                title: 'Who\'s Behind GettUpp ENT?',
                description: 'Johnny Cage runs the operation: one shooter, one system, AI-enhanced pipeline (edit time ≤ 2.3 min/photo, turnaround 24–72h).',
                brandPillars: ['Energy', 'Consistency', 'Measurable Results'],
                location: 'Minneapolis nightlife focus'
            },
            imagePrompt: 'Instagram carousel slide with gold heading, text about Johnny Cage and AI-enhanced pipeline, distressed "Johnny Cage" watermark on right, dark background with gold accent glow, professional operator branding'
        });

        // Slide 5: Transition to Packages
        carousel.slides.push({
            slideNumber: 5,
            purpose: 'Call to next carousel',
            dimensions: '1080x1350',
            design: {
                background: `Pure ${this.brand.colors.ink} with subtle dual-color gradient (pink-to-gold diagonal)`,
                layout: 'Centered text with large margins (100px all around)',
                header: {
                    bar: 'Same as slide 1',
                    logo: 'GE monogram',
                    slideCount: '5/5'
                },
                fonts: {
                    headline: `${this.brand.fonts.heading} Bold 48-52px, ${this.brand.colors.pink}`,
                    cta: `${this.brand.fonts.body} Bold 30px, uppercase, ${this.brand.colors.gold}`
                },
                accents: [
                    'Large gold arrow pointing right on far right side',
                    'Giant translucent GE monogram in center background at 30% opacity'
                ]
            },
            content: {
                headline: 'Ready to elevate your venue\'s presence?',
                cta: 'NEXT: PACKAGES + SYSTEM →',
                note: 'Tap the middle pinned post for all monthly packages, deliverables, and turnaround times.'
            },
            imagePrompt: 'Instagram carousel slide with pink text "Ready to elevate your venue\'s presence?", gold call-to-action "NEXT: PACKAGES + SYSTEM", large arrow pointing right, minimal dark design'
        });

        return carousel;
    }

    // ==================== CAROUSEL 2: PACKAGES + SYSTEM ====================

    generateCarousel2() {
        const carousel = {
            name: 'Packages/System',
            totalSlides: 6,
            purpose: 'Present service packages and explain the content subscription system',
            slides: []
        };

        // Slide 1: Packages Overview Cover
        carousel.slides.push({
            slideNumber: 1,
            purpose: 'Introduce packages concept',
            dimensions: '1080x1350',
            design: {
                background: 'Dark with subtle diagonal gradient (top-left faint pink, bottom-right faint gold)',
                layout: 'Centered title with package name preview row below',
                header: {
                    bar: 'Same header bar style',
                    logo: 'GE monogram',
                    slideCount: '1/6'
                },
                fonts: {
                    title: `${this.brand.fonts.heading} Bold 54px, white`,
                    packageNames: `${this.brand.fonts.body} SemiBold 28px, colored by tier`
                },
                accents: [
                    'Horizontal row showing: Pilot (pink) | Tier 1 | Tier 2 | VIP (gold)',
                    'Faint GE monogram pattern in background'
                ]
            },
            content: {
                title: 'Packages & Content System',
                subtitle: 'Find the perfect plan for your venue',
                packages: ['Pilot', 'Tier 1', 'Tier 2', 'VIP']
            },
            imagePrompt: 'Instagram carousel cover slide, white text "Packages & Content System", preview of 4 package tiers below, dark background with pink and gold accents, professional pricing page design'
        });

        // Slide 2: What GettUpp ENT Does
        carousel.slides.push({
            slideNumber: 2,
            purpose: 'Explain the service',
            dimensions: '1080x1350',
            design: {
                background: 'Pure black with soft spotlight',
                layout: 'Text with mini collage of past posts',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '2/6'
                },
                fonts: {
                    sectionTitle: `${this.brand.fonts.heading} SemiBold 48px, white`,
                    bullets: `${this.brand.fonts.body} Regular 26px, white`
                },
                accents: [
                    'Footer rotates to "Consistency on the feed"',
                    'Mini collage of sample photos on right 35%'
                ]
            },
            content: {
                title: 'What GettUpp ENT Does for You',
                bullets: [
                    'We show up on your busiest nights with a nightlife-specific shot list',
                    'We run everything through a pro + AI pipeline (Remini, stylized looks) with ≤ 2.3 min/photo editing',
                    'We deliver ready-to-post photos + reels in 24–72h depending on tier',
                    'Think of it like an in-house content team—without payroll'
                ]
            },
            imagePrompt: 'Instagram carousel slide explaining service, white bullet list on black background, small collage of nightclub photos on right, professional service description design'
        });

        // Slide 3: Packages Grid
        const packages = this.calculatePackageROI();
        carousel.slides.push({
            slideNumber: 3,
            purpose: 'Display pricing and packages',
            dimensions: '1080x1350',
            design: {
                background: `${this.brand.colors.ink} with subtle texture`,
                layout: '2×2 grid of package cards with thin gold borders',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '3/6'
                },
                fonts: {
                    packageTitle: `${this.brand.fonts.heading} SemiBold 48px, colored by tier`,
                    price: `${this.brand.fonts.body} Bold 42px, gold`,
                    details: `${this.brand.fonts.body} Regular 24px, white`,
                    badge: `${this.brand.fonts.body} Bold 20px, uppercase, gold`
                },
                accents: [
                    'Each card has thin gold border and slightly lighter background',
                    'Pilot card has pink accent, VIP has gold accent',
                    'Note at bottom: "Soft-launch pricing • Locked for early venues"'
                ]
            },
            content: {
                packages: packages
            },
            imagePrompt: 'Instagram carousel pricing grid, 2x2 layout with 4 package tiers (Pilot $345, Tier 1 $445, Tier 2 $695, VIP $995), gold borders, dark background, professional pricing table design'
        });

        // Slide 4: What's Included Every Night
        carousel.slides.push({
            slideNumber: 4,
            purpose: 'Detail the shot list',
            dimensions: '1080x1350',
            design: {
                background: 'Dark charcoal',
                layout: '65% vertical bullet list left, 35% 2×2 grid of sample photos right',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '4/6'
                },
                fonts: {
                    sectionTitle: `${this.brand.fonts.heading} Bold 48px, ${this.brand.colors.gold}`,
                    bullets: `${this.brand.fonts.body} Regular 26px, white`
                },
                accents: [
                    'Small note about editing time cap (2.3 min/photo)',
                    'Sample photos showing variety of shots'
                ]
            },
            content: {
                title: 'What\'s Included Every Night',
                shotList: [
                    'Exterior sign shot',
                    'Walk-in POV',
                    'DJ/dance-floor energy shots',
                    'Staff & VIP moments',
                    'Vertical clips tuned for Reels/Stories',
                    'Enough content for multiple posts'
                ],
                editingNote: 'Editing time: ≤ 2.3 min per photo (1.15h for 30 photos, 2.3h for 60, 3.07h for 80)'
            },
            imagePrompt: 'Instagram carousel slide with gold heading "What\'s Included Every Night", bullet list of shot types, small grid of sample nightclub photos on right, professional deliverables list design'
        });

        // Slide 5: Pipeline & Speed
        carousel.slides.push({
            slideNumber: 5,
            purpose: 'Explain the system and turnaround',
            dimensions: '1080x1350',
            design: {
                background: `${this.brand.colors.ink} with subtle pink-gold gradient`,
                layout: 'Horizontal timeline with circular icons and arrows',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '5/6'
                },
                fonts: {
                    sectionTitle: `${this.brand.fonts.heading} Bold 48px, white`,
                    stepTitle: `${this.brand.fonts.body} Bold 28px, ${this.brand.colors.pink}`,
                    stepDescription: `${this.brand.fonts.body} Regular 24px, white`,
                    turnaroundBox: `${this.brand.fonts.body} SemiBold 22px, ${this.brand.colors.gold}`
                },
                accents: [
                    'Circular icons for each step (camera, computer, phone, repeat)',
                    'Arrows connecting steps in pink/gold',
                    'Turnaround times box at bottom'
                ]
            },
            content: {
                title: 'Pipeline & Speed',
                steps: [
                    { step: 'Shoot', description: 'Capture your venue at peak energy' },
                    { step: 'Enhance', description: 'Pro + AI tools (Remini, stylized looks)' },
                    { step: 'Sort', description: 'By vibe: crowd, bar, staff, DJ, details' },
                    { step: 'Deliver', description: 'Gallery link ready to post' }
                ],
                turnarounds: {
                    pilot: '≤ 72h',
                    tier1: '≤ 72h',
                    tier2: '≤ 48h',
                    vip: '24-48h'
                },
                note: 'Automation (ShotClock) keeps deadlines honest. Admin time ≤ 75 min per client.'
            },
            imagePrompt: 'Instagram carousel timeline showing 4-step process (Shoot → Enhance → Sort → Deliver), circular icons connected by arrows, turnaround times at bottom, dark background with pink and gold accents'
        });

        // Slide 6: Go to Proof & Booking
        carousel.slides.push({
            slideNumber: 6,
            purpose: 'Transition to proof carousel',
            dimensions: '1080x1350',
            design: {
                background: `${this.brand.colors.ink} with blurred Johnny Cage logo texture`,
                layout: 'Centered text with large gold arrow pointing right',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '6/6'
                },
                fonts: {
                    headline: `${this.brand.fonts.heading} Bold 48px, ${this.brand.colors.gold}`,
                    cta: `${this.brand.fonts.body} Bold 30px, ${this.brand.colors.pink}`
                },
                accents: [
                    'Large gold arrow pointing right',
                    'Footer rotates to "Consistency"',
                    'Scarcity note in small text'
                ]
            },
            content: {
                headline: 'See proof & how to book',
                description: 'Tap the right pinned post to see local results, FAQs and exactly what to DM to lock a date.',
                cta: 'Or DM \'PILOT\' right now to jump the line',
                scarcity: 'Only 3 pilot nights per month • Autopay via Stripe'
            },
            imagePrompt: 'Instagram carousel slide with gold heading "See proof & how to book", pink CTA text, large arrow pointing right, minimal dark design with urgency messaging'
        });

        return carousel;
    }

    // ==================== CAROUSEL 3: PROOF + CTA + FAQ ====================

    generateCarousel3() {
        const carousel = {
            name: 'Proof/CTA/FAQ',
            totalSlides: 5,
            purpose: 'Build trust with social proof, drive action, and address objections',
            slides: []
        };

        // Slide 1: Cover - Built Inside MPLS Nightlife
        carousel.slides.push({
            slideNumber: 1,
            purpose: 'Establish local authenticity',
            dimensions: '1080x1350',
            design: {
                background: 'Distressed Johnny Cage logo as darkened background',
                layout: 'Centered headline with gritty texture',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '1/5'
                },
                fonts: {
                    headline: `${this.brand.fonts.heading} Black 60px, ${this.brand.colors.gold}`,
                    subtext: `${this.brand.fonts.body} Medium 28px, white`,
                    label: `${this.brand.fonts.body} Bold 24px, ${this.brand.colors.pink}`
                },
                accents: [
                    'Gritty distressed texture for authenticity',
                    'Label: "03 · Proof & Booking"'
                ]
            },
            content: {
                headline: 'Built inside MPLS nightlife',
                subtext: 'Proof, FAQs & how to book your first night',
                label: '03 · Proof & Booking'
            },
            imagePrompt: 'Instagram carousel cover with bold gold text "Built inside MPLS nightlife", gritty distressed texture background, authentic local branding design'
        });

        // Slide 2: We Only Shoot Your Scene
        carousel.slides.push({
            slideNumber: 2,
            purpose: 'Emphasize local focus',
            dimensions: '1080x1350',
            design: {
                background: 'Dark with abstract map or skyline graphic on right',
                layout: 'Two-column: text left, graphic right',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '2/5'
                },
                fonts: {
                    sectionTitle: `${this.brand.fonts.heading} Bold 48px, ${this.brand.colors.pink}`,
                    bodyText: `${this.brand.fonts.body} Regular 28px, white`,
                    neighborhoods: `${this.brand.fonts.body} SemiBold 24px, ${this.brand.colors.gold}`
                },
                accents: [
                    'Abstract Minneapolis skyline or map on right 40%',
                    'Low-opacity GettUpp Girls logo as Easter egg'
                ]
            },
            content: {
                title: 'We Only Shoot Your Scene',
                neighborhoods: ['North Loop', 'Warehouse District', 'Downtown', 'Uptown', 'St. Paul'],
                description: 'We\'re not bouncing between weddings and corporate headshots. GettUpp ENT is built for nightlife content—period.'
            },
            imagePrompt: 'Instagram carousel slide with pink heading "We Only Shoot Your Scene", list of Minneapolis neighborhoods in gold, abstract city skyline on right, local focus design'
        });

        // Slide 3: Before vs After GettUpp ENT
        carousel.slides.push({
            slideNumber: 3,
            purpose: 'Show transformation',
            dimensions: '1080x1350',
            design: {
                background: `${this.brand.colors.ink}`,
                layout: 'Two equal-sized cards side by side (Before/After)',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '3/5'
                },
                fonts: {
                    cardTitle: `${this.brand.fonts.heading} Bold 36px, red/orange for Before, gold/pink for After`,
                    bullets: `${this.brand.fonts.body} Regular 24px, white`,
                    proofStat: `${this.brand.fonts.heading} ExtraBold 48px, ${this.brand.colors.gold}`
                },
                accents: [
                    'Before card: red/orange accent',
                    'After card: gold/pink accent',
                    'Footer rotates to "Results in your metrics"'
                ]
            },
            content: {
                before: [
                    '1 post a week',
                    'Mixed angles/quality',
                    'Photos arrive late or never',
                    'No one accountable for your feed'
                ],
                after: [
                    '2–4 posts per weekend',
                    'Consistent look',
                    '24–72h turnaround depending on tier',
                    'One operator responsible'
                ],
                proof: {
                    profileVisits: '+32% profile visits in 30 days',
                    views: '79.7k views in 90 days'
                }
            },
            imagePrompt: 'Instagram carousel with before/after comparison cards, red "Before" section showing problems, gold "After" section showing solutions, proof statistics at bottom, transformation design'
        });

        // Slide 4: Quick FAQ
        carousel.slides.push({
            slideNumber: 4,
            purpose: 'Address objections',
            dimensions: '1080x1350',
            design: {
                background: `${this.brand.colors.ink}`,
                layout: 'Stacked FAQ items with gold questions and white answers',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '4/5'
                },
                fonts: {
                    question: `${this.brand.fonts.body} Bold 26px, ${this.brand.colors.gold}`,
                    answer: `${this.brand.fonts.body} Regular 24px, white`,
                    note: `${this.brand.fonts.body} Italic 22px, gray`
                },
                accents: [
                    'Thin gold separators between FAQ items',
                    'Footer note: "Full terms handled in DMs and contract"'
                ]
            },
            content: {
                faqs: [
                    {
                        q: 'Do we have to sign a long contract?',
                        a: 'No; start with a pilot; month-to-month retainer with clear cancellation window.'
                    },
                    {
                        q: 'What if we need to reschedule?',
                        a: 'One rollover included; <48h cancellation = 50% fee; <24h = 75% fee.'
                    },
                    {
                        q: 'Do we have to take video?',
                        a: 'Reels are optional but recommended; packages can be tuned.'
                    },
                    {
                        q: 'How do payments work?',
                        a: 'Autopay via Stripe; Net-7 available; Pilot charged upfront; retainer via subscription. ACH clients get a small discount.'
                    }
                ],
                note: 'Full terms handled in DMs and contract'
            },
            imagePrompt: 'Instagram carousel FAQ slide with gold questions and white answers, 4 common questions stacked vertically, thin gold separators, dark background, professional Q&A design'
        });

        // Slide 5: Main CTA - DM PILOT
        carousel.slides.push({
            slideNumber: 5,
            purpose: 'Drive immediate action',
            dimensions: '1080x1350',
            design: {
                background: `${this.brand.colors.ink} with subtle gold/pink glow around CTA card`,
                layout: 'Bright white card on dark background, centered',
                header: {
                    bar: 'Same header bar',
                    logo: 'GE monogram',
                    slideCount: '5/5'
                },
                fonts: {
                    headline: `${this.brand.fonts.heading} Black 56px, ${this.brand.colors.gold}`,
                    bodyText: `${this.brand.fonts.body} Regular 26px, white`,
                    cta: `${this.brand.fonts.heading} Bold 80px, ${this.brand.colors.gold}, uppercase`,
                    scarcity: `${this.brand.fonts.body} SemiBold 24px, ${this.brand.colors.pink}`
                },
                accents: [
                    'Bright white card with gold/pink glow',
                    'Small Johnny Cage stamp at bottom',
                    'Footer rotates to "Results"'
                ]
            },
            content: {
                headline: 'Ready to test it on a real night?',
                cta: 'DM \'PILOT\'',
                instructions: 'DM \'PILOT\' with your venue name, your busiest night (Thu–Sun) and what you want more of (bottles, cover, events). I\'ll reply personally with availability, a quick plan and a Stripe link.',
                scarcity: 'Spots: 3 Pilot Nights per month',
                note: 'ACH clients get a small discount because fees are lower than credit cards. If the pilot works, we switch on a Stripe subscription so you never chase invoices again.'
            },
            imagePrompt: 'Instagram carousel CTA slide with huge gold text "DM PILOT", white card on dark background with gold glow, clear instructions, urgency messaging about limited spots, conversion-focused design'
        });

        return carousel;
    }

    // ==================== HELPER FUNCTIONS ====================

    calculatePackageROI() {
        const pricing = this.config.pricing;

        return {
            pilot: {
                name: 'Pilot',
                price: pricing.pilot_night.price,
                type: 'one-time',
                deliverables: pricing.pilot_night.deliverables,
                limit: pricing.pilot_night.limit,
                assets: 30,
                costPerAsset: (pricing.pilot_night.price / 30).toFixed(2),
                bestFor: 'Testing the service',
                badge: 'Invite-Only'
            },
            tier1: {
                name: 'Tier 1',
                displayName: pricing.tier_1.name || 'Tier 1',
                price: pricing.tier_1.price,
                type: 'monthly',
                deliverables: pricing.tier_1.deliverables,
                assets: 30,
                costPerAsset: (pricing.tier_1.price / 30).toFixed(2),
                postsPerMonth: '8-12',
                bestFor: 'Small venues, single night focus'
            },
            tier2: {
                name: 'Tier 2',
                displayName: pricing.tier_2.name || 'Tier 2',
                price: pricing.tier_2.price,
                type: 'monthly',
                deliverables: pricing.tier_2.deliverables,
                assets: 62, // 60 photos + 2 reels
                costPerAsset: (pricing.tier_2.price / 62).toFixed(2),
                postsPerMonth: '20-30',
                costPerPost: '23-35',
                bestFor: 'Active venues, weekend coverage',
                badge: 'Most Popular'
            },
            vip: {
                name: 'VIP',
                displayName: pricing.tier_3.name || 'VIP',
                price: pricing.tier_3.price,
                type: 'monthly',
                deliverables: pricing.tier_3.deliverables,
                assets: 83, // 80 photos + 3 reels
                costPerAsset: (pricing.tier_3.price / 83).toFixed(2),
                postsPerMonth: '30-40',
                bestFor: 'Premium venues, full week coverage',
                badge: 'Premium'
            }
        };
    }

    exportCarousel(carousel, folderName) {
        const carouselDir = path.join(this.outputDir, folderName);

        if (!fs.existsSync(carouselDir)) {
            fs.mkdirSync(carouselDir, { recursive: true });
        }

        // Export each slide as JSON
        carousel.slides.forEach(slide => {
            const filename = `slide_${slide.slideNumber}_${slide.purpose.toLowerCase().replace(/\s+/g, '_')}.json`;
            const filepath = path.join(carouselDir, filename);
            fs.writeFileSync(filepath, JSON.stringify(slide, null, 2));
        });

        // Export carousel summary
        const summary = {
            name: carousel.name,
            totalSlides: carousel.totalSlides,
            purpose: carousel.purpose,
            slideFiles: carousel.slides.map(s => `slide_${s.slideNumber}_${s.purpose.toLowerCase().replace(/\s+/g, '_')}.json`)
        };

        const summaryPath = path.join(carouselDir, '_carousel_summary.json');
        fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

        return carouselDir;
    }

    run() {
        console.log('🎨 Carousel Agent started...');
        console.log('📊 Generating Instagram carousel content for GettUpp ENT launch...\n');

        try {
            // Generate all three carousels
            console.log('--- CAROUSEL 1: WHO / PROBLEM / BRAND ---');
            const carousel1 = this.generateCarousel1();
            const dir1 = this.exportCarousel(carousel1, 'carousel_1_who_problem_brand');
            console.log(`✅ Generated ${carousel1.totalSlides} slides → ${dir1}\n`);

            console.log('--- CAROUSEL 2: PACKAGES / SYSTEM ---');
            const carousel2 = this.generateCarousel2();
            const dir2 = this.exportCarousel(carousel2, 'carousel_2_packages_system');
            console.log(`✅ Generated ${carousel2.totalSlides} slides → ${dir2}\n`);

            console.log('--- CAROUSEL 3: PROOF / CTA / FAQ ---');
            const carousel3 = this.generateCarousel3();
            const dir3 = this.exportCarousel(carousel3, 'carousel_3_proof_cta');
            console.log(`✅ Generated ${carousel3.totalSlides} slides → ${dir3}\n`);

            // Summary
            const totalSlides = carousel1.totalSlides + carousel2.totalSlides + carousel3.totalSlides;
            console.log('===================================================');
            console.log(`✅ CAROUSEL GENERATION COMPLETE`);
            console.log(`   Total: ${totalSlides} slides across 3 carousels`);
            console.log(`   Output: ${this.outputDir}`);
            console.log('===================================================');

            // Create README
            this.createReadme();

        } catch (error) {
            console.error('❌ Error generating carousels:', error.message);
        }
    }

    createReadme() {
        const readmePath = path.join(this.outputDir, 'README.md');
        const readme = `# GettUpp ENT Instagram Carousel Content

## Overview

This directory contains design specifications for **3 Instagram carousel series** (16 total slides) for GettUpp ENT's launch strategy.

### Carousels

1. **Who/Problem/Brand** (5 slides) - Introduces GettUpp ENT and positions the brand
2. **Packages/System** (6 slides) - Details pricing and the content subscription system
3. **Proof/CTA/FAQ** (5 slides) - Provides social proof and drives action

## Directory Structure

\`\`\`
carousel_output/
├── carousel_1_who_problem_brand/
│   ├── _carousel_summary.json
│   ├── slide_1_hook_the_audience.json
│   ├── slide_2_define_the_ideal_customer_profile.json
│   ├── slide_3_agitate_the_pain_point.json
│   ├── slide_4_introduce_the_founder_and_system.json
│   └── slide_5_call_to_next_carousel.json
├── carousel_2_packages_system/
│   └── ... (6 slides)
├── carousel_3_proof_cta/
│   └── ... (5 slides)
└── README.md
\`\`\`

## Slide JSON Format

Each slide contains:
- **slideNumber**: Position in carousel
- **purpose**: What this slide accomplishes
- **dimensions**: 1080×1350px (Instagram carousel format)
- **design**: Complete design specifications (background, layout, fonts, colors, accents)
- **content**: Copy and messaging
- **imagePrompt**: AI image generation prompt (if needed)

## Brand Guidelines

### Colors
- **Gold**: #D9AE43 (premium, achievement, CTAs)
- **Pink**: #FF3C93 (energy, attention, highlights)
- **Ink**: #0B0B0D (background, sophistication)

### Typography
- **Headings**: Montserrat or Poppins (Bold/ExtraBold)
- **Body**: Inter or Roboto (Regular/Medium)

### Design Principles
- High contrast (light text on dark backgrounds)
- Ample negative space (100px+ margins)
- Consistent header bar with GE monogram
- Mobile-optimized (24px+ minimum font size)

## Usage

### Option 1: Manual Design
1. Open each slide JSON file
2. Use the design specifications to create slides in Figma, Canva, or Adobe
3. Follow the exact colors, fonts, and layout described

### Option 2: AI Image Generation
1. Use the \`imagePrompt\` field from each slide
2. Generate with DALL-E, Midjourney, or similar
3. Refine based on design specifications

### Option 3: Automated Generation
Run the CarouselAgent with image generation enabled (future feature).

## Data Sources

- Package pricing: \`docs/config.json\`
- Metrics: Industry benchmarks + internal data
- ROI calculations: Automated based on package deliverables

## Next Steps

1. Review all slide specifications
2. Generate or design actual images
3. Export as 1080×1350px JPEGs
4. Upload to Instagram as carousel posts
5. Pin all 3 carousels to profile

---

Generated by **CarouselAgent** - GettUpp ENT Business Agent Fleet
`;

        fs.writeFileSync(readmePath, readme);
        console.log(`📄 README created: ${readmePath}`);
    }
}

// Run if executed directly
if (require.main === module) {
    const agent = new CarouselAgent();
    agent.run();
}

module.exports = { run: () => new CarouselAgent().run() };
