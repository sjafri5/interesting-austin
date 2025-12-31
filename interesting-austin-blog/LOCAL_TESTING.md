# Local Testing Guide

This guide will help you run the Interesting Austin blog locally on your machine.

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- A Sanity project and dataset (or you can create one during setup)

## Quick Start

### 1. Navigate to the project directory

```bash
cd interesting-austin-blog
```

### 2. Install dependencies

```bash
npm install
```

Or if you prefer yarn or pnpm:

```bash
yarn install
# or
pnpm install
```

### 3. Set up environment variables

You need to create a `.env.local` file in the `interesting-austin-blog` directory with the following variables:

```bash
# Required Sanity environment variables
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="your-dataset-name"
SANITY_API_READ_TOKEN="your-read-token"
```

#### Option A: Use existing Sanity project

If you already have a Sanity project:

1. Get your Project ID and Dataset name from [manage.sanity.io](https://manage.sanity.io/)
2. Create a read token:
   - Go to your project on [manage.sanity.io](https://manage.sanity.io/)
   - Click on the `🔌 API` tab
   - Click `+ Add API token`
   - Name it "Local Development Read Token"
   - Set `Permissions` to `Viewer`
   - Click `Save` and copy the token
3. Add these values to your `.env.local` file

#### Option B: Set up new Sanity project

Run the setup command to interactively create/connect a Sanity project:

```bash
npm run setup
```

This will guide you through:
- Creating or selecting a Sanity project
- Selecting or creating a dataset
- Automatically adding environment variables to `.env.local`

**Important:** When asked `Would you like to add configuration files for a Sanity project in this Next.js folder?`, answer **No** (the config files already exist).

After setup, you'll still need to manually add the `SANITY_API_READ_TOKEN` (see Option A above).

### 4. Generate TypeScript types

Before running the app, generate TypeScript types from your Sanity schema:

```bash
npm run typegen
```

This command:
- Extracts your Sanity schema
- Generates TypeScript types for type safety

**Note:** You should run this whenever you modify GROQ queries or schema types.

### 5. Start the development server

```bash
npm run dev
```

Or:

```bash
yarn dev
# or
pnpm dev
```

The app will start on [http://localhost:3000](http://localhost:3000)

## What You'll See

### Main Blog (http://localhost:3000)
- **Homepage**: Shows today's events and essential guides with the new design
- **Posts**: Individual event pages at `/posts/[slug]`
- **Guides**: Guide listing at `/guides` and individual guides at `/guides/[slug]`

### Sanity Studio (http://localhost:3000/studio)
- Content management interface
- Create and edit posts, guides, places, and settings
- Real-time preview of your content

## Development Workflow

### Making Changes

1. **Edit code**: Make changes to components, pages, or styles
2. **Hot reload**: Next.js will automatically reload the page
3. **Update types**: If you modify queries, run `npm run typegen`

### Creating Content

1. Go to [http://localhost:3000/studio](http://localhost:3000/studio)
2. Click **"+ Create"** to add new content:
   - **Post**: Daily events (appears in "Today's Events")
   - **Guide**: Evergreen content (appears in "Essential Guides")
   - **Place**: Locations referenced in guides
   - **Settings**: Site title, description, etc.

3. **Publish**: After creating content, click **Publish** to make it visible on the public site

### Testing the New Design

The redesigned homepage includes:
- ✅ Hero section with featured event badge
- ✅ Navigation with Posts/Guides toggle
- ✅ Event cards with time, location, category badges
- ✅ Guide cards with stats and preview text
- ✅ Hover effects and micro-interactions
- ✅ Responsive design (test on mobile/tablet)

## Troubleshooting

### "Missing environment variable" error

Make sure your `.env.local` file exists and has all required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`

### "Missing SANITY_API_READ_TOKEN" error

1. Go to [manage.sanity.io](https://manage.sanity.io/)
2. Select your project → API tab
3. Create a new token with `Viewer` permissions
4. Add it to `.env.local`

### Type errors after schema changes

Run:
```bash
npm run typegen
```

### Port 3000 already in use

Next.js will automatically try the next available port (3001, 3002, etc.), or you can specify a port:

```bash
PORT=3001 npm run dev
```

### No content showing

1. Make sure you've created and **published** content in Sanity Studio
2. Check that your dataset name in `.env.local` matches your Sanity dataset
3. Verify your Project ID is correct

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (after build)
- `npm run typegen` - Generate TypeScript types from Sanity schema
- `npm run lint` - Run ESLint
- `npm run setup` - Interactive Sanity project setup

## Next Steps

- Create some test posts and guides in Sanity Studio
- Test the responsive design on different screen sizes
- Customize the design further if needed
- Deploy to production when ready

## Need Help?

- Check the main [README.md](./README.md) for more details
- Sanity documentation: https://www.sanity.io/docs
- Next.js documentation: https://nextjs.org/docs


