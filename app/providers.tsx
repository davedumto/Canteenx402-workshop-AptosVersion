'use client';

import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

// Simplified providers - using aptos-x402 with private key, no wallet adapter needed
export function Providers({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    unstyled: true,
                    classNames: {
                        toast: 'bg-black border-2 border-green-500 px-4 py-3 flex items-center gap-3 font-mono text-sm shadow-lg shadow-green-500/20',
                        title: 'text-green-400',
                        description: 'text-green-300/70',
                    },
                }}
            />
        </>
    );
}
