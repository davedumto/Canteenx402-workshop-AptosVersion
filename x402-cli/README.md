# buildx402

> **Ship payment-gated APIs faster** - CLI tool to scaffold x402 payment-gated Next.js applications on Aptos blockchain in seconds.

[![npm version](https://www.npmjs.com/package/buildx402)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ⚡ Quick Start

```bash
# Create a new app (installs dependencies automatically)
npx buildx402 my-app

# Generate a wallet
npx buildx402 wallet create

# Start building
cd my-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your payment-gated API running!

## 🎯 What is buildx402?

**buildx402** scaffolds production-ready Next.js applications with:
- **x402 Protocol V2** - HTTP 402 Payment Required standard
- **Aptos Blockchain** - Low-fee USDC payments
- **Next.js 16** - Latest React framework
- **TypeScript** - Full type safety
- **Terminal UI** - Developer-focused interface
- **One-Command Setup** - Automatic dependency installation

Perfect for:
- 💰 Monetizing APIs without subscriptions
- 🌍 Cross-border micro-payments
- 🎨 NFT minting APIs
- 📊 Premium data endpoints
- 🎥 Pay-per-view content

## 📦 What's Included

Your scaffolded app includes:

| Feature | Description |
|---------|-------------|
| **Payment Proxy** | Pre-configured x402 middleware (`proxy.ts`) |
| **Developer UI** | Terminal-themed interface with typewriter animations |
| **Wallet Integration** | Aptos SDK with private key management |
| **Example API** | `/api/fortune` endpoint (0.01 USDC per request) |
| **Copy-to-Clipboard** | Interactive wallet setup with Sonner toasts |
| **TypeScript** | Full type safety across the stack |
| **Tailwind CSS 4** | Utility-first styling |
| **Production Ready** | Vercel deployment config included |

## 🚀 Commands

### Create New App

```bash
npx buildx402 <app-name>
```

Creates a new x402 application with:
- ✅ Template download from GitHub
- ✅ Project setup and cleanup
- ✅ **Interactive dependency installation** (press Y to auto-install)
- ✅ ASCII art celebration on success

**Example:**
```bash
npx buildx402 my-payment-api
cd my-payment-api
# Dependencies already installed if you pressed Y!
npm run dev
```

### Generate Wallet

```bash
npx buildx402 wallet create
```

Generates a new Aptos Ed25519 keypair and displays:
```env
PAYMENT_RECIPIENT_ADDRESS=0x1234567890abcdef...
NEXT_PUBLIC_APTOS_PRIVATE_KEY=0xabcdef1234567890...
```

Copy these to `.env.local` in your project.

## 📖 Step-by-Step Guide

### 1. Create Your App
```bash
npx buildx402 my-app
```
Press `Y` when asked to install dependencies.

### 2. Generate Wallet
```bash
npx buildx402 wallet create
```

### 3. Configure Environment
Create `.env.local` in your project root:
```env
PAYMENT_RECIPIENT_ADDRESS=0x... # from wallet create
NEXT_PUBLIC_APTOS_PRIVATE_KEY=0x... # from wallet create
```

### 4. Fund Your Wallet (Testnet)
Visit [Aptos Faucet](https://aptos.dev/en/network/faucet) and request:
- **Testnet APT** (for gas fees)
- **Testnet USDC** (for testing payments)

### 5. Start Development
```bash
cd my-app
npm run dev
```

### 6. Test Your Payment API
1. Open [http://localhost:3000](http://localhost:3000)
2. Click **"EXECUTE_REQUEST"** to trigger a payment
3. Watch the terminal for payment confirmation
4. See your fortune appear on screen!

## 🎨 Customization

### Change API Pricing

Edit `proxy.ts`:
```typescript
const paymentRoutes = {
  "/api/fortune": {
    accepts: [{
      price: "0.05",  // Change from 0.01 to 0.05 USDC
      // ...
    }],
  },
};
```

### Add New Payment-Gated Routes

1. **Create the endpoint:**
   ```bash
   mkdir -p app/api/my-route
   touch app/api/my-route/route.ts
   ```

2. **Add to `proxy.ts`:**
   ```typescript
   "/api/my-route": {
     accepts: [{
       scheme: "exact",
       payTo: PAY_TO_ADDRESS,
       price: "1.00",
       network: "aptos:2",
     }],
   }
   ```

3. **Update matcher:**
   ```typescript
   export const config = {
     matcher: ["/api/fortune/:path*", "/api/my-route/:path*"],
   };
   ```

### Customize UI Theme

Edit `app/page.tsx` - The template includes:
- **Typewriter animations** - "x402 Next.js Starter" → "Shipping Faster" → "Shipping Smarter"
- **Terminal theme** - Monospace fonts, green-on-black, scanline effects
- **Sonner toasts** - Copy-to-clipboard notifications with green borders

## 🔐 Security Best Practices

⚠️ **IMPORTANT:**
- ❌ Never commit `.env.local` to version control
- ✅ Use **testnet ONLY** for development
- ✅ For production, use hardware wallets or secure key management
- ✅ Rotate private keys regularly
- ✅ Monitor wallet balances

## 🌍 Use Cases

Built for global builders:

1. **Cross-Border Content** - Nollywood/Afrobeats creators monetizing globally
2. **Micro-Education** - Pay-per-lesson platforms (e.g., $0.10 USDC/lesson)
3. **Gig-Data Economy** - Pay users for completing micro-tasks
4. **API Monetization** - Charge per request without subscriptions
5. **NFT Minting** - Pay-to-mint endpoints with instant settlement

## 📚 Tech Stack

| Layer | Technology |
|-------|-----------|
| **CLI** | Commander.js, Degit, Chalk, Ora |
| **Framework** | Next.js 16 (App Router) |
| **Blockchain** | Aptos Testnet (USDC Fungible Asset) |
| **Payment Protocol** | x402 V2 |
| **Styling** | Tailwind CSS 4 |
| **Type Safety** | TypeScript 5 |
| **Deployment** | Vercel |

## 🔗 Resources

- **[x402 Protocol Docs](https://github.com/rvk-utd/x402)** - Payment standard specification
- **[Aptos Developer Docs](https://aptos.dev)** - Blockchain documentation
- **[Template Repository](https://github.com/davedumto/buildx402)** - Source code & examples
- **[Aptos Faucet](https://aptos.dev/en/network/faucet)** - Get testnet tokens
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework guide

## 🤝 Contributing

Contributions welcome! Check out the [template repo](https://github.com/davedumto/nex402) for planned features and issues.

## 📝 License

MIT © 2026

---

**Built for the Aptos x x402 Hackathon** 🚀

Ship payment-gated APIs in minutes, not days.
