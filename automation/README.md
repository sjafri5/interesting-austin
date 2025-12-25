# Automation Folder

This folder contains n8n workflow blueprints and helper modules for automating content generation and topic discovery for the Interesting Austin Sanity project.

## Structure

```
automation/
├── README.md                    # This file
├── sanityClient.mjs             # Sanity HTTP API client helpers
├── llmClient.mjs                # LLM API abstraction (OpenAI-compatible)
├── topicSchemaSuggestion.md    # Suggested Sanity schema for topics
└── workflows/
    ├── auto-guide-publisher.json      # Phase 1: Auto-generate guides from topics
    └── topic-miner-skeleton.json      # Phase 2: Discover topics from external sources
```

## Overview

### Phase 1: Auto Guide Publisher

The `auto-guide-publisher.json` workflow:
- Takes a topic (e.g., "Best tacos in East Austin") and optional place slugs
- Uses an LLM to generate guide content (title, slug, summary, content, guideType)
- Resolves place slugs to Sanity document references
- Publishes a new guide document via Sanity's HTTP API

**Triggers:**
- Cron (daily/weekly)
- Manual HTTP webhook with JSON body

### Phase 2: Topic Miner (Skeleton)

The `topic-miner-skeleton.json` workflow:
- Discovers topic ideas from external sources (TikTok, Google, LLM)
- Normalizes topics into a uniform structure
- Stores topics for later processing

**Status:** Skeleton with placeholder nodes and TODOs for external API integration.

## Setup

### 1. Environment Variables

Create a `.env` file in the project root (or configure in n8n credentials):

```bash
# Sanity Configuration
SANITY_PROJECT_ID=ow7iqhbw
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_write_token_here

# LLM Configuration (OpenAI-compatible)
LLM_API_KEY=your_openai_api_key_here
LLM_BASE_URL=https://api.openai.com/v1  # or your custom endpoint
LLM_MODEL=gpt-4-turbo-preview  # or gpt-4, gpt-3.5-turbo, etc.
```

### 2. Import Workflows into n8n

1. Open your n8n instance
2. Click **"Workflows"** → **"Import from File"**
3. Select one of the JSON files from `workflows/`
4. Configure credentials:
   - **Sanity API**: Create HTTP Auth credential with Bearer token = `SANITY_WRITE_TOKEN`
   - **LLM API**: Create HTTP Auth credential with Bearer token = `LLM_API_KEY`
5. Update workflow nodes to use these credentials

### 3. Configure Credentials in n8n

#### Sanity Credential
- **Type**: HTTP Header Auth
- **Name**: `Authorization`
- **Value**: `Bearer ${SANITY_WRITE_TOKEN}`

#### LLM Credential
- **Type**: HTTP Header Auth
- **Name**: `Authorization`
- **Value**: `Bearer ${LLM_API_KEY}`

Alternatively, use n8n's credential system to reference environment variables.

## Using the Helper Modules

### Sanity Client (`sanityClient.mjs`)

```javascript
import { createSanityClient } from './sanityClient.mjs'

const client = createSanityClient()

// Create a single guide
const guide = await client.createGuide({
  title: "Best Tacos in East Austin",
  slug: { _type: "slug", current: "best-tacos-east-austin" },
  summary: "A curated list of must-try taco spots...",
  content: [/* portable text blocks */],
  guideType: "list",
  places: [{ _type: "reference", _ref: "place-id-123" }]
})

// Batch create multiple guides
await client.mutateGuides([guide1, guide2, guide3])
```

### LLM Client (`llmClient.mjs`)

```javascript
import { generateGuideFromTopic } from './llmClient.mjs'

const result = await generateGuideFromTopic({
  topic: "Best tacos in East Austin",
  places: ["veracruz-all-natural", "pueblo-viejo"]
})

// Returns:
// {
//   title: "...",
//   slug: "...",
//   summary: "...",
//   content: [/* portable text structure */],
//   guideType: "list"
// }
```

## Workflow Details

### Auto Guide Publisher Workflow

**Input (HTTP Webhook or Cron with manual input):**
```json
{
  "topic": "Best tacos in East Austin",
  "placeSlugs": ["veracruz-all-natural", "pueblo-viejo", "dee-dee-thai"]
}
```

**Process:**
1. Receives topic and optional place slugs
2. Resolves place slugs to Sanity document IDs (via GROQ query)
3. Calls LLM to generate guide content
4. Transforms LLM response into Sanity mutation payload
5. POSTs to Sanity mutate endpoint
6. Returns created guide details

**Output:**
```json
{
  "success": true,
  "guide": {
    "title": "...",
    "slug": "...",
    "_id": "..."
  }
}
```

### Topic Miner Workflow

**Current Status:** Skeleton with placeholder nodes

**Planned Process:**
1. Cron trigger (daily)
2. Collect topics from:
   - TikTok search (TODO: API integration)
   - Google search / People Also Ask (TODO: API integration)
   - LLM question generator
3. Normalize topics into uniform structure
4. Store topics (Sanity document or JSON file)

**Topic Structure:**
```json
{
  "question": "Where are the best tacos in East Austin?",
  "source": "tiktok",
  "category": "food",
  "neighborhoodSlug": "east-austin",
  "placeSlugs": ["veracruz-all-natural"]
}
```

## Testing Workflows

### Test Auto Guide Publisher

1. **Via HTTP Webhook:**
   ```bash
   curl -X POST http://your-n8n-instance/webhook/auto-guide-publisher \
     -H "Content-Type: application/json" \
     -d '{
       "topic": "Best date night spots in Zilker",
       "placeSlugs": []
     }'
   ```

2. **Via n8n UI:**
   - Open the workflow
   - Click "Execute Workflow"
   - Manually set the input data in the webhook node

### Test Topic Miner

Currently returns mock data. Once external APIs are integrated:
- Configure API credentials
- Update placeholder URLs
- Test each source node individually

## Iterating with Cursor

When working with Cursor to modify workflows:

1. **Export from n8n:**
   - Open workflow in n8n
   - Click **"Download"** (three dots menu)
   - Save to `workflows/` folder, overwriting existing JSON

2. **Edit in Cursor:**
   - Modify workflow JSON directly
   - Update helper modules (`sanityClient.mjs`, `llmClient.mjs`)
   - Adjust prompts in `llmClient.mjs`

3. **Import back to n8n:**
   - Use "Import from File" in n8n
   - Re-configure credentials if needed

## Helper Module Architecture

Both `sanityClient.mjs` and `llmClient.mjs` are designed to:
- Work standalone (can be imported in n8n Function nodes)
- Use environment variables for configuration
- Have minimal dependencies (built-in `fetch` for Node 18+)
- Be easily testable and debuggable

## Next Steps

1. **Phase 1 (Current):**
   - ✅ Workflow structure
   - ✅ Helper modules
   - ⏳ Test with real LLM API
   - ⏳ Refine prompt templates

2. **Phase 2 (Future):**
   - ⏳ Integrate TikTok API/search
   - ⏳ Integrate Google Search API
   - ⏳ Create `topic` document type in Sanity
   - ⏳ Build topic → guide pipeline

## Troubleshooting

### Sanity API Errors
- Verify `SANITY_WRITE_TOKEN` has write permissions
- Check project ID and dataset match your Sanity project
- Ensure document references use correct `_id` format

### LLM API Errors
- Verify API key is valid
- Check `LLM_BASE_URL` matches your provider
- Ensure model name is available on your account

### Workflow Import Issues
- Ensure JSON is valid (use a JSON validator)
- Check node IDs are unique
- Verify credential names match your n8n setup

