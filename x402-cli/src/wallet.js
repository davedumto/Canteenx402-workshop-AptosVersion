/**
 * Wallet Management Utilities
 */

import { Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import chalk from 'chalk';

/**
 * Generate a new Aptos wallet and display env configuration
 */
export async function createWallet() {
  console.log(chalk.green.bold('\n🔐 Generating new Aptos wallet...\n'));

  try {
    // Generate a new Ed25519 keypair
    const account = Account.generate();

    // Get the private key and address
    const privateKey = account.privateKey.toString();
    const address = account.accountAddress.toString();

    // Display wallet information
    console.log(chalk.cyan('📋 Wallet Generated Successfully!\n'));

    // Show the environment variables
    console.log(chalk.yellow('Add these to your .env.local file:\n'));
    console.log(chalk.white('─'.repeat(80)));
    console.log(chalk.green(`PAYMENT_RECIPIENT_ADDRESS=${address}`));
    console.log(chalk.green(`NEXT_PUBLIC_APTOS_PRIVATE_KEY=${privateKey}`));
    console.log(chalk.white('─'.repeat(80)));

    // Additional information
    console.log(chalk.gray('\n💡 Wallet Details:\n'));
    console.log(chalk.white(`  Address: ${address}`));
    console.log(chalk.white(`  Network: Aptos Testnet (aptos:2)`));

    // Security warnings
    console.log(chalk.yellow('\n⚠️  SECURITY WARNINGS:\n'));
    console.log(chalk.red('  • NEVER commit .env.local to version control'));
    console.log(chalk.red('  • This wallet is for TESTNET ONLY'));
    console.log(chalk.red('  • For production, use hardware wallets or secure key management'));
    console.log(chalk.red('  • Keep your private key secure and never share it'));

    // Funding instructions
    console.log(chalk.cyan('\n💰 Fund your wallet:\n'));
    console.log(chalk.white('  1. Visit: https://aptos.dev/en/network/faucet'));
    console.log(chalk.white(`  2. Enter your address: ${address}`));
    console.log(chalk.white('  3. Request testnet APT (for gas fees)'));
    console.log(chalk.white('  4. Request testnet USDC (for testing payments)'));

    console.log(chalk.green('\n✅ Wallet creation complete!\n'));

  } catch (error) {
    console.error(chalk.red('\n❌ Failed to generate wallet:'), error.message);
    process.exit(1);
  }
}
