# create-x402-app

CLI tool to scaffold x402 payment-gated Next.js applications on Aptos blockchain.

## Quick Start

```bash
# Create a new app
npx create-x402-app my-app

# Generate a wallet
npx create-x402-app wallet create

# Navigate to your app and start developing
cd my-app
npm install
npm run dev
```

## Features

- 🚀 **Instant Setup** - Scaffold a complete x402 app in seconds
- 💰 **Aptos Integration** - Built-in USDC payment handling on Aptos
- 🔐 **Wallet Generator** - Create test wallets with one command
- 📦 **Production Ready** - Includes middleware, API routes, and frontend
- 🎨 **Developer UI** - Terminal-themed interface out of the box

## Commands

### Create New App

```bash
npx create-x402-app <app-name>
```

Creates a new x402 application in a directory named `<app-name>`.

### Generate Wallet

```bash
npx create-x402-app wallet create
```

Generates a new Aptos wallet keypair and displays environment variables to add to `.env.local`.

## What's Included

Your scaffolded app includes:

- **Next.js 16** - Latest React framework
- **x402 Protocol V2** - Payment middleware pre-configured
- **Aptos SDK** - Blockchain integration
- **Tailwind CSS** - Styling framework
- **TypeScript** - Type safety
- **Example API** - `/api/fortune` endpoint with 0.01 USDC payment gate

## Next Steps

1. **Install dependencies**
   ```bash
   cd your-app-name
   npm install
   ```

2. **Create a wallet**
   ```bash
   npx create-x402-app wallet create
   ```

3. **Configure environment**
   Copy the generated env vars to `.env.local`

4. **Fund your wallet**
   - Visit [Aptos Faucet](https://aptos.dev/en/network/faucet)
   - Request testnet APT and USDC

5. **Start development**
   ```bash
   npm run dev
   ```

6. **Customize your API**
   - Edit `middleware.ts` to change pricing
   - Add new routes to `app/api/`
   - Update UI in `app/page.tsx`

## Documentation

- [x402 Protocol](https://github.com/rvk-utd/x402)
- [Aptos Docs](https://aptos.dev)
- [Next.js Docs](https://nextjs.org/docs)

## License

MIT
