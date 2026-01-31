"use client";

import { useState, useEffect } from "react";
import { x402Client, wrapFetchWithPayment, decodePaymentResponseHeader } from "@rvk_rishikesh/fetch";
import { registerExactAptosScheme } from "@rvk_rishikesh/aptos/exact/client";
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [fetchWithPayment, setFetchWithPayment] = useState<((input: RequestInfo, init?: RequestInit) => Promise<Response>) | null>(null);

  const APTOS_PRIVATE_KEY = process.env.NEXT_PUBLIC_APTOS_PRIVATE_KEY;

  // Initialize wallet and x402 client
  useEffect(() => {
    if (APTOS_PRIVATE_KEY) {
      try {
        // Handle 0x prefix if present
        const privateKeyHex = APTOS_PRIVATE_KEY.startsWith('0x')
          ? APTOS_PRIVATE_KEY.slice(2)
          : APTOS_PRIVATE_KEY;

        const privateKey = new Ed25519PrivateKey(privateKeyHex);
        const aptosAccount = Account.fromPrivateKey({ privateKey });

        setWalletAddress(aptosAccount.accountAddress.toString());

        // Initialize x402 Client V2
        const client = new x402Client();

        // Register Aptos Scheme with the signer
        registerExactAptosScheme(client, { signer: aptosAccount });

        // Wrap fetch
        const wrappedFetch = wrapFetchWithPayment(fetch, client);
        setFetchWithPayment(() => wrappedFetch);

      } catch (err: any) {
        console.error("Wallet initialization failed", err);
        setError("Failed to initialize wallet: " + err.message);
      }
    }
  }, [APTOS_PRIVATE_KEY]);

  const handleGetFortune = async () => {
    if (!fetchWithPayment) {
      setError("Wallet not initialized. Check configuration.");
      return;
    }

    setLoading(true);
    setError(null);
    setFortune(null);
    setTxHash(null);
    setShowReveal(false);

    try {
      // V2 Client automatically handles 402, payment construction, and sponsoring
      const response = await fetchWithPayment("/api/fortune");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      // Show reveal animation
      setShowReveal(true);
      setTimeout(() => {
        setFortune(data.fortune);

        // Extract transaction hash from V2 header if available (simplified check)
        const paymentResponse = response.headers.get("PAYMENT-RESPONSE");
        if (paymentResponse) {
          try {
            const decoded = decodePaymentResponseHeader(paymentResponse);
            const hash = (decoded as any)?.transaction;
            if (hash) setTxHash(hash);
          } catch (e) { console.error(e) }
        }
      }, 600);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 p-8 font-mono">
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#0f0_3px,transparent_4px)]" />
      </div>

      <main className="relative flex flex-col gap-6 items-center max-w-2xl w-full">
        {/* Header */}
        <div className="text-center space-y-2 border border-green-500/30 p-4 bg-green-950/20">
          <h1 className="text-3xl font-bold text-green-400">
            &gt; x402 Next.js Starter
          </h1>
          <p className="text-green-500/60 text-xs tracking-wider">
            // Pay-per-request API template using Aptos blockchain
          </p>
        </div>

        {/* Main Terminal */}
        <div className="w-full border-2 border-green-500/40 bg-black p-6 shadow-lg shadow-green-500/10">
          {!walletAddress ? (
            <div className="space-y-4">
              <div className="text-green-400 animate-pulse">$ initializing wallet...</div>
              <p className="text-green-300/70 text-sm font-mono">
                {APTOS_PRIVATE_KEY
                  ? "/* Connecting to Aptos network */"
                  : "ERROR: Set NEXT_PUBLIC_APTOS_PRIVATE_KEY in .env.local"}
              </p>
              {error && <p className="text-red-500 text-sm font-mono border-l-2 border-red-500 pl-2">{error}</p>}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Wallet Status */}
              <div className="flex justify-between items-center border border-green-500/30 bg-green-950/10 px-4 py-3 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">$</span>
                  <span className="text-green-400/80">
                    {walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : 'wallet'}
                  </span>
                </div>
                <span className="text-green-400 text-xs">
                  [ONLINE]
                </span>
              </div>

              {/* Response Display */}
              <div className="min-h-[200px] flex items-start border-2 border-green-500/30 bg-black p-6 font-mono text-sm relative">
                <div className="w-full">
                  {loading ? (
                    <div className="space-y-2">
                      <p className="text-yellow-400">&gt; Initiating payment protocol...</p>
                      <p className="text-green-400 animate-pulse">&gt; Broadcasting transaction to Aptos testnet</p>
                      <p className="text-green-400/60">&gt; Awaiting confirmation<span className="animate-pulse">...</span></p>
                    </div>
                  ) : showReveal && !fortune ? (
                    <p className="text-green-400 animate-pulse">&gt; Payment confirmed. Fetching data...</p>
                  ) : fortune ? (
                    <div className="space-y-3">
                      <p className="text-green-500">&gt; Status: 200 OK</p>
                      <p className="text-green-400/80">&gt; Response:</p>
                      <div className="pl-4 border-l-2 border-green-500/50 text-green-300">
                        <code className="whitespace-pre-wrap">
                          {JSON.stringify({ fortune }, null, 2)}
                        </code>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-green-500/60">&gt; Ready to execute payment-gated request</p>
                      <p className="text-green-500/40">// Click below to send request to /api/fortune</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction Info */}
              {txHash && (
                <div className="border border-green-500/30 bg-green-950/10 p-3 font-mono text-xs">
                  <div className="flex flex-col gap-2">
                    <span className="text-green-500">// Transaction Hash:</span>
                    <code className="text-green-400/80 break-all bg-black/40 p-2 border-l-2 border-green-500/50">
                      {txHash}
                    </code>
                    <a
                      href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      &gt; View on Aptos Explorer
                    </a>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="border-2 border-red-500/50 bg-red-950/20 px-4 py-3">
                  <p className="text-red-400 font-mono text-sm">ERROR: {error}</p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleGetFortune}
                disabled={loading || !fetchWithPayment}
                className="w-full py-4 px-6 border-2 border-green-500 bg-green-500/10 hover:bg-green-500/20 disabled:border-gray-600 disabled:bg-gray-900/50 disabled:cursor-not-allowed disabled:text-gray-600 font-mono font-bold text-base text-green-400 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
                type="button"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    &gt; PROCESSING_PAYMENT
                    <span className="animate-pulse">...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    &gt; EXECUTE_REQUEST
                    <span className="text-sm font-normal opacity-70">
                      [COST: 0.01 USDC]
                    </span>
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center space-y-1 mt-4 font-mono text-xs">
          <p className="text-green-500/60">// Network: Aptos Testnet | Currency: USDC</p>
          <p className="text-green-500/40">// Built by DaveDumto with x402 Protocol V2</p>
        </div>
      </main>
    </div>
  );
}
