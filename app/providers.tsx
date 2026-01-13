'use client';

import { type ReactNode } from 'react';

// Simplified providers - using aptos-x402 with private key, no wallet adapter needed
export function Providers({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
