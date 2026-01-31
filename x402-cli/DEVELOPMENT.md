# Development Guide for create-x402-app

## Local Development & Testing

### Setup

1. **Install dependencies**
   ```bash
   cd x402-cli
   npm install
   ```

2. **Test the wallet command locally**
   ```bash
   node bin/index.js wallet create
   ```

3. **Link for local testing**
   ```bash
   npm link
   ```

   Now you can use `create-x402-app` globally on your machine:
   ```bash
   create-x402-app my-test-app
   ```

### Testing with Local Template

Since the template hasn't been published to GitHub yet, you can test with a local copy:

1. **Set environment variable to use local path**
   ```bash
   # From the x402-cli directory
   export X402_TEMPLATE_PATH="../"
   ```

2. **Test the init command**
   ```bash
   cd /tmp  # Or any test directory
   create-x402-app test-app
   ```

## Pre-Publication Checklist

Before publishing to NPM, ensure:

- [ ] Template repository is pushed to GitHub
- [ ] Update `package.json` with correct repository URL
- [ ] Update `commands.js` with correct GitHub repo path (remove `yourusername`)
- [ ] Test the CLI with the actual GitHub URL
- [ ] Update version number appropriately
- [ ] Add `.gitignore` and `.npmignore` to x402-cli folder

## Publishing to NPM

### First-Time Setup

1. **Create NPM account**
   - Visit https://www.npmjs.com/signup
   - Verify your email

2. **Login to NPM**
   ```bash
   npm login
   ```

3. **Verify package name is available**
   ```bash
   npm search create-x402-app
   ```

   If taken, choose an alternative name in `package.json`:
   - `@yourscope/create-x402-app`
   - `create-x402-aptos`
   - `x402-create-app`

### Publishing

1. **Update version** (if not first release)
   ```bash
   npm version patch  # or minor, or major
   ```

2. **Test the package locally**
   ```bash
   npm pack
   # This creates a .tgz file you can inspect
   ```

3. **Publish to NPM**
   ```bash
   npm publish
   # For scoped packages: npm publish --access public
   ```

4. **Verify it worked**
   ```bash
   npx create-x402-app@latest test-verification
   ```

## Repository Setup for GitHub

1. **Create a new GitHub repository**
   - Name: `x402-aptos-starter` (or your preferred name)
   - Initialize without README (we already have one)

2. **Update the template repository**
   ```bash
   # From the main project directory (not x402-cli)
   cd /Users/dumtochukwu/Desktop/Canteenx402-workshop-AptosVersion

   # Add your GitHub remote
   git remote add origin https://github.com/yourusername/x402-aptos-starter.git

   # Or if you already have a remote, update it
   git remote set-url origin https://github.com/yourusername/x402-aptos-starter.git

   # Push to GitHub
   git push -u origin main
   ```

3. **Update commands.js**
   Replace `'yourusername/x402-aptos-starter#main'` with your actual GitHub username/org

4. **Test with the live GitHub repo**
   ```bash
   npx create-x402-app github-test
   ```

## Quick Publishing Script

For hackathon speed, here's a one-liner after setup:

```bash
cd x402-cli && \
npm version patch && \
npm publish && \
echo "✅ Published! Test with: npx create-x402-app@latest test-app"
```

## Troubleshooting

### "Package name already taken"

Solution: Use a scoped package name:
```json
{
  "name": "@yourusername/create-x402-app"
}
```

### "degit - couldn't find commit hash for main"

Solution: Ensure the GitHub repository exists and is public, or use the X402_TEMPLATE_PATH environment variable for local testing.

### "Permission denied" when publishing

Solution:
```bash
npm login
# Re-enter credentials
npm publish
```

## File Structure

```
x402-cli/
├── bin/
│   └── index.js        # CLI entry point (executable)
├── src/
│   ├── commands.js     # Init command implementation
│   └── wallet.js       # Wallet generation utilities
├── package.json        # NPM package config
├── README.md          # User-facing documentation
└── DEVELOPMENT.md     # This file
```
