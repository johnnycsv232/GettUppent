import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Tally Webhook Payload Types
interface TallyField {
  key: string;
  label: string;
  type: string;
  value: string | string[] | number | boolean | null;
}

interface TallyPayload {
  eventId: string;
  eventType: "FORM_SUBMISSION";
  createdAt: string;
  data: {
    responseId: string;
    submissionId: string;
    respondentId: string;
    formId: string;
    formName: string;
    createdAt: string;
    fields: TallyField[];
  };
}

// Helper to extract field value by label
function getFieldValue(fields: TallyField[], label: string): string | null {
  const field = fields.find(
    (f) => f.label.toLowerCase().includes(label.toLowerCase())
  );
  return field?.value?.toString() || null;
}

// Verify webhook signature (if Tally provides HMAC)
function verifySignature(payload: string, signature: string | null): boolean {
  const secret = process.env.TALLY_WEBHOOK_SECRET;
  
  if (!secret) {
    console.warn("⚠️ TALLY_WEBHOOK_SECRET not set - skipping signature verification");
    return true; // Allow in development
  }

  if (!signature) {
    console.error("❌ No signature provided");
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("tally-signature");
    
    // Verify signature
    if (!verifySignature(rawBody, signature)) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse payload
    const payload: TallyPayload = JSON.parse(rawBody);
    
    // Validate event type
    if (payload.eventType !== "FORM_SUBMISSION") {
      console.log(`ℹ️ Ignoring event type: ${payload.eventType}`);
      return NextResponse.json({ received: true });
    }

    // Extract form data
    const { fields, formName, submissionId, createdAt } = payload.data;
    
    // Parse common fields
    const venueName = getFieldValue(fields, "venue") || getFieldValue(fields, "business");
    const contactEmail = getFieldValue(fields, "email");
    const instagramHandle = getFieldValue(fields, "instagram") || getFieldValue(fields, "ig");
    const bestNight = getFieldValue(fields, "night") || getFieldValue(fields, "preferred");
    const phoneNumber = getFieldValue(fields, "phone");
    const contactName = getFieldValue(fields, "name");

    // Log the submission clearly
    console.log("═══════════════════════════════════════════");
    console.log("📥 NEW TALLY SUBMISSION");
    console.log("═══════════════════════════════════════════");
    console.log(`📋 Form: ${formName}`);
    console.log(`🆔 Submission ID: ${submissionId}`);
    console.log(`📅 Received: ${createdAt}`);
    console.log("───────────────────────────────────────────");
    console.log(`🏢 Venue: ${venueName || "Not provided"}`);
    console.log(`👤 Contact: ${contactName || "Not provided"}`);
    console.log(`📧 Email: ${contactEmail || "Not provided"}`);
    console.log(`📱 Phone: ${phoneNumber || "Not provided"}`);
    console.log(`📸 Instagram: ${instagramHandle || "Not provided"}`);
    console.log(`🌙 Best Night: ${bestNight || "Not provided"}`);
    console.log("───────────────────────────────────────────");
    console.log("📦 Raw Fields:", JSON.stringify(fields, null, 2));
    console.log("═══════════════════════════════════════════");

    // TODO: Add to Firestore leads collection
    // const db = getFirestore();
    // await db.collection("leads").add({
    //   source: "tally",
    //   formName,
    //   submissionId,
    //   venueName,
    //   contactEmail,
    //   instagramHandle,
    //   bestNight,
    //   phoneNumber,
    //   contactName,
    //   createdAt: new Date(createdAt),
    //   status: "new",
    //   tier: "pilot"
    // });

    // TODO: Send notification to Slack/Discord
    // TODO: Trigger email sequence via Resend/SendGrid

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Webhook processed successfully"
    });

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle GET for webhook verification (some services ping GET first)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const challenge = searchParams.get("challenge");
  
  if (challenge) {
    return NextResponse.json({ challenge });
  }
  
  return NextResponse.json({ 
    status: "ok",
    message: "Tally webhook endpoint active" 
  });
}
