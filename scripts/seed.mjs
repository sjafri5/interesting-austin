// scripts/seed.mjs
import { createClient } from '@sanity/client'
import { neighborhoods, places } from '../data/seedData.js'

// Make sure you set this in the npm script
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_WRITE_TOKEN environment variable.')
  process.exit(1)
}

const client = createClient({
  projectId: 'ow7iqhbw', // your project id
  dataset: 'production',
  apiVersion: '2023-08-01',
  token,
  useCdn: false,
})

const neighborhoodIdForSlug = (slug) => `neighborhood.${slug}`
const placeIdForSlug = (slug) => `place.${slug}`

async function seedNeighborhoods() {
  console.log('🌱 Seeding neighborhoods...')

  for (const n of neighborhoods) {
    const doc = {
      _id: neighborhoodIdForSlug(n.slug),
      _type: 'neighborhood',
      name: n.name,
      slug: { _type: 'slug', current: n.slug },
      description: n.description
        ? [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: n.description,
                },
              ],
            },
          ]
        : undefined,
    }

    await client.createIfNotExists(doc)
    console.log(`  ✅ Neighborhood: ${n.name}`)
  }

  console.log('✅ Neighborhoods seeding complete.\n')
}

async function seedPlaces() {
  console.log('🌱 Seeding places...')

  for (const p of places) {
    let neighborhoodRef = undefined

    if (p.neighborhoodSlug) {
      const neighborhoodId = neighborhoodIdForSlug(p.neighborhoodSlug)
      neighborhoodRef = {
        _type: 'reference',
        _ref: neighborhoodId,
      }
    }

    const doc = {
      _id: placeIdForSlug(p.slug),
      _type: 'place',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      type: p.type,
      shortDescription: p.shortDescription,
      address: p.address,
      website: p.website,
      instagram: p.instagram,
      googleMapsUrl: p.googleMapsUrl,
    }

    if (neighborhoodRef) {
      doc.neighborhood = neighborhoodRef
    }

    await client.createIfNotExists(doc)
    console.log(`  ✅ Place: ${p.name}`)
  }

  console.log('✅ Places seeding complete.\n')
}

async function run() {
  try {
    console.log('🚀 Starting Sanity seed script...\n')

    await seedNeighborhoods()
    await seedPlaces()

    console.log('🎉 Seeding finished successfully.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding failed:')
    console.error(err)
    process.exit(1)
  }
}

run()

