#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js LTS
echo "Installing Node.js LTS..."
nvm install --lts

# Use the installed version
nvm use --lts

# Verify installation
echo "Node.js version:"
node --version
echo "npm version:"
npm --version

# Install project dependencies
echo "Installing project dependencies..."
npm install

echo "Installation complete! Run 'npm run dev' to start the server."




