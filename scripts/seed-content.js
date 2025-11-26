const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function seedContent() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
            }),
        });
    }

    const db = admin.firestore();

    const hero = {
        headline: "OWN THE NIGHT",
        subheadline: "We don't just post. We pack venues.\nEnergy. Consistency. Measurable Results.",
        ctaText: "Start The Pilot",
        ctaLink: "#pilot"
    };

    const pricing = {
        tiers: [
            {
                name: "Essential",
                price: "995",
                description: "Perfect for single-venue operators.",
                features: ["4 Shoots / Month", "12 Edited Reels", "Weekly Strategy Call", "Community Management"],
                ctaText: "Start Essential",
                isPopular: false
            },
            {
                name: "Growth",
                price: "1,995",
                description: "For venues ready to scale aggressively.",
                features: ["8 Shoots / Month", "24 Edited Reels", "Influencer Coordination", "Paid Ad Management", "24/7 Support"],
                ctaText: "Start Growth",
                isPopular: true
            },
            {
                name: "Empire",
                price: "3,995",
                description: "Multi-venue dominance.",
                features: ["Unlimited Shoots", "Daily Content Output", "Full Creative Team", "PR & Event Coverage", "Custom Merch Line"],
                ctaText: "Contact Us",
                isPopular: false
            }
        ]
    };

    const portfolio = {
        items: [
            { type: "VIDEO", title: "The Grand Opening", thumbnail: "/placeholder.jpg" },
            { type: "PHOTO", title: "Summer Vibes", thumbnail: "/placeholder.jpg" },
            { type: "STRATEGY", title: "Rebrand Campaign", thumbnail: "/placeholder.jpg" },
            { type: "VIDEO", title: "Halloween Bash", thumbnail: "/placeholder.jpg" },
            { type: "PHOTO", title: "VIP Experience", thumbnail: "/placeholder.jpg" },
            { type: "VIDEO", title: "NYE 2025", thumbnail: "/placeholder.jpg" }
        ]
    };

    console.log('🌱 Seeding site_content...');

    await db.collection('site_content').doc('hero').set(hero);
    console.log('✅ Hero section seeded.');

    await db.collection('site_content').doc('pricing').set(pricing);
    console.log('✅ Pricing section seeded.');

    await db.collection('site_content').doc('portfolio').set(portfolio);
    console.log('✅ Portfolio section seeded.');

    console.log('🎉 Seeding complete!');
}

seedContent();
