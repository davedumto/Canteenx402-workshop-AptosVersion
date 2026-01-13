"use client";

import { useState, useEffect } from "react";
import { x402axios } from "aptos-x402";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showReveal, setShowReveal] = useState(false);

  const APTOS_PRIVATE_KEY = process.env.NEXT_PUBLIC_APTOS_PRIVATE_KEY;

  // Initialize wallet from private key
  useEffect(() => {
    if (APTOS_PRIVATE_KEY) {
      // Extract address from private key (first few chars for display)
      // In real implementation, derive address from key
      const keySnippet = APTOS_PRIVATE_KEY.slice(0, 10) + "...";
      setWalletAddress(keySnippet);
    }
  }, [APTOS_PRIVATE_KEY]);

  const handleGetFortune = async () => {
    if (!APTOS_PRIVATE_KEY) {
      setError("Please set NEXT_PUBLIC_APTOS_PRIVATE_KEY in .env.local");
      return;
    }

    setLoading(true);
    setError(null);
    setFortune(null);
    setTxHash(null);
    setShowReveal(false);

    try {
      // x402axios automatically handles 402 payment flow
      const response = await x402axios.get<{ fortune: string }>(
        "/api/fortune",
        { privateKey: APTOS_PRIVATE_KEY }
      );

      // Show reveal animation
      setShowReveal(true);
      setTimeout(() => {
        setFortune(response.data.fortune);
        if (response.paymentInfo?.transactionHash) {
          setTxHash(response.paymentInfo.transactionHash);
        }
      }, 600);
    } catch (err: any) {
      console.error("Error:", err);
      if (err.code === "INSUFFICIENT_BALANCE") {
        setError("Insufficient APT balance. Get testnet APT from faucet.");
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please try again.");
      } else {
        setError(err.message || "Something went wrong");
      }
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-zinc-900 to-teal-950/20 text-zinc-100 p-8">
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <main className="relative flex flex-col gap-6 items-center max-w-lg w-full">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-200 via-emerald-400 to-teal-200 bg-clip-text text-transparent drop-shadow-lg">
            🥠 Fortune Cookie
          </h1>
          <p className="text-teal-400/80 text-sm tracking-wide">
            Powered by aptos-x402
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-zinc-800/60 backdrop-blur-md border border-teal-500/20 rounded-2xl p-8 shadow-2xl shadow-teal-900/10">
          {!walletAddress ? (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🔮</div>
              <p className="text-zinc-300 text-lg">
                {APTOS_PRIVATE_KEY
                  ? "Connecting to Aptos realm..."
                  : "Set NEXT_PUBLIC_APTOS_PRIVATE_KEY in .env.local"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Wallet Status */}
              <div className="flex justify-between items-center bg-zinc-900/50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-zinc-300 font-medium">
                    Aptos Wallet
                  </span>
                </div>
                <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
                  Connected
                </span>
              </div>

              {/* Fortune Display */}
              <div className="min-h-[180px] flex items-center justify-center bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-xl p-8 border border-teal-500/10 relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-teal-500/30 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-teal-500/30 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-teal-500/30 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-teal-500/30 rounded-br-lg" />

                {loading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-5xl animate-spin">🥠</div>
                    <p className="text-teal-400 animate-pulse text-lg">
                      Processing on-chain payment...
                    </p>
                  </div>
                ) : showReveal && !fortune ? (
                  <div className="text-6xl animate-ping">✨</div>
                ) : fortune ? (
                  <div className="text-center space-y-3 animate-fade-in">
                    <div className="text-4xl">🌟</div>
                    <p className="text-xl font-serif italic text-teal-100 leading-relaxed">
                      "{fortune}"
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="text-5xl opacity-50">🥠</div>
                    <p className="text-zinc-400 text-lg">
                      Crack open a cookie to reveal your destiny
                    </p>
                  </div>
                )}
              </div>

              {/* Transaction Link */}
              {txHash && (
                <div className="text-center">
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 text-sm underline"
                  >
                    View Payment Transaction →
                  </a>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-3 text-center">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleGetFortune}
                disabled={loading || !APTOS_PRIVATE_KEY}
                className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 disabled:from-zinc-600 disabled:to-zinc-600 disabled:cursor-not-allowed rounded-xl font-bold text-lg text-zinc-900 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                type="button"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🥠</span>
                    Processing Payment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🥠 Open Fortune Cookie
                    <span className="text-sm font-normal opacity-80">
                      (0.01 APT)
                    </span>
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center space-y-1 mt-4">
          <p className="text-zinc-200 text-sm">Aptos Testnet • APT</p>
        </div>
      </main>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
