# Setting Up API Keys in n8n

This guide explains how to configure API keys for the automation workflows.

## Method 1: Using n8n Credentials (Recommended)

### Step 1: Create Sanity API Credential

1. In n8n, go to **Settings** → **Credentials** (or click the credentials icon in the left sidebar)
2. Click **"Add Credential"**
3. Search for **"HTTP Header Auth"** and select it
4. Fill in the form:
   - **Credential Name**: `Sanity API`
   - **Name**: `Authorization`
   - **Value**: `Bearer YOUR_SANITY_WRITE_TOKEN_HERE`
     - Replace `YOUR_SANITY_WRITE_TOKEN_HERE` with your actual token
     - You can find your token in your Sanity project settings: https://sanity.io/manage
5. Click **"Save"**

### Step 2: Create LLM API Credential

1. Click **"Add Credential"** again
2. Select **"HTTP Header Auth"**
3. Fill in:
   - **Credential Name**: `LLM API`
   - **Name**: `Authorization`
   - **Value**: `Bearer YOUR_OPENAI_API_KEY_HERE`
     - Replace with your OpenAI API key (or other LLM provider key)
4. Click **"Save"**

### Step 3: Assign Credentials to Workflow Nodes

1. Open your workflow in n8n
2. For each HTTP Request node that needs authentication:
   - Click on the node (e.g., "Query Places from Sanity")
   - In the **Authentication** dropdown, select **"Generic Credential Type"**
   - Select **"HTTP Header Auth"**
   - Choose the appropriate credential:
     - Sanity nodes → Select **"Sanity API"**
     - LLM nodes → Select **"LLM API"**
3. The node will now use the credential automatically

## Method 2: Using Environment Variables

If you're running n8n with environment variable support:

### Step 1: Set Environment Variables

Add to your n8n environment (`.env` file or system environment):

```bash
SANITY_PROJECT_ID=ow7iqhbw
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_token_here
LLM_API_KEY=your_openai_key_here
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4-turbo-preview
```

### Step 2: Update Workflow Nodes

In the HTTP Request nodes, use expressions in the header value:
- **Authorization**: `Bearer {{ $env.SANITY_WRITE_TOKEN }}`
- Or use `{{ $env.LLM_API_KEY }}` for LLM nodes

**Note**: Environment variable access in n8n depends on your deployment. Self-hosted n8n typically supports `$env`, but n8n Cloud may require credentials.

## Method 3: Direct Value (Testing Only)

For quick testing, you can enter the token directly:

1. In the HTTP Request node, find the **Header Parameters** section
2. Click the **"Fixed"** button (instead of "Expression")
3. Enter: `Bearer YOUR_TOKEN_HERE`
4. Click outside to save

**⚠️ Warning**: This stores the token in the workflow JSON. Only use for testing!

## Finding Your API Keys

### Sanity Write Token

1. Go to https://sanity.io/manage
2. Select your project (`ow7iqhbw`)
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions (or use existing)
5. Copy the token (starts with `sk...`)

### OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in to your OpenAI account
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-...`)

## Troubleshooting

### "Not accessible via UI" Error

This means n8n can't access the environment variable. Solutions:
- Use **Method 1** (Credentials) instead
- Or ensure n8n is configured to read environment variables

### "Invalid credentials" Error

- Verify the token is correct (no extra spaces)
- Check the token hasn't expired
- Ensure the token has the right permissions (Sanity tokens need write access)

### Testing the Connection

1. Click the **"Test step"** button in the node
2. Check the **OUTPUT** panel on the right
3. If successful, you'll see the API response
4. If it fails, check the error message

## Security Best Practices

✅ **DO:**
- Use n8n credentials system (Method 1)
- Store tokens securely
- Use different tokens for different environments (dev/prod)
- Rotate tokens regularly

❌ **DON'T:**
- Commit tokens to git
- Share workflow JSON files with tokens embedded
- Use the same token for multiple projects


