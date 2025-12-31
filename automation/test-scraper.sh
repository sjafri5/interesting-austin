#!/bin/bash

# Test script for Do512 Event Scraper
# Usage: ./test-scraper.sh <webhook-url> [event-url]

WEBHOOK_URL="${1:-https://brownnoise.app.n8n.cloud/webhook-test/scrape-event}"
EVENT_URL="${2:-https://do512.com/events/2025/12/14/billy-strings-night-two-tickets}"

echo "Testing Do512 Event Scraper"
echo "Webhook URL: $WEBHOOK_URL"
echo "Event URL: $EVENT_URL"
echo ""

curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$EVENT_URL\"}" \
  | jq '.'

echo ""

