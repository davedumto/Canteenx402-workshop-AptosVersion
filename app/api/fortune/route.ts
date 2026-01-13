// Simple fortune API - protected by aptos-x402 middleware
// The middleware handles all payment verification via the facilitator

import { NextResponse } from "next/server";

const fortunes = [
    "The blockchain never lies.",
    "Your resources are safe in the Move VM.",
    "Move fast and break things (safely).",
    "A transaction awaits, seize the block.",
    "Your next upgrade will compile on first try.",
    "The oracle speaks: HODL wisdom, not just coins.",
    "Smart contracts make smarter decisions.",
    "Your keys, your fortune.",
];

export async function GET() {
    // Middleware already verified payment - just return the fortune
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return NextResponse.json({ fortune });
}
