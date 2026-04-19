#!/usr/bin/env bash
set -e
echo "pulling latest code ....."
git pull

echo "Install dependencies....."
npm install

echo "Start server ..."
npm run dev
